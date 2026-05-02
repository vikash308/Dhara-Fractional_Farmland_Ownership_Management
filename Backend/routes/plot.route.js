import express from "express";
import { addPlotToFarm, getPlotsByFarm, getFarmerPlots, updatePlotStatus } from "../controllers/plot.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkFarmer } from "../middleware/checkRole.js";

const router = express.Router();

router.get("/farmer", verifyToken, checkFarmer, getFarmerPlots);
router.get("/:farmId", getPlotsByFarm);
router.post("/", verifyToken, checkFarmer, addPlotToFarm);
router.patch("/status/:id", verifyToken, checkFarmer, updatePlotStatus);

export default router;