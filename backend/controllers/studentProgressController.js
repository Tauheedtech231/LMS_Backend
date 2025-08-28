import {supabase} from '../db/supabase.js' // Supabase client

// Get student's progress for a specific course
export const getStudentProgress = async (req, res) => {
  const { studentId, courseId } = req.params;
  console.log("Fetching progress for student:", studentId, "course:", courseId);

  try {
    // ---------- 1. Fetch Assignment IDs for the course ----------
    const { data: assignmentIdsData, error: assignmentIdsError } = await supabase
      .from('assignments')
      .select('id')
      .eq('course_id', courseId);

    if (assignmentIdsError) throw assignmentIdsError;

    const assignmentIds = assignmentIdsData?.map(a => a.id) || [];

    // ---------- 2. Fetch assignment submissions with grades ----------
    const { data: submissions, error: submissionError } = await supabase
      .from('assignment_submissions')
      .select(`
        id,
        status,
        assignment_grades(points_earned)
      `)
      .eq('student_id', studentId)
      .in('assignment_id', assignmentIds);

    if (submissionError) throw submissionError;

    const totalAssignments = submissions.length;
    const completedAssignments = submissions.filter(a => a.status === 'Graded').length;

    const totalAssignmentPoints = submissions.reduce(
      (sum, a) => sum + (a.assignment_grades?.[0]?.points_earned || 0),
      0
    );
    const averageAssignmentScore =
      totalAssignments > 0 ? totalAssignmentPoints / totalAssignments : 0;

    // ---------- 3. Fetch Quiz IDs for the course module ----------
    const { data: quizIdsData, error: quizIdsError } = await supabase
      .from('quizzes')
      .select('id')
      .eq('coursemodule_id', courseId);

    if (quizIdsError) throw quizIdsError;

    const quizIds = quizIdsData?.map(q => q.id) || [];

    // ---------- 4. Fetch quiz attempts ----------
    const { data: quizAttempts, error: quizError } = await supabase
      .from('student_quiz_attempts')
      .select('id, score, status')
      .eq('student_id', studentId)
    //   .in('quiz_id', quizIds);

    if (quizError) throw quizError;

    const totalQuizzes = quizAttempts.length;
    const completedQuizzes = quizAttempts.filter(q => q.status === 'Graded').length;
    const totalQuizPoints = quizAttempts.reduce((sum, q) => sum + (q.score || 0), 0);
    const averageQuizScore = totalQuizzes > 0 ? totalQuizPoints / totalQuizzes : 0;

    // ---------- 5. Calculate overall progress ----------
    const overallProgress =
      totalAssignments + totalQuizzes > 0
        ? ((completedAssignments + completedQuizzes) / (totalAssignments + totalQuizzes)) * 100
        : 0;

    // ---------- 6. Update student_performance table ----------
    const { error: upsertError } = await supabase
      .from('student_performance')
      .upsert([
        {
          student_id: studentId,
          course_id: courseId,
          total_assignments: totalAssignments,
          completed_assignments: completedAssignments,
          total_quizzes: totalQuizzes,
          completed_quizzes: completedQuizzes,
          average_assignment_score: averageAssignmentScore,
          average_quiz_score: averageQuizScore,
          overall_progress: overallProgress,
          last_activity: new Date().toISOString(),
        },
      ])
      .eq('student_id', studentId)
      .eq('course_id', courseId);

    if (upsertError) throw upsertError;

    // ---------- 7. Return progress ----------
    return res.json({
      totalAssignments,
      completedAssignments,
      averageAssignmentScore: averageAssignmentScore.toFixed(2),
      totalQuizzes,
      completedQuizzes,
      averageQuizScore: averageQuizScore.toFixed(2),
      overallProgress: overallProgress.toFixed(2),
    });
  } catch (err) {
    console.error('Error fetching student progress:', err);
    return res.status(500).json({
      error: 'Server error fetching student progress',
      details: err?.message || err,
    });
  }
};


