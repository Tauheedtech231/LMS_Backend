"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const slides = [
  {
    image: '/image1.png',
    title: "Welcome to MANSOL LMS",
    description: "Learn from the best instructors and boost your skills",
    cta: "Explore Courses",
  },
  {
    image: "/image2.png",
    title: "Transform Your Career",
    description: "Industry-relevant courses with hands-on projects",
    cta: "View Programs",
  },
  {
    image: "/image3.png",
    title: "Join Our Learning Community",
    description: "Connect with peers and mentors worldwide",
    cta: "Join Now",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

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

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/50" />
          </div>

          {/* Text Overlay */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4 z-20">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-blue-300 font-medium tracking-wider">
                  PREMIUM LEARNING EXPERIENCE
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fadeIn">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all hover:scale-105">
                  {slide.cta}
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-medium transition-all hover:scale-105"
                >
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white shadow-lg z-30 hover:bg-white/20 transition-all"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white shadow-lg z-30 hover:bg-white/20 transition-all"
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
        className="absolute right-8 bottom-8 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white shadow-lg z-30 hover:bg-white/20 transition-all"
        aria-label={autoPlay ? "Pause slideshow" : "Play slideshow"}
      >
        {autoPlay ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent z-20" />

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-blue-600/30 backdrop-blur-sm z-20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-12 h-12 rounded-full bg-blue-500/20 backdrop-blur-sm z-20 animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm z-20 animate-pulse" />
    </section>
  );
};

export default Hero;