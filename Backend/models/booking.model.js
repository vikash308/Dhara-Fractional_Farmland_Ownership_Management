import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    plotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plot",
        required: true
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
        required: true
    },
    selectedCrop: {
        cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
        name: String,
        status: { type: String, default: "planned" } 
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "active", "completed", "cancelled"],
        default: "pending"
    },
    totalPrice: Number,
    startDate: Date,
    endDate: Date,
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid"
    }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);