import Admin from "@/model/Admin";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const admin = await Admin.findOne({ email: req.user?.email }).select("-password");
            if (!admin) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json({
                email: admin.email,
            });
        }

        if (req.method === "PUT") {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "Email is required" });
            }

            if (email !== req.user?.email) {
                const existingAdmin = await Admin.findOne({ email });
                if (existingAdmin) {
                    return res.status(400).json({ error: "Email already in use" });
                }
            }

            const admin = await Admin.findOneAndUpdate(
                { email: req.user?.email },
                { email },
                { new: true, runValidators: true }
            ).select("-password");

            if (!admin) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json({
                email: admin.email,
            });
        }

        res.setHeader("Allow", ["GET", "PUT"]);
        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Error in profile API:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default authMiddleware(handler);