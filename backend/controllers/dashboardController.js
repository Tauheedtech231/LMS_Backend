import { supabase } from '../db/supabase.js'; 

// Fetch all students
export const getStudents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*");

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};

// Fetch all courses
export const getCourses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*");

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch courses" });
  }
};

// Fetch engagement stats (for simplicity, from a table engagement)
export const getEngagement = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("analytics")
      .select("*");

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch engagement data" });
  }
};
