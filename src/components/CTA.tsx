/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion";
import { Clock, ShoppingCart, Star } from "lucide-react";

interface CTAProps {
  ctaText: string | { name?: string; value?: string } | any
  price: number
}

const renderText = (text: any): string => {
  if (typeof text === "string") {
    return text
  }
  if (typeof text === "object" && text !== null) {
    if (text.name) return text.name
    if (text.value) return text.value
    if (text.title) return text.title
    return JSON.stringify(text)
  }
  return String(text || "")
}

export default function CTA({ ctaText, price }: CTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white z-20 relative lg:sticky lg:top-24 border border-green-400"
    >
      <div className="text-center">
        {/* Price Section */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center mb-2">
            <span className="text-lg opacity-75 line-through mr-2">৳2000</span>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">50% OFF</span>
          </div>
          <div className="text-4xl font-bold mb-2">৳{price}</div>
          {/* <p className="text-green-100 text-sm">Limited Time Offer</p> */}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-6 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{renderText(ctaText) || "Enroll Now"}</span>
        </motion.button>

        {/* Trust Indicators */}
        <div className="space-y-3 text-sm">
          {/* <div className="flex items-center justify-center space-x-2 text-green-100">
            <Shield className="w-4 h-4" />
            <span>30-day money-back guarantee</span>
          </div> */}
          <div className="flex items-center justify-center space-x-2 text-green-100">
            <Clock className="w-4 h-4" />
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-green-100">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>4.9/5 student rating</span>
          </div>
        </div>

        {/* Urgency */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="mt-4 text-xs text-green-100 bg-green-600/30 rounded-lg p-2"
        >
          🔥 Only 48 hours left at this price!
        </motion.div>
      </div>
    </motion.div>
  )
}
