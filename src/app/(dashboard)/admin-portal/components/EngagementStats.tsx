"use client";

import React from "react";
import { motion } from "framer-motion";
import { Engagement } from "../types";
import { Users, Clock } from "lucide-react";

interface EngagementStatsProps {
  data: Engagement[];
}

const EngagementStats: React.FC<EngagementStatsProps> = ({ data }) => {
  console.log("the data",data)
  const latest = data[data.length - 1];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <h4 className="text-base font-semibold mb-3 tracking-wide text-blue-600 dark:text-blue-400">
        Engagement Stats
      </h4>

      <div className="space-y-3">
        {/* Active Students */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
              <span>Active Students</span>
            </div>
            <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
              {latest.activeStudents}
            </span>
          </div>
          <motion.div
            className="h-1.5 bg-blue-200/30 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(latest.activeStudents, 100)}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="h-1.5 bg-blue-500 rounded-full shadow-sm"></div>
          </motion.div>
        </div>

        {/* Time Spent */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <Clock className="w-4 h-4" />
              <span>Time Spent (hours)</span>
            </div>
            <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
              {latest.timeSpent}h
            </span>
          </div>
          <motion.div
            className="h-1.5 bg-blue-200/30 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(latest.timeSpent * 10, 100)}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="h-1.5 bg-blue-500 rounded-full shadow-sm"></div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
        Real-time engagement metrics updated automatically.
      </div>
    </div>
  );
};

export default EngagementStats;
