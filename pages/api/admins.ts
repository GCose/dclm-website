import Admin from "@/model/Admin";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 });
            return res.status(200).json({ admins });
        }

        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Admins API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);