import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import Registration from "@/model/Registration";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await dbConnect();

        if (req.method === "GET") {
            const registration = await Registration.findById(id).populate(
                "retreatId"
            );
            if (!registration) {
                return res.status(404).json({ error: "Registration not found" });
            }
            return res.status(200).json(registration);
        }

        if (req.method === "PATCH") {
            const registration = await Registration.findByIdAndUpdate(
                id,
                { ...req.body, updatedBy: req.user?.email },
                { new: true }
            );
            if (!registration) {
                return res.status(404).json({ error: "Registration not found" });
            }
            return res.status(200).json(registration);
        }

        if (req.method === "DELETE") {
            const registration = await Registration.findByIdAndDelete(id);
            if (!registration) {
                return res.status(404).json({ error: "Registration not found" });
            }
            return res.status(200).json({ message: "Registration deleted" });
        }

        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Registration API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);