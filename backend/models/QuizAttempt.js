import supabase from '../db/db.js';

export default class QuizAttempt {
    static async create(studentId, quizId) {
        const { data, error } = await supabase
            .from('student_quiz_attempts')
            .insert([
                {
                    student_id: studentId,
                    quiz_id: quizId,
                    status: 'Pending',
                    started_at: new Date().toISOString()
                }
            ])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async getByQuizId(quizId) {
        const { data, error } = await supabase
            .from('student_quiz_attempts')
            .select(`
                *,
                students (name, email)
            `)
            .eq('quiz_id', quizId)
            .order('started_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    static async getAttemptDetails(attemptId) {
        // Get attempt info
        const { data: attempt, error: attemptError } = await supabase
            .from('student_quiz_attempts')
            .select(`
                *,
                students (name)
            `)
            .eq('id', attemptId)
            .single();

        if (attemptError || !attempt) return null;

        // Get answers with questions
        const { data: answers, error: answersError } = await supabase
            .from('student_quiz_answers')
            .select(`
                *,
                quiz_questions (question_text, question_type, correct_answer)
            `)
            .eq('attempt_id', attemptId);

        if (answersError) throw answersError;

        return {
            ...attempt,
            answers: answers
        };
    }

 static async submitAttempt(attemptId, answers) {
    try {
        // Map answers for insert/upsert
       const answersData = answers.map(answer => ({
  attempt_id: attemptId,
  question_id: answer.question_id,      // frontend se aa raha hai
  selected_answer: answer.selected_answer || answer.answer  // depends on frontend naming
}));


        // Insert or update existing answers
        const { data: insertedAnswers, error: answersError } = await supabase
            .from('student_quiz_answers')
            .upsert(answersData, { onConflict: ['attempt_id', 'question_id'] }) // ensures update if already exists
            .select();

        if (answersError) throw answersError;

        // Update attempt status to "Submitted" and set submitted_at timestamp
        const { data: updatedAttempt, error: updateError } = await supabase
            .from('student_quiz_attempts')
            .update({
                status: 'Completed',
                submitted_at: new Date().toISOString()
            })
            .eq('id', attemptId)
            .select()
            .single();

        if (updateError) throw updateError;

        return {
            success: true,
            attempt: updatedAttempt,
            answers: insertedAnswers
        };
    } catch (error) {
        console.error('Error submitting attempt:', error);
        throw error;
    }
}


    static async gradeAttempt(attemptId, score, feedback = '') {
        const { error } = await supabase
            .from('student_quiz_attempts')
            .update({
                status: 'Graded',
                score: score,
                feedback: feedback,
                graded_at: new Date().toISOString()
            })
            .eq('id', attemptId);

        if (error) throw error;
        return true;
    }

    static async autoGrade(attemptId) {
        try {
            // Get all answers with correct answers
            const { data: answers, error: answersError } = await supabase
                .from('student_quiz_answers')
                .select(`
                    *,
                    quiz_questions (correct_answer, question_type)
                `)
                .eq('attempt_id', attemptId);

            if (answersError) throw answersError;

            let totalScore = 0;
            for (const answer of answers) {
                const isCorrect = answer.selected_answer === answer.quiz_questions.correct_answer;
                totalScore += isCorrect ? 1 : 0;

                
                // Update answer correctness
                const { error: updateError } = await supabase
                    .from('student_quiz_answers')
                    .update({ is_correct: isCorrect })
                    .eq('id', answer.id);

                if (updateError) throw updateError;
            }

            // Calculate percentage score
            const finalScore = (totalScore / answers.length) * 100;

            // Update attempt
            const { error: attemptError } = await supabase
                .from('student_quiz_attempts')
                .update({
                    status: 'Graded',
                    score: finalScore,
                    graded_at: new Date().toISOString()
                })
                .eq('id', attemptId);

            if (attemptError) throw attemptError;
            return finalScore;
        } catch (error) {
            console.error('Error auto-grading attempt:', error);
            throw error;
        }
    }
}