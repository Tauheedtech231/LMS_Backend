"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import CartSidebar from "@/app/components/CartSidebar";

interface Course {
  id: number;
  acronym: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

interface CartItem extends Course {
  quantity: number;
}



export default function SafetyTrainingCourses() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const courses: Course[] = [
    {
      id: 1,
      acronym: "BOSH",
      name: "Basic Occupational Safety & Health",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      description: "Comprehensive training on basic occupational safety and health standards.",
      features: ["40-hour training program", "OSHA compliant", "Certificate included"]
    },
    {
      id: 2,
      acronym: "IOSH",
      name: "Institution of Occupational Safety & Health",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80",
      description: "Internationally recognized training for managing safety and health.",
      features: ["Globally recognized", "Risk assessment training", "Professional certification"]
    },
    {
      id: 3,
      acronym: "OSHA",
      name: "Occupational Safety & Health Administration",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80",
      description: "Official OSHA compliance training for workplace safety standards.",
      features: ["OSHA standards", "Compliance training", "Workplace hazard recognition"]
    },
    {
      id: 4,
      acronym: "PTW",
      name: "Permit to Work",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1581092580894-3c19eae3cdd0?auto=format&fit=crop&w=600&q=80",
      description: "Training on the permit to work system for hazardous work activities.",
      features: ["Risk control", "Safety procedures", "Work authorization systems"]
    },
    {
      id: 5,
      acronym: "FS",
      name: "Fire Safety Training",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04c52a2?auto=format&fit=crop&w=600&q=80",
      description: "Essential fire safety training for workplaces and industrial environments.",
      features: ["Fire prevention", "Emergency evacuation", "Fire extinguisher use"]
    },
    {
      id: 6,
      acronym: "FA",
      name: "First Aid Training",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80",
      description: "Comprehensive first aid training for emergency response in the workplace.",
      features: ["CPR training", "Emergency response", "First aid techniques"]
    },
    {
      id: 7,
      acronym: "HW",
      name: "Hole Watcher Training",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80",
      description: "Specialized training for hole watchers and confined space safety.",
      features: ["Confined space safety", "Monitoring techniques", "Rescue procedures"]
    }
  ];

  const addToCart = (course: Course) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === course.id);
      if (exists) return prev.map(item => item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...course, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(item => item.id !== id));

  return (
    <div className="min-h-screen  text-gray-800 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end items-center mb-10">
          
          <button
            onClick={() => setCartVisible(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>

       <div className="text-center mb-12">
  <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-white">
    Professional Training Programs
  </h2>
  <p className="text-sm text-blue-500 dark:text-gray-300 max-w-2xl mx-auto">
    Elevate your skills and ensure workplace excellence with our certified programs aligned to industry standards.
  </p>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white text-[blue] dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="relative h-48">
                <Image 
                  src={course.image} 
                  alt={course.name} 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-4">
                  <h3 className="text-2xl font-bold text-white">{course.acronym}</h3>
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-base font-semibold mb-2 text-[blue] dark:text-white">{course.name}</h4>
                <p className="text-xs text-[blue] dark:text-gray-300 mb-4">{course.description}</p>
                <ul className="mb-4 space-y-2">
                  {course.features.map((f, i) => (
                    <li key={i} className="flex items-center text-xs">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2 mt-0.5 flex-shrink-0"></span>
                      <span className="text-[blue] dark:text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-blue-700 dark:text-blue-300">${course.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(course)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CartSidebar
        cart={cart}
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}