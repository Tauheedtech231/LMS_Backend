import { notFound } from "next/navigation";
import { assignments } from "../data/assignment"; 
import AssignmentDetails from "@/app/components/assignment/assignmentdetails";


interface AssignmentPageProps {
  params: {
    id: string;
  };
}

export default function AssignmentPage({ params }: AssignmentPageProps) {
  const assignmentId = parseInt(params.id);
  const assignment = assignments.find(a => a.id === assignmentId);
  
  if (!assignment) {
    notFound();
  }
  
  return <AssignmentDetails assignment={assignment} />;
}

export function generateStaticParams() {
  return assignments.map(assignment => ({
    id: assignment.id.toString(),
  }));
}