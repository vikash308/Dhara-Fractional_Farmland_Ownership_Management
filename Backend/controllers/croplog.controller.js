import CropLog from "../models/croplog.model.js";
import Booking from "../models/booking.model.js";

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