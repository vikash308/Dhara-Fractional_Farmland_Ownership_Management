import Farm from "../models/farm.model.js";
import Plot from "../models/plot.model.js";

export const createFarm = async (req, res) => {
  try {
    const farm = await Farm.create({ ...req.body, farmerId: req.user.id });
    res.status(201).json({ success: true, data: farm });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.find().populate("farmerId", "name email");
    res.status(200).json({ success: true, data: farms });
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
