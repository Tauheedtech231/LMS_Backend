import express from 'express';
import { supabase } from '../db/supabase.js';
import {
  getInstructorAssignments,
  getAssignmentById,
  createAssignment,
  getAssignmentSubmissions,
  gradeAssignment,
  getStudentPerformance,
  getAssignmentAnalytics,
  updateAssignment,
  deleteAssignment,
  getAssignments
} from '../controllers/assignmentController.js';

const router = express.Router();

// Get all assignments for a student
// router.get('/student/:studentId', async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from('assignments')
//       .select(`
//         *,
//         courses:course_id (title),
//         submission:assignment_submissions!left (*, grade:assignment_grades(*))
//       `)
//       .eq('assignment_submissions.student_id', req.params.studentId);

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching student assignments:', error);
//     res.status(500).json({ error: 'Failed to fetch assignments' });
//   }
// });

// Get all assignments for an instructor
router.get('/instructor/:instructorId', getInstructorAssignments);

// Get single assignment by ID with student submission data
// router.get('/:assignmentId', async (req, res) => {
//   try {
//     console.log("ya call",req.params.assignmentId)
//     const { studentId } = req.query;
//     const { data, error } = await supabase
//       .from('assignments')
//       .select(`
//         *,
//         courses:course_id (title),
//         submission:assignment_submissions!left (*, grade:assignment_grades(*))
//       `)
//       .eq('id', req.params.assignmentId)
//       .eq('assignment_submissions.student_id', studentId)
//       .single();

//     if (error) throw error;
//     if (!data) {
//       return res.status(404).json({ error: 'Assignment not found' });
//     }
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching assignment:', error);
//     res.status(500).json({ error: 'Failed to fetch assignment' });
//   }
// });

// Create new assignment
router.post('/', createAssignment);
router.get('/:assignmentId',getAssignmentById)
// Get assignment submissions for grading
router.get('/:assignmentId/submissions', getAssignmentSubmissions);

// Grade assignment submission
router.post('/submissions/:submissionId/grade', gradeAssignment);

// Grade assignment (alternative endpoint for frontend compatibility)
router.post('/:assignmentId/grade', gradeAssignment);

// Get student performance for a course
router.get('/performance/:courseId/:instructorId', getStudentPerformance);

// Get assignment analytics
router.get('/:assignmentId/analytics', getAssignmentAnalytics);

// Update assignment
router.put('/:assignmentId', updateAssignment);

// Delete assignment
router.delete('/:assignmentId', deleteAssignment);
router.get('/',getAssignments)




export default router;