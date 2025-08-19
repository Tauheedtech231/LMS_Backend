// components/ProgressTracker.tsx
"use client";

import { motion } from "framer-motion";

export default function ProgressTracker() {
  const progress = {
    completed: 5,
    total: 10,
    hours: 12,
    points: 150,
  };

  const percentage = (progress.completed / progress.total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
    >
      <h3 className="text-base md:text-lg font-semibold text-blue-600 mb-3">
        Learning Progress
      </h3>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-gray-700 text-sm">
        <div className="flex flex-col items-start">
          <span className="font-medium text-gray-800">Modules Completed</span>
          <span>{progress.completed} / {progress.total} ({Math.round(percentage)}%)</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-medium text-gray-800">Study Hours</span>
          <span>{progress.hours} hrs</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-medium text-gray-800">Points Earned</span>
          <span>{progress.points}</span>
        </div>
      </div>
    </motion.div>
  );
}
