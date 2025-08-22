"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useTheme } from "next-themes";

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    title: "Welcome to MANSOL LMS",
    description: "Learn from the best instructors and boost your skills",
    cta: "Explore Courses",
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80",
    title: "Transform Your Career",
    description: "Industry-relevant courses with hands-on projects",
    cta: "View Programs",
  },
  {
    image: "https://images.unsplash.com/photo-1522881193457-37ae97c905bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Join Our Learning Community",
    description: "Connect with peers and mentors worldwide",
    cta: "Join Now",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(() => {
        nextSlide();
      }, 7000); // auto slide every 7 seconds
    }
    return () => clearInterval(interval);
  }, [autoPlay]);

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  if (!mounted) return null;

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 z-30 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white shadow-lg hover:bg-white/20 transition-all dark:bg-gray-800/80 dark:text-gray-200"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
            index === current
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Image with gradient overlay */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/50 dark:from-gray-900/70 dark:to-blue-900/40" />
          </div>

          {/* Text Overlay */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4 z-20">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 dark:bg-blue-400/20">
                <span className="text-blue-300 font-medium tracking-wider text-sm dark:text-blue-200">
                  PREMIUM LEARNING EXPERIENCE
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight animate-fadeIn">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed dark:text-gray-300">
                {slide.description}
              </p>
              
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white shadow-lg z-30 hover:bg-white/20 transition-all dark:bg-gray-800/80 dark:hover:bg-gray-700/80"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white shadow-lg z-30 hover:bg-white/20 transition-all dark:bg-gray-800/80 dark:hover:bg-gray-700/80"
      >
        <ChevronRight size={30} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current
                ? "bg-white w-10 scale-110"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto Play Toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute right-8 bottom-8 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white shadow-lg z-30 hover:bg-white/20 transition-all dark:bg-gray-800/80 dark:hover:bg-gray-700/80"
        aria-label={autoPlay ? "Pause slideshow" : "Play slideshow"}
      >
        {autoPlay ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent z-20 dark:from-gray-950" />

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-blue-600/30 backdrop-blur-sm z-20 animate-pulse dark:bg-blue-400/30" />
      <div className="absolute bottom-20 left-10 w-12 h-12 rounded-full bg-blue-500/20 backdrop-blur-sm z-20 animate-pulse dark:bg-blue-400/20" />
      <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm z-20 animate-pulse dark:bg-gray-400/10" />
    </section>
  );
};

export default Hero;