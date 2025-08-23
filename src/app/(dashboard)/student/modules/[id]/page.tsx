"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Material, Module } from "../types";
import ModuleSidebar from "../modulesidebar";
import MaterialPreview from "../materialpreview";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProgressBar from "../progressbar";

export default function ModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const searchParams = useSearchParams();
  const [module, setModule] = useState<Module | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        // ✅ unwrap params (await because it's a Promise in Next.js 14+)
        const { id } = await params;
        console.log("Fetching module with id:", id);

        const res = await fetch(`http://localhost:5000/api/modules/${id}`);
        const data = await res.json()
        console.log("The module data",data);
        setModule(data);

        const materialParam = searchParams.get("material");
        const material = materialParam 
          ? data.materials.find((m: Material) => m.url === materialParam) || data.materials[0]
          : data.materials[0];

        setSelectedMaterial(material);
      } catch (err) {
        console.error("Error fetching module:", err);
      }
    };

    fetchModule();
  }, [params, searchParams]);

  if (!module) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-blue-600 dark:text-blue-400">Loading module...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/student/modules"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to all modules
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 border border-blue-100 dark:border-gray-700 mb-6 transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-400">{module.title}</h1>
              <p className="text-blue-600 dark:text-blue-300 mt-1">{module.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-blue-500 dark:text-blue-300">Progress</p>
                <p className="font-bold text-lg text-blue-700 dark:text-blue-400">{module.progress ?? 0}%</p>
              </div>
              <div className="w-40">
                <ProgressBar progress={module.progress ?? 0} />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ModuleSidebar materials={module.materials} moduleId={module.id} />
          </div>

          <div className="lg:col-span-3">
            <MaterialPreview material={selectedMaterial} />
          </div>
        </div>
      </div>
    </div>
  );
}
