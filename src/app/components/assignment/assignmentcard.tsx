"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Assignment } from "@/app/(dashboard)/student/assignments/data/assignment";
import { Calendar, BookOpen, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface AssignmentCardProps {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Pending":
        return { color: "bg-blue-100/50 text-blue-800", icon: <FileText size={12} /> };
      case "Submitted":
        return { color: "bg-blue-200/50 text-blue-900", icon: <FileText size={12} /> };
      case "Graded":
        return { color: "bg-green-100/50 text-green-800", icon: <CheckCircle size={12} /> };
      case "Overdue":
        return { color: "bg-red-100/50 text-red-800", icon: <AlertCircle size={12} /> };
      default:
        return { color: "bg-gray-100/50 text-gray-800", icon: <FileText size={12} /> };
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const statusConfig = getStatusConfig(assignment.status);
  const isOverdue = assignment.status === "Overdue";
  const isGraded = assignment.status === "Graded";
  const isSubmitted = assignment.status === "Submitted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: "0 12px 25px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.25 }}
      className="bg-white/30 backdrop-blur-md rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-sm text-blue-800">{assignment.title}</h3>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${statusConfig.color}`}>
            {statusConfig.icon}
            {assignment.status}
          </span>
        </div>

        {/* Module */}
        <div className="flex items-center gap-1 text-xs text-blue-700 mb-1">
          <BookOpen size={14} />
          <span>{assignment.module}</span>
        </div>

        {/* Due Date */}
        <div className="flex items-center gap-1 text-xs text-blue-700 mb-2">
          <Calendar size={14} />
          <span className={isOverdue ? "text-red-600 font-medium" : ""}>
            Due: {formatDate(assignment.dueDate)}
            {isOverdue && " (Overdue)"}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-blue-700 line-clamp-2 mb-2">{assignment.description}</p>

        {/* Grade info */}
        {isGraded && assignment.submission?.grade !== undefined && (
          <div className="flex items-center justify-between bg-blue-50/30 p-2 rounded border border-blue-100 mb-2 text-xs text-blue-700">
            <span className="font-medium">
              Grade: <span className="font-semibold text-blue-800">{assignment.submission.grade}/{assignment.maxPoints}</span>
            </span>
            <span>{new Date(assignment.submission.gradedAt!).toLocaleDateString()}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-blue-600">
            {assignment.resources.length} resource{assignment.resources.length !== 1 ? 's' : ''} • {assignment.maxPoints} points
          </span>

          <Link href={`/student/assignments/${assignment.id}`}>
            <button className="px-3 py-1 rounded-lg text-xs font-medium transition-all bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm hover:shadow-md">
              {isGraded ? "View Feedback" : isSubmitted ? "View Submission" : "View Assignment"}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
