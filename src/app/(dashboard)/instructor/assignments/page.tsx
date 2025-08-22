"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "active" | "draft" | "expired";
  submissionsCount: number;
  gradedCount: number;
  createdAt: string;
}

export default function InstructorAssignments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [assignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "HTML Structure and Basic Elements",
      course: "Introduction to HTML & CSS",
      dueDate: "2023-12-15",
      status: "active",
      submissionsCount: 18,
      gradedCount: 12,
      createdAt: "2023-11-30"
    },
    {
      id: "2",
      title: "CSS Styling and Selectors",
      course: "Introduction to HTML & CSS",
      dueDate: "2023-12-20",
      status: "active",
      submissionsCount: 15,
      gradedCount: 8,
      createdAt: "2023-12-01"
    },
    {
      id: "3",
      title: "Variables and Data Types",
      course: "Programming Fundamentals",
      dueDate: "2023-12-10",
      status: "expired",
      submissionsCount: 22,
      gradedCount: 22,
      createdAt: "2023-11-25"
    },
    {
      id: "4",
      title: "Control Structures and Loops",
      course: "Programming Fundamentals",
      dueDate: "2023-12-18",
      status: "active",
      submissionsCount: 20,
      gradedCount: 5,
      createdAt: "2023-12-02"
    },
    {
      id: "5",
      title: "Database Design Principles",
      course: "Database Management",
      dueDate: "2023-12-25",
      status: "draft",
      submissionsCount: 0,
      gradedCount: 0,
      createdAt: "2023-12-05"
    },
    {
      id: "6",
      title: "SQL Queries and Operations",
      course: "Database Management",
      dueDate: "2024-01-05",
      status: "draft",
      submissionsCount: 0,
      gradedCount: 0,
      createdAt: "2023-12-08"
    },
  ]);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && assignment.status === "active";
    if (activeTab === "draft") return matchesSearch && assignment.status === "draft";
    if (activeTab === "expired") return matchesSearch && assignment.status === "expired";
    
    return matchesSearch;
  });

  const activeCounts = assignments.filter(a => a.status === "active").length;
  const draftCounts = assignments.filter(a => a.status === "draft").length;
  const expiredCounts = assignments.filter(a => a.status === "expired").length;

  const needsGradingCount = assignments.reduce((count, assignment) => {
    return count + (assignment.submissionsCount - assignment.gradedCount);
  }, 0);

  return (
    <div className="space-y-8 bg-gray-50 dark:bg-gray-900 text-xs text-blue-700 dark:text-blue-300 min-h-screen p-6 transition-colors">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-sm font-bold">Assignments</h1>
          <p className="text-xs">Create and manage assignments for your courses</p>
        </div>
        <Button className="flex items-center gap-2 text-xs rounded-full">
          <Plus className="h-3 w-3" />
          <span>Create Assignment</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-md text-xs">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p>Active Assignments</p>
              <h3 className="text-base font-bold">{activeCounts}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-md text-xs">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p>Needs Grading</p>
              <h3 className="text-base font-bold">{needsGradingCount}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-md text-xs">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p>Drafts</p>
              <h3 className="text-base font-bold">{draftCounts}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-blue-400" />
            <Input 
              type="search" 
              placeholder="Search assignments..." 
              className="pl-8 text-xs rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-md text-xs rounded-md">
            <TabsTrigger value="all" className="rounded-md">All ({assignments.length})</TabsTrigger>
            <TabsTrigger value="active" className="rounded-md">Active ({activeCounts})</TabsTrigger>
            <TabsTrigger value="draft" className="rounded-md">Drafts ({draftCounts})</TabsTrigger>
            <TabsTrigger value="expired" className="rounded-md">Expired ({expiredCounts})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Assignments Table */}
      <Card className="rounded-md text-xs">
        <CardHeader>
          <CardTitle className="text-xs">All Assignments</CardTitle>
          <CardDescription className="text-[10px]">View and manage assignments for your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 px-3">Assignment</th>
                  <th className="text-left py-2 px-3">Course</th>
                  <th className="text-left py-2 px-3">Due Date</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Submissions</th>
                  <th className="text-left py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((assignment) => {
                  const dueDate = new Date(assignment.dueDate);
                  const today = new Date();
                  const diffTime = dueDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  
                  let dueDateText = "";
                  let dueDateClass = "";
                  
                  if (diffDays < 0) {
                    dueDateText = `${Math.abs(diffDays)} days overdue`;
                    dueDateClass = "text-red-500";
                  } else if (diffDays === 0) {
                    dueDateText = "Due today";
                    dueDateClass = "text-amber-500";
                  } else {
                    dueDateText = `${diffDays} days remaining`;
                    dueDateClass = "text-green-500";
                  }

                  return (
                    <tr key={assignment.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="py-2 px-3">
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-[10px]">Created on {new Date(assignment.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="py-2 px-3">{assignment.course}</td>
                      <td className="py-2 px-3">
                        <p>{new Date(assignment.dueDate).toLocaleDateString()}</p>
                        {assignment.status !== "draft" && (
                          <p className={`text-[10px] ${dueDateClass}`}>{dueDateText}</p>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <span 
                          className={`inline-block px-2 py-1 text-[10px] rounded-full ${
                            assignment.status === "active" ? "bg-green-100 text-green-700" :
                            assignment.status === "draft" ? "bg-gray-100 text-gray-700" :
                            "bg-red-100 text-red-700"
                          }`}
                        >
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <p>{assignment.submissionsCount} submissions</p>
                        {assignment.submissionsCount > 0 && (
                          <p className="text-[10px]">
                            {assignment.gradedCount} graded, {assignment.submissionsCount - assignment.gradedCount} pending
                          </p>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-2">
                          <Link href={`/instructor/assignments/${assignment.id}`}>
                            <Button variant="outline" size="sm" className="text-xs rounded-full">View</Button>
                          </Link>
                          {assignment.submissionsCount - assignment.gradedCount > 0 && (
                            <Link href={`/instructor/assignments/${assignment.id}?tab=grade`}>
                              <Button size="sm" className="text-xs rounded-full">Grade</Button>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-xs font-medium">No assignments found</h3>
              <p className="text-[10px] mt-1">
                {searchQuery ? "Try adjusting your search query" : "Create your first assignment to get started"}
              </p>
              <Button className="mt-3 flex items-center gap-2 text-xs rounded-full">
                <Plus className="h-3 w-3" />
                <span>Create Assignment</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
