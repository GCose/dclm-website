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
        const { year, type } = req.query;

        await dbConnect();

        interface RetreatFilter {
            year?: number;
            type?: string;
        }

        const filter: RetreatFilter = {};
        if (year) filter.year = parseInt(year as string);
        if (type) filter.type = type as string;

        const retreats = await Retreat.find(filter).lean();
        const retreatIds = retreats.map(r => r._id);

        const registrations = await Registration.find({
            retreatId: { $in: retreatIds }
        }).lean();

        const locationCount: { [key: string]: number } = {};

        registrations.forEach(reg => {
            const location = reg.location || "Unknown";
            locationCount[location] = (locationCount[location] || 0) + 1;
        });

        const distribution = Object.keys(locationCount)
            .map(location => ({
                location,
                count: locationCount[location],
            }))
            .sort((a, b) => b.count - a.count);

        return res.status(200).json({ distribution });
    } catch (error) {
        console.error("Error fetching location distribution:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default authMiddleware(handler);