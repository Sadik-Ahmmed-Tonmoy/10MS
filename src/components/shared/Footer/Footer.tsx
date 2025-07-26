"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";
import Image from "next/image";

import logo from "@/assets/icons/footerLogo.png";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialIcons = [
    { name: "Facebook", icon: <Facebook />, href: "#" },
    { name: "YouTube", icon: <Youtube />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin />, href: "#" },
    { name: "Twitter", icon: <Twitter />, href: "#" },
    { name: "Instagram", icon: <Instagram />, href: "#" },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <motion.div whileHover={{ scale: 1.0 }} className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Image src={logo} alt="10 Minute School Logo" className="h-10 w-auto filter brightness-110" height={40} />
                <div className="absolute inset-0 bg-blue-400 blur-lg opacity-20 rounded-full"></div>
              </div>
            </motion.div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
              Empowering learners worldwide with quality education that's accessible, engaging, and designed for the modern world.
            </p>

            {/* Newsletter Signup */}
            <div className="hidden sm:block">
              <h5 className="font-semibold mb-3 text-white">Stay Updated</h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Subscribe
                </motion.button> */}

                <div className="svg-wrapper">
                  <svg height="45" width="120" xmlns="http://www.w3.org/2000/svg">
                    <rect className="shape" height="44" width="120"></rect>
                  </svg>
                  <div className="text">Subscribe</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Courses Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-bold text-lg mb-6 relative">
              <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">Courses</span>
             <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-red-600 to-red-300 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {["IELTS Preparation", "Professional Skills", "Academic Courses", "Language Learning", "Test Prep"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 300 }} className="-ml-4">
                  <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group ">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-bold text-lg mb-6 relative">
              <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">Support</span>
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-red-600 to-red-300 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {["Help Center", "Contact Us", "FAQ", "Live Chat", "Documentation"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 300 }} className="-ml-4">
                  <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-bold text-lg mb-6 relative">
              <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">Connect</span>
           <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-red-600 to-red-300 rounded-full"></div>
            </h4>

            {/* Social Media Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-12 h-12 bg-gray-800  rounded-xl transition-all duration-300 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{social.icon}</span>
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                support@10minuteschool.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">📱</span>
                +880 1234-567890
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Newsletter */}
        <motion.div variants={itemVariants} className="sm:hidden mt-8 p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700">
          <h5 className="font-semibold mb-3 text-white">Stay Updated</h5>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Subscribe to Newsletter
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div variants={itemVariants} className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400 text-sm">
              <p>&copy; 2024 10 Minute School. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-red-500">
                ♥
              </motion.span>
              <span>in Bangladesh</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
