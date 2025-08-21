"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Course } from "../../types";
import { useRouter } from "next/navigation";

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourse?: string; // single course
  progress: number;
  avatar?: string;
}

const LOCAL_STORAGE_KEY = "students";
const LOCAL_STORAGE_COURSES_KEY = "courses";

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Student, "id">>({
    name: "",
    email: "",
    enrolledCourse: "",
    progress: 0,
    avatar: "",
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch courses from localStorage
    const storedCourses = localStorage.getItem(LOCAL_STORAGE_COURSES_KEY);
    const allCourses: Course[] = storedCourses ? JSON.parse(storedCourses) : [];
    setCourses(allCourses);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "progress") {
      setFormData({ ...formData, progress: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = { id: Date.now().toString(), ...formData };

    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const students: Student[] = stored ? JSON.parse(stored) : [];
    students.push(newStudent);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));

    setFormData({ name: "", email: "", enrolledCourse: "", progress: 0, avatar: "" });
    router.push("/admin-portal/student");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg text-white text-sm">
        <h2 className="text-lg font-semibold mb-4 text-blue-400">Add Student</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-700 rounded-2xl bg-gray-900 text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-700 rounded-2xl bg-gray-900 text-white placeholder-gray-400"
            required
          />
          <select
            name="enrolledCourse"
            value={formData.enrolledCourse}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-2xl bg-gray-900 text-white"
            required
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            placeholder="Progress (%)"
            className="w-full p-3 border border-gray-700 rounded-2xl bg-gray-900 text-white placeholder-gray-400"
            min={0}
            max={100}
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Avatar URL (optional)"
              className="flex-1 p-3 border border-gray-700 rounded-2xl bg-gray-900 text-white placeholder-gray-400"
            />
            {formData.avatar && (
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src={formData.avatar}
                  alt={formData.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-colors duration-200 text-sm"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
