import { quizzes } from "@/app/(dashboard)/student/quizez/data/quizez";
import QuizCard from "./quizcard";

export default function QuizList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}