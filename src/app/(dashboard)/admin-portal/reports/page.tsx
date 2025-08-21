"use client";

import { useEffect, useState } from "react";
import Reports from "../components/Reports";
import { Engagement, Student, Course, Transaction } from "../types";

export default function ReportsPage() {
  const [engagement, setEngagement] = useState<Engagement[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReportsData() {
      try {
        const [engagementRes, studentsRes, coursesRes, transactionsRes] =
          await Promise.all([
            fetch("/data/engagement.json"),
            fetch("/data/students.json"),
            fetch("/data/courses.json"),
            fetch("/data/transactions.json"),
          ]);

        const engagementData: Engagement[] = await engagementRes.json();
        const studentsData: Student[] = await studentsRes.json();
        const coursesData: Course[] = await coursesRes.json();
        const transactionsData: Transaction[] = await transactionsRes.json();

        setEngagement(engagementData);
        setStudents(studentsData);
        setCourses(coursesData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching reports data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReportsData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading reports...</div>;
  }

  return (
    <>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Reports
      </h2>
      <Reports
        engagement={engagement}
        students={students}
        courses={courses}
        transactions={transactions}
      />
    </>
  );
}
