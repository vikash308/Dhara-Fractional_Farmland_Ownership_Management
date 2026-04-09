import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ["user", "farmer", "admin"],
        default: "user"
    },
    phone: {
        type: String,
        required: true
    },
    ownedFarms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farm"
        }
    ],
    bookedPlots: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plot"
        }
    ]
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
export default User;