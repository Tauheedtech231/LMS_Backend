import { assignments } from "@/app/(dashboard)/student/assignments/data/assignment";
import AssignmentCard from "./assignmentcard";

export default function AssignmentList() {
  // Sort assignments: overdue first, then pending, then submitted, then graded
  const sortedAssignments = [...assignments].sort((a, b) => {
    const statusOrder = { Overdue: 0, Pending: 1, Submitted: 2, Graded: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sortedAssignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}