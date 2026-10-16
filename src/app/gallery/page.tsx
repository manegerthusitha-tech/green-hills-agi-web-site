
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import {
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  Play,
  Video as VideoIcon,
  X,
} from "lucide-react";
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

interface GalleryVideo {
  id: string;
  name: string;
  url: string;
  thumbnail?: string | null;
}

const CATEGORIES = ["All", "Farm", "Production", "Products", "Visitors"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [videosError, setVideosError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);

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

  const fetchVideos = async () => {
    setVideosLoading(true);
    setVideosError("");

    try {
      const res = await fetch("/api/gallery/videos");
      const data = await res.json();

      if (res.ok && data.success) {
        setVideos(data.videos || []);
      } else {
        setVideosError(data.message || "Failed to load videos.");
      }
    } catch {
      setVideosError("Could not connect to the video gallery.");
    } finally {
      setVideosLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null && images.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null && images.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  const lightboxItems = images.map((img) => ({
    id: img.id,
    title: img.name.replace(/\.[^/.]+$/, ""),
    category: img.category,
    src: img.url,
  }));

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24 font-outfit">
      {/* Header Section */}
      <section className="bg-primary px-4 pb-16 pt-24 md:px-6">
        <div className="container mx-auto mt-8 text-center">
          <SectionHeading
            title="Our Agriculture Journey"
            subtitle="Explore our farms, production process, premium products, export quality standards, and distinguished visitors at Green Hills Agriculture."
            light
          />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="container mx-auto mt-8 px-4 md:px-6">
        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "border border-border bg-white text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
            <Loader2 className="mb-3 h-10 w-10 animate-spin text-primary" />
            <p className="text-sm font-semibold">
              Retrieving images from Google Drive...
            </p>
          </div>
        ) : error ? (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
            <AlertCircle className="mb-3 h-12 w-12 text-red-500" />
            <h3 className="mb-1 text-lg font-bold">Gallery Unavailable</h3>
            <p className="mb-4 text-sm text-red-500">{error}</p>
            <button
              onClick={() => fetchImages(activeCategory)}
              className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow transition-colors hover:bg-red-700"
            >
              Retry Connection
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/80">
              <ImageIcon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Folder Empty</h3>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              No images have been uploaded to the &quot;{activeCategory}&quot;
              category folder yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
                  className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-xl"
                >
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />

                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-primary/80 p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="mb-2 text-xs font-bold uppercase tracking-wider text-white/80">
                      {item.category}
                    </span>
                    <h3 className="line-clamp-2 font-outfit text-base font-bold text-white">
                      {item.name.replace(/\.[^/.]+$/, "")}
                    </h3>
                    <span className="mt-4 text-xs text-white/60 underline decoration-white/30 underline-offset-4">
                      Click to View
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Video Gallery - after photos */}
      <section className="container mx-auto mt-20 px-4 md:px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <VideoIcon className="h-7 w-7" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Our Videos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Discover our farms, production process, and fresh products through
            videos from Green Hills Agriculture.
          </p>
        </div>

        {videosLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mb-3 h-9 w-9 animate-spin text-primary" />
            <p className="text-sm">Loading videos from Google Drive...</p>
          </div>
        ) : videosError ? (
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
            <AlertCircle className="mb-3 h-10 w-10 text-red-500" />
            <p className="font-semibold text-red-700">{videosError}</p>
            <button
              onClick={fetchVideos}
              className="mt-4 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-12 text-center">
            <VideoIcon className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <h3 className="font-bold text-foreground">Videos Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Videos uploaded to our Google Drive Videos folder will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <motion.button
                type="button"
                key={video.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedVideo(video)}
                className="group overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-primary/10">
                  {video.thumbnail ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <VideoIcon className="h-14 w-14 text-primary/50" />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                      <Play className="ml-1 h-6 w-6 fill-current" />
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 font-semibold text-foreground">
                    {video.name.replace(/\.[^/.]+$/, "")}
                  </h3>
                  <p className="mt-2 text-sm text-primary">Watch video</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 bg-primary px-4 py-3 text-white">
                <h3 className="line-clamp-1 font-semibold">
                  {selectedVideo.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  aria-label="Close video"
                  className="rounded-full p-2 transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <iframe
                key={selectedVideo.id}
                src={selectedVideo.url}
                title={selectedVideo.name}
                className="aspect-video w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Lightbox */}
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
