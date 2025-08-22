"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown } from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  enrolledCourses: string[];
  avatar: string;
}

export default function InstructorStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "progress" | "lastActive">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Mock students data - in a real app, this would be fetched from an API
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      progress: 75,
      lastActive: "2 hours ago",
      enrolledCourses: ["Introduction to HTML & CSS", "Programming Fundamentals"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "2",
      name: "Fatima Ali",
      email: "fatima@example.com",
      progress: 92,
      lastActive: "1 day ago",
      enrolledCourses: ["Introduction to HTML & CSS", "Database Management"],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "3",
      name: "Usman Malik",
      email: "usman@example.com",
      progress: 45,
      lastActive: "3 days ago",
      enrolledCourses: ["Programming Fundamentals"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "4",
      name: "Ayesha Siddiqui",
      email: "ayesha@example.com",
      progress: 88,
      lastActive: "5 hours ago",
      enrolledCourses: ["Database Management", "Advanced CSS Techniques"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "5",
      name: "Bilal Ahmed",
      email: "bilal@example.com",
      progress: 60,
      lastActive: "2 days ago",
      enrolledCourses: ["Introduction to HTML & CSS"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "6",
      name: "Zainab Khan",
      email: "zainab@example.com",
      progress: 30,
      lastActive: "1 week ago",
      enrolledCourses: ["Programming Fundamentals"],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
  ]);

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.enrolledCourses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort students based on sort field and direction
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === "progress") {
      return sortDirection === "asc" 
        ? a.progress - b.progress 
        : b.progress - a.progress;
    } else {
      // For lastActive, we're just using string comparison for this example
      // In a real app, you'd want to convert these to dates for proper sorting
      return sortDirection === "asc" 
        ? a.lastActive.localeCompare(b.lastActive) 
        : b.lastActive.localeCompare(a.lastActive);
    }
  });

  const toggleSort = (field: "name" | "progress" | "lastActive") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 text-blue-700 dark:text-blue-300 min-h-screen p-4 transition-colors">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Students</h1>
          <p className="text-xs text-blue-600 dark:text-blue-400">Manage and track your students</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
          <Input 
            type="search" 
            placeholder="Search students by name, email, or course..." 
            className="pl-8 text-sm rounded-lg w-[50%]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Students Table */}
      <Card className="rounded-md">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">All Students</CardTitle>
          <CardDescription className="text-xs text-blue-600 dark:text-blue-400">View and manage students enrolled in your courses</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 px-3">
                    <button 
                      className="flex items-center gap-1 font-medium text-blue-700 dark:text-blue-300"
                      onClick={() => toggleSort("name")}
                    >
                      Student
                      {sortField === "name" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-2 px-3 text-blue-700 dark:text-blue-300">Enrolled Courses</th>
                  <th className="text-left py-2 px-3">
                    <button 
                      className="flex items-center gap-1 font-medium text-blue-700 dark:text-blue-300"
                      onClick={() => toggleSort("progress")}
                    >
                      Progress
                      {sortField === "progress" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-2 px-3">
                    <button 
                      className="flex items-center gap-1 font-medium text-blue-700 dark:text-blue-300"
                      onClick={() => toggleSort("lastActive")}
                    >
                      Last Active
                      {sortField === "lastActive" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-2 px-3 text-blue-700 dark:text-blue-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((student) => (
                  <tr key={student.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex flex-wrap gap-1">
                        {student.enrolledCourses.map((course, index) => (
                          <span 
                            key={index} 
                            className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                          >
                            {course}
                          </span>
                        ))}
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
                    <td className="py-2 px-3 text-xs">{student.lastActive}</td>
                    <td className="py-2 px-3">
                      <Link href={`/instructor/students/${student.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md px-3 py-1">View Details</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {sortedStudents.length === 0 && (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="mt-3 text-sm font-medium">No students found</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {searchQuery ? "Try adjusting your search query" : "No students are currently enrolled in your courses"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}