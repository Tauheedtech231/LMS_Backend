"use client";
import React, { useState } from "react";
import { Menu as MenuIcon, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    {
      name: "Courses",
      subLinks: [
        { name: "Web Development", href: "/courses/web" },
        { name: "AI & ML", href: "/courses/ai" },
        { name: "Design", href: "/courses/design" },
        { name: "Cloud Computing", href: "/courses/cloud" },
        { name: "Data Science", href: "/courses/data" },
        { name: "Mobile Development", href: "/courses/mobile" },
      ],
    },
    {
      name: "Instructors",
      subLinks: [
        { name: "All Instructors", href: "/instructors" },
        { name: "Instructor Profiles", href: "/instructors/profiles" },
        { name: "Become an Instructor", href: "/instructors/become" },
        { name: "Teaching Resources", href: "/instructors/resources" },
      ],
    },
    // Add other links here
  ];

  // Decide font size based on current route
  const linkFontClass = pathname === "/" ? "text-base" : "text-sm";

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
       {/* Logo */}


{/* Logo */}
<div className="flex items-center gap-2">
  <Image
    src="/main-logo.png"   // public folder me rakha image
    alt="Logo"
    width={100}             // width in pixels
    height={100}            // height in pixels
    className="object-contain"
  />
 
</div>


        {/* Desktop Links */}
        <ul className={`hidden md:flex items-center gap-6 text-gray-700 font-medium ${linkFontClass}`}>
          {links.map((link) =>
            link.subLinks ? (
              <li key={link.name} className="relative group">
                <button className="hover:text-blue-600 transition-colors flex items-center gap-1">
                  {link.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* Dropdown */}
                <ul className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transform -translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50 border border-gray-100">
                  {link.subLinks.map((sub) => (
                    <li key={sub.name}>
                      <a
                        href={sub.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all rounded text-sm flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-200 rounded-full mr-3"></span>
                        {sub.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.name} className="hover:text-blue-600 cursor-pointer transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            )
          )}
        </ul>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 w-48 transition-all"
            />
          </div>
          <Button variant="outline" className="rounded-full px-4 py-1 text-gray-700">
            Login
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-1">
            Register
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          {/* Mobile content similar to desktop */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
