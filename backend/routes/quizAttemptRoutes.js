import express from "express";
import supabase from "../db/db.js";

const router = express.Router();

// ✅ Get all attempts for a quiz
router.get("/quiz/:quizId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("student_quiz_attempts")
      .select("*, students(name, email)")
      .eq("quiz_id", req.params.quizId);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching attempts:", error);
    res.status(500).json({ message: "Error fetching attempts" });
  }
});

// ✅ Get specific attempt with answers
router.get("/attempts/:attemptId", async (req, res) => {
  try {
    // attempt
    const { data: attempt, error: attemptErr } = await supabase
      .from("student_quiz_attempts")
      .select("*, students(name,email)")
      .eq("id", req.params.attemptId)
      .single();
    if (attemptErr) throw attemptErr;
    if (!attempt) return res.status(404).json({ error: "Attempt not found" });

    // answers + questions
    const { data: answers, error: answersErr } = await supabase
      .from("student_quiz_answers")
      .select("*, quiz_questions(question_text, question_type, options, correct_answer)")
      .eq("attempt_id", req.params.attemptId);

    if (answersErr) throw answersErr;

    res.json({ ...attempt, answers });
  } catch (err) {
    console.error("Error getting attempt details:", err);
    res.status(500).json({ error: "Failed to get attempt details" });
  }
});

// ✅ Start new quiz attempt
router.post("/quiz/:quizId/start", async (req, res) => {
  try {
    const { student_id } = req.body;

    // check existing
    const { data: existing } = await supabase
      .from("student_quiz_attempts")
      .select("*")
      .eq("quiz_id", req.params.quizId)
      .eq("student_id", student_id)
      .eq("status", "Pending");

    if (existing && existing.length > 0) {
      return res.status(400).json({ error: "You have an ongoing attempt" });
    }

    // create new attempt
    const { data, error } = await supabase
      .from("student_quiz_attempts")
      .insert([{ quiz_id: req.params.quizId, student_id }])
      .select("id")
      .single();

    if (error) throw error;
    res.status(201).json({ id: data.id });
  } catch (err) {
    console.error("Error starting quiz attempt:", err);
    res.status(500).json({ error: "Failed to start quiz attempt" });
  }
});

// ✅ Submit quiz attempt
router.post("/attempts/:attemptId/submit", async (req, res) => {
  try {
    const { answers, time_taken } = req.body;
    let totalScore = 0;

    for (const answer of answers) {
      // get question
      const { data: question } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("id", answer.question_id)
        .single();

      const isCorrect = answer.selected_answer === question.correct_answer;
      const pointsEarned = isCorrect ? question.points : 0;
      totalScore += pointsEarned;

      await supabase.from("student_quiz_answers").insert([
        {
          attempt_id: req.params.attemptId,
          question_id: answer.question_id,
          selected_answer: answer.selected_answer,
          is_correct: isCorrect,
          points_earned: pointsEarned,
        },
      ]);
    }

    // update attempt
    await supabase
      .from("student_quiz_attempts")
      .update({
        status: "Completed",
        score: totalScore,
        completed_at: new Date().toISOString(),
        time_taken,
      })
      .eq("id", req.params.attemptId);

    res.json({ message: "Quiz submitted successfully", score: totalScore });
  } catch (err) {
    console.error("Error submitting quiz:", err);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
});

// ✅ Grade quiz attempt (manual)
router.post("/attempts/:attemptId/grade", async (req, res) => {
  try {
    const { score, feedback, instructor_id } = req.body;

    await supabase
      .from("student_quiz_attempts")
      .update({ status: "Graded", score })
      .eq("id", req.params.attemptId);

    await supabase.from("quiz_grades").insert([
      {
        attempt_id: req.params.attemptId,
        instructor_id,
        points_earned: score,
        feedback,
      },
    ]);

    res.json({ message: "Quiz graded successfully" });
  } catch (err) {
    console.error("Error grading quiz:", err);
    res.status(500).json({ error: "Failed to grade quiz" });
  }
});

// ✅ Auto-grade quiz attempt
router.post("/attempts/:attemptId/auto-grade", async (req, res) => {
  try {
    const { instructor_id } = req.body;
    console.log("the call hova ha",req.body)

    // get answers + question points
    const { data: answers, error: answersErr } = await supabase
      .from("student_quiz_answers")
      .select("is_correct, quiz_questions(points)")
      .eq("attempt_id", req.params.attemptId);

    if (answersErr) throw answersErr;

    const totalScore = answers.reduce((sum, ans) => {
      return sum + (ans.is_correct ? ans.quiz_questions.points : 0);
    }, 0);

    // update attempt
    await supabase
      .from("student_quiz_attempts")
      .update({ status: "Graded", score: totalScore })
      .eq("id", req.params.attemptId);

    await supabase.from("quiz_grades").insert([
      {
        attempt_id: req.params.attemptId,
        instructor_id,
        points_earned: totalScore,
        feedback: "Auto-graded",
      },
    ]);

    res.json({ message: "Quiz auto-graded successfully", score: totalScore });
  } catch (err) {
    console.error("Error auto-grading quiz:", err);
    res.status(500).json({ error: "Failed to auto-grade quiz" });
  }
});

export default router;
