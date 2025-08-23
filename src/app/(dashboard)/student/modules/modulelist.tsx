"use client";
import { useEffect, useState } from "react";
import ModuleCard from "./modelcard";

export default function ModuleList() {
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/modules"); // backend route
        const data = await res.json();
        setModules(data);
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
    };
    fetchModules();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          id={module.id}
          title={module.title}
          description={module.description}
          progress={module.progress ?? 0}
          estimatedTime={module.estimated_time ?? "N/A"}
        />
      ))}
    </div>
  );
}
