import Event from '@/model/Event';
import dbConnect from '@/lib/mongodb';
import { NextApiResponse } from 'next';
import { authMiddleware, AuthRequest } from '@/middleware/auth';

async function handler(req: AuthRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await dbConnect();

        if (req.method === 'GET') {
            const event = await Event.findById(id);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }
            return res.status(200).json(event);
        }

        if (req.method === 'PATCH') {
            const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }
            return res.status(200).json(event);
        }

        if (req.method === 'DELETE') {
            const event = await Event.findByIdAndDelete(id);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }
            return res.status(200).json({ message: 'Event deleted' });
        }

        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export default authMiddleware(handler);