"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, BookOpen, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";

const CoursesPage = () => {
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

  // Placeholder for image URLs
  const courseImages = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1374&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1470&auto=format&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-20 overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Transform Your Career with Our <span className="text-amber-400">Professional Courses</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl">
                Join thousands of professionals who have accelerated their careers with our industry-leading courses. Learn from experts and gain practical skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-3 rounded-lg flex items-center gap-2"
                >
                  Explore Courses <ArrowRight size={18} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg"
                >
                  View Learning Paths
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-1">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                        <BookOpen size={20} />
                      </div>
                      <h3 className="text-xl font-bold">Course Highlights</h3>
                    </div>
                    <div className="text-amber-400 flex items-center">
                      <span className="text-lg font-bold">4.9</span>
                      <span className="text-gray-400 ml-1">/5.0</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { icon: <CheckCircle size={18} />, text: "Industry-recognized certifications" },
                      { icon: <CheckCircle size={18} />, text: "Hands-on projects & case studies" },
                      { icon: <CheckCircle size={18} />, text: "1-on-1 mentorship sessions" },
                      { icon: <CheckCircle size={18} />, text: "Career support and guidance" },
                      { icon: <CheckCircle size={18} />, text: "Flexible learning schedule" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-green-400">{item.icon}</div>
                        <span className="text-gray-200">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Popular Online Courses
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mt-6 max-w-2xl mx-auto"
            >
              Discover our most popular professional courses designed to give you the skills and knowledge needed in todays competitive job market.
            </motion.p>
          </div>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {["All", "Development", "Design", "Data Science", "Business", "IT & Software"].map((category, index) => (
              <button
                key={index}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0 
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={courseImages[index]}
                    alt={course.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-gray-900 font-bold px-3 py-1 rounded-full text-xs">
                    {course.fee}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs">
                    {course.category}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      course.level === "Beginner" 
                        ? "bg-blue-100 text-blue-800" 
                        : course.level === "Intermediate" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-amber-100 text-amber-800"
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{course.rating}</span>
                  </div>
                  
                  {/* Course Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                      <span className="text-sm"><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                      <span className="text-sm"><strong>Fee:</strong> {course.fee}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                      <span className="text-sm"><strong>Requirements:</strong> {course.requirements}</span>
                    </div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2.5 rounded-lg text-sm"
                    >
                      Enroll Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              View All Courses <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "25,000+", label: "Active Learners", description: "Join our global community of professionals" },
              { value: "94%", label: "Completion Rate", description: "Higher than industry average" },
              { value: "89%", label: "Career Advancement", description: "Reported salary increase or promotion" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center"
              >
                <div className="text-4xl font-bold text-indigo-700 mb-2">{stat.value}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
    
    </div>
  );
};

export default CoursesPage;