import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema(
    {
        retreatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Retreat",
            required: true,
        },
        day: {
            type: Number,
            required: true,
            min: 1,
        },
        date: {
            type: Date,
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

attendanceSessionSchema.index({ retreatId: 1, day: 1 });

export default mongoose.models.AttendanceSession ||
    mongoose.model("AttendanceSession", attendanceSessionSchema);