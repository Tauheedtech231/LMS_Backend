"use client";
import Image from "next/image";
import React from "react";
import { FaStar, FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";

const tutors = [
  {
    name: "Edward Bowman",
    role: "Associate Professor",
    image: "/tutor1.jpg",
    rating: 4.9,
    courses: 12,
  },
  {
    name: "Denise Wood",
    role: "Assistant Professor",
    image: "/tutor2.jpg",
    rating: 4.7,
    courses: 8,
  },
  {
    name: "Kathryn Webb",
    role: "Teaching Assistant",
    image: "/tutor3.jpg",
    rating: 4.8,
    courses: 5,
  },
  {
    name: "Jennifer Powell",
    role: "Associate Professor",
    image: "/tutor4.jpg",
    rating: 5.0,
    courses: 15,
  },
  {
    name: "Dave Robbins",
    role: "Assistant Professor",
    image: "/tutor5.jpg",
    rating: 4.6,
    courses: 10,
  },
  {
    name: "Keith Taylor",
    role: "Teaching Assistant",
    image: "/tutor6.jpg",
    rating: 4.9,
    courses: 7,
  },
];

const TopTutorsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-10"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-indigo-100 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Top Tutors
            </span>{" "}
            in Every Subject
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from the best educators with industry experience and proven teaching methodologies
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <FaGraduationCap className="text-indigo-600 mr-2" />
              <span className="text-gray-700">200+ Expert Tutors</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <FaChalkboardTeacher className="text-indigo-600 mr-2" />
              <span className="text-gray-700">500+ Courses</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                    <Image
                      src={tutor.image}
                      alt={tutor.name}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 right-2 bg-indigo-500 text-white text-xs font-bold py-1 px-2 rounded-full flex items-center">
                    <FaStar className="text-yellow-300 mr-1" />
                    {tutor.rating}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tutor.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{tutor.role}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center mr-3">
                    <FaGraduationCap className="mr-1 text-indigo-500" />
                    {tutor.courses} courses
                  </span>
                  <span className="flex items-center">
                    <FaStar className="mr-1 text-yellow-400" />
                    {tutor.rating} rating
                  </span>
                </div>
                
                <button className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full border-2 border-indigo-200 shadow-md transition-all duration-300 hover:bg-indigo-50 hover:shadow-lg hover:border-indigo-300">
            Browse All Tutors
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopTutorsSection;