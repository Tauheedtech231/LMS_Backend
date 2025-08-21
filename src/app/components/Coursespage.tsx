"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, BookOpen, CheckCircle,  ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const CoursesPage = () => {
  const { theme } = useTheme();

  const courses = [
    {
      name: "Web Development Bootcamp",
      duration: "12 Weeks",
      fee: "$499",
      requirements: "Basic HTML & CSS knowledge",
      category: "Development",
      level: "Beginner",
      rating: 4.8,
    },
    {
      name: "AI & Machine Learning",
      duration: "16 Weeks",
      fee: "$799",
      requirements: "Python Basics",
      category: "Data Science",
      level: "Advanced",
      rating: 4.9,
    },
    {
      name: "UI/UX Design",
      duration: "10 Weeks",
      fee: "$399",
      requirements: "Creativity & Design Tools",
      category: "Design",
      level: "Intermediate",
      rating: 4.7,
    },
    {
      name: "Cloud Computing",
      duration: "14 Weeks",
      fee: "$699",
      requirements: "Networking basics",
      category: "IT & Software",
      level: "Intermediate",
      rating: 4.6,
    },
    {
      name: "Data Science",
      duration: "18 Weeks",
      fee: "$899",
      requirements: "Statistics & Python",
      category: "Data Science",
      level: "Advanced",
      rating: 4.9,
    },
    {
      name: "Mobile App Development",
      duration: "12 Weeks",
      fee: "$599",
      requirements: "Basic programming knowledge",
      category: "Development",
      level: "Intermediate",
      rating: 4.7,
    },
  ];

  // Placeholder images
  const courseImages = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1374&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1470&auto=format&fit=crop"
  ];

  const isDark = theme === "dark";

  return (
    <div className={`${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} min-h-screen`}>
      {/* Hero Section */}
      <section className={`relative py-16 overflow-hidden ${isDark ? "bg-gray-800" : "bg-gradient-to-r from-indigo-900 to-purple-800 text-white"}`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Transform Your Career with Our <span className="text-amber-400">Professional Courses</span>
              </h1>
              <p className="text-base text-gray-300 mb-6 max-w-2xl">
                Join thousands of professionals who have accelerated their careers with our industry-leading courses. Learn from experts and gain practical skills.
              </p>
              <div className="flex flex-wrap gap-3">
               <Link href='/course_for_sell'> <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm"
                >
                  Explore Courses <ArrowRight size={16} />
                </motion.button></Link>
               
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className={`${isDark ? "bg-gray-700 border-gray-600" : "bg-gray-800 border-gray-700"} border-2 rounded-2xl p-1`}>
                <div className={`${isDark ? "bg-gray-800" : "bg-gradient-to-br from-gray-900 to-gray-800"} rounded-xl p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
                        <BookOpen size={18} />
                      </div>
                      <h3 className="text-lg font-bold">Course Highlights</h3>
                    </div>
                    <div className="text-amber-400 flex items-center">
                      <span className="text-base font-bold">4.9</span>
                      <span className="text-gray-400 ml-1 text-sm">/5.0</span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {[ "Industry-recognized certifications", "Hands-on projects & case studies", "1-on-1 mentorship sessions", "Career support and guidance", "Flexible learning schedule" ].map((text, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-green-400" />
                        <span className={isDark ? "text-gray-200" : "text-gray-100"}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-all`}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={courseImages[idx]}
                    alt={course.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-gray-900 font-bold px-2 py-0.5 rounded-full text-xs">{course.fee}</div>
                  <div className="absolute bottom-3 left-3 bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs">{course.category}</div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{course.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      course.level === "Beginner" ? "bg-blue-100 text-blue-800" :
                      course.level === "Intermediate" ? "bg-purple-100 text-purple-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="flex items-center mb-2 text-sm">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-gray-400'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className={`${isDark ? "text-gray-300" : "text-gray-600"} ml-1`}>{course.rating}</span>
                  </div>

                  <div className="space-y-1 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600" /> Duration: {course.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-indigo-600" /> Fee: {course.fee}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" /> Requirements: {course.requirements}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.02 }} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded text-sm">Enroll Now</motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} className={`${isDark ? "border-gray-600 text-gray-200 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"} border flex-1 py-2 rounded text-sm`}>View Details</motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
