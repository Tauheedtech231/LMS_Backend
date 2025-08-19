// app/page.tsx
"use client"
import ModuleList from "./modulelist";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Hero Description */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
            Explore Our Learning Modules
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mt-2 mb-3"></div>
          <p className="text-blue-600 mt-1 max-w-2xl mx-auto text-sm">
            Gain practical skills with structured learning paths. Each module includes slides, PDF guides, and instructional videos.
          </p>
        </motion.div>
        
        {/* Modules Section */}
        <div className="bg-white rounded-2xl shadow-md p-4 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-bold text-blue-800">Available Modules</h3>
          </div>
          
          <ModuleList />
        </div>
        
      </div>
    </div>
  );
}
