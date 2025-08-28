import { supabase } from '../db/supabase.js'
import fs from 'fs';
import path from 'path';
export const getCourseAssignmentsWithStatus = async (req, res) => {
    const { courseId, studentId } = req.query;

    try {
        // 1. Course ke saare assignments fetch karein
        const { data: assignments, error: assignmentsError } = await supabase
            .from('assignments')
            .select('id, title, description, due_date, total_points')
            .eq('course_id', courseId);

        if (assignmentsError) {
            return res.status(500).json({ error: assignmentsError.message });
        }

        // 2. Har assignment ke liye student ka submission check karein
        const results = await Promise.all(assignments.map(async (assignment) => {
            const { data: submission, error } = await supabase
                .from('assignment_submissions')
                .select('id, submitted_at')
                .eq('assignment_id', assignment.id)
                .eq('student_id', studentId)
                .single();

            if (error && error.code !== 'PGRST116') {
                throw new Error(error.message);
            }

            return {
                ...assignment,
                submissionStatus: submission ? 'Submitted' : 'Pending',
                submittedAt: submission ? submission.submitted_at : null
            };
        }));

        return res.json(results);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};
export const checkSubmissionStatus = async (req, res) => {
    const { assignmentId, studentId } = req.query;

    try {
        // Check if submission exists
        const { data, error } = await supabase
            .from('assignment_submissions')
            .select('id, submitted_at')
            .eq('assignment_id', assignmentId)
            .eq('student_id', studentId)
            .single();

        if (error && error.code !== 'PGRST116') { // row not found error ignore
            return res.status(500).json({ error: error.message });
        }

        if (!data) {
            return res.json({ submitted: false, message: "Assignment not submitted yet" });
        }

        return res.json({
            submitted: true,
            submissionId: data.id,
            submittedAt: data.submitted_at
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};


// export const submitAssignment = async (req, res) => {
//     const { assignmentId, studentId, submissionText, fileUrl, fileName, fileSize } = req.body;

//     try {
//         // Pehle check karein ke student ne already submit kiya hai ya nahi
//         const { data: existingSubmission, error: checkError } = await supabase
//             .from('assignment_submissions')
//             .select('id')
//             .eq('assignment_id', assignmentId)
//             .eq('student_id', studentId)
//             .single();

//         if (checkError && checkError.code !== 'PGRST116') {
//             return res.status(500).json({ error: checkError.message });
//         }

//         if (existingSubmission) {
//             return res.status(400).json({ message: "Assignment already submitted" });
//         }

//         // Naya submission insert karein
//         const { data, error } = await supabase
//             .from('assignment_submissions')
//             .insert([
//                 {
//                     assignment_id: assignmentId,
//                     student_id: studentId,
//                     submission_text: submissionText || null,
//                     file_url: fileUrl || null,
//                     file_name: fileName || null,
//                     file_size: fileSize || null,
//                     status: 'Submitted' // column aapke table me hai
//                 }
//             ])
//             .select()
//             .single();

//         if (error) {
//             return res.status(500).json({ error: error.message });
//         }

//         return res.json({ message: "Assignment submitted successfully", submission: data });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Server error" });
//     }
// };

 // Supabase client

export const submitAssignment = async (req, res) => {
    const { assignmentId, studentId, submissionText } = req.body;
    const file = req.file; // Multer se file

    try {
        // Check if student already submitted
        const { data: existingSubmission, error: checkError } = await supabase
            .from('assignment_submissions')
            .select('id')
            .eq('assignment_id', assignmentId)
            .eq('student_id', studentId)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            return res.status(500).json({ error: checkError.message });
        }

        if (existingSubmission) {
            return res.status(400).json({ message: "Assignment already submitted" });
        }

        let fileUrl = null;
        let fileName = null;
        let fileSize = null;

        if (file) {
            // Create uploads folder if it doesn't exist
            const uploadsDir = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            // Save file to uploads folder
            const filePath = path.join(uploadsDir, file.originalname);
            fs.writeFileSync(filePath, file.buffer);

            fileUrl = `/uploads/${file.originalname}`;
            fileName = file.originalname;
            fileSize = file.size;
        }

        // Insert submission into Supabase
        const { data, error } = await supabase
            .from('assignment_submissions')
            .insert([
                {
                    assignment_id: assignmentId,
                    student_id: studentId,
                    submission_text: submissionText || null,
                    file_url: fileUrl,
                    file_name: fileName,
                    file_size: fileSize,
                    status: 'Submitted'
                }
            ])
            .select()
            .single();

        if (error) return res.status(500).json({ error: error.message });

        return res.json({ message: "Assignment submitted successfully", submission: data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

export const getAssignmentGrade = async (req, res) => {
    const { assignmentId, studentId } = req.query;

    try {
        // Pehle submission ko find karein
        const { data: submission, error: subError } = await supabase
            .from('assignment_submissions')
            .select('id')
            .eq('assignment_id', assignmentId)
            .eq('student_id', studentId)
            .single();

        if (subError) {
            return res.status(500).json({ error: subError.message });
        }

        if (!submission) {
            return res.json({ graded: false, message: "Assignment not submitted yet" });
        }

        // Grades table se grade fetch karein
        const { data: grade, error: gradeError } = await supabase
            .from('assignment_grades')
            .select('points_earned, feedback, graded_at')
            .eq('submission_id', submission.id)
            .single();

        if (gradeError && gradeError.code !== 'PGRST116') {
            return res.status(500).json({ error: gradeError.message });
        }

        if (!grade) {
            return res.json({ graded: false, message: "Assignment not graded yet" });
        }

        return res.json({
            graded: true,
            pointsEarned: grade.points_earned,
            feedback: grade.feedback,
            gradedAt: grade.graded_at
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

