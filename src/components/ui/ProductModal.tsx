"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  ShieldCheck,
  Leaf,
  MessageCircle,
  Mail,
  Star,
  CheckCircle,
  Thermometer,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/productData";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "packaging">("overview");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [prevProductId, setPrevProductId] = useState<number | null>(null);

  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setCurrentImageIndex(0);
    setActiveTab("overview");
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!product) return null;

  const images = [product.frontImage, product.backImage, product.thirdImage].filter(Boolean) as string[];
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in "${product.name}" from Green Hills Agriculture. Could you provide more details about export pricing and availability?`
  );
  const whatsappUrl = `https://wa.me/94774652552?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Close product details"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="overflow-y-auto flex-1">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Gallery */}
                <div className="relative bg-muted/30 p-8 flex flex-col items-center justify-center min-h-[300px] md:min-h-[500px]">
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      {product.category}
                    </span>
                  </div>

                  {/* Main Image */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${product.name} - ${currentImageIndex === 0 ? "Front" : currentImageIndex === 1 ? "Back" : "Feature Image"}`}
                      className="max-w-full max-h-[350px] object-contain drop-shadow-lg"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <div className="flex items-center gap-4 mt-6">
                      <button
                        onClick={() => setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                        className="p-2 rounded-full bg-white shadow-sm border border-border hover:bg-muted transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground/40"
                              }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentImageIndex((i) => (i + 1) % images.length)}
                        className="p-2 rounded-full bg-white shadow-sm border border-border hover:bg-muted transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6 md:p-8 flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {product.exportGrade}
                      </span>
                      <span
                        className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                      >
                        {product.availability}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-outfit text-foreground mb-2">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                      </div>
                      <span className="text-2xl font-bold text-primary font-outfit">{product.price}</span>
                    </div>
                  </div>

                  {/* Certifications Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full text-xs font-medium text-primary"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 p-1 bg-muted/50 rounded-lg mb-6">
                    {(["overview", "specs", "packaging"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all capitalize ${activeTab === tab
                            ? "bg-white shadow-sm text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto mb-6 min-h-[200px]">
                    {activeTab === "overview" && (
                      <div className="space-y-5">
                        <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-primary" /> Key Benefits
                          </h4>
                          <ul className="space-y-1.5">
                            {product.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" /> Usage
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{product.usage}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "specs" && (
                      <div className="space-y-5">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-3">Product Specifications</h4>
                          <div className="border border-border rounded-xl overflow-hidden">
                            {Object.entries(product.specifications).map(([key, value], i) => (
                              <div
                                key={key}
                                className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-muted/30" : "bg-white"
                                  }`}
                              >
                                <span className="font-medium text-foreground">{key}</span>
                                <span className="text-muted-foreground">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary" /> Quality Standards
                          </h4>
                          <ul className="space-y-1.5">
                            {product.qualityStandards.map((standard) => (
                              <li key={standard} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                                {standard}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-primary" /> Storage Instructions
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {product.storageInstructions}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "packaging" && (
                      <div className="space-y-5">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                            <Package className="w-4 h-4 text-primary" /> Available Packaging Sizes
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {product.packagingSizes.map((size) => (
                              <div
                                key={size}
                                className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 rounded-lg border border-border text-sm"
                              >
                                <Package className="w-3.5 h-3.5 text-primary shrink-0" />
                                {size}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-2">Export Information</h4>
                          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Export Grade</span>
                              <span className="font-medium text-foreground">{product.exportGrade}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Availability</span>
                              <span className="font-medium text-foreground">{product.availability}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Min. Order (Export)</span>
                              <span className="font-medium text-foreground">
                                {product.specifications["Minimum Order"] || "Contact us"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <Button className="flex-1 h-12 text-base rounded-xl" asChild>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 w-5 h-5" />
                        WhatsApp Inquiry
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 text-base rounded-xl" asChild>
                      <a href={`mailto:info@greenhillsagri.com?subject=Inquiry: ${product.name}`}>
                        <Mail className="mr-2 w-5 h-5" />
                        Email Inquiry
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
