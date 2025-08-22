"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Download, Send, Check, X } from "lucide-react";

interface Submission {
  id: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  submittedOn: string;
  status: "pending" | "graded";
  grade?: number;
  feedback?: string;
  attachmentUrl?: string;
}

export default function AssignmentGrading() {
  const params = useParams();
  const assignmentId = params.id as string;
  
  // Mock assignment data - in a real app, this would be fetched from an API
  const [assignment, setAssignment] = useState({
    id: assignmentId,
    title: assignmentId === "1" ? "Web Development Fundamentals" : 
           assignmentId === "2" ? "JavaScript Basics Quiz" : "Database Design Project",
    course: assignmentId === "1" ? "Introduction to HTML & CSS" : 
            assignmentId === "2" ? "Programming Fundamentals" : "Database Management",
    dueDate: "2023-08-15",
    totalPoints: 100,
    description: "Create a simple webpage using HTML and CSS that includes a header, navigation menu, main content area, and footer. The page should be responsive and follow best practices for semantic HTML.",
    submissions: [
      {
        id: "sub1",
        studentName: "Ahmed Khan",
        studentEmail: "ahmed@example.com",
        studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        submittedOn: "2023-08-10T14:30:00",
        status: "pending",
        attachmentUrl: "/submissions/ahmed-html-assignment.zip"
      },
      {
        id: "sub2",
        studentName: "Fatima Ali",
        studentEmail: "fatima@example.com",
        studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        submittedOn: "2023-08-09T10:15:00",
        status: "graded",
        grade: 92,
        feedback: "Excellent work! Your HTML structure is clean and semantic. The CSS styling is well-organized and your responsive design works perfectly across different screen sizes. Keep up the great work!",
        attachmentUrl: "/submissions/fatima-html-assignment.zip"
      },
      {
        id: "sub3",
        studentName: "Usman Malik",
        studentEmail: "usman@example.com",
        studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        submittedOn: "2023-08-11T09:45:00",
        status: "pending",
        attachmentUrl: "/submissions/usman-html-assignment.zip"
      },
    ] as Submission[]
  });

  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeInput, setGradeInput] = useState<string>("");
  const [feedbackInput, setFeedbackInput] = useState<string>("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setGradeInput(submission.grade?.toString() || "");
    setFeedbackInput(submission.feedback || "");
  };

  const handleSubmitGrade = () => {
    if (!selectedSubmission) return;
    
    const grade = parseInt(gradeInput);
    if (isNaN(grade) || grade < 0 || grade > assignment.totalPoints) {
      alert(`Please enter a valid grade between 0 and ${assignment.totalPoints}`);
      return;
    }
    
    // Update the submission in our state
    const updatedSubmissions = assignment.submissions.map(sub => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: "graded" as const,
          grade,
          feedback: feedbackInput
        };
      }
      return sub;
    });
    
    setAssignment({
      ...assignment,
      submissions: updatedSubmissions
    });
    
    // Update the selected submission
    setSelectedSubmission({
      ...selectedSubmission,
      status: "graded",
      grade,
      feedback: feedbackInput
    });
    
    // In a real app, this would send the grade and feedback to an API
    alert(`Grade and feedback submitted for ${selectedSubmission.studentName}`);
  };

  return (
    <div className="space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-6 transition-colors">
      {/* Assignment Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{assignment.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Course: {assignment.course}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full">
              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
              <span>{assignment.submissions.length} Submissions</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Assignment Description</h2>
          <p className="text-gray-700 dark:text-gray-300">{assignment.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Student Submissions</CardTitle>
              <CardDescription>Select a submission to grade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignment.submissions.map((submission) => (
                  <div 
                    key={submission.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedSubmission?.id === submission.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    onClick={() => handleSelectSubmission(submission)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img src={submission.studentAvatar} alt={submission.studentName} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{submission.studentName}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${submission.status === 'graded' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}`}>
                            {submission.status === 'graded' ? 'Graded' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{submission.studentEmail}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Submitted: {formatDate(submission.submittedOn)}</span>
                          {submission.status === 'graded' && (
                            <span className="text-xs font-medium">{submission.grade}/{assignment.totalPoints}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grading Area */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Grading: {selectedSubmission.studentName}</CardTitle>
                    <CardDescription>Submitted on {formatDate(selectedSubmission.submittedOn)}</CardDescription>
                  </div>
                  {selectedSubmission.attachmentUrl && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Submission Preview (placeholder) */}
                  <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
                      <p className="mt-2 text-gray-500 dark:text-gray-400">Submission preview would appear here</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Download the submission to view full content</p>
                    </div>
                  </div>

                  {/* Grading Form */}
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="grade">Grade (out of {assignment.totalPoints})</Label>
                      <Input 
                        id="grade" 
                        type="number" 
                        min="0" 
                        max={assignment.totalPoints} 
                        placeholder="Enter grade" 
                        value={gradeInput}
                        onChange={(e) => setGradeInput(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="feedback">Feedback</Label>
                      <Textarea 
                        id="feedback" 
                        placeholder="Provide feedback to the student" 
                        className="min-h-[150px]"
                        value={feedbackInput}
                        onChange={(e) => setFeedbackInput(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitGrade}>
                        <Check className="h-4 w-4 mr-2" />
                        Submit Grade
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
                <h3 className="mt-2 text-lg font-medium">Select a Submission</h3>
                <p className="text-gray-500 dark:text-gray-400">Choose a student submission from the list to start grading</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}