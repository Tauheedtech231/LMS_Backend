"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, CheckCircle, Award } from "lucide-react";

export default function OverviewCards() {
  const stats = [
    { title: "Completed Modules", value: 5, icon: <BookOpen size={22} />, color: "from-blue-400 to-blue-600" },
    { title: "Pending Tasks", value: 3, icon: <CheckCircle size={22} />, color: "from-teal-400 to-teal-600" },
    { title: "Study Hours", value: "12h", icon: <Clock size={22} />, color: "from-indigo-400 to-indigo-600" },
    { title: "Points", value: 120, icon: <Award size={22} />, color: "from-purple-400 to-purple-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`relative bg-gradient-to-br ${s.color} text-white p-4 rounded-xl shadow-md hover:scale-105 transform transition-transform duration-300 flex flex-col justify-between`}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-xs md:text-sm font-semibold uppercase">{s.title}</p>
            <div>{s.icon}</div>
          </div>

          {/* Value */}
          <h3 className="text-lg md:text-xl font-bold mt-3">{s.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}
