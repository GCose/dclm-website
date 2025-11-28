import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export interface AuthRequest extends NextApiRequest {
    user?: { email: string };
}

export function authMiddleware(
    handler: (req: AuthRequest, res: NextApiResponse) => Promise<void>
) {
    return async (req: AuthRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
            req.user = decoded;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
}