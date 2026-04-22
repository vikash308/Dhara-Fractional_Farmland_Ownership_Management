import Booking from "../models/booking.model.js";
import Plot from "../models/plot.model.js";
import Farm from "../models/farm.model.js";

export const createBooking = async (req, res) => {
  try {
    const { plotId, farmId, totalPrice, startDate, endDate } = req.body;
    
    // Check if plot is already booked
    const plot = await Plot.findById(plotId);
    if (!plot || plot.status !== "available") {
      return res.status(400).json({ success: false, message: "Plot is not available" });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      plotId,
      farmId,
      totalPrice,
      startDate,
      endDate
    });

    // Update plot status
    plot.status = "booked";
    plot.currentBooking = booking._id;
    await plot.save();

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("farmId")
      .populate("plotId")
      .populate("selectedCrop.cropId");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getFarmerBookings = async (req, res) => {
  try {
    // 1. Find all farms owned by this farmer
    const farms = await Farm.find({ farmerId: req.user.id });
    const farmIds = farms.map(f => f._id);

    // 2. Find all bookings for these farms
    const bookings = await Booking.find({ farmId: { $in: farmIds } })
      .populate("userId", "name email")
      .populate("farmId", "name")
      .populate("plotId");
      
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
