import AssignmentList from "@/app/components/assignment/assignmentlist";
import { FileText } from "lucide-react";

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
            <FileText className="text-blue-600 dark:text-blue-300" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">Course Assignments</h1>
            <p className="text-blue-600 dark:text-blue-400">
              Access, review, and submit your course assignments efficiently.
            </p>
          </div>
        </div>

        <AssignmentList />
      </div>
    </div>
  );
}
