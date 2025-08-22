import express from "express";
import { addCourse, getCourses } from "../controllers/courseControllers.js";


const router = express.Router();

// GET /api/courses
router.get("/", getCourses);
router.post("/", addCourse);

export default router;
