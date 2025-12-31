import dbConnect from "@/lib/mongodb";
import Retreat from "@/model/Retreat";
import Registration from "@/model/Registration";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const user = await verifyAuth(req);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { year, type } = req.query;

        await dbConnect();

        const filter: any = {};
        if (year) filter.year = parseInt(year as string);
        if (type) filter.type = type as string;

        const retreats = await Retreat.find(filter).lean();
        const retreatIds = retreats.map(r => r._id);

        const registrations = await Registration.find({
            retreatId: { $in: retreatIds }
        }).lean();

        const nationalityCount: { [key: string]: number } = {};

        registrations.forEach(reg => {
            const nationality = reg.nationality || "Unknown";
            nationalityCount[nationality] = (nationalityCount[nationality] || 0) + 1;
        });

        const distribution = Object.keys(nationalityCount)
            .map(nationality => ({
                nationality,
                count: nationalityCount[nationality],
            }))
            .sort((a, b) => b.count - a.count);

        return res.status(200).json({ distribution });
    } catch (error) {
        console.error("Error fetching nationality distribution:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}