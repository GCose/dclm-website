import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AttendanceSession",
            required: true,
        },
        adultsMale: {
            type: Number,
            default: 0,
            min: 0,
        },
        adultsFemale: {
            type: Number,
            default: 0,
            min: 0,
        },
        youthMale: {
            type: Number,
            default: 0,
            min: 0,
        },
        youthFemale: {
            type: Number,
            default: 0,
            min: 0,
        },
        childrenMale: {
            type: Number,
            default: 0,
            min: 0,
        },
        childrenFemale: {
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
    this.total =
        this.adultsMale +
        this.adultsFemale +
        this.youthMale +
        this.youthFemale +
        this.childrenMale +
        this.childrenFemale;
});

export default mongoose.models.AttendanceRecord ||
    mongoose.model("AttendanceRecord", attendanceRecordSchema);