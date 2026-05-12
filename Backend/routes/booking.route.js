import express from "express";
import { 
  createBooking, 
  getMyBookings, 
  getFarmerBookings, 
  updateBookingStatus 
} from "../controllers/booking.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createBooking);
router.get("/my", getMyBookings);
router.get("/farmer", getFarmerBookings);
router.patch("/:id", updateBookingStatus);

export default router;
