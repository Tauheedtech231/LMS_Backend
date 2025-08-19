// components/ProgressBar.tsx
import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <motion.div 
        className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}