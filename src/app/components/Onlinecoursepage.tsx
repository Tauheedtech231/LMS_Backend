// src/components/OnlineCoursesLanding.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaGraduationCap, FaUsers, FaBook, FaClock } from 'react-icons/fa';

type Countdown = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const OnlineCoursesLanding = () => {
  const [countdown, setCountdown] = useState<Countdown>({
    years: 4,
    months: 11,
    days: 1,
    hours: 16,
    minutes: 35,
    seconds: 5
  });
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newCountdown = {...prev};
        
        if (newCountdown.seconds > 0) {
          newCountdown.seconds -= 1;
        } else {
          newCountdown.seconds = 59;
          if (newCountdown.minutes > 0) {
            newCountdown.minutes -= 1;
          } else {
            newCountdown.minutes = 59;
            if (newCountdown.hours > 0) {
              newCountdown.hours -= 1;
            } else {
              newCountdown.hours = 23;
              if (newCountdown.days > 0) {
                newCountdown.days -= 1;
              } else {
                newCountdown.days = 30;
                if (newCountdown.months > 0) {
                  newCountdown.months -= 1;
                } else {
                  newCountdown.months = 11;
                  if (newCountdown.years > 0) {
                    newCountdown.years -= 1;
                  }
                }
              }
            }
          }
        }
        
        return newCountdown;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Online Courses for <span className="text-yellow-400">Free</span>
                </h1>
                <p className="text-xl text-blue-200 mb-8">
                  The best tutors in town.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="flex flex-col items-center p-4 bg-blue-800/30 rounded-xl">
                  <FaGraduationCap className="text-3xl mb-2 text-yellow-400" />
                  <span className="text-3xl font-bold">120+</span>
                  <span className="text-blue-200">Courses</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-blue-800/30 rounded-xl">
                  <FaUsers className="text-3xl mb-2 text-yellow-400" />
                  <span className="text-3xl font-bold">15K</span>
                  <span className="text-blue-200">Students</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-blue-800/30 rounded-xl">
                  <FaBook className="text-3xl mb-2 text-yellow-400" />
                  <span className="text-3xl font-bold">500+</span>
                  <span className="text-blue-200">Lessons</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-blue-800/30 rounded-xl">
                  <FaClock className="text-3xl mb-2 text-yellow-400" />
                  <span className="text-3xl font-bold">24/7</span>
                  <span className="text-blue-200">Access</span>
                </div>
              </div>
              
              {/* Countdown Timer */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Registration ends in:</h3>
                <div className="grid grid-cols-6 gap-2 max-w-2xl">
                  <div className="bg-blue-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{countdown.years}</div>
                    <div className="text-blue-200">Year</div>
                  </div>
                  <div className="bg-blue-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{countdown.months}</div>
                    <div className="text-blue-200">Months</div>
                  </div>
                  <div className="bg-blue-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{countdown.days}</div>
                    <div className="text-blue-200">Day</div>
                  </div>
                  <div className="bg-blue-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{countdown.hours}</div>
                    <div className="text-blue-200">Hours</div>
                  </div>
                  <div className="bg-blue-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{countdown.minutes}</div>
                    <div className="text-blue-200">min</div>
                  </div>
                  <div className="bg-blue-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{countdown.seconds}</div>
                    <div className="text-blue-200">sec</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Form */}
            <div className="lg:w-1/2 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Register Now!</h2>
                <p className="text-blue-200 mb-8 text-center">
                  Lorem ipsum gravida nibh vel velit auctor aliquetnean sollicitudin, lorem quis bibendum aud elit consequatipsutis sem nibh id eis sed odio sit amet.
                </p>
                
                {isSubmitted ? (
                  <div className="bg-green-500/20 p-4 rounded-lg border border-green-400 text-center">
                    <h3 className="text-xl font-bold text-green-300 mb-2">Registration Successful!</h3>
                    <p className="text-green-200">We ve sent a confirmation to your email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label className="block text-blue-200 mb-2 font-medium">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="mb-5">
                      <label className="block text-blue-200 mb-2 font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter your email address"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-blue-200 mb-2 font-medium">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold py-4 px-6 rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "APPLY TODAY"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Courses Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-900 to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular <span className="text-yellow-400">Free Courses</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Learn in-demand skills from industry experts at no cost
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Web Development", lessons: 42, students: 3200, instructor: "Sarah Johnson" },
              { title: "Data Science", lessons: 36, students: 2850, instructor: "Michael Chen" },
              { title: "Digital Marketing", lessons: 28, students: 4100, instructor: "Emma Rodriguez" }
            ].map((course, index) => (
              <div key={index} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white/30">{index + 1}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <div className="flex justify-between text-blue-200 mb-4">
                    <span>{course.lessons} lessons</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                      <span className="font-bold">{course.instructor.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <div className="font-medium">Instructor</div>
                      <div>{course.instructor}</div>
                    </div>
                  </div>
                  <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium hover:from-blue-400 hover:to-indigo-500 transition-all">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-indigo-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold flex items-center">
                <FaGraduationCap className="mr-2 text-yellow-400" />
                LearnFree
              </h3>
              <p className="text-blue-200 mt-2">Education without barriers</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">About</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Courses</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-blue-300">
            <p>© {new Date().getFullYear()} LearnFree. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-yellow-500 text-blue-900 p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default OnlineCoursesLanding;