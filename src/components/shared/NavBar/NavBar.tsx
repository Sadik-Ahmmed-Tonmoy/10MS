"use client";

import { motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";

import Image from "next/image";
import logo from "@/assets/icons/10_Minute_School_Logo.svg.png";

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Infer locale from pathname or set a default
  const locale = pathname?.startsWith("/bn") ? "bn" : "en";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
            <Image src={logo} alt="10 Minute School Logo" className="h-8 w-auto" height={32} />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Courses
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Skills
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
            </nav>

            {/* Locale Switcher */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Globe className="w-4 h-4 text-gray-500" />
              <Link
                href="/en/product/ielts-course"
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  pathname === "/en/product/ielts-course" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                EN
              </Link>
              <Link
                href="/bn/product/ielts-course"
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  pathname === "/bn/product/ielts-course" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                বাং
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <nav className="flex flex-col space-y-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Courses
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Skills
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              <div className="flex space-x-2 pt-2">
                <Link
                  href="/en/product/ielts-course"
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    locale === "en" ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  English
                </Link>
                <Link
                  href="/bn/product/ielts-course"
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    locale === "bn" ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  বাংলা
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default NavBar;
