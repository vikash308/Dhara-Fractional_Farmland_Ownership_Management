import { Router } from "express";

import multer from "multer";

import { checkFarmer } from "../middleware/checkRole.js";
import { createLand, getAllLands, getLandById } from "../controllers/land.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-"+file.originalname
        cb(null, uniqueName)
    }
})
const upload = multer({ storage: storage,
    limits:{fieldSize:5*1024*1024} 
 })

router.post("/",verifyToken, checkFarmer,  upload.array("images", 5), createLand);
 router.get("/", getAllLands);
 router.get("/:id", getLandById);

export default router;