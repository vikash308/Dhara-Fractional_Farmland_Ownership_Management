import CropLog from "../models/croplog.model.js";
import Booking from "../models/booking.model.js";
import { v2 as cloudinary } from 'cloudinary';

export const addCropLog = async (req, res) => {
  try {
    const image = req.file ? req.file.path.replace(/\\/g, "/") : req.body.image;
    const { bookingId, title, description, growthStage, healthStatus, fertilizer, water } = req.body;
    
    const log = await CropLog.create({
      bookingId,
      title,
      description,
      image,
      growthStage,
      healthStatus,
      fertilizer,
      water,
      date: new Date()
    });

    // Update booking status if needed
    if (growthStage === "Harvested") {
      await Booking.findByIdAndUpdate(bookingId, { "selectedCrop.status": "harvested" });
    } else {
      await Booking.findByIdAndUpdate(bookingId, { "selectedCrop.status": "growing" });
    }

    res.status(201).json({ success: true, data: log });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCropLogs = async (req, res) => {
  try {
    const logs = await CropLog.find({ bookingId: req.params.bookingId }).sort("-date");
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCropLog = async (req, res) => {
  try {
    const log = await CropLog.findById(req.params.id);
    if (!log) return res.status(404).json({ success: false, message: "Log entry not found" });

    let updatedData = { ...req.body };

    // If new image is uploaded, delete the old one from Cloudinary
    if (req.file) {
      if (log.image && log.image.includes("cloudinary.com")) {
        try {
          // Extract public_id: format is .../upload/v12345/dhara/public_id.jpg
          const parts = log.image.split('/');
          const folderAndFile = parts.slice(-2).join('/'); // "dhara/filename.jpg"
          const publicId = folderAndFile.split('.')[0]; // "dhara/filename"
          await cloudinary.uploader.destroy(publicId);
        } catch (delError) {
          console.error("Cloudinary Delete Error:", delError);
        }
      }
      updatedData.image = req.file.path.replace(/\\/g, "/");
    }

    const updatedLog = await CropLog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    // Sync booking status if growth stage changed
    if (updatedData.growthStage) {
      if (updatedData.growthStage === "Harvested") {
        await Booking.findByIdAndUpdate(log.bookingId, { "selectedCrop.status": "harvested" });
      } else {
        await Booking.findByIdAndUpdate(log.bookingId, { "selectedCrop.status": "growing" });
      }
    }

    res.status(200).json({ success: true, data: updatedLog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
