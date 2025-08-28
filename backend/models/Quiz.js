import supabase from '../db/db.js';

export default class Quiz {
    static async create(quizData) {
        try {
            // Validate required fields
            if (!quizData.title || !quizData.coursemodule_id || !quizData.instructor_id) {
                throw new Error('Missing required fields: title, coursemodule_id, or instructor_id');
            }

            // Validate questions array
            if (!Array.isArray(quizData.questions) || quizData.questions.length === 0) {
                throw new Error('At least one question is required');
            }

            // Validate question types
            quizData.questions.forEach(question => {
                if (!question.question_text || !question.question_type) {
                    throw new Error('Question text and type are required for all questions');
                }
                if (!['MCQ', 'True/False'].includes(question.question_type)) {
                    throw new Error('Invalid question type. Must be either MCQ or True/False');
                }
            });

            // Insert quiz
            const { data: quiz, error: quizError } = await supabase
                .from('quizzes')
                .insert([
                    {
                        coursemodule_id: quizData.coursemodule_id,
                        instructor_id: quizData.instructor_id,
                        title: quizData.title,
                        instructions: quizData.instructions,
                        total_points: quizData.total_points,
                        time_limit: quizData.time_limit,
                        due_date: quizData.due_date
                    }
                ])
                .select()
                .single();

            if (quizError) {
                console.error('Error creating quiz:', quizError);
                if (quizError.code === '23503' && quizError.details?.includes('coursemodule_id')) {
                    throw new Error('Course module does not exist');
                } else if (quizError.code === '23503' && quizError.details?.includes('instructor_id')) {
                    throw new Error('Instructor does not exist');
                } else {
                    throw new Error('Failed to create quiz');
                }
            }

            // Insert questions
            const questions = quizData.questions.map(question => ({
                quiz_id: quiz.id,
                question_text: question.question_text,
                question_type: question.question_type,
                options: Array.isArray(question.options) ? question.options : question.options.value,
                correct_answer: question.correct_answer
            }));

            const { error: questionsError } = await supabase
                .from('quiz_questions')
                .insert(questions);

            if (questionsError) {
                console.error('Error creating quiz questions:', questionsError);
                throw new Error('Failed to create quiz questions');
            }

            return quiz.id;
        } catch (error) {
            console.error('Error in Quiz.create:', error);
            throw error;
        }
    }

