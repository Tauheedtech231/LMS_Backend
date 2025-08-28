import { supabase } from "../db/supabase.js"; // apka supabase setup

export const getStudentCourses = async (req, res) => {
  const { studentId } = req.params;

  try {
    // 1. Fetch enrolled courses
    const { data: enrollments, error: enrollError } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('student_id', studentId);

    if (enrollError) throw enrollError;

    const courseIds = enrollments.map(e => e.course_id);

    if (courseIds.length === 0) {
      return res.json([]);
    }

    // 2. Fetch courses details
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id, title, description, instructor_id, duration, enrollmentCount')
      .in('id', courseIds);

    if (coursesError) throw coursesError;

    // 3. Fetch modules for these courses
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id, course_id, title, content')
      .in('course_id', courseIds);

    if (modulesError) throw modulesError;

    // 4. Combine courses with modules
    const result = courses.map(course => {
      const courseModules = modules.filter(m => m.course_id === course.id);
      return {
        ...course,
        moduleCount: courseModules.length,
        modules: courseModules.map(m => ({ id: m.id, title: m.title }))
      };
    });

    return res.json(result);
  } catch (err) {
    console.error('Error fetching student courses:', err);
    return res.status(500).json({ error: 'Server error fetching student courses', details: err.message || err });
  }
};
