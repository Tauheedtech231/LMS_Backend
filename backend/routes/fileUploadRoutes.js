import express from 'express';
import {
  upload,
  uploadCourseMaterial,
  getCourseMaterials,
  deleteCourseMaterial,
  getUploadProgress,
  uploadAssignmentSubmission,
  getUploadStatistics
} from '../controllers/fileUploadController.js';

const router = express.Router();

// Upload course material (videos, documents)
router.post('/course-material', upload.single('file'), uploadCourseMaterial);

// Get course materials
router.get('/course-materials/:courseId', getCourseMaterials);

// Delete course material
router.delete('/course-material/:materialId', deleteCourseMaterial);

// Get upload progress for instructor
router.get('/progress/:instructorId', getUploadProgress);

// Upload assignment submission (for students)
router.post('/assignment-submission', upload.single('file'), uploadAssignmentSubmission);

// Get upload statistics
router.get('/statistics/:instructorId', getUploadStatistics);

export default router;