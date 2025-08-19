"use client"
import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react"; // icons
import { Button } from "@/components/ui/button"; // shadcn button

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = ["Home", "Courses", "Instructors", "Events", "Pages", "Contact"];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">MANSOL LMS</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {links.map((link) => (
            <li
              key={link}
              className="hover:text-blue-600 cursor-pointer transition"
            >
              {link}
            </li>
          ))}
        </ul>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Search className="h-5 w-5 text-gray-500 cursor-pointer" />
          <Button variant="outline" className="rounded-full px-4 py-1">
            Login
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-1">
            Register
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col gap-3 p-4 text-gray-700 font-medium">
            {links.map((link) => (
              <li key={link} className="hover:text-blue-600 cursor-pointer">
                {link}
              </li>
            ))}
            <div className="flex gap-3 mt-3">
              <Button variant="outline" className="flex-1 rounded-full">
                Login
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-full">
                Register
              </Button>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
