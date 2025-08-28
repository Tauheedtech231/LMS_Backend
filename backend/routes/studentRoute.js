import express from 'express';
import { addStudentWithEnrollments, getStudentById, getStudents, getStudentsByCourseId } from '../controllers/studentContoller.js';


const router = express.Router();

router.get('/', getStudents);
router.get('/course/:id', getStudentsByCourseId);
router.get("/:id", getStudentById);

router.post('/', addStudentWithEnrollments); // updated route

export default router;
