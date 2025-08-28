import { supabase } from '../db/supabase.js';

// POST new student with enrollments

// Get single student with enrolled courses
export const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .single();

    if (studentError) throw studentError;
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Fetch enrollments with course details
    const { data: enrollments, error: enrollError } = await supabase
      .from("enrollments")
      .select(`
        course_id,
        courses:course_id (id, title)
      `)
      .eq("student_id", id);

    if (enrollError) throw enrollError;

    // Map to include course names
    const enrolledCourses = enrollments.map(e => ({
      id: e.course_id,
      title: e.courses.title
    }));

    res.json({ ...student, enrolledCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};
export const getStudentsByCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    // First get all student IDs enrolled in this course
    const { data: enrollments, error: enrollError } = await supabase
      .from("enrollments")
      .select("student_id")
      .eq("course_id", id);

    if (enrollError) {
      return res.status(500).json({ error: enrollError.message });
    }

    if (!enrollments || enrollments.length === 0) {
      return res.json([]);
    }

    // Then fetch those students' details
    const studentIds = enrollments.map(e => e.student_id);
    const { data: students, error: studentError } = await supabase
      .from("students")
      .select("*")
      .in("id", studentIds);

    if (studentError) {
      return res.status(500).json({ error: studentError.message });
    }

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students by course" });
  }
};

export const getStudents = async (req, res) => {
  try {
    // Fetch students
    const { data: students, error: studentError } = await supabase
      .from("students")
      .select("*");
      console.log("Students data:", students);

    if (studentError) {
      return res.status(500).json({ error: studentError.message });
    }

    // Fetch enrollments for each student
    const { data: enrollments, error: enrollError } = await supabase
      .from("enrollments")
      .select("student_id, course_id");

    if (enrollError) {
      return res.status(500).json({ error: enrollError.message });
    }

    // Fetch all courses
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("id, title");

    if (coursesError) {
      return res.status(500).json({ error: coursesError.message });
    }

    // Map student to their enrolled courses
    const studentsWithCourses = students.map((student) => {
      const studentEnrollments = enrollments
        .filter((enr) => enr.student_id === student.id)
        .map((enr) => {
          const course = courses.find((c) => c.id === enr.course_id);
          return course ? course : null;
        })
        .filter(Boolean);

      return {
        ...student,
        enrolledCourses: studentEnrollments,
      };
    });

    res.json(studentsWithCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const addStudentWithEnrollments = async (req, res) => {
  try {
    const { name, email, progress, image, enrolledCourses } = req.body; 
    // enrolledCourses = array of course IDs, e.g., ["1","2"]

    // 1️⃣ Insert student
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .insert([{ name, email, progress, image }])
      .select();

    if (studentError) throw studentError;

    const studentId = studentData[0].id;

    // 2️⃣ Insert enrollments
    if (enrolledCourses && enrolledCourses.length > 0) {
      const enrollmentData = enrolledCourses.map(courseId => ({
        student_id: studentId,
        course_id: courseId
      }));

      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert(enrollmentData);

      if (enrollmentError) throw enrollmentError;
    }

    res.status(201).json({
      student: studentData[0],
      enrolledCourses: enrolledCourses || []
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
