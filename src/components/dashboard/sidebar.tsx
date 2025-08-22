"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Icons } from "@/components/icons";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    href: string;
    icon: string;
  }[];
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 h-screen border-r transition-colors rounded-r-xl shadow-lg text-sm",
        "bg-white text-blue-600 border-gray-200",
        "dark:bg-neutral-900 dark:border-neutral-800 dark:text-blue-400",
        className
      )}
      {...props}
    >
      <nav className="flex flex-col space-y-1 px-4 py-6">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = getIcon(item.icon);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white shadow-sm dark:bg-blue-700"
                  : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-neutral-800 dark:hover:text-blue-300"
              )}
            >
              {Icon && <Icon className="h-5 w-5 shrink-0" />}
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function getIcon(icon: string): LucideIcon {
  switch (icon) {
    case "dashboard":
      return Icons.dashboard;
    case "book":
      return Icons.book;
    case "users":
      return Icons.users;
    case "file":
      return Icons.file;
    case "message":
      return Icons.message;
    case "settings":
      return Icons.settings;
    default:
      return Icons.dashboard;
  }
}
