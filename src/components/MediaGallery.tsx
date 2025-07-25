/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { MediaItem } from "@/types/product";
import { motion } from "framer-motion";
import { Play, Video } from "lucide-react";
import { useState } from "react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface MediaGalleryProps {
  media: MediaItem[];
}

export default function MediaGallery({ media }: MediaGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const getYouTubeId = (url: string): string | null => {
    if (!url || typeof url !== "string") return null;

    // Handle direct YouTube video ID
    if (url.length === 11 && !url.includes("/") && !url.includes("?")) {
      return url;
    }

    // Handle full YouTube URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderMediaItem = (item: MediaItem, isActive = false) => {
    if (item.resource_type === "video") {
      const videoId = getYouTubeId(item.resource_value);

      if (!videoId) return null;

      return (
        <div className="relative aspect-video rounded-xl overflow-hidden group">
          {activeVideo === videoId && isActive ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Course Video"
              className="w-full h-full"
              allowFullScreen
              allow="autoplay"
            />
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} className="relative cursor-pointer h-full" onClick={() => setActiveVideo(videoId)}>
              <img
                src={item.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
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
              <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                <Video className="w-3 h-3 mr-1" />
                VIDEO
              </div>
            </motion.div>
          )}
        </div>
      );
    }

    if (item.resource_type === "image") {
      return (
        <div className="relative aspect-video rounded-xl overflow-hidden group">
          <img
            src={item.resource_value || "/placeholder.svg"}
            alt="Course image"
            className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-300"
          />
          {/* <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
            <ImageIcon className="w-3 h-3 mr-1" />
            IMAGE
          </div> */}
        </div>
      );
    }

    return null;
  };

  if (!media || media.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Video className="w-6 h-6 mr-2 text-blue-600" />
          Course Media
        </h3>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-48 flex items-center justify-center">
          <p className="text-gray-500 font-medium">No media available</p>
        </div>
      </motion.div>
    );
  }

  // Filter media for gallery (exclude certain types if needed)
  const galleryMedia = media.filter((item) => item.name === "preview_gallery" || item.name === "thumbnail" || item.name === "sqr_img");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 relative lg:sticky lg:top-24"
    >
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Video className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
        Course Preview
      </h3>

      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Thumbs]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="media-gallery-main mb-4"
      >
        {galleryMedia.map((item, index) => (
          <SwiperSlide key={index}>{renderMediaItem(item, true)}</SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      {galleryMedia.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          watchSlidesProgress
          className="media-gallery-thumbs"
        >
          {galleryMedia.map((item, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="aspect-video rounded-lg overflow-hidden opacity-100 hover:opacity-100 transition-opacity">
                {item.resource_type === "video" ? (
                  <div className="relative h-full">
                    <img
                      src={item.thumbnail_url || `https://img.youtube.com/vi/${getYouTubeId(item.resource_value)}/maxresdefault.jpg`}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" fill="currentColor" />
                    </div>
                  </div>
                ) : (
                  <img src={item.resource_value || "/placeholder.svg"} alt="Thumbnail" className="w-full h-full object-cover" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <style jsx global>{`
        .media-gallery-main .swiper-button-next,
        .media-gallery-main .swiper-button-prev {
          color: #2563eb;
          background: rgba(255, 255, 255, 0.9);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .media-gallery-main .swiper-button-next:after,
        .media-gallery-main .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }

        .media-gallery-main .swiper-pagination-bullet {
          background: #2563eb;
          opacity: 0.3;
        }

        .media-gallery-main .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .media-gallery-thumbs .swiper-slide-thumb-active {
          opacity: 1;
        }

        .media-gallery-thumbs .swiper-slide-thumb-active > div {
          border: 2px solid #2563eb;
        }
      `}</style>
    </motion.div>
  );
}
