/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import Link from "next/link"
import type { Section } from "@/types/product"

interface LeadMagnetCardProps {
  engagement: Section[]
}

const renderText = (text: any): string => {
  if (typeof text === "string") {
    return text
  }
  if (typeof text === "object" && text !== null) {
    if (text.name) return text.name
    if (text.value) return text.value
    if (text.title) return text.title
    if (text.text) return text.text
    return JSON.stringify(text)
  }
  return String(text || "")
}

export default function LeadMagnetCard({ engagement }: LeadMagnetCardProps) {
  const engagementData = engagement.filter((section) => section.type === "group_join_engagement")

  if (engagementData.length === 0 || !engagementData[0].values || engagementData[0].values.length === 0) {
    return null
  }

  const item = engagementData[0].values[0] // Assuming one lead magnet item

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white text-center border border-purple-400 relative overflow-hidden"
    >
      {item.background?.image && (
        <img
          src={item.background.image || "/placeholder.svg"}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      )}
      <div className="relative z-10">
        {item.top_left_icon_img && (
          <img
            src={item.top_left_icon_img || "/placeholder.svg"}
            alt="Icon"
            className="w-16 h-16 object-contain mx-auto mb-4"
          />
        )}
        <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: item.title_color || "#ffffff" }}>
          {renderText(item.title)}
        </h3>
        <p className="text-purple-100 mb-6 leading-relaxed" style={{ color: "#ededed" }}>
          {renderText(item.description)}
        </p>
        {item.cta?.clicked_url && (
          <Link
            href={item.cta.clicked_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-purple-600 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ color: item.cta.color || "#6b21a8" }}
          >
            <Download className="w-5 h-5 mr-2" />
            <span>{renderText(item.cta.text) || "Download Now"}</span>
          </Link>
        )}
      </div>
    </motion.div>
  )
}
