"use client"

import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Define sidebar navigation items specific to student role
  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/student",
      icon: "dashboard",
    },
    {
      title: "Modules",
      href: "/student/modules",
      icon: "book",
    },
    {
      title: "Quizzes",
      href: "/student/quizez",
      icon: "file",
    },
    {
      title: "Assignments",
      href: "/student/assignments",
      icon: "file",
    },
    {
      title: "Progress",
      href: "/student/progress",
      icon: "chart",
    },
    {
      title: "Settings",
      href: "/student/settings",
      icon: "settings",
    },
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Sidebar for navigation */}
        <Sidebar items={sidebarNavItems} className="hidden md:block" />
        
        {/* Main content area */}
        <div className="flex-1">
          <DashboardHeader role="Student" />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
