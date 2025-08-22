"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Clock, BookOpen, MessageSquare, Send } from "lucide-react";

interface StudentActivity {
  id: string;
  type: "login" | "module_view" | "assignment_submit" | "quiz_complete";
  timestamp: string;
  details: string;
}

interface StudentAssignment {
  id: string;
  title: string;
  course: string;
  module: string;
  submittedOn: string;
  status: "pending" | "graded" | "late";
  grade?: number;
}

export default function StudentDetail() {
  const params = useParams();
  const studentId = params.id as string;
  
  const [student, setStudent] = useState({
    id: studentId,
    name: studentId === "1" ? "Ahmed Khan" : 
          studentId === "2" ? "Fatima Ali" : "Usman Malik",
    email: studentId === "1" ? "ahmed@example.com" : 
           studentId === "2" ? "fatima@example.com" : "usman@example.com",
    avatar: studentId === "1" ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" : 
            studentId === "2" ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" : 
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    enrolledCourses: [
      { id: "1", title: "Introduction to HTML & CSS", progress: 75 },
      { id: "2", title: "Programming Fundamentals", progress: 45 },
    ],
    totalStudyHours: 28,
    lastActive: "2 hours ago",
    joinedOn: "2023-05-15",
    overallProgress: studentId === "1" ? 75 : 
                     studentId === "2" ? 92 : 45,
  });

  const [activities, setActivities] = useState<StudentActivity[]>([
    {
      id: "act1",
      type: "login",
      timestamp: "2023-08-10T09:30:00",
      details: "Logged in to the platform"
    },
    {
      id: "act2",
      type: "module_view",
      timestamp: "2023-08-10T09:35:00",
      details: "Viewed Module: Getting Started with HTML"
    },
    {
      id: "act3",
      type: "assignment_submit",
      timestamp: "2023-08-10T10:15:00",
      details: "Submitted Assignment: HTML Practice Assignment"
    },
    {
      id: "act4",
      type: "quiz_complete",
      timestamp: "2023-08-10T11:00:00",
      details: "Completed Quiz: HTML Basics Quiz"
    },
    {
      id: "act5",
      type: "module_view",
      timestamp: "2023-08-09T14:20:00",
      details: "Viewed Module: CSS Fundamentals"
    },
  ]);

  const [assignments, setAssignments] = useState<StudentAssignment[]>([
    {
      id: "asn1",
      title: "HTML Practice Assignment",
      course: "Introduction to HTML & CSS",
      module: "Getting Started with HTML",
      submittedOn: "2023-08-10",
      status: "graded",
      grade: 85
    },
    {
      id: "asn2",
      title: "CSS Layout Assignment",
      course: "Introduction to HTML & CSS",
      module: "CSS Fundamentals",
      submittedOn: "2023-08-05",
      status: "graded",
      grade: 92
    },
    {
      id: "asn3",
      title: "JavaScript Basics Quiz",
      course: "Programming Fundamentals",
      module: "Introduction to JavaScript",
      submittedOn: "2023-08-01",
      status: "graded",
      grade: 78
    },
    {
      id: "asn4",
      title: "JavaScript Functions Assignment",
      course: "Programming Fundamentals",
      module: "JavaScript Functions",
      submittedOn: "2023-08-12",
      status: "pending"
    },
  ]);

  const [feedback, setFeedback] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    
    // In a real app, this would send the feedback to an API
    alert(`Feedback sent to ${student.name}: ${feedback}`);
    setFeedback("");
  };

  return (
    <div className="space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-6 transition-colors">
      {/* Student Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{student.email}</p>
                <p className="text-sm mt-1">Joined: {formatDate(student.joinedOn)}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                  <BookOpen className="h-4 w-4" />
                  <span>{student.enrolledCourses.length} Courses</span>
                </div>
                <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>{student.totalStudyHours} Study Hours</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Overall Progress</p>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${student.overallProgress > 70 ? 'bg-green-500' : student.overallProgress > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${student.overallProgress}%` }}
                    ></div>
                  </div>
                  <span>{student.overallProgress}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Last Active</p>
                <p>{student.lastActive}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Assignments</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Feedback</span>
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>Courses this student is currently enrolled in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {student.enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${course.progress > 70 ? 'bg-green-500' : course.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span>{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignments & Quizzes</CardTitle>
              <CardDescription>Track student submissions and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4">Assignment</th>
                      <th className="text-left py-3 px-4">Course</th>
                      <th className="text-left py-3 px-4">Submitted</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Grade</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((assignment) => (
                      <tr key={assignment.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.module}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{assignment.course}</td>
                        <td className="py-3 px-4">{formatDate(assignment.submittedOn)}</td>
                        <td className="py-3 px-4">
                          <span 
                            className={`inline-block px-2 py-1 text-xs rounded-full ${assignment.status === 'graded' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                            assignment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
                            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}
                          >
                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {assignment.grade !== undefined ? `${assignment.grade}/100` : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track student engagement and platform usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-3 border-b dark:border-gray-700 last:border-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.type === 'login' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 
                      activity.type === 'module_view' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' : 
                      activity.type === 'assignment_submit' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                      'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}`}
                    >
                      {activity.type === 'login' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      ) : activity.type === 'module_view' ? (
                        <BookOpen className="h-4 w-4" />
                      ) : activity.type === 'assignment_submit' ? (
                        <FileText className="h-4 w-4" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{activity.details}</p>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{formatDateTime(activity.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {activity.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Feedback</CardTitle>
              <CardDescription>Provide personalized feedback to this student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="feedback">Feedback Message</Label>
                  <Textarea 
                    id="feedback" 
                    placeholder="Write your feedback here..." 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
                <Button onClick={handleSendFeedback} className="w-full md:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Feedback</CardTitle>
              <CardDescription>History of feedback provided to this student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Assignment Feedback: HTML Practice Assignment</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">August 10, 2023</span>
                  </div>
                  <p className="text-sm">Great work on your HTML assignment! Your code was well-structured and you demonstrated a good understanding of semantic HTML elements. For future assignments, try to add more comments to explain your code.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Course Progress: Introduction to HTML & CSS</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">August 5, 2023</span>
                  </div>
                  <p className="text-sm">You re making excellent progress in this course. Your CSS layouts show creativity and attention to detail. Keep up the good work!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}