import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AttendanceSession",
            required: true,
        },
        male: {
            type: Number,
            default: 0,
            min: 0,
        },
        female: {
            type: Number,
            default: 0,
            min: 0,
        },
        total: {
            type: Number,
            default: 0,
            min: 0,
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

attendanceRecordSchema.index({ sessionId: 1 }, { unique: true });

attendanceRecordSchema.pre("save", function () {
    this.total = this.male + this.female;
});

export default mongoose.models.AttendanceRecord ||
    mongoose.model("AttendanceRecord", attendanceRecordSchema);