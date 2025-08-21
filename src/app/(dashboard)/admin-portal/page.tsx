"use client";

import { useEffect, useState } from "react";
import DashboardCards from "./components/DashboardCards";
import EngagementStats from "./components/EngagementStats";
import PerformanceChart from "./components/PerFormanceCharts";
import { Student, Course, Engagement } from "./types";

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [engagement, setEngagement] = useState<Engagement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [studentsRes, coursesRes, engagementRes] = await Promise.all([
          fetch("/data/students.json"),
          fetch("/data/courses.json"),
          fetch("/data/engagement.json"),
        ]);

        const [studentsData, coursesData, engagementData] = await Promise.all([
          studentsRes.json(),
          coursesRes.json(),
          engagementRes.json(),
        ]);

        setStudents(studentsData);
        setCourses(coursesData);
        setEngagement(engagementData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-600">
        <p className="text-gray-100 text-base">Loading dashboard...</p>
      </div>
    );
  }

  const totalRevenue = courses.reduce(
    (acc, course) => acc + (course.enrollmentCount || 0) * 100,
    0
  );

  return (
    <div className="min-h-screen p-6  text-sm  transition-colors duration-300">
      {/* Dashboard Heading */}
      <h2 className="text-2xl font-semibold mb-4 text-[blue]">
        Admin Dashboard
      </h2>

      {/* Cards */}
      <DashboardCards
        students={students.length}
        revenue={totalRevenue}
        courses={courses.length}
        engagement={85}
        
      />

      {/* Charts */}
      <div className="grid gap-4 mb-6 md:grid-cols-2">
        <EngagementStats data={engagement} />
        <PerformanceChart data={engagement} />
      </div>

    
    </div>
  );
}
