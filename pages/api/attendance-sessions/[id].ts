import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import AttendanceSession from "@/model/AttendanceSession";
import AttendanceRecord from "@/model/AttendanceRecord";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await dbConnect();

        if (req.method === "GET") {
            const session = await AttendanceSession.findById(id).populate(
                "retreatId"
            );
            if (!session) {
                return res.status(404).json({ error: "Session not found" });
            }
            return res.status(200).json(session);
        }

        if (req.method === "PATCH") {
            const session = await AttendanceSession.findByIdAndUpdate(
                id,
                { ...req.body, updatedBy: req.user?.email },
                { new: true }
            );
            if (!session) {
                return res.status(404).json({ error: "Session not found" });
            }
            return res.status(200).json(session);
        }

        if (req.method === "DELETE") {
            const session = await AttendanceSession.findByIdAndDelete(id);
            if (!session) {
                return res.status(404).json({ error: "Session not found" });
            }

            await AttendanceRecord.deleteMany({ sessionId: id });

            return res.status(200).json({ message: "Session deleted" });
        }

        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Attendance Session API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);