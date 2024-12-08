import express from "express";
const router = express.Router();
import { createWaterLevel, getDataToModel } from "../controllers/waterlevelController.js";
// Route untuk mengakses WebSocket

router.post("/", createWaterLevel);
router.get("/get-data/:id", getDataToModel);

export default router;
