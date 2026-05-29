import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import farmRoutes from './routes/farm.route.js';
import plotRoutes from './routes/plot.route.js';
import bookingRoutes from './routes/booking.route.js';
import cropRoutes from './routes/crop.route.js';
import cropLogRoutes from './routes/croplog.route.js';
import path from "path";

dotenv.config();
const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://dhara-frontend-8b49.onrender.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Test Route
app.get("/api/test", (req, res) => res.json({ message: "Nodemon is definitely working now!" }));

// API Routes
app.use("/api/auth", userRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/plots", plotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/crop-logs", cropLogRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(`server start on ${PORT}`);
    });
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
}
start();