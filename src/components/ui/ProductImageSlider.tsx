"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageSliderProps {
  frontImage: string;
  backImage: string;
  thirdImage?: string;
  productName: string;
}

export function ProductImageSlider({
  frontImage,
  backImage,
  thirdImage,
  productName,
}: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [frontImage, backImage, thirdImage].filter(Boolean) as string[];

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col justify-between overflow-hidden select-none group/slider">
      {/* Slider Images Container - Flexbox container based on images count */}
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          animate={{ x: `-${currentIndex * (100 / images.length)}%` }}
          transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.55 }}
          className="flex h-full will-change-transform"
          style={{ width: `${100 * images.length}%` }}
        >
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className="h-full flex items-center justify-center p-4"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={imgUrl}
                alt={`${productName} - Image ${index + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-500 group-hover/slider:scale-105"
                loading="eager"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide Indicators/Tabs (Front / Back / Feature label in the corner) */}
      <div className="absolute top-3 left-3 bg-primary/95 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm z-10">
        {currentIndex === 0 ? "Front" : currentIndex === 1 ? "Back" : "Feature"}
      </div>

      {/* Navigation Chevrons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-foreground hover:text-primary border border-border shadow-sm flex items-center justify-center z-10 opacity-0 group-hover/slider:opacity-100 focus:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover/slider:translate-x-0"
            aria-label="Previous packet image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-foreground hover:text-primary border border-border shadow-sm flex items-center justify-center z-10 opacity-0 group-hover/slider:opacity-100 focus:opacity-100 transition-all duration-300 transform translate-x-[10px] group-hover/slider:translate-x-0"
            aria-label="Next packet image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Bottom Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-white/70 backdrop-blur-[2px] px-2 py-1 rounded-full border border-black/5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(index, e)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-4 shadow-sm"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

