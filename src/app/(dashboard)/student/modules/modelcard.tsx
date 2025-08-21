"use client";
import { motion } from "framer-motion";
import { BookOpen, Clock, BarChart2 } from "lucide-react";
import Link from "next/link";

type Props = {
  id: number;
  title: string;
  description: string;
  progress: number;
  estimatedTime: string;
};

export default function ModuleCard({ id, title, description, progress, estimatedTime }: Props) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 25px 35px -5px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
      className="bg-blue-600 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      <div className="p-4 flex flex-col justify-between h-full text-white">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="bg-blue-500 dark:bg-gray-700 p-2 rounded-lg flex items-center justify-center">
            <BookOpen className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base text-white dark:text-blue-200">{title}</h3>
            <p className="mt-1 text-sm text-white/90 dark:text-blue-100">{description}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-white/80 dark:text-blue-100" />
            <span className="text-white/80 dark:text-blue-100">{estimatedTime} to complete</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart2 size={14} className="text-white/80 dark:text-blue-100" />
            <span className="text-white/80 dark:text-blue-100">{progress}% Completed</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 w-full bg-white/30 dark:bg-gray-600 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-2 bg-white dark:bg-blue-500 rounded-full"
          />
        </div>

        {/* Button */}
        <Link href={`/student/modules/${id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-200 font-medium text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
          >
            Open Module
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
