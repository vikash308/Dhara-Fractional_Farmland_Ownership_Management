import express from "express";
import { addPlotToFarm, getPlotsByFarm } from "../controllers/plot.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkFarmer } from "../middleware/checkRole.js";

const router = express.Router();

router.get("/:farmId", getPlotsByFarm);
router.post("/", verifyToken, checkFarmer, addPlotToFarm);

export default router;
