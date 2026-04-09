import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use(userRoutes);

const start = async()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");

    app.listen(3000, ()=>{
        console.log("server start on 3000");
    })
}
start();