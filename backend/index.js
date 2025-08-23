import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js';
import coursesRoutes from './routes/courseRoutes.js'
import studentsRoutes from './routes/studentRoute.js'
import engagementRoutes  from './routes/engagementRoutes.js'
import instructorRoutes from "./routes/instructorRoutes.js";
import paymentRoutes from './routes/paymentRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import moduleRoutes from "./routes/moduleRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";


import { createClient } from '@supabase/supabase-js';

dotenv.config();

// Supabase client
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);
// app.use('/api/courses', courseRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome Tauheed! LMS Backend is running 🚀');
});
app.use("/api/quizzes", quizRoutes)
app.use("/api/courses", coursesRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/engagement", engagementRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/modules", moduleRoutes);
; // <- add leading slash




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
