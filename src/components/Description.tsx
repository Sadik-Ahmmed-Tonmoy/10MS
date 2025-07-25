/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen } from "lucide-react"

interface DescriptionProps {
  description: string | { name?: string; value?: string } | any
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

// Server Component
export default function Description({ description }: DescriptionProps) {
  const descriptionText = renderText(description)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 animate-slide-up">
      <div className="flex items-center mb-6">
        <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Course Description</h2>
      </div>

      <div
        className="prose prose-gray prose-sm sm:prose-base max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: descriptionText }}
      />
    </div>
  )
}
