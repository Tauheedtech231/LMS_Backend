"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, BookOpen, Award, Clock, FileText } from "lucide-react";

interface QuizType {
  id: number;
  title: string;
  instructions: string;
  total_points: number;
  time_limit: number;
  due_date: string;
  coursemodule_id: number;
  instructor_id: number;
  created_at: string;
  status?: "Pending" | "Completed" | "Graded";
  score?: number | null;
  questions?: number;
  module?: string;
  timeLimit?: number;
  totalPoints?: number;
  dueDate?: string;
}

interface QuizCardProps {
  quiz: QuizType;
}

function QuizCard({ quiz }: QuizCardProps) {
  const statusColor = "bg-blue-600 text-white border-transparent dark:bg-blue-500";

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getButtonText = () => {
    if (quiz.status === "Pending") return "Start Quiz";
    if (quiz.status === "Completed") return "Review Answers";
    return "View Results";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-200 dark:border-gray-700 overflow-hidden flex flex-col h-full"
    >
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-blue-800 dark:text-blue-200 leading-tight">{quiz.title}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
            {quiz.status || "Pending"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300 mb-3">
          <BookOpen size={16} className="text-blue-500 dark:text-blue-200" />
          <span className="line-clamp-1">Module: {quiz.coursemodule_id}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300 mb-3">
          <Calendar size={16} className="text-blue-500 dark:text-blue-200" />
          <span>Due: {formatDate(quiz.due_date)}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-blue-600 dark:text-blue-300 mb-4">
          {/* <div className="flex items-center gap-1">
            <FileText size={14} />
            <span>{quiz.questions || 0} Questions</span>
          </div> */}
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{quiz.time_limit} Minutes</span>
          </div>
          <div className="flex items-center gap-1">
            <Award size={14} />
            <span>{quiz.total_points} Points</span>
          </div>
        </div>

        {quiz.status === "Graded" && quiz.score !== undefined && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Your Score</span>
              <span className="text-lg font-bold text-blue-800 dark:text-blue-200">{quiz.score}/{quiz.total_points}</span>
            </div>
            <div className="w-full bg-blue-100 dark:bg-gray-600 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                style={{ width: `${((quiz.score ?? 0) / quiz.total_points) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 py-4 bg-blue-50 dark:bg-gray-700 border-t border-blue-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <div className="text-xs text-blue-600 dark:text-blue-300">
            {quiz.status === "Pending" ? "Not started" : quiz.status === "Completed" ? "Submitted" : "Graded"}
          </div>
          <Link href={`/student/quizez/${quiz.id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              {getButtonText()}
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Grid layout component to display multiple QuizCards
export function QuizCardGrid({ quizzes }: { quizzes: QuizType[] }) {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Quizzes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your progress and upcoming assessments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quizzes.map((quiz, index) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
        
        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <div className="text-blue-500 mb-4">
                <FileText size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No quizzes available</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You don t have any quizzes assigned at the moment. Check back later for new assignments.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizCard;