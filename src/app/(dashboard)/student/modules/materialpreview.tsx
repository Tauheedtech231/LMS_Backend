// components/MaterialPreview.tsx
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";

type Props = {
  material: {
    type: "slides" | "pdf" | "video";
    title: string;
    url: string;
    duration: string;
  } | null;
};

export default function MaterialPreview({ material }: Props) {
  if (!material) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-full bg-blue-50 rounded-xl p-8 text-center"
      >
        <div className="bg-blue-100 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
        <h3 className="text-xl font-semibold text-blue-800 mb-2">
          Select a material to preview
        </h3>
        <p className="text-blue-600 max-w-md">
          Choose a learning material from the sidebar to start your lesson. 
          Materials include slides, PDF guides, and instructional videos.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={material.url}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-blue-100 overflow-hidden h-full flex flex-col shadow-sm"
    >
      <div className="p-4 border-b border-blue-100 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-blue-800">{material.title}</h3>
          <p className="text-sm text-blue-600 capitalize">{material.type} • {material.duration}</p>
        </div>
        <a 
          href={material.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          {material.type === "video" ? (
            <>
              <ExternalLink size={16} /> Open in new tab
            </>
          ) : (
            <>
              <Download size={16} /> Download
            </>
          )}
        </a>
      </div>
      
      <div className="flex-1 p-4">
        {material.type === "video" ? (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={material.url}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="h-full w-full bg-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="bg-blue-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
              <h4 className="font-medium text-blue-800 mb-1">
                {material.type === "slides" ? "Presentation Slides" : "PDF Document"}
              </h4>
              <p className="text-blue-600 text-sm max-w-xs">
                Click the download button above to access this {material.type}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
