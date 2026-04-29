import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";
import Farm from "./models/farm.model.js";
import Plot from "./models/plot.model.js";
import Crop from "./models/crop.model.js";
import Booking from "./models/booking.model.js";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB... Cleaning old data...");

    await User.deleteMany({});
    await Farm.deleteMany({});
    await Plot.deleteMany({});
    await Crop.deleteMany({});
    await Booking.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10);

    // 1. Create Farmers (10)
    const farmerNames = ["Ramesh Kumar", "Suresh Kumar", "Mahesh Singh", "Rajesh Khanna", "Amit Patel", "Vijay Yadav", "Sanjay Gupta", "Anil Sharma", "Sunil Verma", "Karan Johar"];
    const farmers = await User.insertMany(farmerNames.map((name, i) => ({
      name,
      email: `farmer${i+1}@dhara.com`,
      password: hashedPassword,
      role: "farmer",
      phone: `987654321${i}`
    })));

    // 2. Create Investors (20)
    const investorNames = ["Akash Gupta", "Priya Sharma", "Rahul Verma", "Sneha Rao", "Vikram Seth", "Anjali Nair", "Rohan Joshi", "Megha Kapoor", "Deepak Dass", "Ishita Roy", "Kunal Shah", "Tanvi Jain", "Arjun Reddy", "Pooja Hegde", "Siddharth Malhotra", "Kiara Advani", "Varun Dhawan", "Alia Bhatt", "Ranbir Kapoor", "Kareena Khan"];
    const investors = await User.insertMany(investorNames.map((name, i) => ({
      name,
      email: `user${i+1}@gmail.com`,
      password: hashedPassword,
      role: "user",
      phone: `99999999${i < 10 ? '0'+i : i}`
    })));

    // 3. Create Crops
    const cropData = [
      { name: "Premium Basmati Rice", category: "Grains", season: "Kharif", growthDuration: 120, description: "Aromatic long-grain rice.", image: "https://images.unsplash.com/photo-1536679845700-10680a67309f" },
      { name: "Organic Saffron", category: "Spices", season: "Winter", growthDuration: 180, description: "Pure Kashmiri Saffron.", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5" },
      { name: "Alphonso Mango", category: "Fruits", season: "Summer", growthDuration: 90, description: "King of Mangoes.", image: "https://images.unsplash.com/photo-1553134832-d9dca495cae8" },
      { name: "Baby Spinach", category: "Vegetables", season: "All Season", growthDuration: 45, description: "Fresh baby spinach.", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb" },
      { name: "Golden Wheat", category: "Grains", season: "Rabi", growthDuration: 110, description: "High-protein wheat.", image: "https://images.unsplash.com/photo-1501431821157-a737a1112441" },
      { name: "Red Tomatoes", category: "Vegetables", season: "Summer", growthDuration: 60, description: "Juicy organic tomatoes.", image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31" }
    ];
    const crops = await Crop.insertMany(cropData);

    // 4. Create Farms (15)
    const farmNames = [
      "Ramesh Organic Estate", "Sunrise Orchards", "Suresh Green Valley", "Narmada River Farm", "Himalayan View Plantation",
      "Golden Acres", "Patel Dairy & Farm", "Yadav Organic Hub", "Gupta Spice Garden", "Sharma Wheat Fields",
      "Verma Fruit Kingdom", "Johar Vineyard", "Singh Millet Farm", "Khanna Pulse Estate", "The Green Canopy"
    ];
    const locations = [
      { city: "Pune", state: "Maharashtra" }, { city: "Ratnagiri", state: "Maharashtra" }, { city: "Shimla", state: "Himachal Pradesh" },
      { city: "Indore", state: "Madhya Pradesh" }, { city: "Manali", state: "Himachal Pradesh" }, { city: "Nashik", state: "Maharashtra" },
      { city: "Anand", state: "Gujarat" }, { city: "Lucknow", state: "Uttar Pradesh" }, { city: "Kochi", state: "Kerala" },
      { city: "Amritsar", state: "Punjab" }, { city: "Nagpur", state: "Maharashtra" }, { city: "Bangalore", state: "Karnataka" },
      { city: "Jaipur", state: "Rajasthan" }, { city: "Bhopal", state: "Madhya Pradesh" }, { city: "Hyderabad", state: "Telangana" }
    ];

    const farmImages = [
      "https://images.unsplash.com/photo-1500382017468-9049fee74a62", "https://images.unsplash.com/photo-1595246140625-573b715d11dc",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399", "https://images.unsplash.com/photo-1502462041640-b3d7e50d0662",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2", "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad"
    ];

    const createdFarms = await Farm.insertMany(farmNames.map((name, i) => ({
      farmerId: farmers[i % 10]._id,
      name,
      location: { address: `Road ${i+1}, Sector ${i%5}`, ...locations[i] },
      totalArea: 20 + (i * 5),
      description: `A beautiful managed farm in ${locations[i].city} specialized in diverse crops.`,
      images: [farmImages[i % farmImages.length]],
      soilType: i % 2 === 0 ? "Black Soil" : "Laterite Soil",
      verified: true
    })));

    // 5. Create Plots (5 per farm = 75 plots)
    const plots = [];
    for (const farm of createdFarms) {
      for (let j = 1; j <= 5; j++) {
        plots.push({
          farmId: farm._id,
          plotNumber: `${farm.name.split(' ')[0].toUpperCase()}-${j}`,
          size: 0.25 * j,
          pricePerSeason: 1000 + (j * 500),
          status: j <= 2 ? "booked" : "available"
        });
      }
    }
    const createdPlots = await Plot.insertMany(plots);

    // 6. Create Bookings (30+)
    const bookings = [];
    const bookedPlots = createdPlots.filter(p => p.status === "booked");
    
    for (let k = 0; k < Math.min(bookedPlots.length, 30); k++) {
      const plot = bookedPlots[k];
      const investor = investors[k % 20];
      const crop = crops[k % crops.length];
      
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - (k % 4)); // Some bookings started months ago
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 6);

      bookings.push({
        userId: investor._id,
        farmId: plot.farmId,
        plotId: plot._id,
        totalPrice: plot.pricePerSeason,
        startDate,
        endDate,
        status: k % 5 === 0 ? "pending" : "active",
        selectedCrop: {
          cropId: crop._id,
          name: crop.name,
          status: k % 3 === 0 ? "growing" : (k % 4 === 0 ? "harvested" : "planned")
        }
      });
    }
    await Booking.insertMany(bookings);

    console.log("Large Dataset Seeded Successfully! 🚜🌱📈");
    console.log(`Summary: ${farmers.length} Farmers, ${investors.length} Investors, ${createdFarms.length} Farms, ${createdPlots.length} Plots, 30 Bookings.`);
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
