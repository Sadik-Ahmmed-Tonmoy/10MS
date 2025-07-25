"use client"

import { motion } from "framer-motion"
import { Play, Volume2 } from "lucide-react"
import { useState } from "react"

interface TrailerProps {
  media: string | undefined
}

export default function Trailer({ media }: TrailerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const getYouTubeId = (url: string | undefined): string | null => {
    if (!url || typeof url !== "string") {
      return null
    }

    if (url.length === 11 && !url.includes("/") && !url.includes("?")) {
      return url
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeId(media)

  if (!videoId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Volume2 className="w-6 h-6 mr-2 text-blue-600" />
          Course Trailer
        </h3>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-48 flex items-center justify-center">
          <p className="text-gray-500 font-medium">Video not available</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Volume2 className="w-6 h-6 mr-2 text-blue-600" />
        Course Trailer
      </h3>

      <div className="relative aspect-video rounded-xl overflow-hidden group">
        {!isPlaying ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Play className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Course Trailer"
            className="w-full h-full rounded-xl"
            allowFullScreen
            allow="autoplay"
          />
        )}
      </div>
    </motion.div>
  )
}