    static async getAll() {
        const { data, error } = await supabase
            .from('quizzes')
            .select(`
                *,
                student_quiz_attempts (id, status, score)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map(quiz => ({
            ...quiz,
            total_attempts: quiz.student_quiz_attempts?.length || 0,
            pending_grading: quiz.student_quiz_attempts?.filter(a => a.status === 'Pending').length || 0,
            average_score: quiz.student_quiz_attempts?.filter(a => a.status === 'Graded')
                .reduce((sum, a) => sum + (a.score || 0), 0) / 
                (quiz.student_quiz_attempts?.filter(a => a.status === 'Graded').length || 1)
        }));
    }

//   static async getAllForStudent(studentId) {
//     console.log("Student ID:", studentId);

//     const { data, error } = await supabase
//         .from('quizzes')
//         .select(`
//             *,
//             student_quiz_attempts!inner (id, status, score, student_id),
//             modules!inner (id, title)
//         `)
//         .eq('student_quiz_attempts.student_id', studentId)
//         .order('created_at', { ascending: false });

//     if (error) throw error;

//     // Map quizzes safely, even if no attempts exist
//     return data.map(quiz => {
//         const attempt = quiz.student_quiz_attempts?.[0] || {};
//         return {
//             ...quiz,
//             module_name: quiz.modules?.title || null,
//             status: attempt.status || null,
//             score: attempt.score || null
//         };
//     });
// }
static async getAllForStudent(studentId) {
    console.log("Fetching quizzes for Student ID:", studentId);

    const { data, error } = await supabase
        .from('quizzes')
        .select(`
            *,
            student_quiz_attempts!left (id, status, score, student_id),
            modules!inner (id, title)
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(quiz => {
        // Find attempt for current student
        const attempt = quiz.student_quiz_attempts?.find((a) => a.student_id === studentId) || {};
        
        return {
            ...quiz,
            module_name: quiz.modules?.title || null,
            status: attempt.status || 'Pending',  // Pending if no attempt yet
            score: attempt.score || null
        };
    });
}


    static async getStudentQuizDetails(quizId, studentId) {
        // Get quiz with questions
        console.log("the quiz id",quizId,"the student id",studentId)
        const { data: quiz, error: quizError } = await supabase
            .from('quizzes')
            .select(`
                *,
                quiz_questions (*),
                modules!inner (id, title),
                student_quiz_attempts!left (id, status, score, student_id)
            `)
            .eq('id', quizId)
            .eq('student_quiz_attempts.student_id', studentId)
            .single();

        if (quizError) throw quizError;

        return {
            ...quiz,
            module_name: quiz.modules.title,
            status: quiz.student_quiz_attempts?.[0]?.status || 'Pending',
            score: quiz.student_quiz_attempts?.[0]?.score,
            attempt_id: quiz.student_quiz_attempts?.[0]?.id
        };
    }

    static async getQuizResults(quizId, attemptId) {
        const { data: attempt, error: attemptError } = await supabase
            .from('student_quiz_attempts')
            .select(`
                *,
                student_quiz_answers (id, question_id, selected_answer, is_correct),
                quizzes!inner (id, title, total_points)
            `)
            .eq('id', attemptId)
            .eq('quiz_id', quizId)
            .single();

        if (attemptError) throw attemptError;

        const { data: questions, error: questionsError } = await supabase
            .from('quiz_questions')
            .select('*')
            .eq('quiz_id', quizId);

        if (questionsError) throw questionsError;

        return {
            quiz: {
                id: attempt.quizzes.id,
                title: attempt.quizzes.title,
                total_points: attempt.quizzes.total_points
            },
            attempt: {
                id: attempt.id,
                score: attempt.score,
                status: attempt.status,
                attempted_at: attempt.started_at
            },
            answers: attempt.student_quiz_answers.map(answer => {
                const question = questions.find(q => q.id === answer.question_id);
                return {
                    id: answer.id,
                    question_text: question.question_text,
                    selected_answer: answer.selected_answer,
                    correct_answer: question.correct_answer,
                    is_correct: answer.is_correct
                };
            })
        };
    }

    static async getById(id) {
        const { data: quiz, error: quizError } = await supabase
            .from('quizzes')
            .select('*')
            .eq('id', id)
            .single();

        if (quizError) return null;

        const { data: questions, error: questionsError } = await supabase
            .from('quiz_questions')
            .select('*')
            .eq('quiz_id', id);

        if (questionsError) throw questionsError;

        return {
            ...quiz,
            questions: questions
        };
    }

    static async update(id, quizData) {
        try {
            // Update quiz
     
            const { error: quizError } = await supabase
                .from('quizzes')
                .update({
                    title: quizData.title,
                    instructions: quizData.instructions,
                    total_points: quizData.total_points,
                    time_limit: quizData.time_limit,
                    due_date: quizData.due_date
                })
                .eq('id', id);

            if (quizError) {
                console.error('Error updating quiz:', quizError);
                throw new Error('Failed to update quiz');
            }

            // Delete existing questions
            const { error: deleteError } = await supabase
                .from('quiz_questions')
                .delete()
                .eq('quiz_id', id);

            if (deleteError) {
                console.error('Error deleting existing questions:', deleteError);
                throw new Error('Failed to delete existing questions');
            }

            // Insert updated questions
            const questions = quizData.questions.map(question => ({
                quiz_id: id,
                question_text: question.question_text,
                question_type: question.question_type,
                options: question.options,
                correct_answer: question.correct_answer
            }));


            // Insert questions
            const { error: questionsError } = await supabase
                .from('quiz_questions')
                .insert(questions.map(q => ({
                    quiz_id: q.quiz_id,
                    question_text: q.question_text,
                    question_type: q.question_type,
                    options: q.options,
                    correct_answer: q.correct_answer
                })));

            if (questionsError) {
                console.error('Error inserting questions:', questionsError);
                throw new Error('Failed to insert questions');
            }

            return true;
        } catch (error) {
            console.error('Error in Quiz.update:', error);
            throw error;
        }
    }

    static async delete(id) {
        const { error } = await supabase
            .from('quizzes')
            .delete()
            .eq('id', id);
        return !error;
    }
}