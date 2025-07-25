/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Quote, Star } from "lucide-react"
import type { Section } from "@/types/product"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface TestimonialsProps {
  testimonials: Section[]
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
    if (text.testimonial) return text.testimonial
    return JSON.stringify(text)
  }
  return String(text || "")
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const testimonialsData = testimonials.filter((section) => section.type === "testimonials")

  if (testimonialsData.length === 0 || !testimonialsData[0].values || testimonialsData[0].values.length === 0) {
    return null
  }

  const actualTestimonials = testimonialsData[0].values

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
    >
      <div className="flex items-center mb-6 sm:mb-8">
        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">What Our Students Say</h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="testimonials-swiper"
      >
        {actualTestimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100 flex flex-col items-center text-center"
            >
              {testimonial.profile_image && (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={testimonial.profile_image || "/placeholder.svg"}
                  alt={renderText(testimonial.name)}
                  className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-white"
                />
              )}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{renderText(testimonial.name)}</h3>
              {testimonial.description && (
                <p className="text-blue-600 font-semibold mb-4">{renderText(testimonial.description)}</p>
              )}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed italic max-w-2xl">
                &quot;{renderText(testimonial.testimonial)}&quot;
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #2563eb;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .testimonials-swiper .swiper-button-next:after,
        .testimonials-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: #2563eb;
          opacity: 0.3;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </motion.div>
  )
}
