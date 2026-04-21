import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Crop from './models/crop.model.js';

dotenv.config();

const crops = [
  {
    name: "Premium Basmati Rice",
    category: "Grains",
    season: "Kharif",
    growthDuration: 120,
    expectedYieldPerAcre: "15-20 Quintals",
    description: "High-quality aromatic rice, perfect for global exports.",
    image: "https://images.unsplash.com/photo-1536679845700-10680a67309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Organic Saffron",
    category: "Other",
    season: "Winter",
    growthDuration: 180,
    expectedYieldPerAcre: "2-3 kg",
    description: "The most expensive spice in the world, grown in high altitudes.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Red Cherry Tomatoes",
    category: "Vegetables",
    season: "All Season",
    growthDuration: 75,
    expectedYieldPerAcre: "10-15 Tons",
    description: "Sweet and juicy cherry tomatoes grown using hydroponics/organic methods.",
    image: "https://images.unsplash.com/photo-1592841608619-61849a21986d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await Crop.deleteMany({});
    await Crop.insertMany(crops);
    console.log("Crops Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
