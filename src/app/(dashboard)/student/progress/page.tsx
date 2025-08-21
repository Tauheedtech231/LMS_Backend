"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, Star, TrendingUp, Award, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProgressTracker() {
  const [progress, setProgress] = useState({
    completed: 5,
    total: 10,
    hours: 12,
    points: 150,
    streak: 7,
    level: 3
  });

  const [isDetailedView, setIsDetailedView] = useState(false);
  const percentage = (progress.completed / progress.total) * 100;

  // Simulate incremental progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => ({ ...prev, hours: prev.hours + 0.1 }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      
      transition={{ duration: 0.4 }}
      className="flex flex-col flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl  border border-gray-100 dark:border-gray-700 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <TrendingUp size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Learning Progress
          </h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          {progress.completed}/{progress.total} Modules
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {Math.round(percentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 relative"
          >
            <div className="absolute right-0 top-0 h-3 w-3 bg-white rounded-full opacity-80"></div>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "Completed", value: progress.completed, icon: <CheckCircle size={16} className="text-green-600 dark:text-green-400" />, bg: "bg-green-100 dark:bg-green-900/30" },
          { label: "Hours", value: progress.hours.toFixed(1), icon: <Clock size={16} className="text-amber-600 dark:text-amber-400" />, bg: "bg-amber-100 dark:bg-amber-900/30" },
          { label: "Points", value: progress.points, icon: <Star size={16} className="text-purple-600 dark:text-purple-400" />, bg: "bg-purple-100 dark:bg-purple-900/30" },
          { label: "Level", value: progress.level, icon: <Award size={16} className="text-blue-600 dark:text-blue-400" />, bg: "bg-blue-100 dark:bg-blue-900/30" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            className={`flex items-center gap-3 p-3 ${stat.bg} rounded-lg`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="p-2 rounded-lg bg-white/20">{stat.icon}</div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toggle Detailed View */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-500 dark:text-gray-400">Progress breakdown</span>
        <button
          onClick={() => setIsDetailedView(!isDetailedView)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isDetailedView ? 'Hide details' : 'Show details'}
        </button>
      </div>

      {/* Detailed Progress */}
      <AnimatePresence>
        {isDetailedView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Last 7 days activity</span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">{progress.streak} day streak</span>
              </div>
              <div className="flex justify-between items-end h-12 gap-1">
                {[40, 65, 30, 80, 60, 75, 90].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="w-8 bg-gradient-to-t from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-t-md"
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <div className="mt-auto flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-xs shadow-sm"
        >
          <BarChart3 size={14} />
          View Detailed Report
        </motion.button>
      </div>
    </motion.div>
  );
}
