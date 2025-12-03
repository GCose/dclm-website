import jwt from "jsonwebtoken"
import { compare } from "bcryptjs"
import admin from '@/model/Admin';
import { serialize } from 'cookie';
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

            const user = await admin.findOne({ email })

            if (!user) {
                return res.status(401).json({
                    error: "Invalid credentials"
                })
            }

            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    error: "Invalid credentials"
                })
            }

            const accessToken = jwt.sign(
                { email },
                process.env.JWT_SECRET!,
                { expiresIn: '30d' }
            );

            const tokenCookie = serialize('dclm_admin_token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'strict',
                path: '/',
            });

            res.setHeader('Set-Cookie', tokenCookie);

            return res.status(200).json({
                success: true,
                message: 'Authenticated'
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