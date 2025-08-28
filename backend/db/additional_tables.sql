-- Additional Tables for Complete Instructor Portal Functionality
//Har module ke multiple quizzes ho sakte hain. or kis na quiz banaya
-- 1. Quizzes Table
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    coursemodule_id INT NOT NULL REFERENCES coursemodules(id) ON DELETE CASCADE,
    instructor_id INT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    instructions TEXT,
    total_points INT NOT NULL,
    time_limit INT NOT NULL, -- in minutes
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 2. Quiz Questions Table quiz ka question hoga multiple
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('MCQ', 'True/False')) NOT NULL,
    question_text TEXT NOT NULL,
    options TEXT[] NOT NULL, -- Array of options
    correct_answer TEXT NOT NULL
);
-- 3. Student Quiz Attempts Table
CREATE TABLE student_quiz_attempts (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score INT,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Completed', 'Graded')) DEFAULT 'Pending',
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 4. Student Answers Table (to track answers per question)
CREATE TABLE student_answers (
    id SERIAL PRIMARY KEY,
    attempt_id INT NOT NULL REFERENCES student_quiz_attempts(id) ON DELETE CASCADE,
    question_id INT NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    selected_answer TEXT NOT NULL,
    is_correct BOOLEAN
);

-- 1. Assignments Table
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_id INT NOT NULL,
    instructor_id INT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    total_points INT NOT NULL DEFAULT 100,
    due_date TIMESTAMP,
    allow_late_submission BOOLEAN DEFAULT false,
    late_penalty INT DEFAULT 0,
    submission_format VARCHAR(10) CHECK (submission_format IN ('file', 'text', 'both')) DEFAULT 'file',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Assignment Submissions Table
CREATE TABLE assignment_submissions (
    id SERIAL PRIMARY KEY,
    assignment_id INT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    submission_text TEXT,
    file_url TEXT,
    file_name TEXT,
    file_size BIGINT, -- in bytes
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('Submitted', 'Graded', 'Late', 'Missing')) DEFAULT 'Submitted'
);

-- 3. Assignment Grades Table
CREATE TABLE assignment_grades (
    id SERIAL PRIMARY KEY,
    submission_id INT NOT NULL REFERENCES assignment_submissions(id) ON DELETE CASCADE,
    instructor_id INT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
    points_earned INT NOT NULL,
    feedback TEXT,
    graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Course Materials Table (Enhanced for file uploads)
CREATE TABLE course_materials (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    instructor_id INT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type VARCHAR(20) CHECK (type IN ('video', 'document', 'pdf', 'image', 'other')) NOT NULL,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT NOT NULL, -- in bytes
    duration VARCHAR(50), -- for videos: "15:30" format
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- 5. Student Performance Tracking Table
CREATE TABLE student_performance (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    total_assignments INT DEFAULT 0,
    completed_assignments INT DEFAULT 0,
    total_quizzes INT DEFAULT 0,
    completed_quizzes INT DEFAULT 0,
    average_assignment_score DECIMAL(5,2) DEFAULT 0.00,
    average_quiz_score DECIMAL(5,2) DEFAULT 0.00,
    overall_progress DECIMAL(5,2) DEFAULT 0.00,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Instructor Notifications Table
CREATE TABLE instructor_notifications (
    id SERIAL PRIMARY KEY,
    instructor_id INT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'new_submission', 'late_assignment', 'quiz_completed'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    related_id INT, -- can reference assignment_id, quiz_id, etc.
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Course Announcements Table
CREATE TABLE course_announcements (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    instructor_id INT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. File Upload Logs Table (for tracking large file uploads)
CREATE TABLE file_upload_logs (
    id SERIAL PRIMARY KEY,
    instructor_id INT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    upload_status VARCHAR(20) CHECK (upload_status IN ('uploading', 'completed', 'failed')) DEFAULT 'uploading',
    upload_progress INT DEFAULT 0, -- percentage
    error_message TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- 9. Quiz Grades Table (separate from attempts for detailed grading)
CREATE TABLE quiz_grades (
    id SERIAL PRIMARY KEY,
    attempt_id INT NOT NULL REFERENCES student_quiz_attempts(id) ON DELETE CASCADE,
    instructor_id INT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
    points_earned INT NOT NULL,
    feedback TEXT,
    graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Course Statistics Table (for instructor dashboard)
CREATE TABLE course_statistics (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    total_students INT DEFAULT 0,
    active_students INT DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0.00,
    average_score DECIMAL(5,2) DEFAULT 0.00,
    total_assignments INT DEFAULT 0,
    total_quizzes INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_assignments_course_id ON assignments(course_id);
CREATE INDEX idx_assignments_instructor_id ON assignments(instructor_id);
CREATE INDEX idx_assignment_submissions_assignment_id ON assignment_submissions(assignment_id);
CREATE INDEX idx_assignment_submissions_student_id ON assignment_submissions(student_id);
CREATE INDEX idx_course_materials_course_id ON course_materials(course_id);
CREATE INDEX idx_student_performance_student_id ON student_performance(student_id);
CREATE INDEX idx_student_performance_course_id ON student_performance(course_id);
CREATE INDEX idx_instructor_notifications_instructor_id ON instructor_notifications(instructor_id);
CREATE INDEX idx_file_upload_logs_instructor_id ON file_upload_logs(instructor_id);

-- Triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_performance_updated_at BEFORE UPDATE ON student_performance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing
INSERT INTO assignments (course_id, instructor_id, title, description, instructions, total_points, due_date) VALUES
(1, 1, 'HTML Basics Assignment', 'Create a basic HTML webpage', 'Create an HTML page with proper structure including head, body, and semantic elements', 100, '2024-02-15 23:59:59'),
(1, 1, 'CSS Styling Project', 'Style the HTML webpage', 'Apply CSS styles to make your webpage visually appealing', 150, '2024-02-20 23:59:59'),
(2, 1, 'JavaScript Functions', 'Implement basic JavaScript functions', 'Create functions for calculator operations', 120, '2024-02-25 23:59:59');

INSERT INTO course_announcements (course_id, instructor_id, title, content, is_urgent) VALUES
(1, 1, 'Welcome to HTML & CSS Course', 'Welcome students! Please check the course materials and complete the first assignment by the due date.', false),
(2, 1, 'JavaScript Assignment Extended', 'Due to popular request, the JavaScript assignment deadline has been extended by 3 days.', true);