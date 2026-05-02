import Farm from "../models/farm.model.js";
import Plot from "../models/plot.model.js";

export const createFarm = async (req, res) => {
    try {
        const images = req.files ? req.files.map(file => file.path.replace(/\\/g, "/")) : [];

        let location = req.body.location;
        if (typeof location === 'string') {
            try {
                location = JSON.parse(location);
            } catch (e) {
                return res.status(400).json({ success: false, message: "Invalid location format" });
            }
        }

        const farmData = {
            ...req.body,
            location,
            images,
            farmerId: req.user.id
        };

        const farm = await Farm.create(farmData);
        res.status(201).json({ success: true, data: farm });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllFarms = async (req, res) => {
    try {
        const farms = await Farm.find().populate("farmerId", "name email");

        
        const farmsWithPrice = await Promise.all(farms.map(async (farm) => {
            const plots = await Plot.find({ farmId: farm._id });
            const minPrice = plots.length > 0 ? Math.min(...plots.map(p => p.pricePerSeason)) : null;
            const farmObj = farm.toObject();
            farmObj.startingPrice = minPrice;
            return farmObj;
        }));

        res.status(200).json({ success: true, data: farmsWithPrice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFarmDetails = async (req, res) => {
    try {
        const farm = await Farm.findById(req.params.id).populate("farmerId", "name email");
        if (!farm) return res.status(404).json({ success: false, message: "Farm not found" });

        const plots = await Plot.find({ farmId: farm._id });
        res.status(200).json({ success: true, data: { farm, plots } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFarmerFarms = async (req, res) => {
    try {
        const farms = await Farm.find({ farmerId: req.user.id });
        res.status(200).json({ success: true, data: farms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};