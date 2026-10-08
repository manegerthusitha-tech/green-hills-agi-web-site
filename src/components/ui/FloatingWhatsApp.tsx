"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const waUrl = "https://wa.me/94774652552?text=" + encodeURIComponent("Hello, I'm interested in Green Hills Agriculture products.");

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-foreground text-sm font-medium py-2 px-3 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us on WhatsApp
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-white"></span>
      </span>
    </motion.a>
  );
}
