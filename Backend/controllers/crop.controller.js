import Crop from "../models/crop.model.js";

export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.status(200).json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCrop = async (req, res) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json({ success: true, data: crop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
