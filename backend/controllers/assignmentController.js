import { supabase } from '../db/supabase.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Get single assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    console.log("the assignments id",assignmentId)
    
    const { data: assignment, error } = await supabase
      .from('assignments')
      .select(`
        *,
        courses:course_id (
          id,
          title
        )
      `)
      .eq('id', assignmentId)
      .single();

    if (error) throw error;

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Get submissions for this assignment with grades
    const { data: submissions, error: submissionError } = await supabase
      .from('assignment_submissions')
      .select(`
        id,
        student_id,
        assignment_id,
        submitted_at,
        status,
        file_url,
        submission_text,
        students:student_id (
          id,
          name,
          email,
          image
        ),
        assignment_grades!submission_id (
          id,
          points_earned,
          feedback,
          graded_at
        )
      `)
      .eq('assignment_id', assignmentId)
      .order('submitted_at', { ascending: false });

    if (submissionError) {
      console.error('Submission error:', submissionError);
      throw submissionError;
    }

    console.log('Fetched submissions:', submissions);

    // Add submissions to assignment object
    const assignmentWithSubmissions = {
      ...assignment,
      submissions: submissions || []
    };

    res.json(assignmentWithSubmissions);
  } catch (err) {
    console.error('Error fetching assignment:', err);
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
};

// Get all assignments for an instructor
export const getInstructorAssignments = async (req, res) => {
  try {
    const { instructorId } = req.params;

    
    const { data: assignments, error } = await supabase
      .from('assignments')
      .select(`
        *,
        courses:course_id (
          id,
          title )
      `)
      .eq('instructor_id', instructorId)
      .order('created_at', { ascending: false });
 console.log("the assignments",assignments)
    if (error) throw error;

    // Get submission counts for each assignment
    const assignmentsWithStats = await Promise.all(
      assignments.map(async (assignment) => {
        const { data: submissions, error: submissionError } = await supabase
          .from('assignment_submissions')
          .select('id, status')
          .eq('assignment_id', assignment.id);
          // console.log("the submissions",submissions)

        if (submissionError) throw submissionError;

        const totalSubmissions = submissions.length;
        const gradedSubmissions = submissions.filter(s => s.status === 'Graded').length;
        const pendingSubmissions = submissions.filter(s => s.status === '').length;


        return {
          ...assignment,
          totalSubmissions,
          gradedSubmissions,
          pendingSubmissions
        };
      })
    );

    res.json(assignmentsWithStats);
  } catch (err) {
    console.error('Error fetching instructor assignments:', err);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};

// Create new assignment
// assignmentsController.ts



export const createAssignment = async (req, res) => {
  try {
    const {
      courseId,
      moduleId,
      instructorId,
      title,
      description,
      instructions,
      maxPoints,
      dueDate,
      allowLateSubmission,
      latePenalty,
      submissionFormat
    } = req.body;

    // console.log('Received assignment data:', req.body); // Debug

    // Validate required fields
    if (!courseId || !moduleId || !instructorId || !title || !instructions || !maxPoints) {
      return res.status(400).json({
        error: 'Required fields missing',
        required: ['courseId', 'moduleId', 'instructorId', 'title', 'instructions', 'maxPoints'],
        received: { courseId, moduleId, instructorId, title, instructions, maxPoints }
      });
    }

    // Handle dueDate: use frontend date or default to 2 days ahead
    let dueDateObj;
    if (dueDate) {
      dueDateObj = new Date(dueDate);
      if (isNaN(dueDateObj.getTime())) {
        return res.status(400).json({ error: 'Invalid due date format', received: dueDate });
      }
    } else {
      dueDateObj = new Date();
      dueDateObj.setDate(dueDateObj.getDate() + 2); // default 2 days ahead
      dueDateObj.setHours(23, 59, 59, 999);
    }

    // Prepare DB insert data (map frontend keys to DB columns)
    const newAssignment = {
      course_id: courseId,
      module_id: moduleId,
      instructor_id: instructorId,
      title,
      description,
      instructions,
      total_points: maxPoints,
      due_date: dueDateObj.toISOString(),
      allow_late_submission: allowLateSubmission ?? false,
      late_penalty: latePenalty ?? 0,
      submission_format: submissionFormat ?? 'file',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('assignments')
      .insert([newAssignment])
      .select()
      .single();

    if (error) {
      console.error('Database error creating assignment:', error);
      return res.status(400).json({ error });
    }

    // console.log('Assignment created successfully:', data); // Debug
    res.status(201).json(data);

  } catch (err) {
    console.error('Error creating assignment:', err);
    res.status(500).json({
      error: 'Failed to create assignment',
      details: err.message
    });
  }
};


// Get assignment submissions for grading
export const getAssignmentSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    const { data: submissions, error } = await supabase
      .from('assignment_submissions')
      .select(`
        id,
        student_id,
        assignment_id,
        submitted_at,
        status,
        file_url,
        submission_text,
        students:student_id (
          id,
          name,
          email,
          image
        ),
        assignment_grades!submission_id (
          id,
          points_earned,
          feedback,
          graded_at
        )
      `)
      .eq('assignment_id', assignmentId)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Submission error:', error);
      throw error;
    }

    console.log('Fetched submissions:', submissions);

    res.json(submissions);
  } catch (err) {
    console.error('Error fetching assignment submissions:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

// Grade assignment submission
export const gradeAssignment = async (req, res) => {
  try {
    const { submissionId, grade, feedback, instructor_id } = req.body;
    // console.log('Grading submission:', { submissionId, grade, feedback, instructor_id });

    if (!instructor_id || grade === undefined) {
      return res
        .status(400)
        .json({ error: "Instructor ID and grade are required" });
    }

    // Insert or update grade
    const { data, error: gradeError } = await supabase
      .from("assignment_grades")
      .upsert({
        submission_id: submissionId,
        instructor_id,
        points_earned: parseFloat(grade),
        feedback,
        graded_at: new Date().toISOString()
      })
      .select()
      .single();

    if (gradeError) {
      console.error('Error upserting grade:', gradeError);
      throw gradeError;
    }

    // console.log('Grade upserted:', data);

    // Update submission status
    const { error: updateError } = await supabase
      .from("assignment_submissions")
      .update({ status: "Graded" })
      .eq("id", submissionId);

    if (updateError) {
      console.error('Error updating submission status:', updateError);
      throw updateError;
    }

    // Update student performance
    await updateStudentPerformance(submissionId);

    // console.log("Grading completed successfully");

    res.json({ message: "Assignment graded successfully", grade: data });
  } catch (err) {
    console.error("Error grading assignment:", err);
    res.status(500).json({ error: "Failed to grade assignment" });
  }
};


// Get student performance data
export const getStudentPerformance = async (req, res) => {
  try {
    const { courseId, instructorId } = req.params;
    
    const { data: performance, error } = await supabase
      .from('student_performance')
      .select(`
        *,
        students:student_id (
          id,
          name,
          email,
          image
        )
      `)
      .eq('course_id', courseId)
      .order('overall_progress', { ascending: false });

    if (error) throw error;

    res.json(performance);
  } catch (err) {
    console.error('Error fetching student performance:', err);
    res.status(500).json({ error: 'Failed to fetch student performance' });
  }
};

// Helper function to update student performance
const updateStudentPerformance = async (submissionId) => {
  try {
    // Get submission details
    const { data: submission, error: submissionError } = await supabase
      .from('assignment_submissions')
      .select(`
        student_id,
        assignment_id,
        assignments:assignment_id (
          course_id
        )
      `)
      .eq('id', submissionId)
      .single();

    if (submissionError) throw submissionError;

    const { student_id, assignments } = submission;
    const course_id = assignments.course_id;

    // Calculate assignment statistics
    const { data: assignmentStats, error: statsError } = await supabase
      .rpc('calculate_student_assignment_stats', {
        p_student_id: student_id,
        p_course_id: course_id
      });

    if (statsError) {
      console.error('Error calculating assignment stats:', statsError);
      return;
    }

    // Update student performance record
    const { error: updateError } = await supabase
      .from('student_performance')
      .upsert({
        student_id,
        course_id,
        ...assignmentStats,
        last_activity: new Date().toISOString()
      });

    if (updateError) throw updateError;
  } catch (err) {
    console.error('Error updating student performance:', err);
  }
};

// Get assignment analytics
export const getAssignmentAnalytics = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    const { data: submissions, error } = await supabase
      .from('assignment_submissions')
      .select(`
        id,
        status,
        assignment_grades!submission_id (
          points_earned
        )
      `)
      .eq('assignment_id', assignmentId);

    if (error) {
      console.error('Analytics error:', error);
      throw error;
    }

    console.log('Fetched submissions for analytics:', submissions);

    const totalSubmissions = submissions.length;
    const gradedSubmissions = submissions.filter(s => s.assignment_grades && s.assignment_grades.length > 0);
    const averageScore = gradedSubmissions.length > 0 
      ? gradedSubmissions.reduce((sum, s) => sum + (s.assignment_grades[0]?.points_earned || 0), 0) / gradedSubmissions.length
      : 0;

    const analytics = {
      totalSubmissions,
      gradedCount: gradedSubmissions.length,
      pendingCount: totalSubmissions - gradedSubmissions.length,
      averageScore: Math.round(averageScore * 100) / 100,
      submissionRate: totalSubmissions > 0 ? Math.round((totalSubmissions / totalSubmissions) * 100) : 0
    };

    console.log('Calculated analytics:', analytics);

    res.json(analytics);
  } catch (err) {
    console.error('Error fetching assignment analytics:', err);
    res.status(500).json({ error: 'Failed to fetch assignment analytics' });
  }
};

