"use client";

import type React from "react";
import Footer from "./shared/Footer/Footer";
import NavBar from "./shared/NavBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <NavBar />

      <main>{children}</main>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
}
