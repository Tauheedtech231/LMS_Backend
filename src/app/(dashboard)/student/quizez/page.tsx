import QuizList from "@/app/components/quizez/quizlist";
import { BookOpen } from "lucide-react";

export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-blue-50 p-3 rounded-lg shadow-sm">
            <BookOpen className="text-blue-600" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Quizzes</h1>
            <p className="text-blue-600 text-sm mt-1">
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
