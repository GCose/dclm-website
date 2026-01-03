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
    role: {
        type: String,
        enum: ['super_admin', 'regional_admin'],
        default: 'regional_admin'
    },
    region: {
        type: String
    }
}, {
    timestamps: true
});

export default models.Admin || model<IAdmin>('Admin', AdminSchema);