import { CheckCircle, Target } from "lucide-react"
import type { Section } from "@/types/product"

interface PointersProps {
  pointers: Section[]
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

// Server Component
export default function Pointers({ pointers }: PointersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 animate-slide-up">
      {pointers.map((pointer, index) => (
        <div key={index} className="mb-8 last:mb-0">
          <div className="flex items-center mb-6 sm:mb-8">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{renderText(pointer.name)}</h2>
          </div>

          {pointer.values && pointer.values.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {pointer.values.map((value, valueIndex) => (
                <div
                  key={valueIndex}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md hover:translate-x-1 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${valueIndex * 100}ms` }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-blue-600 fill-blue-100" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                      {renderText(value)}
                    </p>
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
