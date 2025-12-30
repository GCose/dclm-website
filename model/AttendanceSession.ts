import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema(
    {
        retreatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Retreat",
            required: true,
        },
        category: {
            type: String,
            enum: ["Adult", "Youth", "Campus", "Children"],
            required: true,
        },
        sessionNumber: {
            type: Number,
            required: true,
            min: 1,
        },
        day: {
            type: Number,
            required: true,
            min: 1,
        },
        date: {
            type: String,
            required: true,
        },
        sessionName: {
            type: String,
            required: true,
        },
        sessionTime: {
            type: String,
            required: true,
        },
        isGSMessage: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

attendanceSessionSchema.index({ retreatId: 1, category: 1, day: 1 });

export default mongoose.models.AttendanceSession ||
    mongoose.model("AttendanceSession", attendanceSessionSchema);