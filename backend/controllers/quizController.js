// backend/controllers/quizController.js
import { supabase } from "../db/supabase.js"

export const getQuizzes = async (req, res) => {
  try {
    console.log("called hova ha")
    const { data, error } = await supabase
      .from("quizzes")
      .select("*"); // you can join coursemodules/instructors if needed

    if (error) {
      return res.status(500).json({ message: "Error fetching quizzes", error });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
