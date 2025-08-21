"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Assignment } from "@/app/(dashboard)/student/assignments/data/assignment";
import { ChevronLeft, Calendar, Download, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

interface AssignmentDetailsProps {
  assignment: Assignment;
}

export default function AssignmentDetails({ assignment }: AssignmentDetailsProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(assignment.status === "Submitted" || assignment.status === "Graded");
  const [submissionError, setSubmissionError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSubmissionError("");
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setSubmissionError("Please select a file to upload");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = assignment.status === "Overdue";
  const isGraded = assignment.status === "Graded";
  const dueDate = new Date(assignment.dueDate);
  const now = new Date();
  const isPastDue = dueDate < now;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/student/assignments" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 text-sm">
        <ChevronLeft size={18} />
        Back to Assignments
      </Link>
      
      <div className="bg-white dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{assignment.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{assignment.module}</p>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                isOverdue 
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" 
                  : isGraded 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              }`}>
                {isOverdue ? <AlertCircle size={12} /> : isGraded ? <CheckCircle size={12} /> : <FileText size={12} />}
                {assignment.status}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{assignment.maxPoints} points</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
            <Calendar size={14} />
            <span className={isPastDue && !isGraded ? "text-red-600 dark:text-red-400 font-medium" : ""}>
              Due: {formatDate(assignment.dueDate)}
              {isPastDue && !isGraded && " (Past due)"}
            </span>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{assignment.description}</p>
          
          <div className="bg-blue-50/30 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-700">
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1 text-sm">Instructions</h3>
            <p className="text-sm text-blue-700 dark:text-blue-200">{assignment.instructions}</p>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Resources</h2>
          <div className="space-y-2">
            {assignment.resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-2 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-lg">
                    <FileText size={16} className="text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{resource.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{resource.type} {resource.size && `• ${resource.size}`}</p>
                  </div>
                </div>
                <a 
                  href={resource.url} 
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs"
                  download
                >
                  <Download size={14} />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>

        {!isGraded && (
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {isSubmitted ? "Submission Details" : "Submit Assignment"}
            </h2>
            
            {isSubmitted && assignment.submission ? (
              <div className="bg-blue-50/30 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-700 text-sm text-blue-700 dark:text-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-300">Submitted File</p>
                    <p className="text-sm text-blue-700 dark:text-blue-200">{assignment.submission.fileName}</p>
                  </div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded">
                    {assignment.submission.fileSize}
                  </span>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-200">
                  Submitted on {new Date(assignment.submission.submittedAt).toLocaleString()}
                </p>
                {isPastDue && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    Late submission
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Upload your submission</label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer">
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        disabled={isSubmitting}
                      />
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-sm">
                        {selectedFile ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText size={18} className="text-blue-600 dark:text-blue-300" />
                              <span className="font-medium text-gray-800 dark:text-gray-200">{selectedFile.name}</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        ) : (
                          <div className="py-2">
                            <Upload size={20} className="mx-auto text-gray-400 dark:text-gray-500 mb-1" />
                            <p className="text-xs text-gray-600 dark:text-gray-400">Click to select a file or drag & drop</p>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                  {submissionError && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {submissionError}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-1 text-sm ${
                      isSubmitting 
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400" 
                        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white dark:border-gray-200"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload size={14} />
                        Submit
                      </>
                    )}
                  </motion.button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
