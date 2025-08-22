"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, MessageSquare, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

interface Feedback {
  id: string;
  studentName: string;
  studentId: string;
  studentAvatar: string;
  course: string;
  courseId: string;
  message: string;
  rating: number;
  status: "pending" | "responded";
  createdAt: string;
  response?: string;
  respondedAt?: string;
}

export default function InstructorFeedback() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [responseText, setResponseText] = useState("");

  // Mock feedback data - in a real app, this would be fetched from an API
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      studentName: "Ahmed Khan",
      studentId: "1",
      studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      course: "Introduction to HTML & CSS",
      courseId: "html101",
      message: "The course content is excellent, but I'm having trouble with the CSS Grid exercises. Could you provide more examples?",
      rating: 4,
      status: "pending",
      createdAt: "2023-12-01T10:30:00Z"
    },
    {
      id: "2",
      studentName: "Fatima Ali",
      studentId: "2",
      studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      course: "Introduction to HTML & CSS",
      courseId: "html101",
      message: "I really enjoyed the interactive exercises. The course is well-structured and easy to follow.",
      rating: 5,
      status: "responded",
      createdAt: "2023-11-28T14:15:00Z",
      response: "Thank you for your positive feedback, Fatima! I'm glad you're enjoying the course. Let me know if you have any questions as you progress.",
      respondedAt: "2023-11-29T09:20:00Z"
    },
    {
      id: "3",
      studentName: "Usman Malik",
      studentId: "3",
      studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      course: "Programming Fundamentals",
      courseId: "prog101",
      message: "The assignments are too difficult compared to the lecture content. I think there's a gap between what's taught and what's expected in the assignments.",
      rating: 2,
      status: "pending",
      createdAt: "2023-12-02T16:45:00Z"
    },
    {
      id: "4",
      studentName: "Ayesha Siddiqui",
      studentId: "4",
      studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      course: "Database Management",
      courseId: "db101",
      message: "The database design section was very informative. I would appreciate more real-world examples though.",
      rating: 4,
      status: "responded",
      createdAt: "2023-11-25T11:10:00Z",
      response: "Thanks for your feedback, Ayesha. I'll be adding more real-world examples in the upcoming modules. In the meantime, check out the additional resources section for some practical case studies.",
      respondedAt: "2023-11-26T13:30:00Z"
    },
    {
      id: "5",
      studentName: "Bilal Ahmed",
      studentId: "5",
      studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      course: "Introduction to HTML & CSS",
      courseId: "html101",
      message: "The video quality could be better. Sometimes it's hard to see what you're typing in the code examples.",
      rating: 3,
      status: "pending",
      createdAt: "2023-12-03T09:20:00Z"
    },
  ]);

  // Filter feedbacks based on search query and active tab
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = 
      feedback.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && feedback.status === "pending";
    if (activeTab === "responded") return matchesSearch && feedback.status === "responded";
    
    return matchesSearch;
  });

  // Get counts for tabs
  const pendingCount = feedbacks.filter(f => f.status === "pending").length;
  const respondedCount = feedbacks.filter(f => f.status === "responded").length;

  // Calculate average rating
  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : "0.0";

  // Handle submitting a response
  const handleSubmitResponse = () => {
    if (!selectedFeedback || !responseText.trim()) return;

    // Update the feedback with the response
    const updatedFeedbacks = feedbacks.map(feedback => {
      if (feedback.id === selectedFeedback.id) {
        return {
          ...feedback,
          status: "responded" as const,
          response: responseText,
          respondedAt: new Date().toISOString()
        };
      }
      return feedback;
    });

    setFeedbacks(updatedFeedbacks);
    setSelectedFeedback(null);
    setResponseText("");
  };

  return (
    <div className="space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-6 transition-colors">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Student Feedback</h1>
          <p className="text-gray-500 dark:text-gray-400">View and respond to student feedback for your courses</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Feedback</p>
              <h3 className="text-2xl font-bold">{feedbacks.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Responses</p>
              <h3 className="text-2xl font-bold">{pendingCount}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <div className="flex items-center justify-center h-6 w-6 text-green-600 dark:text-green-300 font-bold">
                {averageRating}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`h-5 w-5 ${parseFloat(averageRating) >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search feedback by student, course, or content..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="all">All ({feedbacks.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="responded">Responded ({respondedCount})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <Card 
              key={feedback.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${selectedFeedback?.id === feedback.id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}
              onClick={() => {
                setSelectedFeedback(feedback);
                setResponseText(feedback.response || "");
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img src={feedback.studentAvatar} alt={feedback.studentName} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feedback.studentName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{feedback.course}</p>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className={`h-4 w-4 ${feedback.rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span 
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      feedback.status === "pending" 
                        ? "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200" 
                        : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    }`}
                  >
                    {feedback.status === "pending" ? "Pending" : "Responded"}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 dark:text-gray-300">{feedback.message}</p>
                  {feedback.response && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Your response:</span> {feedback.response}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(feedback.respondedAt!).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State */}
          {filteredFeedbacks.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium">No feedback found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {searchQuery ? "Try adjusting your search query" : "You haven't received any feedback yet"}
              </p>
            </div>
          )}
        </div>

        {/* Response Form */}
        <div className="lg:col-span-1">
          {selectedFeedback ? (
            <Card>
              <CardHeader>
                <CardTitle>Respond to Feedback</CardTitle>
                <CardDescription>Write a response to {selectedFeedback.studentName}s feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Student Feedback:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                      {selectedFeedback.message}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Your Response:</h4>
                    <Textarea 
                      placeholder="Write your response here..."
                      className="min-h-[150px]"
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedFeedback(null);
                        setResponseText("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitResponse}
                      disabled={!responseText.trim()}
                    >
                      Send Response
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" />
                  <h3 className="mt-4 text-lg font-medium">Select Feedback</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Select a feedback item from the list to respond
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}