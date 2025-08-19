"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Quiz } from "@/app/(dashboard)/student/quizez/data/quizez";
import { Calendar, BookOpen, Award, Clock, FileText } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const statusColor = "bg-blue-600 text-white border-transparent";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getButtonText = () => {
    if (quiz.status === "Pending") return "Start Quiz";
    if (quiz.status === "Completed") return "Review Answers";
    return "View Results";
  };

  const getButtonVariant = () => "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-blue-200 overflow-hidden flex flex-col h-full"
    >
      <div className="p-5 flex-1">
        {/* Header with status badge */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-blue-800 leading-tight">{quiz.title}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
            {quiz.status}
          </span>
        </div>
        
        {/* Module name */}
        <div className="flex items-center gap-2 text-sm text-blue-700 mb-3">
          <BookOpen size={16} className="text-blue-500" />
          <span className="line-clamp-1">{quiz.module}</span>
        </div>
        
        {/* Due date */}
        <div className="flex items-center gap-2 text-sm text-blue-700 mb-3">
          <Calendar size={16} className="text-blue-500" />
          <span>Due: {formatDate(quiz.dueDate)}</span>
        </div>
        
        {/* Quiz metadata */}
        <div className="flex items-center gap-4 text-xs text-blue-600 mb-4">
          <div className="flex items-center gap-1">
            <FileText size={14} />
            <span>{quiz.questions.length} Questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{quiz.timeLimit} Minutes</span>
          </div>
          <div className="flex items-center gap-1">
            <Award size={14} />
            <span>{quiz.totalPoints} Points</span>
          </div>
        </div>
        
        {/* Score display if graded */}
        {quiz.status === "Graded" && quiz.score !== undefined && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">Your Score</span>
              <span className="text-lg font-bold text-blue-800">{quiz.score}/{quiz.totalPoints}</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(quiz.score / quiz.totalPoints) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with action button */}
      <div className="px-5 py-4 bg-blue-50 border-t border-blue-200">
        <div className="flex justify-between items-center">
          <div className="text-xs text-blue-600">
            {quiz.status === "Pending" ? "Not started" : quiz.status === "Completed" ? "Submitted" : "Graded"}
          </div>
          
          <Link href={`/student/quizez/${quiz.id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getButtonVariant()}`}
            >
              {getButtonText()}
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
