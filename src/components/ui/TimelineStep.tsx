"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isLast?: boolean;
  index?: number;
}

export function TimelineStep({ step, title, description, icon: Icon, isLast = false, index = 0 }: TimelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center relative group flex-1 min-w-[120px]"
    >
      {/* Connector Line */}
      {!isLast && (
        <div className="hidden md:block absolute top-8 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-gradient-to-r from-primary/40 to-primary/20 z-0" />
      )}

      {/* Step Circle */}
      <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
      </div>

      {/* Step Number */}
      <div className="absolute -top-1 -right-1 md:right-auto md:left-[calc(50%+16px)] w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold z-20 shadow-sm">
        {step}
      </div>

      {/* Text */}
      <h4 className="font-outfit font-bold text-foreground text-sm md:text-base mb-1">{title}</h4>
      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-[160px]">{description}</p>
    </motion.div>
  );
}
