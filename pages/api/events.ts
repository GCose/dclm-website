import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware, AuthRequest } from '@/middleware/auth';
import dbConnect from '@/lib/mongodb';
import Event from '@/model/Event';

async function handler(req: AuthRequest, res: NextApiResponse) {
    try {
        await dbConnect();

        if (req.method === 'GET') {
            const events = await Event.find({});
            return res.status(200).json(events);
        }

        if (req.method === 'POST') {
            const event = await Event.create(req.body);
            return res.status(201).json(event);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch {
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