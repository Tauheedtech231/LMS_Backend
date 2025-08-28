import express from 'express';
import Quiz from '../models/Quiz.js';
import QuizAttempt from '../models/QuizAttempt.js';
import supabase from '../db/db.js';

const router = express.Router();

// Get student quizzes
router.get('/student', async (req, res) => {
    try {
        const studentId = 2; // TODO: Get from auth session
        const quizzes = await Quiz.getAllForStudent(studentId);
        res.json(quizzes);
    } catch (error) {
        console.error('Error fetching student quizzes:', error);
        res.status(500).json({ message: 'Error fetching student quizzes' });
    }
});

// Get quiz details for student
router.get('/:id/student', async (req, res) => {
    try {
        const studentId = 1; // TODO: Get from auth session
        const quiz = await Quiz.getStudentQuizDetails(req.params.id, studentId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        console.error('Error getting quiz details:', error);
        res.status(500).json({ error: 'Failed to get quiz details' });
    }
});

// Get quiz results
router.get('/:id/results', async (req, res) => {
    try {
        const studentId = 2; // TODO: Get from auth session
        const quiz = await Quiz.getStudentQuizDetails(req.params.id, studentId);
        if (!quiz || !quiz.attempt_id) {
            return res.status(404).json({ error: 'Quiz attempt not found' });
        }
        const results = await Quiz.getQuizResults(req.params.id, quiz.attempt_id);
        res.json(results);
    } catch (error) {
        console.error('Error getting quiz results:', error);
        res.status(500).json({ error: 'Failed to get quiz results' });
    }
});

// Get all quizzes with statistics
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.getAll();
        res.json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Error fetching quizzes' });
    }
});

// Get quiz by ID with questions
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.getById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (err) {
        console.error('Error getting quiz:', err);
        res.status(500).json({ error: 'Failed to get quiz' });
    }
});

// Create new quiz
router.post('/', async (req, res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        
        // Handle validation errors
        if (error.message.includes('Missing required fields') ||
            error.message.includes('at least one question') ||
            error.message.includes('Question text and type') ||
            error.message.includes('Invalid question type')) {
            return res.status(400).json({ error: error.message });
        }
        
        // Handle foreign key constraint violations
        if (error.message === 'Course module does not exist' || 
            error.message === 'Instructor does not exist') {
            return res.status(400).json({ error: error.message });
        }
        
        // Handle other errors
        res.status(500).json({ error: 'Failed to create quiz. Please try again.' });
    }
});

// Update quiz
router.put('/:id', async (req, res) => {
    try {
        console.log("the body data",req.body)
        const success = await Quiz.update(req.params.id, req.body);
        if (success) {
            res.json({ message: 'Quiz updated successfully' });
        } else {
            res.status(404).json({ error: 'Quiz not found' });
        }
    } catch (err) {
        console.error('Error updating quiz:', err);
        res.status(500).json({ error: 'Failed to update quiz' });
    }
});

// Delete quiz
router.delete('/:id', async (req, res) => {
    try {
        const success = await Quiz.delete(req.params.id);
        if (success) {
            res.json({ message: 'Quiz deleted successfully' });
        } else {
            res.status(404).json({ error: 'Quiz not found' });
        }
    } catch (err) {
        console.error('Error deleting quiz:', err);
        res.status(500).json({ error: 'Failed to delete quiz' });
    }
});

// Create quiz attempt
router.post('/:id/attempts', async (req, res) => {
    try {
        const { studentId } = req.body; // In production, get this from auth session
        const attempt = await QuizAttempt.create(studentId, req.params.id);
        res.status(201).json(attempt);
    } catch (error) {
        console.error('Error creating quiz attempt:', error);
        res.status(500).json({ error: 'Failed to create quiz attempt' });
    }
});

// Get quiz attempt details
router.get('/attempts/:attemptId', async (req, res) => {
    try {
        const attempt = await QuizAttempt.getAttemptDetails(req.params.attemptId);
        if (!attempt) {
            return res.status(404).json({ error: 'Attempt not found' });
        }
        res.json(attempt);
    } catch (error) {
        console.error('Error getting attempt details:', error);
        res.status(500).json({ error: 'Failed to get attempt details' });
    }
});

// Submit quiz attempt
router.post('/attempts/:attemptId/submit', async (req, res) => {
    try {
        const { answers } = req.body;
        console.log("the ans",answers)
        await QuizAttempt.submitAttempt(req.params.attemptId, answers);
        const score = await QuizAttempt.autoGrade(req.params.attemptId);
        res.json({ message: 'Quiz submitted and graded successfully', score });
    } catch (error) {
        console.error('Error submitting quiz attempt:', error);
        res.status(500).json({ error: 'Failed to submit quiz attempt' });
    }
});

// Get all attempts for a quiz
router.get('/:id/attempts', async (req, res) => {
    try {
        const attempts = await QuizAttempt.getByQuizId(req.params.id);
        res.json(attempts);
    } catch (error) {
        console.error('Error getting quiz attempts:', error);
        res.status(500).json({ error: 'Failed to get quiz attempts' });
    }
});

export default router;