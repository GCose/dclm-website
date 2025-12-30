import Retreat from "@/model/Retreat";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

const computeRetreatStatus = (dateFrom: Date, dateTo: Date): string => {
    const now = new Date();
    const from = new Date(dateFrom);
    const to = new Date(dateTo);

    if (now < from) {
        return "upcoming";
    } else if (now >= from && now <= to) {
        return "ongoing";
    } else {
        return "completed";
    }
};

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const { page, limit, search, year, type } = req.query;

            const filter: Record<string, unknown> = {};

            if (search) {
                filter.$or = [
                    { venue: { $regex: search, $options: 'i' } },
                    { theme: { $regex: search, $options: 'i' } }
                ];
            }
            if (year) filter.year = parseInt(year as string);
            if (type) filter.type = type;

            if (page && limit) {
                const pageNum = parseInt(page as string) || 1;
                const limitNum = parseInt(limit as string) || 20;
                const skip = (pageNum - 1) * limitNum;

                const [retreats, total] = await Promise.all([
                    Retreat.find(filter)
                        .sort({ year: -1, type: 1 })
                        .skip(skip)
                        .limit(limitNum),
                    Retreat.countDocuments(filter)
                ]);

                const retreatsWithStatus = retreats.map((retreat) => ({
                    ...retreat.toObject(),
                    status: computeRetreatStatus(retreat.dateFrom, retreat.dateTo),
                }));

                const totalPages = Math.ceil(total / limitNum);

                return res.status(200).json({
                    retreats: retreatsWithStatus,
                    pagination: {
                        total,
                        page: pageNum,
                        limit: limitNum,
                        totalPages
                    }
                });
            } else {
                const retreats = await Retreat.find(filter).sort({ year: -1, type: 1 });

                const retreatsWithStatus = retreats.map((retreat) => ({
                    ...retreat.toObject(),
                    status: computeRetreatStatus(retreat.dateFrom, retreat.dateTo),
                }));

                return res.status(200).json({ retreats: retreatsWithStatus });
            }
        }

        if (req.method === "POST") {
            const { dateFrom, dateTo } = req.body;
            const status = computeRetreatStatus(new Date(dateFrom), new Date(dateTo));

            const retreat = await Retreat.create({
                ...req.body,
                status,
                createdBy: req.user?.email,
            });

            return res.status(201).json(retreat);
        }

        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && (error as { code: number }).code === 11000) {
            return res
                .status(400)
                .json({ error: "Retreat for this year and type already exists" });
        }
        console.error("Retreats API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);