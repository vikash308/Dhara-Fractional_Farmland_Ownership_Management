import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";
import Farm from "./models/farm.model.js";
import Plot from "./models/plot.model.js";
import Crop from "./models/crop.model.js";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB... Cleaning old data...");

    // 1. Clear existing data
    await User.deleteMany({});
    await Farm.deleteMany({});
    await Plot.deleteMany({});
    await Crop.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10);

    // 2. Create Farmers
    const farmers = await User.insertMany([
      {
        name: "Ramesh Kumar",
        email: "ramesh@dhara.com",
        password: hashedPassword,
        role: "farmer",
        phone: "9876543210"
      },
      {
        name: "Suresh Kumar",
        email: "suresh@dhara.com",
        password: hashedPassword,
        role: "farmer",
        phone: "9876543211"
      }
    ]);

    // 3. Create Users (Investors)
    const users = await User.insertMany([
      {
        name: "Akash Gupta",
        email: "akash@gmail.com",
        password: hashedPassword,
        role: "user",
        phone: "9999999999"
      },
      {
        name: "Priya Sharma",
        email: "priya@gmail.com",
        password: hashedPassword,
        role: "user",
        phone: "9999999998"
      }
    ]);

    // 4. Create Crops
    const crops = await Crop.insertMany([
      {
        name: "Premium Basmati Rice",
        category: "Grains",
        season: "Kharif",
        growthDuration: 120,
        description: "High-quality aromatic rice.",
        image: "https://images.unsplash.com/photo-1536679845700-10680a67309f"
      },
      {
        name: "Organic Saffron",
        category: "Spices",
        season: "Winter",
        growthDuration: 180,
        description: "Pure Kashmiri Saffron.",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5"
      },
      {
        name: "Alphonso Mango",
        category: "Fruits",
        season: "Summer",
        growthDuration: 90,
        description: "King of Mangoes from Ratnagiri.",
        image: "https://images.unsplash.com/photo-1553134832-d9dca495cae8"
      },
      {
        name: "Baby Spinach",
        category: "Vegetables",
        season: "All Season",
        growthDuration: 45,
        description: "Fresh organic baby spinach.",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb"
      }
    ]);

    // 5. Create Farms for Farmer Ramesh
    const farm1 = await Farm.create({
      farmerId: farmers[0]._id,
      name: "Ramesh Organic Estate",
      location: { address: "Hills Road 4", city: "Pune", state: "Maharashtra" },
      totalArea: 25,
      description: "A premium estate specializing in organic grains.",
      images: ["https://images.unsplash.com/photo-1500382017468-9049fee74a62"],
      soilType: "Black Soil",
      verified: true
    });

    const farm2 = await Farm.create({
      farmerId: farmers[0]._id,
      name: "Sunrise Orchards",
      location: { address: "Beach side 9", city: "Ratnagiri", state: "Maharashtra" },
      totalArea: 15,
      description: "Famous for the best mangoes and seasonal fruits.",
      images: ["https://images.unsplash.com/photo-1595246140625-573b715d11dc"],
      soilType: "Laterite Soil",
      verified: true
    });

    // 6. Create Farms for Farmer Suresh
    const farm3 = await Farm.create({
      farmerId: farmers[1]._id,
      name: "Suresh Green Valley",
      location: { address: "Valley View 1", city: "Shimla", state: "Himachal Pradesh" },
      totalArea: 40,
      description: "High altitude farm perfect for saffron and cold-weather crops.",
      images: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399"],
      soilType: "Mountain Soil",
      verified: true
    });

    // 7. Create Plots for Farm 1
    await Plot.insertMany([
      { farmId: farm1._id, plotNumber: "R1-01", size: 0.5, pricePerSeason: 1500, status: "available" },
      { farmId: farm1._id, plotNumber: "R1-02", size: 0.5, pricePerSeason: 1500, status: "available" },
      { farmId: farm1._id, plotNumber: "R1-03", size: 1.0, pricePerSeason: 2800, status: "available" }
    ]);

    // 8. Create Plots for Farm 2
    await Plot.insertMany([
      { farmId: farm2._id, plotNumber: "M1-A", size: 0.25, pricePerSeason: 800, status: "available" },
      { farmId: farm2._id, plotNumber: "M1-B", size: 0.25, pricePerSeason: 800, status: "available" }
    ]);

    // 9. Create Plots for Farm 3
    await Plot.insertMany([
      { farmId: farm3._id, plotNumber: "SV-01", size: 0.1, pricePerSeason: 2000, status: "available" },
      { farmId: farm3._id, plotNumber: "SV-02", size: 0.1, pricePerSeason: 2000, status: "available" },
      { farmId: farm3._id, plotNumber: "SV-03", size: 0.2, pricePerSeason: 3800, status: "available" }
    ]);

    console.log("Database Seeded Successfully! 🚜🌱");
    console.log("Credentials:");
    console.log("Farmers: ramesh@dhara.com, suresh@dhara.com (Pass: password123)");
    console.log("Users: akash@gmail.com, priya@gmail.com (Pass: password123)");
    
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
