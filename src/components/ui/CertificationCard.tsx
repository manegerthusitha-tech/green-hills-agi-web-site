"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Eye, X } from "lucide-react";
import type { Certification } from "@/lib/certificationsData";

interface CertificationCardProps {
  certification: Certification;
  index?: number;
}

export function CertificationCard({ certification, index = 0 }: CertificationCardProps) {
  const Icon = certification.icon;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white rounded-3xl border border-border overflow-hidden group hover:shadow-xl transition-all duration-500 w-full"
      >
        {/* Top Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Details Section */}
            <div className="md:col-span-2">
              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-700">{certification.validityInfo}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold font-outfit text-foreground mb-3 group-hover:text-primary transition-colors">
                {certification.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{certification.description}</p>

              {/* Issuer */}
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border max-w-md">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Issued by</span>
                  <p className="text-sm font-semibold text-foreground">{certification.issuer}</p>
                </div>
              </div>
            </div>

            {/* Certificate Image Preview Section */}
            {certification.image && (
              <div className="md:col-span-1 flex flex-col items-center justify-center border-t border-border/50 md:border-t-0 md:border-l md:border-border/50 pt-8 md:pt-0 md:pl-8">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Official Document</span>
                
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative w-full max-w-[180px] aspect-[1/1.4] bg-muted border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-zoom-in group/cert"
                >
                  <img 
                    src={certification.image} 
                    alt={`${certification.title} Official Document`}
                    className="w-full h-full object-cover group-hover/cert:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                    <Eye className="w-8 h-8 text-white mb-2" />
                    <span className="text-white text-xs font-bold">View Document</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && certification.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Close document view"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Inner Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-[85vh] aspect-[1/1.4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white"
            >
              <img 
                src={certification.image} 
                alt={`${certification.title} Full View`}
                className="w-full h-full object-contain" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
