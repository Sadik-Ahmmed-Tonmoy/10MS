/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen, Video, FileText, Users, Target, Clock } from "lucide-react"
import type { Section } from "@/types/product"

interface CourseFeaturesProps {
  features: Section[]
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

const getFeatureIcon = (title: string, index: number) => {
  const titleLower = title.toLowerCase()
  const icons = [
    <Video key="video-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
    <FileText key="filetext-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
    <Target key="target-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
    <Users key="users-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />,
    <Clock key="clock-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />,
    <BookOpen key="bookopen-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />,
  ]

  if (titleLower.includes("video") || titleLower.includes("ভিডিও")) {
    return <Video key="video-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
  }
  if (titleLower.includes("sheet") || titleLower.includes("শিট")) {
    return <FileText key="filetext-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
  }
  if (titleLower.includes("test") || titleLower.includes("টেস্ট")) {
    return <Target key="target-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
  }
  if (titleLower.includes("class") || titleLower.includes("ক্লাস")) {
    return <Users key="users-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
  }

  return icons[index % icons.length] || <BookOpen key="bookopen-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
}

// Server Component
export default function CourseFeatures({ features }: CourseFeaturesProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 animate-slide-up">
      {features.map((feature, index) => (
        <div key={index} className="mb-8 last:mb-0">
          <div className="flex items-center mb-6 sm:mb-8">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{renderText(feature.name)}</h2>
          </div>

          {feature.values && feature.values.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {feature.values.map((value, valueIndex) => (
                <div
                  key={valueIndex}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 h-full hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${valueIndex * 100}ms` }}
                >
                  <div className="flex flex-col h-full">
                    {value.icon && (
                      <div className="mb-4 flex justify-center">
                        <img
                          src={value.icon || "/placeholder.svg"}
                          alt={renderText(value.title)}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                        />
                      </div>
                    )}

                    <div className="flex items-center mb-3">
                      <div className="mr-3 mt-1 flex-shrink-0">
                        {getFeatureIcon(renderText(value.title), valueIndex)}
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                        {renderText(value.title)}
                      </h4>
                    </div>

                    {value.subtitle && (
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                        {renderText(value.subtitle)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
