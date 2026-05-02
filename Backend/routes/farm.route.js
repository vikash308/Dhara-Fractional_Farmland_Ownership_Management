import express from "express";
import {
    createFarm,
    getAllFarms,
    getFarmDetails,
    getFarmerFarms
} from "../controllers/farm.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkFarmer } from "../middleware/checkRole.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllFarms);
router.get("/details/:id", getFarmDetails);
router.get("/farmer", verifyToken, checkFarmer, getFarmerFarms);
router.post("/", verifyToken, checkFarmer, upload.array("images", 5), createFarm);

export default router;