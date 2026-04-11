import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import landRoutes from './routes/land.route.js'
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/auth",userRoutes);
app.use("/api/lands", landRoutes);

const start = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");

        app.listen(3000, () => {
            console.log("server start on 3000");
        });
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
        process.exit(1);
    }
}
start();