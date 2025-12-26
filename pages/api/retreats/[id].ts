import Retreat from "@/model/Retreat";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await dbConnect();

        if (req.method === "GET") {
            const retreat = await Retreat.findById(id);
            if (!retreat) {
                return res.status(404).json({ error: "Retreat not found" });
            }
            return res.status(200).json(retreat);
        }

        if (req.method === "PATCH") {
            const retreat = await Retreat.findByIdAndUpdate(
                id,
                { ...req.body, updatedBy: req.user?.email },
                { new: true }
            );
            if (!retreat) {
                return res.status(404).json({ error: "Retreat not found" });
            }
            return res.status(200).json(retreat);
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