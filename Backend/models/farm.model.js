import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
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
        address: String,
        city: String,
        state: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    totalArea: Number, // in Acres
    description: String,
    images: [String],
    amenities: [String],
    soilType: String,
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Farm", farmSchema);