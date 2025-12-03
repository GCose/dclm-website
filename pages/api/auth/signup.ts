import { hash } from "bcryptjs"
import admin from '@/model/Admin';
import dbConnect from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            })
        }

        try {
            await dbConnect();

            const existingAdmin = await admin.findOne({ email })

            if (existingAdmin) {
                return res.status(400).json({
                    error: "Admin account already exists"
                })
            }

            const adminCount = await admin.countDocuments({});
            if (adminCount > 0) {
                return res.status(403).json({
                    error: "Admin account already exists. Contact system administrator."
                })
            }

            const hashedPassword = await hash(password, 10)
            await admin.create({ email, password: hashedPassword })

            return res.status(201).json({
                success: true,
                message: 'Admin account created successfully'
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}