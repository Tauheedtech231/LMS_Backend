// components/PerformanceOverview.tsx
"use client";

import React from "react";
import { Engagement } from "../types";

interface PerformanceOverviewProps {
  data: Engagement[];
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h4 className="mb-4 font-semibold text-blue-600 dark:text-blue-400">
        Performance Overview
      </h4>

      <div className="space-y-4">
        {data.map((d, i) => {
          const score = Math.min(
            100,
            Math.round((d.activeStudents / 100) * (d.timeSpent / 10))
          );

          return (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-600 dark:text-blue-400">{d.date}</span>
                <span className="font-medium text-blue-800 dark:text-blue-300">
                  {score}%
                </span>
              </div>
              <div className="w-full bg-blue-200/30 rounded-full h-3 dark:bg-blue-900/50">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceOverview;
