import mongoose from "mongoose";

const retreatSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["Easter", "December"],
            required: true,
        },
        status: {
            type: String,
            enum: ["ongoing", "completed"],
            default: "ongoing",
        },
        totalDays: {
            type: Number,
            required: true,
            min: 1,
        },
        dateFrom: {
            type: Date,
            required: true,
        },
        dateTo: {
            type: Date,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        theme: {
            type: String,
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

retreatSchema.index({ year: 1, type: 1 }, { unique: true });

export default mongoose.models.Retreat ||
    mongoose.model("Retreat", retreatSchema);