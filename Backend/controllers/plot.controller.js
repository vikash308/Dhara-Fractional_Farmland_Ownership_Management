import Plot from "../models/plot.model.js";

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
