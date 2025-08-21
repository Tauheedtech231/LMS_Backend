"use client";

import React from "react";
import { Users, DollarSign, BookOpen, Activity } from "lucide-react";

interface DashboardCardsProps {
  students: number;
  revenue: number;
  courses: number;
  engagement: number;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  students,
  revenue,
  courses,
  engagement,
}) => {
  const cards = [
    {
      title: "Total Students",
      value: students,
      icon: <Users className="w-5 h-5 text-white" />,
      trend: "+12%",
      trendPositive: true,
    },
    {
      title: "Total Revenue",
      value: `$${revenue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-white" />,
      trend: "+23%",
      trendPositive: true,
    },
    {
      title: "Total Courses",
      value: courses,
      icon: <BookOpen className="w-5 h-5 text-white" />,
      trend: "+5%",
      trendPositive: true,
    },
    {
      title: "Engagement Rate",
      value: `${engagement}%`,
      icon: <Activity className="w-5 h-5 text-white" />,
      trend: "-2%",
      trendPositive: false,
    },
  ];

  return (
    <div className="grid gap-5 mb-8 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative flex flex-col p-5 bg-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 group overflow-hidden"
        >
          {/* Background circle */}
          <div className="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 rounded-full bg-blue-100 opacity-20 dark:bg-blue-900"></div>

          {/* Icon and trend */}
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
              {card.icon}
            </div>
            <span
              className={`text-xs font-semibold ${
                card.trendPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {card.trend}
            </span>
          </div>

          {/* Title and value */}
          <div>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-0.5">
              {card.title}
            </p>
            <p className="text-xl font-bold text-blue-800 dark:text-blue-300">
              {card.value}
            </p>
          </div>

          {/* Hover bottom border */}
          <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
