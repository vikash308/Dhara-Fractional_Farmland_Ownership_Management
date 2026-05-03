import express from "express";
import { getAllCrops, createCrop } from "../controllers/crop.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkFarmer } from "../middleware/checkRole.js";

const router = express.Router();

router.get("/", getAllCrops);
router.post("/", verifyToken, checkFarmer, createCrop);

export default router;