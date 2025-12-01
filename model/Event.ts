import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        dateFrom: {
            type: Date,
            required: true,
        },
        dateTo: {
            type: Date,
        },
        timeFrom: {
            type: String,
            required: true,
        },
        timeTo: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);