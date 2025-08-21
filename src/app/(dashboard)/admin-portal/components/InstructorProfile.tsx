import React from 'react';
import { Instructor, Course } from '../types';

interface InstructorProfileProps {
  instructor: Instructor;
  courses: Course[];
}

const InstructorProfile: React.FC<InstructorProfileProps> = ({ instructor, courses }) => {
  const instructorCourses = courses.filter(course => 
    instructor.courses.includes(course.id)
  );

  return (
    <div className="px-4 py-3 mb-8 bg-white rounded-xl shadow-md dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center mb-6">
        <img
          className="object-cover w-20 h-20 mr-4 rounded-full shadow-sm"
          src={instructor.avatar || 'https://via.placeholder.com/150'}
          alt={instructor.name}
        />
        <div>
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">
            {instructor.name}
          </h2>
          <p className="text-sm text-blue-500 dark:text-blue-200">{instructor.email}</p>
          <div className="mt-2">
            <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full shadow-sm">
              Courses: {instructor.courses.length}
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <h3 className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300">Bio</h3>
        <p className="text-xs text-blue-500 dark:text-blue-200">{instructor.bio}</p>
      </div>

      {/* Courses Taught */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-blue-700 dark:text-blue-300">
          Courses Taught
        </h3>
        <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-600">
            {instructorCourses.map(course => (
              <li key={course.id} className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-700 dark:text-blue-300 text-sm">
                      {course.title}
                    </p>
                    <p className="text-xs text-blue-500 dark:text-blue-200">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-sm">
                      {course.duration} hrs
                    </span>
                    <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-sm">
                      {course.enrollmentCount} students
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
