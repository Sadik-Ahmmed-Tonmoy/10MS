"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Globe, Menu, X } from "lucide-react"
import { useState } from "react"

interface LayoutProps {
  children: React.ReactNode
  locale: string
}

export default function Layout({ children, locale }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">10</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                10 Minute School
              </h1>
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
                  href="/en/product"
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    locale === "en"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  EN
                </Link>
                <Link
                  href="/bn/product"
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    locale === "bn"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  বাং
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
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
                    href="/en/product"
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      locale === "en" ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    English
                  </Link>
                  <Link
                    href="/bn/product"
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

      <main>{children}</main>

      {/* Enhanced Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 text-white py-12 mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">10</span>
                </div>
                <h3 className="text-xl font-bold">10 Minute School</h3>
              </div>
              <p className="text-gray-400">Empowering learners with quality education accessible to everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    IELTS
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Academic
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 10 Minute School. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
