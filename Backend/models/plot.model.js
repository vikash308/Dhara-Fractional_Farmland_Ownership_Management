import mongoose from "mongoose";

const plotSchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
        required: true
    },
    plotNumber: {
        type: String,
        required: true
    },
    size: {
        type: Number, // in Acres
        required: true
    },
    pricePerSeason: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "booked", "maintenance"],
        default: "available"
    },
    currentBooking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        default: null
    }
}, { timestamps: true });

export default mongoose.model("Plot", plotSchema);