// app/modules/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getModuleById } from "../data/modal";
import { Material, Module } from "../types";
import ModuleSidebar from "../modulesidebar";
import MaterialPreview from "../materialpreview";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProgressBar from "../progressbar";

export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [module, setModule] = useState<Module | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  
  useEffect(() => {
    const moduleId = parseInt(params.id);
    const loadedModule = getModuleById(moduleId);
    
    if (loadedModule) {
      setModule(loadedModule);
      
      // Get material from URL or default to first material
      const materialParam = searchParams.get("material");
      const material = materialParam 
        ? loadedModule.materials.find(m => m.url === materialParam) || loadedModule.materials[0]
        : loadedModule.materials[0];
        
      setSelectedMaterial(material);
    }
  }, [params.id, searchParams]);

  if (!module) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-blue-600">Loading module...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to all modules
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-blue-100 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-blue-800">{module.title}</h1>
              <p className="text-blue-600 mt-1">{module.description}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-blue-500">Progress</p>
                <p className="font-bold text-lg text-blue-700">{module.progress}%</p>
              </div>
              <div className="w-40">
                <ProgressBar progress={module.progress} />
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ModuleSidebar 
              materials={module.materials} 
              moduleId={module.id} 
              
            />
          </div>
          
          <div className="lg:col-span-3">
            <MaterialPreview material={selectedMaterial}  />
          </div>
        </div>
      </div>
    </div>
  );
}
