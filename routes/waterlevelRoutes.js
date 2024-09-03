import express from "express";
const router = express.Router();
import { createWaterLevel } from "../controllers/waterlevelController.js";
// Route untuk mengakses WebSocket

router.post("/", createWaterLevel);

export default router;
