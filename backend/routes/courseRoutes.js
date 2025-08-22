import express from "express";
import { addCourse, getCourseById, getCourses } from "../controllers/courseControllers.js";


const router = express.Router();

// GET /api/courses
router.get("/", getCourses);
router.post("/", addCourse);
router.get("/:id", getCourseById);

export default router;
