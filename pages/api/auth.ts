import jwt from "jsonwebtoken"
import { config } from "dotenv"
import admin from '@/model/Admin';
import dbConnect from '@/lib/mongodb';
import { hash, compare } from "bcryptjs"
import { NextApiRequest, NextApiResponse } from 'next';

config()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Fill up the inputs please."
            })
        }

        try {
            await dbConnect();

            const user = await admin.findOne({
                email
            })

            if (!user) {
                const hashedPassword = await hash(password, 10)

                await admin.create({
                    email,
                    password: hashedPassword
                })

            }

            else {
                const isPasswordValid = await compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(400).json({
                        error: "Invalid Credentials"
                    })
                }


            }

            const accessToken = jwt.sign(
                { email },
                process.env.JWT_SECRET!,
                { expiresIn: '30d' }
            );

            return res.status(200).json({
                token: accessToken
            })
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
