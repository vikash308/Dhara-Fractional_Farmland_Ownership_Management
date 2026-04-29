import express from "express";
import { addCropLog, getCropLogs } from "../controllers/croplog.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkFarmer } from "../middleware/checkRole.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", checkFarmer, upload.single("image"), addCropLog);
router.get("/:bookingId", getCropLogs);

export default router;
