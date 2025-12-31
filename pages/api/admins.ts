import Admin from "@/model/Admin";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await dbConnect();

        if (req.method === "GET") {
            if (id) {
                const admin = await Admin.findById(id).select("-password");
                if (!admin) {
                    return res.status(404).json({ error: "Admin not found" });
                }
                return res.status(200).json(admin);
            } else {
                const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
                return res.status(200).json({ admins });
            }
        }

        if (req.method === "PATCH") {
            const { name, email } = req.body;

            if (!name || !email) {
                return res.status(400).json({ error: "Name and email are required" });
            }

            const existingAdmin = await Admin.findOne({ email, _id: { $ne: id } });
            if (existingAdmin) {
                return res.status(400).json({ error: "Email already in use" });
            }

            const admin = await Admin.findByIdAndUpdate(
                id,
                { name, email },
                { new: true, runValidators: true }
            ).select("-password");

            if (!admin) {
                return res.status(404).json({ error: "Admin not found" });
            }

            return res.status(200).json(admin);
        }

        if (req.method === "DELETE") {
            const admin = await Admin.findByIdAndDelete(id);
            if (!admin) {
                return res.status(404).json({ error: "Admin not found" });
            }
            return res.status(200).json({ message: "Admin deleted successfully" });
        }

        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Error in admins API:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default authMiddleware(handler);