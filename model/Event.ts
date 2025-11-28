import { IEvent } from '@/types';
import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    venue: { type: String, required: true },
    image: { type: String, required: true },
    description: {
        type: String,
        required: false
    },
    date: { type: Date, required: true },
});
export default models.Event || model<IEvent>('Event', EventSchema);