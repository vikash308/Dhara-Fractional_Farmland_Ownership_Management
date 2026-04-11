import mongoose from "mongoose";

const landSchema = new mongoose.Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        location: {
            state: String,
            district: String, 
        },

        totalArea: {
            type: Number, // acres
            required: true
        },

        soilType: String,
        waterSource: String,

        images: [String],

        status: {
            type: String,
            enum: ["available", "booked", "in-progress", "harvested"],
            default: "available"
        },

        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        currentCrop: {
            cropId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Crop"
            },
            name: String,
            startDate: Date,
            expectedHarvestDate: Date,
            growthStage: String
        },

        resources: {
            waterUsed: {
                type: Number, //how much time give to plant
                default: 0
            },
            fertilizersUsed: {
                type: Number,
                default: 0
            }
        }
    },
    {
        timestamps: true
    }
);

const Land = mongoose.model("Land", landSchema);

export default Land;