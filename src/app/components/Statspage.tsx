"use client";
import React, { useEffect, useState } from "react";
import { Users, BookOpen, Calendar, CheckCircle, Award, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const statsData = [
  {
    icon: <Award className="w-8 h-8" />,
    number: 168,
    title: "Success Stories",
    description: "Students who achieved their career goals",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: <Users className="w-8 h-8" />,
    number: 678,
    title: "Trusted Tutors",
    description: "Industry experts and certified instructors",
    color: "from-green-500 to-teal-600"
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    number: 347,
    title: "Scheduled Events",
    description: "Workshops, webinars, and live sessions",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    number: 1912,
    title: "Available Courses",
    description: "Comprehensive learning programs",
    color: "from-purple-500 to-fuchsia-600"
  },
];

const StatsPage = () => {
  const [counts, setCounts] = useState<number[]>(statsData.map(() => 0));
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Intersection Observer to trigger animation when component comes into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("stats-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    const intervals: NodeJS.Timeout[] = [];

    statsData.forEach((item, index) => {
      const increment = Math.ceil(item.number / 70); // total 70 steps
      const interval = setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < item.number) {
            newCounts[index] = Math.min(newCounts[index] + increment, item.number);
          }
          return newCounts;
        });
      }, 20); // speed of animation
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [inView]);

  return (
    <section 
      id="stats-section"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-blue-500 blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-purple-500 blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-full mb-6"
          >
            <BarChart2 className="mr-2" size={20} />
            <span className="font-medium tracking-wider">OUR IMPACT</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Transforming Education
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join thousands of students who have transformed their careers through our platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              {/* Animated border gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl blur-sm opacity-20`}></div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-gray-100">
                {/* Progress ring */}
                <div className="absolute top-0 right-0 w-24 h-24 -mt-6 -mr-6 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${(counts[index] / statsData[index].number) * 251} 251`}
                      transform="rotate(-90 50 50)"
                      className={`text-${item.color.split(' ')[0].split('-')[1]}-500`}
                    />
                  </svg>
                </div>
                
                {/* Icon with gradient background */}
                <div className={`inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br ${item.color} mb-6`}>
                  {React.cloneElement(item.icon, { className: "w-8 h-8 text-white" })}
                </div>
                
                {/* Animated number */}
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">
                    {counts[index].toLocaleString()}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">+</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
       
       
      </div>
    </section>
  );
};

export default StatsPage;