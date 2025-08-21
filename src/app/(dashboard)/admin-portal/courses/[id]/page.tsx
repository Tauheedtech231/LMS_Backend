"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Course } from "../../types";
import CourseDetail from "../../components/Coursedetails";

const LOCAL_STORAGE_KEY = "courses";

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        const courses: Course[] = stored ? JSON.parse(stored) : [];
        const found = courses.find((c) => c.id === id) || null;
        setCourse(found);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Loading Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded dark:bg-gray-700 w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-1/2 mb-6"></div>
          <div className="h-64 bg-gray-300 rounded-lg dark:bg-gray-700 mb-6"></div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="h-6 bg-gray-300 rounded dark:bg-gray-700 w-32 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-4 bg-gray-300 rounded dark:bg-gray-700" style={{ width: `${100 - item * 10}%` }}></div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 rounded dark:bg-gray-700 w-32 mb-4"></div>
              <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center">
                      <div className="h-4 w-4 bg-gray-300 rounded dark:bg-gray-600 mr-2"></div>
                      <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="p-4 bg-yellow-100 rounded-full dark:bg-yellow-900/30 mb-4">
          <svg className="w-12 h-12 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Course Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The course you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
        <button 
          onClick={() => window.history.back()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <CourseDetail course={course} />;
}
