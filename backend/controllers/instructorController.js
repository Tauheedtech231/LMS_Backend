import { supabase } from "../db/supabase.js";

// Get all instructors
export const getInstructors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("instructors")
      .select("id, name"); // fetch id and name

    if (error) throw error;

    res.json(data || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch instructors" });
  }
};
