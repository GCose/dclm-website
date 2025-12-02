import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware, AuthRequest } from '@/middleware/auth';
import dbConnect from '@/lib/mongodb';
import Event from '@/model/Event';

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === 'GET') {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 15;
            const skip = (page - 1) * limit;

            const [events, total] = await Promise.all([
                Event.find({})
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                Event.countDocuments({})
            ]);

            const totalPages = Math.ceil(total / limit);

            return res.status(200).json({
                events,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages
                }
            });
        }

        if (req.method === 'POST') {
            const event = await Event.create(req.body);
            return res.status(201).json(event);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Events API Error:', error);
        res.status(500).json({ error: "Server error" });
    }
}

const eventsHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return handler(req as AuthRequest, res);
    }
    return authMiddleware(handler)(req, res);
};

export default eventsHandler;