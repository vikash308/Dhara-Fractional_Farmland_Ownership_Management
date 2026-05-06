import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};
export const signup = async (req,res)=>{
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role === "farmer" ? "farmer" : "user"
        });

        const token = generateToken(user);
        res.status(201).json({
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email & password required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({ message: "ID Token is required" });
        }

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { name, email, picture, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                role: "user" 
            });
        }

        const token = generateToken(user);
        res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                picture
            }
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Google authentication failed" });
    }
}