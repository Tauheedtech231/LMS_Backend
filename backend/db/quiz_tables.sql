-- Quiz tables schema

-- Table: quizzes
CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    coursemodule_id INTEGER NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    instructor_id INTEGER NOT NULL REFERENCES instructors(id),
    title VARCHAR(255) NOT NULL,
    instructions TEXT,
    total_points INTEGER NOT NULL DEFAULT 0,
    time_limit INTEGER, -- in minutes
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: quiz_questions
CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- 'MCQ' or 'TrueFalse'
    options JSONB, -- for MCQ options
    correct_answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Student Quiz Attempts Table
CREATE TABLE student_quiz_attempts (
    id SERIAL PRIMARY KEY,
    quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    score INT,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Completed', 'Graded')) DEFAULT 'Pending',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    time_taken INT -- in minutes
);

-- 4. Student Quiz Answers Table
CREATE TABLE student_quiz_answers (
    id SERIAL PRIMARY KEY,
    attempt_id INT NOT NULL REFERENCES student_quiz_attempts(id) ON DELETE CASCADE,
    question_id INT NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    selected_answer TEXT NOT NULL,
    is_correct BOOLEAN,
    points_earned INT
);

-- Indexes for better performance
CREATE INDEX idx_quizzes_coursemodule_id ON quizzes(coursemodule_id);
CREATE INDEX idx_quizzes_instructor_id ON quizzes(instructor_id);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX idx_student_quiz_attempts_quiz_id ON student_quiz_attempts(quiz_id);
CREATE INDEX idx_student_quiz_attempts_student_id ON student_quiz_attempts(student_id);
CREATE INDEX idx_student_quiz_answers_attempt_id ON student_quiz_answers(attempt_id);

-- Triggers for updating timestamps
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();