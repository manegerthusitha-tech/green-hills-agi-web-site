"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: string | number;
  title: string;
  category: string;
  src: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function GalleryLightbox({ items, currentIndex, isOpen, onClose, onNext, onPrev }: GalleryLightboxProps) {
  const currentItem = items[currentIndex];
  const [scale, setScale] = useState(1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setScale(1);
        onNext();
      }
      if (e.key === "ArrowLeft") {
        setScale(1);
        onPrev();
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!currentItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => {
            setScale(1);
            onClose();
          }}
        >
          {/* Close button */}
          <button
            onClick={() => {
              setScale(1);
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom controls */}
          <div className="absolute top-4 right-20 z-20 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScale((prev) => Math.min(prev + 0.5, 3));
              }}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ZoomIn className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScale((prev) => Math.max(prev - 0.5, 1));
              }}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ZoomOut className="w-6 h-6" />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-20 text-white/70 text-sm font-medium">
            {currentIndex + 1} / {items.length}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setScale(1);
              onPrev();
            }}
            className="absolute left-4 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setScale(1);
              onNext();
            }}
            className="absolute right-4 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Content */}
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative w-[90vw] h-[80vh] max-w-6xl flex flex-col items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container */}
            <motion.div
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full cursor-zoom-in"
              onClick={(e) => {
                e.stopPropagation();
                setScale((prev) => (prev === 1 ? 2 : 1));
              }}
            >
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                className="object-contain"
                quality={100}
                priority
                sizes="(max-width: 1200px) 90vw, 1152px"
              />
            </motion.div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 px-6 py-3 rounded-full backdrop-blur-sm pointer-events-none text-center">
               <span className="text-white/80 text-xs font-bold uppercase tracking-wider block mb-1">
                 {currentItem.category}
               </span>
               <h3 className="text-white font-outfit font-bold text-lg">{currentItem.title}</h3>
            </div>
          </motion.div>

          {/* Bottom thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setScale(1);
                  const diff = idx - currentIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext();
                  } else if (diff < 0) {
                    for (let i = 0; i < -diff; i++) onPrev();
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
