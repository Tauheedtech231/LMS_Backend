import { supabase } from '../db/supabase.js';

export const getCourses = async (req, res) => {
  try {
    // Fetch courses with instructor info
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select(`
        *,
        instructors:instructor_id (
          id,
          name,
          email,
          bio,
          avatar
        )
      `)
      .order("id", { ascending: true });

    if (coursesError) throw coursesError;

    // Fetch all modules
    const { data: modules, error: modulesError } = await supabase
      .from("modules")
      .select("*");

    if (modulesError) throw modulesError;

    // Merge modules into their courses
    const coursesWithModules = courses.map((course) => ({
      ...course,
      instructor: course.instructors || null, // instructor object
      modules: modules.filter((m) => m.course_id === course.id),
    }));

    res.json(coursesWithModules);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};


// ADD new course with modules
export const addCourse = async (req, res) => {
    
  const { title, description, instructor_id, duration,enrollment_count, modules } = req.body;
  console.log("the ",req.body)

  try {
    // Insert course
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .insert([{ title, description, instructor_id, duration,enrollmentCount:enrollment_count }])
      .select()
      .single();

    if (courseError) throw courseError;

    const courseId = courseData.id;

    // Insert modules if any
    if (modules && modules.length > 0) {
      const modulesToInsert = modules.map((mod) => ({
        course_id: courseId,
        title: mod.title,
        content: mod.content,
      }));

      const { error: modulesError } = await supabase.from("modules").insert(modulesToInsert);
      if (modulesError) throw modulesError;
    }

    res.status(201).json({ message: "Course added successfully", course: courseData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add course" });
  }
};



export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch course with instructor
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select(`
        *,
        instructors:instructor_id (
          id,
          name,
          email,
          bio,
          avatar
        )
      `)
      .eq("id", id)
      .single();

    if (courseError) throw courseError;
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Fetch modules for this course
    const { data: modules, error: modulesError } = await supabase
      .from("modules")
      .select("*")
      .eq("course_id", id);

    if (modulesError) throw modulesError;

    // Build response
    const courseWithModules = {
      ...course,
      instructor: course.instructors || null,
      modules: modules || [],
    };

    res.json(courseWithModules);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ error: "Failed to fetch course" });
  }
};
