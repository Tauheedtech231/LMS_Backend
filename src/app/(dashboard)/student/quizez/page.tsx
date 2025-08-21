"use client";
import QuizList from "@/app/components/quizez/quizlist";
import { BookOpen } from "lucide-react";

export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-blue-50 dark:bg-blue-800 p-3 rounded-lg shadow-sm">
            <BookOpen className="text-blue-600 dark:text-blue-200" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200">Quizzes</h1>
            <p className="text-blue-600 dark:text-blue-300 text-sm mt-1">
              Assess your learning progress with these interactive quizzes
            </p>
          </div>
        </div>
        
        {/* Quiz List */}
        <QuizList />
      </div>
    </div>
  );
}
