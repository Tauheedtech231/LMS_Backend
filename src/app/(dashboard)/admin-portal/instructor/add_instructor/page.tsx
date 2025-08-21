// components/InstructorForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Instructor } from "../../types";
import { Course } from "../../types";
import { useRouter } from "next/navigation";

const LOCAL_STORAGE_KEY = "instructors";

const InstructorForm: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<Omit<Instructor, "id">>({
    name: "",
    email: "",
    bio: "",
    courses: [],
    avatar: "",
  });
  const router = useRouter();

  // Fetch courses from public/data/courses.json
  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data: Course[]) => setCourses(data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "courses") {
      // store as array (single selection)
      setFormData({ ...formData, courses: [value] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInstructor: Instructor = { id: Date.now().toString(), ...formData };
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const instructors: Instructor[] = stored ? JSON.parse(stored) : [];
    instructors.push(newInstructor);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(instructors));
    setFormData({ name: "", email: "", bio: "", courses: [], avatar: "" });
    router.push("/admin-portal/instructor");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Add Instructor</h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400"
            required
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400"
            required
          />
          <select
            name="courses"
            value={formData.courses[0] || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400"
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL (optional)"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            Add Instructor
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstructorForm;
