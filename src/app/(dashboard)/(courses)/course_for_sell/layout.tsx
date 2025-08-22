"use client";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/app/components/navbar";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="h-screen flex flex-col">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        {/* Main Content with Sidebar (future expandable) */}
        <div className="flex flex-1 pt-16"> {/* pt-16 => Navbar height gap */}
          {/* Page Content */}
          <main className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
