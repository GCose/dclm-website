import bcrypt from "bcryptjs";
import Admin from "@/model/Admin";
import dbConnect from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { authMiddleware, AuthRequest } from "@/middleware/auth";

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
            return res.status(200).json({ admins });
        }

        if (req.method === "POST") {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "Name, email and password are required" });
            }

            if (password.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters" });
            }

            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ error: "Email already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const admin = await Admin.create({
                name,
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                message: "Admin created successfully",
                admin: {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email
                }
            });
        }

        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: unknown) {
        console.error("Admins API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);