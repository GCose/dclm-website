import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import Registration from "@/model/Registration";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const { retreatId, page, limit, search, gender, category, nationality, invitedBy, dayRegistered } = req.query;

            const pageNum = parseInt(page as string) || 1;
            const limitNum = parseInt(limit as string) || 20;
            const skip = (pageNum - 1) * limitNum;

            const filter: Record<string, unknown> = {};

            if (retreatId) filter.retreatId = retreatId;
            if (search) filter.name = { $regex: search, $options: 'i' };
            if (gender) filter.gender = gender;
            if (category) filter.category = category;
            if (nationality) filter.nationality = nationality;
            if (invitedBy) filter.invitedBy = invitedBy;
            if (dayRegistered) filter.dayRegistered = parseInt(dayRegistered as string);

            const [registrations, total] = await Promise.all([
                Registration.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limitNum),
                Registration.countDocuments(filter)
            ]);

            const totalPages = Math.ceil(total / limitNum);

            return res.status(200).json({
                registrations,
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    totalPages
                }
            });
        }

        if (req.method === "POST") {
            const registration = await Registration.create({
                ...req.body,
                createdBy: req.user?.email,
            });
            return res.status(201).json(registration);
        }

        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Registrations API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);