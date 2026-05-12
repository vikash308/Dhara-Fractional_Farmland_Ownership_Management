import mongoose from "mongoose";

const cropLogSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  title: { type: String, required: true },
  description: String,
  image: String,
  growthStage: {
    type: String,
    enum: ["Sowing", "Seedling", "Vegetative", "Flowering", "Fruiting", "Harvested"],
    default: "Sowing"
  },
  healthStatus: {
    type: String,
    enum: ["Excellent", "Good", "Fair", "Poor"],
    default: "Good"
  },
  fertilizer: { type: String, default: "None" },
  water: { type: String, default: "Normal" },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("CropLog", cropLogSchema);
