import Retreat from "@/model/Retreat";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import Registration from "@/model/Registration";
import AttendanceRecord from "@/model/AttendanceRecord";
import AttendanceSession from "@/model/AttendanceSession";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        await dbConnect();

        const totalRetreats = await Retreat.countDocuments();

        const allRegistrations = await Registration.find();
        const totalRegistrations = allRegistrations.length;
        const avgRegistrationsPerRetreat = totalRetreats > 0
            ? Math.round(totalRegistrations / totalRetreats)
            : 0;

        const retreats = await Retreat.find().lean();
        let totalAttendanceSum = 0;
        let retreatsWithAttendance = 0;

        for (const retreat of retreats) {
            const sessions = await AttendanceSession.find({ retreatId: retreat._id });
            if (sessions.length === 0) continue;

            const sessionIds = sessions.map(s => s._id);
            const records = await AttendanceRecord.find({ sessionId: { $in: sessionIds } });

            if (records.length > 0) {
                const avgAttendance = records.reduce((sum, r) => sum + (r.total || 0), 0) / records.length;
                totalAttendanceSum += avgAttendance;
                retreatsWithAttendance++;
            }
        }

        const avgAttendancePerRetreat = retreatsWithAttendance > 0
            ? Math.round(totalAttendanceSum / retreatsWithAttendance)
            : 0;

        const retreatsWithRegistrations = await Promise.all(
            retreats.map(async (retreat) => {
                const count = await Registration.countDocuments({ retreatId: retreat._id });
                return {
                    year: retreat.year,
                    type: retreat.type,
                    count
                };
            })
        );

        const highestAttended = retreatsWithRegistrations.reduce(
            (max, retreat) => (retreat.count > max.count ? retreat : max),
            { year: 0, type: "", count: 0 }
        );

        return res.status(200).json({
            totalRetreats,
            avgRegistrationsPerRetreat,
            avgAttendancePerRetreat,
            highestAttended: {
                year: highestAttended.year,
                type: highestAttended.type,
                count: highestAttended.count,
            },
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default authMiddleware(handler);