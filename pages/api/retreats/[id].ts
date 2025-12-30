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
    const { id } = req.query;

    try {
        await dbConnect();

        if (req.method === "GET") {
            const retreat = await Retreat.findById(id);
            if (!retreat) {
                return res.status(404).json({ error: "Retreat not found" });
            }

            const retreatWithStatus = {
                ...retreat.toObject(),
                status: computeRetreatStatus(retreat.dateFrom, retreat.dateTo),
            };

            return res.status(200).json(retreatWithStatus);
        }

        if (req.method === "PATCH") {
            const updateData = { ...req.body, updatedBy: req.user?.email };

            if (req.body.dateFrom && req.body.dateTo) {
                updateData.status = computeRetreatStatus(
                    new Date(req.body.dateFrom),
                    new Date(req.body.dateTo)
                );
            }

            const retreat = await Retreat.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            if (!retreat) {
                return res.status(404).json({ error: "Retreat not found" });
            }

            const retreatWithStatus = {
                ...retreat.toObject(),
                status: computeRetreatStatus(retreat.dateFrom, retreat.dateTo),
            };

            return res.status(200).json(retreatWithStatus);
        }

        if (req.method === "DELETE") {
            const retreat = await Retreat.findByIdAndDelete(id);
            if (!retreat) {
                return res.status(404).json({ error: "Retreat not found" });
            }
            return res.status(200).json({ message: "Retreat deleted" });
        }

        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch {
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);