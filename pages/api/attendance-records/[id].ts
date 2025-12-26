import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import AttendanceRecord from "@/model/AttendanceRecord";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await dbConnect();

        if (req.method === "GET") {
            const record = await AttendanceRecord.findById(id).populate({
                path: "sessionId",
                populate: { path: "retreatId" },
            });
            if (!record) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.status(200).json(record);
        }

        if (req.method === "PATCH") {
            const record = await AttendanceRecord.findByIdAndUpdate(
                id,
                { ...req.body, updatedBy: req.user?.email },
                { new: true }
            );
            if (!record) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.status(200).json(record);
        }

        if (req.method === "DELETE") {
            const record = await AttendanceRecord.findByIdAndDelete(id);
            if (!record) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.status(200).json({ message: "Record deleted" });
        }

        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Attendance Record API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);