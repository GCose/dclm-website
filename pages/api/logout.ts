import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const tokenCookie = serialize('dclm_admin_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: -1,
            sameSite: 'strict',
            path: '/',
        });

        res.setHeader('Set-Cookie', tokenCookie);

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}