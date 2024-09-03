import express from "express";
import { getAllAlerts } from "../controllers/alertController.js";

const router = express.Router();

router.get("/", getAllAlerts);
// Define other routes similarly...

export default router;
