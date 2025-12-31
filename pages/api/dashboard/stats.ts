import Retreat from "@/model/Retreat";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import Registration from "@/model/Registration";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        await dbConnect();

        const totalRetreats = await Retreat.countDocuments();

        const retreats = await Retreat.find().sort({ year: -1, dateFrom: -1 }).lean();

        let latestRetreat = null;
        if (retreats.length > 0) {
            const latest = retreats[0];
            const registrationCount = await Registration.countDocuments({ retreatId: latest._id });
            latestRetreat = {
                year: latest.year,
                type: latest.type,
                count: registrationCount
            };
        }

        const retreatsWithCounts = await Promise.all(
            retreats.map(async (retreat) => {
                const count = await Registration.countDocuments({ retreatId: retreat._id });
                return {
                    year: retreat.year,
                    type: retreat.type,
                    count
                };
            })
        );

        const bestPerformance = retreatsWithCounts.reduce(
            (max, retreat) => (retreat.count > max.count ? retreat : max),
            { year: 0, type: "", count: 0 }
        );

        const currentYear = new Date().getFullYear();
        const currentYearRetreats = await Retreat.find({ year: currentYear }).lean();
        const currentYearRetreatIds = currentYearRetreats.map(r => r._id);
        const currentYearTotal = await Registration.countDocuments({
            retreatId: { $in: currentYearRetreatIds }
        });

        return res.status(200).json({
            totalRetreats,
            latestRetreat,
            bestPerformance: {
                year: bestPerformance.year,
                type: bestPerformance.type,
                count: bestPerformance.count
            },
            currentYearTotal,
            currentYear
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default authMiddleware(handler);