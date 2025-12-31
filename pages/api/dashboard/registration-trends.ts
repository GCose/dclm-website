import dbConnect from "@/lib/mongodb";
import Retreat from "@/model/Retreat";
import Registration from "@/model/Registration";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        await dbConnect();

        const retreats = await Retreat.find().sort({ year: 1 }).lean();

        const trendData: { [year: number]: { Easter: number; December: number } } = {};

        for (const retreat of retreats) {
            if (!trendData[retreat.year]) {
                trendData[retreat.year] = { Easter: 0, December: 0 };
            }

            const count = await Registration.countDocuments({ retreatId: retreat._id });
            trendData[retreat.year][retreat.type as "Easter" | "December"] = count;
        }

        const trends = Object.keys(trendData)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((year) => ({
                year: parseInt(year),
                Easter: trendData[parseInt(year)].Easter,
                December: trendData[parseInt(year)].December,
            }));

        return res.status(200).json({ trends });
    } catch (error) {
        console.error("Error fetching registration trends:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default authMiddleware(handler);