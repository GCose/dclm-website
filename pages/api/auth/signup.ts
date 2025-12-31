import bcrypt from "bcryptjs";
import Admin from "@/model/Admin";
import dbConnect from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        await dbConnect();

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
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Admin created successfully",
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}