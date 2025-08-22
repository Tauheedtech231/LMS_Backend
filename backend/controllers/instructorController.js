import { supabase } from "../db/supabase.js";

// ✅ Get all instructors
export const getInstructors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("instructors")
      .select("*");

    if (error) throw error;

    res.json(data || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch instructors" });
  }
};

// ✅ Add a new instructor
export const addInstructor = async (req, res) => {
  try {
    const { name, email, bio, avatar } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const { data, error } = await supabase
      .from("instructors")
      .insert([{ name, email, bio, avatar }])
      .select(); // return inserted row

    if (error) throw error;

    res.status(201).json(data[0]); // return newly created instructor
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add instructor" });
  }
};
export const getInstructorWithCoursesById = async (req, res) => {
  try {
    const { id } = req.params; // id from URL params
    console.log("call hova ha")

    if (!id) {
      return res.status(400).json({ error: "Instructor ID is required" });
    }

    const { data: instructor, error } = await supabase
      .from("instructors")
      .select(`
        id,
        name,
        email,
        bio,
        avatar,
        courses (
          id,
          title,
          description
       
          
         
        )
      `)
      .eq("id", id)
      .single(); // return only one row

    if (error) throw error;

    res.status(200).json(instructor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch instructor with courses" });
  }
};
