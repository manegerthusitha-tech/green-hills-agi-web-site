"use client";

import { motion } from "framer-motion";
import type { TrustBadgeData } from "@/lib/certificationsData";

interface TrustBadgeProps {
  badge: TrustBadgeData;
  index?: number;
}

export function TrustBadge({ badge, index = 0 }: TrustBadgeProps) {
  const Icon = badge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <h4 className="font-outfit font-bold text-foreground text-sm mb-1">{badge.label}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
    </motion.div>
  );
}
