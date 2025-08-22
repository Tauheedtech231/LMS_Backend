"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Users, Clock, Plus, Search } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  modules: number;
  duration: string;
  image: string;
  status: "active" | "draft" | "archived";
}

export default function InstructorCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
  });

  // Mock courses data - in a real app, this would be fetched from an API
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Introduction to HTML & CSS",
      description: "Learn the fundamentals of web development with HTML and CSS. This course covers the basics of creating and styling web pages.",
      students: 25,
      modules: 8,
      duration: "4 weeks",
      image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      status: "active",
    },
    {
      id: "2",
      title: "Programming Fundamentals",
      description: "Introduction to JavaScript and programming concepts. Learn variables, functions, control flow, and more.",
      students: 30,
      modules: 10,
      duration: "6 weeks",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      status: "active",
    },
    {
      id: "3",
      title: "Database Management",
      description: "SQL and database design principles. Learn how to create, query, and manage relational databases.",
      students: 20,
      modules: 6,
      duration: "5 weeks",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      status: "active",
    },
    {
      id: "4",
      title: "Advanced CSS Techniques",
      description: "Master advanced CSS concepts including Flexbox, Grid, animations, and responsive design patterns.",
      students: 15,
      modules: 5,
      duration: "3 weeks",
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      status: "draft",
    },
    {
      id: "5",
      title: "Introduction to React",
      description: "Learn the basics of React.js, including components, state, props, and hooks.",
      students: 0,
      modules: 7,
      duration: "5 weeks",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      status: "draft",
    },
  ]);

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.duration) {
      alert("Please fill in all required fields");
      return;
    }

    const newCourseObj: Course = {
      id: `${courses.length + 1}`,
      title: newCourse.title,
      description: newCourse.description,
      students: 0,
      modules: 0,
      duration: newCourse.duration,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Default image
      status: "draft",
    };

    setCourses([...courses, newCourseObj]);
    setNewCourse({ title: "", description: "", duration: "" });
    setShowNewCourseForm(false);
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4 transition-colors text-xs">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold">Your Courses</h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Manage and create courses</p>
        </div>
        <Button 
          onClick={() => setShowNewCourseForm(!showNewCourseForm)} 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs h-8 px-3"
        >
          <Plus className="h-3 w-3 mr-1" />
          Create New Course
        </Button>
      </div>

      {/* New Course Form */}
      {showNewCourseForm && (
        <Card className="text-xs">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Create New Course</CardTitle>
            <CardDescription className="text-xs">Fill in the details to create a new course</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label htmlFor="course-title" className="text-xs">Course Title</Label>
                <Input 
                  id="course-title" 
                  placeholder="Enter course title" 
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="text-xs h-8 rounded-md"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="course-description" className="text-xs">Description</Label>
                <Textarea 
                  id="course-description" 
                  placeholder="Enter course description" 
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="text-xs rounded-md"
                  rows={3}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="course-duration" className="text-xs">Duration</Label>
                <Input 
                  id="course-duration" 
                  placeholder="e.g., 4 weeks" 
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  className="text-xs h-8 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewCourseForm(false)}
                  className="text-xs h-8 px-3 rounded-md"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateCourse}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 px-3 rounded-md"
                >
                  Create Course
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-gray-500 dark:text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search courses..." 
            className="pl-8 text-xs h-8 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="h-8 rounded-md border border-input bg-background px-3 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-blue-600"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col text-xs">
            <div className="h-32 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="p-3 pb-1">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm">{course.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full ${course.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : course.status === 'draft' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
              <CardDescription className="line-clamp-2 text-xs">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 flex-1">
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Users className="h-3 w-3" />
                  <span>{course.students} Students</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <BookOpen className="h-3 w-3" />
                  <span>{course.modules} Modules</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </CardContent>
            <div className="p-3 pt-0 mt-auto">
              <Link href={`/instructor/courses/${course.id}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 rounded-md">
                  Manage Course
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-8">
          <BookOpen className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-600" />
          <h3 className="mt-2 text-sm font-medium">No courses found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-xs">
            {searchQuery ? "Try adjusting your search query" : "Create your first course to get started"}
          </p>
          {!searchQuery && (
            <Button 
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 px-3 rounded-md" 
              onClick={() => setShowNewCourseForm(true)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Create New Course
            </Button>
          )}
        </div>
      )}
    </div>
  );
}