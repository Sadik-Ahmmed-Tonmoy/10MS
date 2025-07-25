/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, Users, Clock, Video, BookOpen, Award } from "lucide-react"
import Image from "next/image"

interface ChecklistItem {
  text: string
  icon?: string
  color?: string
}

interface ChecklistProps {
  items: ChecklistItem[]
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

const getItemIcon = (text: string) => {
  const textLower = text.toLowerCase()
  if (textLower.includes("student") || textLower.includes("জন")) {
    return <Users className="w-5 h-5 text-blue-500" />
  }
  if (textLower.includes("time") || textLower.includes("ঘন্টা")) {
    return <Clock className="w-5 h-5 text-green-500" />
  }
  if (textLower.includes("video") || textLower.includes("ভিডিও")) {
    return <Video className="w-5 h-5 text-red-500" />
  }
  if (textLower.includes("book") || textLower.includes("বই")) {
    return <BookOpen className="w-5 h-5 text-purple-500" />
  }
  if (textLower.includes("certificate") || textLower.includes("সার্টিফিকেট")) {
    return <Award className="w-5 h-5 text-yellow-500" />
  }
  return <CheckCircle className="w-5 h-5 text-green-500" />
}

// Server Component
export default function Checklist({ items }: ChecklistProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative lg:sticky z-30 lg:top-[29rem] animate-slide-in-right">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
        What You Get
      </h3>

      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {item.icon ? (
              // <img src={item.icon || "/placeholder.svg"} alt="" className="w-5 h-5 mt-0.5 flex-shrink-0" />
               <Image
                src={item.icon || "/placeholder.svg"}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
              />
            ) : (
              getItemIcon(renderText(item))
            )}
            <span className="text-gray-700 text-sm leading-relaxed font-medium">{renderText(item)}</span>
          </li>
        ))}
      </ul>

      {/* Additional Benefits */}
      {/* <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in" style={{ animationDelay: "800ms" }}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Award className="w-4 h-4 mr-2 text-blue-600" />
            Bonus Features
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Mobile app access</li>
            <li>• Downloadable resources</li>
            <li>• Community support</li>
          </ul>
        </div>
      </div> */}
    </div>
  )
}
