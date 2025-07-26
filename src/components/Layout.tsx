"use client";

import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import NavBar from "./shared/NavBar/NavBar";
import Footer from "./shared/Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function Layout({ children, locale }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <NavBar locale={locale} />

      <main>{children}</main>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
}
