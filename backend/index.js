import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { supabase } from './db/supabase.js';

// Verify database connection
const verifyDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('assignments').select('count');
    if (error) throw error;
    console.log('✅ Database connection established');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Initialize database connection
verifyDatabaseConnection();

// Route imports
import coursesRoutes from './routes/courseRoutes.js';
import studentsRoutes from './routes/studentRoute.js';
import engagementRoutes from './routes/engagementRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import studentProgressRoutes from './routes/studentProgressRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import fileUploadRoutes from './routes/fileUploadRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import quizAttemptRoutes from './routes/quizAttemptRoutes.js';
import materialsRoutes from './routes/material.routes.js';
import  assignmentStudentRoutes from './routes/assignmentStudentRoute.js'
import authRoutes from "./routes/authRoutes.js";
import path from 'path';

const app = express();
const router = express.Router();

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.urlencoded({ extended: true }));



// Root route
app.get('/', (req, res) => {
  res.send('Welcome Tauheed! LMS Backend is running 🚀');
});
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/students", studentsRoutes);
app.use('/api/assignments/student',assignmentStudentRoutes)
app.use('/api/student-progress', studentProgressRoutes);
app.use("/api/engagement", engagementRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/student-courses", moduleRoutes);

app.use('/api/assignments', assignmentRoutes);


app.use('/api/quizzes', quizRoutes);
app.use('/api/quiz-attempts', quizAttemptRoutes);
app.use('/api', materialsRoutes);




// Start server after database connection is verified
const startServer = async () => {
  try {
    await verifyDatabaseConnection();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
