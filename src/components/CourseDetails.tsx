/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Info, BookOpen, Lightbulb, GraduationCap } from "lucide-react"
import type { Section } from "@/types/product"

interface CourseDetailsProps {
  aboutSections: Section[]
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

const getSectionIcon = (sectionName: string) => {
  const nameLower = sectionName.toLowerCase()
  if (nameLower.includes("জন্য") || nameLower.includes("for whom")) {
    return <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
  }
  if (nameLower.includes("সম্পর্কে") || nameLower.includes("about")) {
    return <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-3" />
  }
  if (nameLower.includes("সাহায্য করবে") || nameLower.includes("help you")) {
    return <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mr-3" />
  }
  return <Info className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
}

export default function CourseDetails({ aboutSections }: CourseDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
    >
 

      {aboutSections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-8 last:mb-0 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
        >
          <div className="flex items-center mb-4">
            {getSectionIcon(renderText(section.name))}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{renderText(section.name)}</h3>
          </div>

          {section.values && section.values.length > 0 && (
            <div className="space-y-6">
              {section.values.map((value, valueIndex) => (
                <motion.div
                  key={valueIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: valueIndex * 0.05 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100 hover:shadow-md transition-all duration-300"
                >
                  <div
                    className="font-semibold text-gray-900 mb-2 text-base sm:text-lg leading-tight"
                    dangerouslySetInnerHTML={{ __html: renderText(value.title) }}
                  />
                  {value.description && (
                    <div
                      className="text-gray-600 prose prose-sm sm:prose-base max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderText(value.description) }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
