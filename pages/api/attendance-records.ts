import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import AttendanceRecord from "@/model/AttendanceRecord";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const { sessionId } = req.query;

            if (sessionId) {
                const record = await AttendanceRecord.findOne({ sessionId });
                return res.status(200).json({ record });
            }

            const records = await AttendanceRecord.find({});
            return res.status(200).json({ records });
        }

        if (req.method === "POST") {
            const { sessionId } = req.body;

            const existingRecord = await AttendanceRecord.findOne({ sessionId });
            if (existingRecord) {
                const updatedRecord = await AttendanceRecord.findByIdAndUpdate(
                    existingRecord._id,
                    { ...req.body, updatedBy: req.user?.email },
                    { new: true }
                );
                return res.status(200).json(updatedRecord);
            }

            const record = await AttendanceRecord.create({
                ...req.body,
                createdBy: req.user?.email,
            });
            return res.status(201).json(record);
        }

        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Attendance Records API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);