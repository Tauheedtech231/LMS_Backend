"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quiz } from "@/app/(dashboard)/student/quizez/data/quizez";
import { ChevronLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface QuizDetailsProps {
  quiz: Quiz;
}

export default function QuizDetails({ quiz }: QuizDetailsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // in seconds

  useEffect(() => {
    if (quiz.status === "Pending" && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quiz.status, isSubmitted]);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });

    const calculatedScore = Math.round((correctCount / quiz.questions.length) * quiz.totalPoints);
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const navigateToQuestion = (index: number) => setCurrentQuestion(index);

  if (quiz.status === "Completed" || quiz.status === "Graded") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Link href="/student/quizez" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mb-6">
          <ChevronLeft size={20} />
          Back to Quizzes
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-200 dark:border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">{quiz.title}</h1>
          <p className="text-blue-700 dark:text-blue-400 mb-6">{quiz.module}</p>

          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-gray-700 rounded-lg p-6 text-center mb-6">
            <CheckCircle size={48} className="text-blue-500 dark:text-blue-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">Quiz Completed</h2>
            <p className="text-blue-700 dark:text-blue-400">Your score: <span className="font-bold">{quiz.score}/{quiz.totalPoints}</span></p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">Question Review</h3>
            {quiz.questions.map((q, index) => (
              <div key={q.id} className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">{index + 1}. {q.question}</h4>
                <div className="space-y-2">
                  {q.options.map(option => (
                    <div
                      key={option}
                      className={`p-3 rounded-lg border ${
                        option === q.correctAnswer
                          ? "bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-300"
                          : answers[q.id] === option
                            ? "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-600 text-red-800 dark:text-red-300"
                            : "bg-white dark:bg-gray-700 border-blue-200 dark:border-gray-600 text-blue-700 dark:text-blue-400"
                      }`}
                    >
                      {option}
                      {option === q.correctAnswer && <CheckCircle size={16} className="inline-block ml-2 text-blue-500 dark:text-blue-300" />}
                      {answers[q.id] === option && option !== q.correctAnswer && <XCircle size={16} className="inline-block ml-2 text-red-500 dark:text-red-300" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Link href="/student/quizez" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
          <ChevronLeft size={20} />
          Back to Quizzes
        </Link>

        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg">
          <Clock size={18} />
          <span className="font-medium">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-200 dark:border-gray-700 overflow-hidden">
        {/* Progress bar */}
        <div className="h-2 bg-blue-100 dark:bg-gray-700">
          <div
            className="h-full bg-blue-600 dark:bg-blue-500 transition-all"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">{quiz.title}</h1>
          <p className="text-blue-700 dark:text-blue-400 mb-6">{quiz.module}</p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </h3>

            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6">
              <p className="text-blue-800 dark:text-blue-300 font-medium">{quiz.questions[currentQuestion].question}</p>
            </div>

            <div className="space-y-3">
              {quiz.questions[currentQuestion].options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(quiz.questions[currentQuestion].id, option)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    answers[quiz.questions[currentQuestion].id] === option
                      ? "bg-blue-100 dark:bg-blue-800 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-300"
                      : "bg-white dark:bg-gray-700 border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-400"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 rounded-lg border border-blue-200 dark:border-gray-600 text-blue-700 dark:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigateToQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm ${
                    currentQuestion === index
                      ? "bg-blue-600 dark:bg-blue-500 text-white"
                      : answers[quiz.questions[index].id]
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300"
                        : "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(quiz.questions.length - 1, prev + 1))}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      {isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full text-center"
          >
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Quiz Submitted!</h2>
            <p className="text-blue-700 dark:text-blue-400 mb-2">Your score: <span className="font-semibold">{score}/{quiz.totalPoints}</span></p>
            <p className="text-blue-700 dark:text-blue-400 mb-6">{score >= quiz.totalPoints * 0.7 ? "Great job!" : "Keep practicing!"}</p>
            <Link href="/student/quizez">
              <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
                Return to Quizzes
              </button>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
