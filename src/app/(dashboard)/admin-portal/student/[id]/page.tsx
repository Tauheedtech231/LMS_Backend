"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StudentProfile from "../../components/StudentProfile";
import { Student, Course, Engagement } from '@/app/(dashboard)/admin-portal/types'

const LOCAL_STORAGE_STUDENTS = "students";
const LOCAL_STORAGE_COURSES = "courses";
const LOCAL_STORAGE_ENGAGEMENT = "engagement";

export default function StudentPage() {
  const params = useParams();
  const id = params?.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [engagement, setEngagement] = useState<Engagement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Fetch from localStorage
        const studentsData: Student[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STUDENTS) || "[]");
        const coursesData: Course[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_COURSES) || "[]");
        const engagementData: Engagement[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ENGAGEMENT) || "[]");

        const foundStudent = studentsData.find(s => String(s.id) === id) || null;

        setStudent(foundStudent);
        setCourses(coursesData);
        setEngagement(engagementData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 animate-pulse">
        {/* Skeleton content */}
        <div className="flex flex-col items-center mb-6 sm:flex-row">
          <div className="w-20 h-20 mb-4 bg-gray-300 rounded-full dark:bg-gray-700 sm:mr-4 sm:mb-0"></div>
          <div className="text-center sm:text-left">
            <div className="h-6 bg-gray-300 rounded dark:bg-gray-700 w-40 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-56 mb-3"></div>
            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="h-5 bg-gray-300 rounded dark:bg-gray-700 w-32 mb-4"></div>
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                  <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="h-5 bg-gray-300 rounded dark:bg-gray-700 w-32 mb-4"></div>
            <div className="h-48 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="p-4 bg-red-100 rounded-full dark:bg-red-900/30 mb-4">
          <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Student Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">The student you’re looking for doesn’t exist or may have been removed.</p>
      </div>
    );
  }

  return <StudentProfile student={student} courses={courses} engagement={engagement} />;
}
