import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import AttendanceSession from "@/model/AttendanceSession";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const { retreatId } = req.query;

            if (retreatId) {
                const sessions = await AttendanceSession.find({ retreatId }).sort({
                    day: 1,
                    date: 1,
                });
                return res.status(200).json({ sessions });
            }

            const sessions = await AttendanceSession.find({})
                .populate("retreatId")
                .sort({ date: -1 });
            return res.status(200).json({ sessions });
        }

        if (req.method === "POST") {
            const session = await AttendanceSession.create({
                ...req.body,
                createdBy: req.user?.email,
            });
            return res.status(201).json(session);
        }

        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Attendance Sessions API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);