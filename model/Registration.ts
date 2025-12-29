import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
    {
        retreatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Retreat",
            required: true,
        },
        registrationDate: {
            type: Date,
            default: Date.now,
        },
        dayRegistered: {
            type: Number,
            required: true,
            min: 1,
        },
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        category: {
            type: String,
            enum: ["Adult", "Campus", "Youth", "Children"],
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        nationality: {
            type: String,
            required: true,
        },
        invitedBy: {
            type: String,
            enum: ["Invited", "Member", "Worker"],
            required: true,
        },
        age: {
            type: Number,
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

registrationSchema.index({ retreatId: 1 });

export default mongoose.models.Registration ||
    mongoose.model("Registration", registrationSchema);