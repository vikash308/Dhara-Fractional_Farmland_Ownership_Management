import Plot from "../models/plot.model.js";
import Farm from "../models/farm.model.js";

export const addPlotToFarm = async (req, res) => {
  try {
    const plot = await Plot.create(req.body);
    res.status(201).json({ success: true, data: plot });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPlotsByFarm = async (req, res) => {
  try {
    const plots = await Plot.find({ farmId: req.params.farmId });
    res.status(200).json({ success: true, data: plots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFarmerPlots = async (req, res) => {
  try {
    // 1. Get all farms of this farmer
    const farms = await Farm.find({ farmerId: req.user.id });
    const farmIds = farms.map(f => f._id);
    
    // 2. Get all plots for these farms
    const plots = await Plot.find({ farmId: { $in: farmIds } }).populate("farmId", "name");
    res.status(200).json({ success: true, data: plots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePlotStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const plot = await Plot.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );
    if (!plot) return res.status(404).json({ success: false, message: "Plot not found" });
    res.status(200).json({ success: true, data: plot });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
