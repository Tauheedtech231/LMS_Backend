import express from 'express';
import { getStudentProgress } from '../controllers/studentProgressController.js';

const router = express.Router();

// GET progress for a student in a course
router.get('/:studentId/:courseId', getStudentProgress);

export default router;
