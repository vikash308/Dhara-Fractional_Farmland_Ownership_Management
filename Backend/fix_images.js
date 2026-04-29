import mongoose from "mongoose";
import dotenv from "dotenv";
import Farm from "./models/farm.model.js";

dotenv.config();

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Checking farm data...");

    const farms = await Farm.find({});
    for (const farm of farms) {
      console.log(`Farm: ${farm.name}, Image: ${farm.images[0]}`);
      // If image is missing or looks like a placeholder that might be broken, update it.
      if (!farm.images || farm.images.length === 0 || farm.images[0] === "" || farm.images[0] === " ") {
         farm.images = ["https://images.unsplash.com/photo-1500382017468-9049fee74a62"];
         await farm.save();
         console.log(`Updated ${farm.name}`);
      }
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fixImages();
