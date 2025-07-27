/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { useState, useEffect } from "react"
import type { Section, SectionValue } from "@/types/product"
import type { JSX } from "react/jsx-runtime"

interface CountdownTimerProps {
  offers: Section[]
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

const calculateTimeLeft = (endDate: string) => {
  const difference = +new Date(endDate) - +new Date()
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }
  return timeLeft
}

export default function CountdownTimer({ offers }: CountdownTimerProps) {
  const offerData = offers.filter((section) => section.type === "offers")
  const [timeLeft, setTimeLeft] = useState({})
  const [offer, setOffer] = useState<SectionValue | null>(null)

  useEffect(() => {
    if (offerData.length === 0 || !offerData[0].values || offerData[0].values.length === 0) {
      return
    }

    const offer = offerData[0].values[0] // Assuming only one offer for simplicity
    const endDate = offer.end_at

    setTimeLeft(calculateTimeLeft(endDate || ""))
    setOffer(offer)

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate || ""))
    }, 1000)

    return () => clearInterval(timer)
  }, [offers,])

  if (!offer) {
    return null
  }

  const timerComponents: JSX.Element[] = []

  Object.keys(timeLeft).forEach((interval) => {
    // @ts-ignore
    if (!timeLeft[interval]) {
      return
    }

    timerComponents.push(
      <span key={interval} className="bg-white text-blue-600 px-3 py-1 rounded-lg font-bold text-lg sm:text-xl">
        {/* @ts-ignore */}
        {String(timeLeft[interval]).padStart(2, "0")}
        <span className="text-sm font-normal block">{interval.charAt(0).toUpperCase() + interval.slice(1)}</span>
      </span>,
    )
  })

  if (timerComponents.length === 0) {
    return null // Offer has ended or no end date
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white text-center border border-red-400"
    >
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
        <h2 className="text-xl sm:text-2xl font-bold">{renderText(offer.text) || "Limited Time Offer Ends In:"}</h2>
      </div>
      <div className="flex justify-center items-center space-x-3 sm:space-x-4">{timerComponents}</div>
    </motion.div>
  )
}
