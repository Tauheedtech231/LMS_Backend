import express from "express";
import { getEngagementByStudent } from "../controllers/engagementController.js";

const router = express.Router();

router.get("/", getEngagementByStudent);

export default router;
