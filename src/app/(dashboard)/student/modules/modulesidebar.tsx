// components/ModuleSidebar.tsx
import { motion } from "framer-motion";
import { FileText, Video, Presentation, CheckCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  materials: {
    type: "slides" | "pdf" | "video";
    title: string;
    url: string;
    duration: string;
  }[];
  moduleId: number;
};

export default function ModuleSidebar({ materials, moduleId }: Props) {
  const pathname = usePathname();
  
  const getIcon = (type: string) => {
    switch (type) {
      case "slides": return <Presentation size={18} />;
      case "pdf": return <FileText size={18} />;
      case "video": return <Video size={18} />;
      default: return <FileText size={18} />;
    }
  };
  
  return (
    <div className="bg-white rounded-xl border border-blue-100 p-4 h-fit shadow-sm">
      <h3 className="font-semibold text-blue-800 mb-4">Course Materials</h3>
      
      <div className="space-y-2">
        {materials.map((material, index) => {
          const isActive = pathname.includes(material.url);
          
          return (
            <Link 
              key={index} 
              href={`/modules/${moduleId}?material=${encodeURIComponent(material.url)}`}
              scroll={false}
            >
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-blue-50 border border-blue-200" 
                    : "hover:bg-blue-50 border border-transparent"
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-blue-100 text-blue-600" 
                    : "bg-blue-50 text-blue-500"
                }`}>
                  {getIcon(material.type)}
                </div>
                
                <div className="flex-1">
                  <p className={`font-medium transition-colors ${
                    isActive ? "text-blue-700" : "text-blue-600"
                  }`}>
                    {material.title}
                  </p>
                  <p className="text-xs text-blue-400">{material.duration}</p>
                </div>
                
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-blue-600"
                  >
                    <CheckCircle size={18} />
                  </motion.div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-800 mb-2">Tips for Success</h4>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
          <li>Complete materials in order</li>
          <li>Take notes as you go</li>
          <li>Practice what you learn</li>
        </ul>
      </div>
    </div>
  );
}
