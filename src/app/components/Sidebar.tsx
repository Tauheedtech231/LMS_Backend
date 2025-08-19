"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  FileText, 
  CheckSquare, 
  BarChart, 
  Home, 
  Users, 
  Settings, 
  MessageSquare,
  Award,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/student", icon: <Home size={16} /> },
    { name: "Modules", href: "/student/modules", icon: <BookOpen size={16} /> },
    { name: "Quizzes", href: "/student/quizez", icon: <CheckSquare size={16} /> },
    { name: "Assignments", href: "/student/assignments", icon: <FileText size={16} /> },
    { name: "Progress", href: "/student/progress", icon: <BarChart size={16} /> },
    { name: "Discussions", href: "/student/discussions", icon: <MessageSquare size={16} /> },
    { name: "Certificates", href: "/student/certificates", icon: <Award size={16} /> },
  ];

  return (
    <aside className="w-60 bg-gradient-to-b from-blue-700 to-blue-900 h-full flex flex-col text-white">
      
      {/* User Profile */}
      <div className="p-4 flex items-center gap-3 border-b border-blue-600">
        <div className="relative">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-blue-800"></div>
        </div>
        <div>
          <p className="font-semibold text-sm">Alex Morgan</p>
          <p className="text-blue-200 text-xs">Student</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-white/20 backdrop-blur-sm shadow-md"
                    : "hover:bg-white/10"
                }`}
              >
                <span className={`${active ? "text-white" : "text-blue-200"}`}>
                  {item.icon}
                </span>
                <span className={`font-medium text-sm ${active ? "text-white" : "text-blue-100"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-blue-600">
        <button className="w-full flex items-center gap-2 p-2 rounded-lg text-blue-100 hover:bg-white/10 transition-colors text-sm">
          <LogOut size={16} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