// Delete assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', assignmentId);

    if (error) throw error;

    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    console.error('Error deleting assignment:', err);
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
};

// Update assignment
export const updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { title, description, instructions, total_points, due_date } = req.body;
    
    const { data, error } = await supabase
      .from('assignments')
      .update({
        title,
        description,
        instructions,
        total_points,
        due_date
      })
      .eq('id', assignmentId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error updating assignment:', err);
    res.status(500).json({ error: 'Failed to update assignment' });
  }
};


// ✅ Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const instructorId = req.query.instructorId;
    
    // console.log("ya call hoga hha",instructorId)
    const { data: assignments, error } = await supabase
      .from("assignments")
      .select(`
        id,
        title,
        description,
        instructions,
        total_points,
        due_date,
        created_at,
        updated_at,
        courses(title),
        instructors(name, email)
      `);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get submission counts for each assignment
    const assignmentsWithStats = await Promise.all(
      assignments.map(async (assignment) => {
        const { data: submissions, error: submissionError } = await supabase
          .from('assignment_submissions')
          .select('id, status')
          .eq('assignment_id', assignment.id);

        if (submissionError) throw submissionError;

        const totalSubmissions = submissions?.length || 0;
        const gradedSubmissions = submissions?.filter(s => s.status === 'Graded').length || 0;

        return {
          ...assignment,
          submissionsCount: totalSubmissions,
          gradedCount: gradedSubmissions
        };
      })
    );

    res.status(200).json(assignmentsWithStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

