import { IAdmin } from '@/types';
import { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema<IAdmin>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export default models.Admin || model<IAdmin>('Admin', AdminSchema);