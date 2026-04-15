import Land from "../models/land.model.js";
import User from "../models/user.model.js";


export const getAllLands = async (req,res) =>{
    try {
        const lands = await Land.find({status: "available"}).populate("farmerId", "name email phone");

        res.status(200).json(lands);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getLandById = async (req, res) =>{
    try {
        const land = await Land.findById(req.params.id)
            .populate("farmerId", "name email")
            .populate("bookedBy", "name email");

        if (!land) {
            return res.status(404).json({ message: "Land not found" });
        }

        res.status(200).json(land);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createLand = async (req, res) => {
    try {
        const { name, location, totalArea, soilType, waterSource} = req.body;

        const imagePaths = req.files ? req.files.map(file => file.path) : [];
        
        const land = await Land.create({
            farmerId: req.user.id,
            name,
            location,
            totalArea,
            soilType,
            waterSource,
            images: imagePaths
        });

        res.status(201).json({
            message: "Land created successfully",
            land
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
