import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import Registration from "@/model/Registration";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const { retreatId } = req.query;

            if (retreatId) {
                const registrations = await Registration.find({ retreatId }).sort({
                    registrationDate: -1,
                });
                return res.status(200).json({ registrations });
            }

            const registrations = await Registration.find({})
                .populate("retreatId")
                .sort({ registrationDate: -1 });
            return res.status(200).json({ registrations });
        }

        if (req.method === "POST") {
            const registration = await Registration.create({
                ...req.body,
                createdBy: req.user?.email,
            });
            return res.status(201).json(registration);
        }

        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Registrations API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);