import Retreat from "@/model/Retreat";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const { page, limit } = req.query;

            if (page && limit) {
                const pageNum = parseInt(page as string) || 1;
                const limitNum = parseInt(limit as string) || 20;
                const skip = (pageNum - 1) * limitNum;

                const [retreats, total] = await Promise.all([
                    Retreat.find({})
                        .sort({ year: -1, type: 1 })
                        .skip(skip)
                        .limit(limitNum),
                    Retreat.countDocuments({})
                ]);

                const totalPages = Math.ceil(total / limitNum);

                return res.status(200).json({
                    retreats,
                    pagination: {
                        total,
                        page: pageNum,
                        limit: limitNum,
                        totalPages
                    }
                });
            } else {
                const retreats = await Retreat.find({}).sort({ year: -1, type: 1 });
                return res.status(200).json({ retreats });
            }
        }

        if (req.method === "POST") {
            const retreat = await Retreat.create({
                ...req.body,
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