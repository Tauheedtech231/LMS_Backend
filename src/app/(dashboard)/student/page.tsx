// dashboard/student/page.tsx
import OverviewCards from "./OverviewCards";
import ModuleList from "./modules/modulelist";
import ProgressTracker from "./progress/page";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors">
      
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 text-white rounded-xl p-6 shadow-md dark:shadow-lg flex flex-col md:flex-row md:items-center justify-between mb-8 transition-colors">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome Back, Student
        </h1>
        <p className="mt-2 md:mt-0 text-sm md:text-base text-white/90 dark:text-white/80">
          Here’s an overview of your courses, assignments, and progress.
        </p>
      </div>

      {/* Top Stats */}
      <OverviewCards />

      {/* Progress Tracker */}
      <ProgressTracker />

      {/* Modules Preview */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Enrolled Modules
        </h2>
        <ModuleList />
      </div>
    </div>
  );
}
