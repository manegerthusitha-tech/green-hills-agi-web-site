"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { Loader2, AlertCircle, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  createdTime: string;
  category: string;
  url: string;
}

const CATEGORIES = ["All", "Farm", "Production", "Products", "Visitors"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const fetchImages = async (category: string) => {
    setLoading(true);
    setError("");
    try {
      const catParam = category === "All" ? "all" : category.toLowerCase();
      const res = await fetch(`/api/gallery?category=${catParam}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setImages(data.images);
      } else {
        setError(data.message || "Failed to load gallery images.");
      }
    } catch {
      setError("Failed to load gallery images. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(activeCategory);
  }, [activeCategory]);


  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  // Convert files list to GalleryLightbox expected format
  const lightboxItems = images.map((img) => ({
    id: img.id,
    title: img.name.replace(/\.[^/.]+$/, ""), // Strip file extension for cleaner look
    category: img.category,
    src: img.url,
  }));

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24 font-outfit">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto mt-8 text-center">
          <SectionHeading 
            title="Our Agriculture Journey" 
            subtitle="Explore our farms, production process, premium products, export quality standards, and distinguished visitors at Green Hills Agriculture."
            light
          />
        </div>
      </section>

      {/* Categories Tabs Selector */}
      <section className="container mx-auto px-4 md:px-6 mt-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-foreground border border-border hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Display State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
            <p className="text-sm font-semibold">Retrieving images from Google Drive...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto bg-red-50 border border-red-100 rounded-3xl p-6 text-center text-red-600 flex flex-col items-center">
            <AlertCircle className="w-12 h-12 mb-3 text-red-500" />
            <h3 className="font-bold text-lg mb-1">Gallery Unavailable</h3>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => fetchImages(activeCategory)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground text-center">
            <div className="w-16 h-16 bg-muted/80 rounded-full flex items-center justify-center text-muted-foreground mb-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Folder Empty</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">No images have been uploaded to the &quot;{activeCategory}&quot; category folder yet.</p>
          </div>
        ) : (
          /* Gallery Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {images.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  onClick={() => handleOpenLightbox(index)}
                  className="group relative bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer aspect-square flex items-center justify-center"
                >
                  {/* Image component using local cache proxy */}
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-20">
                    <span className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-white font-outfit font-bold text-base line-clamp-2">
                      {item.name.replace(/\.[^/.]+$/, "")}
                    </h3>
                    <span className="text-white/60 text-xs mt-4 underline decoration-white/30 underline-offset-4">
                      Click to View
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Lightbox Integration */}
      <GalleryLightbox
        items={lightboxItems}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={handleCloseLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
