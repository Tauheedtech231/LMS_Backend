import express from "express";
import { addInstructor, getInstructors, getInstructorWithCoursesById } from "../controllers/instructorController.js";

const router = express.Router();

router.get("/", getInstructors);
router.post("/", addInstructor);
router.get("/:id",getInstructorWithCoursesById)


export default router;
