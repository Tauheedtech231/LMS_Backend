import { notFound } from "next/navigation";
import { quizzes } from "@/app/(dashboard)/student/quizez/data/quizez";
import QuizDetails from "@/app/components/quizez/quizdetails";

interface QuizPageProps {
  params: {
    id: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const quizId = parseInt(params.id);
  const quiz = quizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    notFound();
  }
  
  return <QuizDetails quiz={quiz} />;
}

export function generateStaticParams() {
  return quizzes.map(quiz => ({
    id: quiz.id.toString(),
  }));
}