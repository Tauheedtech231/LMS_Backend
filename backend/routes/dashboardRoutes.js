import express from "express";
import { getStudents, getCourses, getEngagement } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/students", getStudents);
router.get("/courses", getCourses);
router.get("/engagement", getEngagement);

export default router;
