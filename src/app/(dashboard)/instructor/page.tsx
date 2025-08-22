"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  avatar: string;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
}

export default function InstructorDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch
    const fetchData = async () => {
      try {
        // In a real implementation, this would be API calls
        const mockStudents: Student[] = [
          {
            id: "1",
            name: "Ahmed Khan",
            email: "ahmed@example.com",
            progress: 75,
            lastActive: "2 hours ago",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          {
            id: "2",
            name: "Fatima Ali",
            email: "fatima@example.com",
            progress: 92,
            lastActive: "1 day ago",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          {
            id: "3",
            name: "Usman Malik",
            email: "usman@example.com",
            progress: 45,
            lastActive: "3 days ago",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
        ];

        const mockAssignments: Assignment[] = [
          {
            id: "1",
            title: "Web Development Fundamentals",
            course: "Introduction to HTML & CSS",
            dueDate: "2023-08-15",
            submissions: 18,
            totalStudents: 25
          },
          {
            id: "2",
            title: "JavaScript Basics Quiz",
            course: "Programming Fundamentals",
            dueDate: "2023-08-20",
            submissions: 12,
            totalStudents: 30
          },
          {
            id: "3",
            title: "Database Design Project",
            course: "Database Management",
            dueDate: "2023-08-25",
            submissions: 5,
            totalStudents: 20
          },
        ];

        setStudents(mockStudents);
        setAssignments(mockAssignments);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading instructor dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4   transition-colors">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 text-white rounded-lg p-4 shadow flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-xl font-bold">
          Welcome, Instructor
        </h1>
        <p className="mt-1 md:mt-0 text-xs text-white/90 dark:text-white/80">
          Manage your courses, students, and assignments
        </p>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 text-xs">
          <TabsTrigger value="students" className="flex items-center gap-1 p-2">
            <Users className="h-3 w-3" />
            <span className="hidden sm:inline">Students</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-1 p-2">
            <FileText className="h-3 w-3" />
            <span className="hidden sm:inline">Assignments</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-1 p-2">
            <BookOpen className="h-3 w-3" />
            <span className="hidden sm:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-1 p-2">
            <MessageSquare className="h-3 w-3" />
            <span className="hidden sm:inline">Feedback</span>
          </TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card className="text-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Assigned Students</CardTitle>
              <CardDescription className="text-xs">Monitor student progress and performance</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2 px-3">Student</th>
                      <th className="text-left py-2 px-3">Progress</th>
                      <th className="text-left py-2 px-3">Last Active</th>
                      <th className="text-left py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[80px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${student.progress > 70 ? 'bg-green-500' : student.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span>{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-2 px-3">{student.lastActive}</td>
                        <td className="py-2 px-3">
                          <Link href={`/instructor/students/${student.id}`} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">View Details</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <Card className="text-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Current Assignments</CardTitle>
              <CardDescription className="text-xs">Track and grade student submissions</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2 px-3">Assignment</th>
                      <th className="text-left py-2 px-3">Course</th>
                      <th className="text-left py-2 px-3">Due Date</th>
                      <th className="text-left py-2 px-3">Submissions</th>
                      <th className="text-left py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((assignment) => (
                      <tr key={assignment.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="py-2 px-3">
                          <p className="font-medium">{assignment.title}</p>
                        </td>
                        <td className="py-2 px-3">{assignment.course}</td>
                        <td className="py-2 px-3 text-xs">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <span>{assignment.submissions}/{assignment.totalStudents}</span>
                            <div className="w-full max-w-[80px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <Link href={`/instructor/assignments/${assignment.id}`} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Grade</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <Card className="text-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Your Courses</CardTitle>
              <CardDescription className="text-xs">Manage your course materials and content</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-sm mb-1">Introduction to HTML & CSS</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Fundamentals of web development</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">25 Students</span>
                    <Link href="/instructor/courses/1" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Manage</Link>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-sm mb-1">Programming Fundamentals</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Introduction to JavaScript and programming concepts</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">30 Students</span>
                    <Link href="/instructor/courses/2" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Manage</Link>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-sm mb-1">Database Management</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">SQL and database design principles</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">20 Students</span>
                    <Link href="/instructor/courses/3" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Manage</Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <Card className="text-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Student Feedback</CardTitle>
              <CardDescription className="text-xs">Review and respond to student questions and feedback</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">Ahmed Khan</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
                      </div>
                      <p className="text-xs mt-1">I am having trouble understanding the JavaScript closure concept. Could you provide some additional examples?</p>
                      <div className="mt-2 flex justify-end">
                        <button className="text-blue-600 dark:text-blue-400 text-xs hover:underline">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">Fatima Ali</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">1 week ago</span>
                      </div>
                      <p className="text-xs mt-1">The database assignment was very helpful. I d like to know if we ll be covering NoSQL databases in future lessons.</p>
                      <div className="mt-2 flex justify-end">
                        <button className="text-blue-600 dark:text-blue-400 text-xs hover:underline">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}