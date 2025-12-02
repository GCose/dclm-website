import { NextApiResponse } from 'next';
import { authMiddleware, AuthRequest } from '@/middleware/auth';

async function handler(req: AuthRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return res.status(200).json({
            authenticated: true,
            user: req.user
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default authMiddleware(handler);