'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import bookLoading from "@/assets/lottieFiles/bookLoading.json";

const MyLoading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/50 z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Lottie className="h-96 pt-5" animationData={bookLoading} loop />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MyLoading;
