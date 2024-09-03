import express from "express";
import { createSensor, getAllSensors, getSensor, updateSensor, deleteSensor } from "../controllers/sensorController.js";

const router = express.Router();


router.get("/", getAllSensors);
router.get("/:id", getSensor);
router.post("/", createSensor);
router.put("/:id", updateSensor);
router.delete("/:id", deleteSensor);

export default router;
