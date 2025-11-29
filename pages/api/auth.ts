import { NextApiRequest, NextApiResponse } from 'next';
import { hash, compare } from "bcryptjs"
import admin from '@/model/Admin';
import jwt from "jsonwebtoken"
import dbConnect from '@/lib/mongodb';
import { serialize } from 'cookie';

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

            const user = await admin.findOne({ email })

            if (!user) {
                const hashedPassword = await hash(password, 10)
                await admin.create({ email, password: hashedPassword })
            } else {
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

            const tokenCookie = serialize('dclm_admin_token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30, // 30 days
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