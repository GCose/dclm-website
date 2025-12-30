import Admin from "@/model/Admin";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await dbConnect();

        if (req.method === "PATCH") {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "Email is required" });
            }

            const existingAdmin = await Admin.findOne({ email, _id: { $ne: id } });
            if (existingAdmin) {
                return res.status(400).json({ error: "Email already in use" });
            }

            const admin = await Admin.findByIdAndUpdate(
                id,
                { email },
                { new: true }
            ).select('-password');

            if (!admin) {
                return res.status(404).json({ error: "Admin not found" });
            }

            return res.status(200).json(admin);
        }

        if (req.method === "DELETE") {
            const adminCount = await Admin.countDocuments({});

            if (adminCount <= 1) {
                return res.status(400).json({ error: "Cannot delete the last admin account" });
            }

            const admin = await Admin.findByIdAndDelete(id);
            if (!admin) {
                return res.status(404).json({ error: "Admin not found" });
            }

            return res.status(200).json({ message: "Admin deleted successfully" });
        }

        res.setHeader("Allow", ["PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Admin API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);