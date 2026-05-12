import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Grains, Vegetables, Fruits, etc.
  season: { type: String, required: true }, // Kharif, Rabi, Zaid
  growthDuration: { type: Number, required: true }, // in days
  expectedYieldPerAcre: String,
  description: String,
  image: String
}, { timestamps: true });

export default mongoose.model("Crop", cropSchema);
