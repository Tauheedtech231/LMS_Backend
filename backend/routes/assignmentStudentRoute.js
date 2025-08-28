import express from 'express';
import multer from 'multer';
import { checkSubmissionStatus, getAssignmentGrade, getCourseAssignmentsWithStatus, submitAssignment } from '../controllers/assignmentforStudent.js';


const router = express.Router();

// GET /api/assignments/status?assignmentId=1&studentId=5
router.get('/status', checkSubmissionStatus);
// // POST /api/assignments/submit
// router.post('/submit', submitAssignment);
const upload = multer({ storage: multer.memoryStorage() });

router.post('/submit', upload.single('file'), submitAssignment);
// GET /api/assignments/grade?assignmentId=1&studentId=5
router.get('/grade', getAssignmentGrade);

// GET /api/assignments/course?courseId=1&studentId=5
router.get('/course', getCourseAssignmentsWithStatus);


export default router;
