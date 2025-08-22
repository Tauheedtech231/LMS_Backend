"use client";
/* eslint-disable */

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileUp, Plus, Save, Trash2, Users, BookOpen, FileText } from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  materials: Material[];
}

interface Material {
  id: string;
  title: string;
  type: "pdf" | "video" | "slide" | "assignment";
  url: string;
}

export default function CourseManagement() {
  const params = useParams();
  const courseId = params.id as string;
  
  // Mock course data - in a real app, this would be fetched from an API
  const [course, setCourse] = useState({
    id: courseId,
    title: courseId === "1" ? "Introduction to HTML & CSS" : 
           courseId === "2" ? "Programming Fundamentals" : "Database Management",
    description: "Learn the fundamentals of web development with HTML and CSS. This course covers the basics of creating and styling web pages.",
    students: 25,
    modules: [
      {
        id: "m1",
        title: "Getting Started with HTML",
        description: "Introduction to HTML tags and document structure",
        materials: [
          { id: "mat1", title: "HTML Basics Slides", type: "slide", url: "/materials/html-basics.pdf" },
          { id: "mat2", title: "Introduction to HTML Video", type: "video", url: "/materials/intro-html.mp4" },
          { id: "mat3", title: "HTML Practice Assignment", type: "assignment", url: "/assignments/html-practice.pdf" },
        ]
      },
      {
        id: "m2",
        title: "CSS Fundamentals",
        description: "Learn about CSS selectors, properties, and styling techniques",
        materials: [
          { id: "mat4", title: "CSS Basics Slides", type: "slide", url: "/materials/css-basics.pdf" },
          { id: "mat5", title: "CSS Styling Tutorial", type: "video", url: "/materials/css-tutorial.mp4" },
          { id: "mat6", title: "CSS Layout Assignment", type: "assignment", url: "/assignments/css-layout.pdf" },
        ]
      }
    ] as Module[]
  });

  const [newModule, setNewModule] = useState<{ title: string; description: string }>({ title: "", description: "" });
  const [newMaterial, setNewMaterial] = useState<{ moduleId: string; title: string; type: "pdf" | "video" | "slide" | "assignment"; url: string }>({ 
    moduleId: "", title: "", type: "pdf", url: "" 
  });

  const handleAddModule = () => {
    if (!newModule.title) return;
    
    const updatedCourse = { ...course };
    updatedCourse.modules.push({
      id: `m${Date.now()}`,
      title: newModule.title,
      description: newModule.description,
      materials: []
    });
    
    setCourse(updatedCourse);
    setNewModule({ title: "", description: "" });
  };

  const handleAddMaterial = () => {
    if (!newMaterial.moduleId || !newMaterial.title || !newMaterial.url) return;
    
    const updatedCourse = { ...course };
    const moduleIndex = updatedCourse.modules.findIndex(m => m.id === newMaterial.moduleId);
    
    if (moduleIndex !== -1) {
      updatedCourse.modules[moduleIndex].materials.push({
        id: `mat${Date.now()}`,
        title: newMaterial.title,
        type: newMaterial.type,
        url: newMaterial.url
      });
      
      setCourse(updatedCourse);
      setNewMaterial({ moduleId: newMaterial.moduleId, title: "", type: "pdf", url: "" });
    }
  };

  const handleDeleteModule = (moduleId: string) => {
    const updatedCourse = { ...course };
    updatedCourse.modules = updatedCourse.modules.filter(m => m.id !== moduleId);
    setCourse(updatedCourse);
  };

  const handleDeleteMaterial = (moduleId: string, materialId: string) => {
    const updatedCourse = { ...course };
    const moduleIndex = updatedCourse.modules.findIndex(m => m.id === moduleId);
    
    if (moduleIndex !== -1) {
      updatedCourse.modules[moduleIndex].materials = 
        updatedCourse.modules[moduleIndex].materials.filter(m => m.id !== materialId);
      setCourse(updatedCourse);
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "video":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "slide":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "assignment":
        return <FileText className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-6 transition-colors">
      {/* Course Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{course.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
              <Users className="h-4 w-4" />
              <span>{course.students} Students</span>
            </div>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Course Management Tabs */}
      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Modules & Materials</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Assignments</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Students</span>
          </TabsTrigger>
        </TabsList>

        {/* Modules & Materials Tab */}
        <TabsContent value="modules" className="space-y-6">
          {/* Add New Module Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Module</CardTitle>
              <CardDescription>Create a new learning module for this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="module-title">Module Title</Label>
                  <Input 
                    id="module-title" 
                    placeholder="Enter module title" 
                    value={newModule.title}
                    onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="module-description">Description</Label>
                  <Textarea 
                    id="module-description" 
                    placeholder="Enter module description" 
                    value={newModule.description}
                    onChange={(e) => setNewModule({...newModule, description: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddModule} className="w-full md:w-auto justify-self-end">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Modules */}
          <div className="space-y-4">
            {course.modules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteModule(module.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Module Materials */}
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Materials</h4>
                    <div className="space-y-2">
                      {module.materials.map((material) => (
                        <div 
                          key={material.id} 
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md border dark:border-gray-700"
                        >
                          <div className="flex items-center gap-2">
                            {getMaterialIcon(material.type)}
                            <span>{material.title}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{material.type}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMaterial(module.id, material.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Material Form */}
                  <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <h4 className="font-medium mb-2">Add Material</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Input 
                        placeholder="Material Title" 
                        value={newMaterial.moduleId === module.id ? newMaterial.title : ""}
                        onChange={(e) => setNewMaterial({...newMaterial, moduleId: module.id, title: e.target.value})}
                      />
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newMaterial.moduleId === module.id ? newMaterial.type : "pdf"}
                        onChange={(e) => setNewMaterial({...newMaterial, moduleId: module.id, type: e.target.value as "pdf" | "video" | "slide" | "assignment"})}
                      >
                        <option value="pdf">PDF</option>
                        <option value="video">Video</option>
                        <option value="slide">Slide</option>
                        <option value="assignment">Assignment</option>
                      </select>
                      <Input 
                        placeholder="URL or File Path" 
                        value={newMaterial.moduleId === module.id ? newMaterial.url : ""}
                        onChange={(e) => setNewMaterial({...newMaterial, moduleId: module.id, url: e.target.value})}
                      />
                      <Button 
                        onClick={() => newMaterial.moduleId === module.id && handleAddMaterial()}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Assignments</CardTitle>
              <CardDescription>Create and manage assignments for this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md">
                  <p className="text-yellow-800 dark:text-yellow-200">Assignment management features will be available soon.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.modules.map(module => (
                    module.materials
                      .filter(material => material.type === "assignment")
                      .map(assignment => (
                        <div key={assignment.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                          <h3 className="font-semibold text-lg mb-2">{assignment.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Module: {module.title}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">Assignment</span>
                            <Button variant="outline" size="sm">View Submissions</Button>
                          </div>
                        </div>
                      ))
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
              <CardDescription>View and manage students enrolled in this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-left py-3 px-4">Student</th>
                        <th className="text-left py-3 px-4">Progress</th>
                        <th className="text-left py-3 px-4">Last Active</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student" className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">Ahmed Khan</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">ahmed@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="h-2.5 rounded-full bg-green-500" style={{ width: "75%" }}></div>
                            </div>
                            <span>75%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">2 hours ago</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                      <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student" className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">Fatima Ali</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">fatima@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="h-2.5 rounded-full bg-green-500" style={{ width: "92%" }}></div>
                            </div>
                            <span>92%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">1 day ago</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}