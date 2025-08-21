"use client";
import { useState, useEffect } from "react";
import CartSidebar from "@/app/components/CartSidebar";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const courses: Course[] = [
    {
      id: 1,
      acronym: "BOSH",
      name: "Basic Occupational Safety & Health",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Comprehensive training on basic occupational safety and health standards for workplace safety representatives.",
      features: ["40-hour training program", "OSHA compliant", "Certificate included"]
    },
    {
      id: 2,
      acronym: "IOSH",
      name: "Institution of Occupational Safety & Health",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Internationally recognized training for managing safety and health in the workplace.",
      features: ["Globally recognized", "Risk assessment training", "Professional certification"]
    },
    {
      id: 3,
      acronym: "OSHA",
      name: "Occupational Safety & Health Administration",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Official OSHA compliance training for workplace safety standards and regulations.",
      features: ["OSHA standards", "Compliance training", "Workplace hazard recognition"]
    },
    {
      id: 4,
      acronym: "PTW",
      name: "Permit to Work",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1581092580894-3c19eae3cdd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Training on the permit to work system for controlling hazardous work activities.",
      features: ["Risk control", "Safety procedures", "Work authorization systems"]
    },
    {
      id: 5,
      acronym: "FS",
      name: "Fire Safety Training",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04c52a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Essential fire safety training for workplaces and industrial environments.",
      features: ["Fire prevention", "Emergency evacuation", "Fire extinguisher use"]
    },
    {
      id: 6,
      acronym: "FA",
      name: "First Aid Training",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1581092580894-3c19eae3cdd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Comprehensive first aid training for emergency response in the workplace.",
      features: ["CPR training", "Emergency response", "First aid techniques"]
    },
    {
      id: 7,
      acronym: "HW",
      name: "Hole Watcher Training",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Specialized training for hole watchers and confined space safety attendants.",
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
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"} min-h-screen transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400">Safe<span className="text-blue-600 dark:text-blue-200">Train</span></h1>
          <div className="flex gap-2">
            <button
              onClick={() => setCartVisible(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center">Professional Safety Training Courses</h2>
        <p className="text-center mb-8 text-gray-500 dark:text-gray-300">Enhance workplace safety with our certified programs</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-52">
                <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-blue-800 bg-opacity-70 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white">{course.acronym}</h3>
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold mb-2">{course.name}</h4>
                <p className="text-sm mb-4">{course.description}</p>
                <ul className="mb-4 space-y-2">
                  {course.features.map((f, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">${course.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(course)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
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
