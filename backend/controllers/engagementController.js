import { supabase } from '../db/supabase.js';

// Get engagement for a student (or global if student_id not present)
export const getEngagementByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    let query = supabase.from("analytics").select("*");

    // Agar table mein student_id hai to filter karen
    if (studentId) {
      query = query.eq("student_id", studentId);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch engagement data" });
  }
};
