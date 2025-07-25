"use client"

import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Section } from "@/types/product"

interface FAQProps {
  faqs: Section[]
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
    if (text.question) return text.question
    if (text.answer) return text.answer
    return JSON.stringify(text)
  }
  return String(text || "")
}

export default function FAQ({ faqs }: FAQProps) {
  const faqData = faqs.filter((section) => section.type === "faq")

  if (faqData.length === 0 || !faqData[0].values || faqData[0].values.length === 0) {
    return null
  }

  const actualFaqs = faqData[0].values

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
    >
      <div className="flex items-center mb-6 sm:mb-8">
        <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {actualFaqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-800 hover:no-underline py-4">
                {renderText(faq.question)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 prose prose-sm sm:prose-base max-w-none pb-4">
                <div dangerouslySetInnerHTML={{ __html: renderText(faq.answer) }} />
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  )
}
