"use client";

import React, { useState, useEffect } from "react";
import { Course } from "../../types";
import { useRouter } from "next/navigation";

const LOCAL_STORAGE_KEY = "courses";
const INSTRUCTOR_KEY = "instructors"; // your instructors storage key

interface ModuleForm {
  id: string;
  title: string;
  content: string;
}

const AddCourseForm: React.FC = () => {
  const [courseData, setCourseData] = useState<Omit<Course, "id">>({
    title: "",
    description: "",
    instructor: "",
    duration: 0,
    enrollmentCount: 0,
    modules: [],
  });
  const router = useRouter();

  const [modules, setModules] = useState<ModuleForm[]>([
    { id: Date.now().toString(), title: "", content: "" },
  ]);

  const [instructors, setInstructors] = useState<string[]>([]);

  // Fetch instructors from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(INSTRUCTOR_KEY);
    const data: { id: string; name: string }[] = stored ? JSON.parse(stored) : [];
    setInstructors(data.map((inst) => inst.name));
  }, []);

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]:
        name === "duration" || name === "enrollmentCount"
          ? Number(value)
          : value,
    });
  };

  const handleModuleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newModules = [...modules];
    newModules[index][name as keyof ModuleForm] = value;
    setModules(newModules);
  };

  const addModule = () => {
    setModules([...modules, { id: Date.now().toString(), title: "", content: "" }]);
  };

  const removeModule = (index: number) => {
    if (modules.length === 1) return;
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCourse: Course = {
      id: Date.now().toString(),
      ...courseData,
      modules,
    };

    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const courses: Course[] = stored ? JSON.parse(stored) : [];
    courses.push(newCourse);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));

    // Reset form
    setCourseData({
      title: "",
      description: "",
      instructor: "",
      duration: 0,
      enrollmentCount: 0,
      modules: [],
    });
    setModules([{ id: Date.now().toString(), title: "", content: "" }]);
  router.push("/admin-portal/courses");
  };

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
          Add Course
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-sm text-blue-700 dark:text-blue-300"
        >
          {/* Course Fields */}
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleCourseChange}
            placeholder="Course Title"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300"
            required
          />
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleCourseChange}
            placeholder="Course Description"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300"
            required
          />

          {/* Instructor Dropdown */}
          <select
            name="instructor"
            value={courseData.instructor}
            onChange={handleCourseChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300"
            required
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructors.map((inst, idx) => (
              <option key={idx} value={inst}>
                {inst}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="duration"
            value={courseData.duration}
            onChange={handleCourseChange}
            placeholder="Duration (hours)"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300"
            required
          />
          <input
            type="number"
            name="enrollmentCount"
            value={courseData.enrollmentCount}
            onChange={handleCourseChange}
            placeholder="Enrollment Count"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300"
            required
          />

          {/* Modules */}
          <div className="space-y-3">
            <h3 className="font-medium text-blue-600 dark:text-blue-400">Modules</h3>
            {modules.map((mod, idx) => (
              <div
                key={mod.id}
                className="border p-3 rounded border-gray-300 dark:border-gray-600 space-y-2"
              >
                <input
                  type="text"
                  name="title"
                  value={mod.title}
                  onChange={(e) => handleModuleChange(idx, e)}
                  placeholder={`Module ${idx + 1} Title`}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300"
                  required
                />
                <textarea
                  name="content"
                  value={mod.content}
                  onChange={(e) => handleModuleChange(idx, e)}
                  placeholder={`Module ${idx + 1} Content`}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-300"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => removeModule(idx)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    disabled={modules.length === 1}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addModule}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
            >
              + Add Module
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
