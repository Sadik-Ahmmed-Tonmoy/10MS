/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { CheckCircle, Award } from "lucide-react"
import type { Section } from "@/types/product"

interface ExclusiveFeatureProps {
  instructors: Section[] // Renamed to `sections` for clarity, but keeping `instructors` for now to match prop name
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

export default function ExclusiveFeature({ instructors: sections }: ExclusiveFeatureProps) {
  // Filter for sections with type "feature_explanations"
  const exclusiveFeaturesData = sections.filter((section) => section.type === "feature_explanations")

  if (exclusiveFeaturesData.length === 0) {
    return null // Don't render if no data
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100"
    >
      <div className="flex items-center mb-6 sm:mb-8">
        <Award className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {renderText(exclusiveFeaturesData[0].name || "Course Exclusive Features")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exclusiveFeaturesData.map((section, sectionIndex) =>
          section.values?.map((feature, featureIndex) => (
            <motion.div
              key={`${sectionIndex}-${featureIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 flex flex-col items-center text-center"
            >
              {feature.file_url && (
                <motion.div whileHover={{ scale: 1.05 }} className="mb-4">
                  <img
                    src={feature.file_url || "/placeholder.svg"}
                    alt={renderText(feature.title)}
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                </motion.div>
              )}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">
                {renderText(feature.title)}
              </h3>
              {feature.checklist && feature.checklist.length > 0 && (
                <ul className="text-left w-full space-y-2 text-gray-700 text-sm sm:text-base">
                  {feature.checklist.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>{renderText(item)}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          )),
        )}
      </div>
    </motion.div>
  )
}
