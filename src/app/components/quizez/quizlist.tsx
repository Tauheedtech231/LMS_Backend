"use client";
import { useEffect, useState } from "react";
import QuizCard from "./quizcard";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/quizzes") // Express backend route
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text(); // read response as text for debugging
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Quizzes fetched from backend:", data); // <--- log data here
        setQuizzes(data);
      })
      .catch((err) => {
        console.error("Error fetching quizzes:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!quizzes.length) return <p>No quizzes found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz} quiz={quiz} />
      ))}
    </div>
  );
}
