// routes/moduleRoutes.js

import express from 'express';
import { getStudentCourses } from '../controllers/moduleControllers.js'
;

const router = express.Router();

// Get courses and modules for a student
router.get('/:studentId', getStudentCourses);

export default router;
