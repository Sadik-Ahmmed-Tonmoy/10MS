/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Award, BookOpen, Star } from "lucide-react"
import type { Section } from "@/types/product"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface InstructorsProps {
  instructors: Section[]
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

export default function Instructors({ instructors }: InstructorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="flex items-center mb-8">
        <Award className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Meet Your Expert Instructors</h2>
      </div>

      {instructors.map((instructor, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{renderText(instructor.name)}</h3>

          {instructor.values && instructor.values.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="instructor-swiper"
            >
              {instructor.values.map((value, valueIndex) => (
                <SwiperSlide key={valueIndex}>
                  <motion.div
                    whileHover={{ 
scale: 1.01, y: -0 

                     }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                      {value.image && (
                        <motion.div whileHover={{ scale: 1.05 }} className="relative">
                          <img
                            src={value.image || "/placeholder.svg"}
                            alt={renderText(value.name)}
                            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
                          />
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-white fill-white" />
                          </div>
                        </motion.div>
                      )}

                      <div className="flex-1 text-center md:text-left">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">{renderText(value.name)}</h4>
                        <p className="text-blue-600 font-semibold mb-4 flex items-center justify-center md:justify-start">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {renderText(value.short_description)}
                        </p>
                        {value.description && (
                          <div
                            className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: renderText(value.description) }}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      ))}

      <style jsx global>{`
        .instructor-swiper .swiper-button-next,
        .instructor-swiper .swiper-button-prev {
          color: #2563eb;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .instructor-swiper .swiper-button-next:after,
        .instructor-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        
        .instructor-swiper .swiper-pagination-bullet {
          background: #2563eb;
          opacity: 0.3;
        }
        
        .instructor-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </motion.div>
  )
}
