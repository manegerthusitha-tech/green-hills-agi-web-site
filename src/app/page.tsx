"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Globe, TrendingUp, BadgeCheck, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductImageSlider } from "@/components/ui/ProductImageSlider";
import { ProductModal } from "@/components/ui/ProductModal";
import { CertificationCard } from "@/components/ui/CertificationCard";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { TimelineStep } from "@/components/ui/TimelineStep";
import { products } from "@/lib/productData";
import { certifications, trustBadges, trustPoints, exportTimelineSteps } from "@/lib/certificationsData";
import type { Product } from "@/lib/productData";

// Premium smooth animations with hardware acceleration
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

// Counter Component
type CounterProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

function Counter({ end, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: DOMHighResTimeStamp | null = null;
    let animationFrame: number | null = null;

    const animate = (currentTime: DOMHighResTimeStamp) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold font-outfit mb-2">
      {count}{suffix}
    </div>
  );
}

const featuredProducts = products.slice(0, 4);

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-[50px] lg:pb-[50px] flex items-center bg-muted/30 overflow-hidden min-h-[80vh]">
        {/* Abstract Green Shapes Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="flex flex-col gap-8 lg:gap-10"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wide uppercase">Premium Leafy Vegetables</span>
                </motion.div>

                {/* GAP Badge */}
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full w-fit">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wide">GAP Certified Production</span>
                </motion.div>
              </div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-[72px] font-bold font-outfit text-foreground leading-[1.1] mt-2">
                Growing Trust <br />
                <span className="text-primary">Delivering Excellence</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mt-2">
                We are Sri Lanka&apos;s leading supplier of premium, safe, and fresh-quality leafy vegetables, serving major local supermarkets and international export markets.
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="font-semibold text-base px-8 h-12" asChild>
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="font-semibold text-base px-8 h-12" asChild>
                <Link href="/contact">
                  Export Inquiry
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex flex-col w-full"
          >
            {/* Hero Cover Image - natural aspect ratio preserved */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-white">
              <img
                src="/img/Cover Image.jpeg"
                alt="Green Hills Agriculture - Premium Leafy Vegetables"
                className="w-full h-auto object-cover block"
                loading="eager"
              />
            </div>
            {/* Trusted Exporter card below the image */}
            <div className="mt-4 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-foreground">Trusted Supplier & Exporter</h4>
                  <p className="text-sm text-muted-foreground">Premium GAP-Certified Leafy Vegetables</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Supermarket Partnership Highlight */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center">
            <h3 className="text-xl font-semibold text-muted-foreground">Proud Approved Supplier To</h3>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {/* Cargills */}
              <div className="flex items-center gap-3">
                <div className="text-2xl md:text-3xl font-extrabold font-outfit text-[#d01e2e]">
                  Cargills FoodCity
                </div>
              </div>
              {/* Divider */}
              <div className="hidden md:block w-px h-6 bg-border" />
              {/* Keells */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image src="/img/Keells_Logo.jpg" alt="Keells Logo" fill className="object-cover" sizes="48px" />
                </div>
                <div className="text-2xl md:text-3xl font-bold font-outfit text-[#00a651]">
                  Keells Supermarket
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Certifications Section - NEW */}
      <section className="py-24 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Certified Quality & International Standards"
            subtitle="Our certifications validate our commitment to safe, hygienic, and internationally accepted agricultural production standards."
          />

          {/* Certification Card */}
          <div className="max-w-3xl mx-auto mt-12">
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.id} certification={cert} index={i} />
            ))}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {trustBadges.map((badge, i) => (
              <TrustBadge key={badge.id} badge={badge} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#f0f8f0]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Why Choose Green Hills?"
            subtitle="Our commitment to quality and sustainable agriculture makes us the preferred partner for premium leafy vegetables."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: ShieldCheck, title: "Export Quality", desc: "Premium grade products meeting stringent international standards and certifications." },
              { icon: Globe, title: "Global Reach", desc: "Reliable export logistics supplying premium leafy greens to international markets." },
              { icon: TrendingUp, title: "Sustainable Yield", desc: "Ethical farming practices ensuring consistent supply and environmental harmony." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-24 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionHeading
              title="Featured Products"
              subtitle="Discover our range of premium fresh and processed leafy vegetables."
              centered={false}
              className="mb-0"
            />
            <Button variant="ghost" className="hidden md:flex mt-4" asChild>
              <Link href="/products">View All Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: product.id * 0.1 }}
                className="group relative bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center">
                  <ProductImageSlider
                    frontImage={product.frontImage}
                    backImage={product.backImage}
                    thirdImage={product.thirdImage}
                    productName={product.name}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{product.category}</div>
                  <h3 className="text-lg font-bold font-outfit text-foreground mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.shortDesc}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xs text-primary font-semibold flex items-center gap-1">
                      {product.certifications.includes("SL-GAP Certified") ? (
                        <><ShieldCheck className="w-3 h-3" /> SL-GAP Certified</>
                      ) : (
                        <><BadgeCheck className="w-3 h-3" /> Fresh Quality</>
                      )}
                    </span>
                    <span className="text-sm font-bold text-foreground">{product.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button variant="outline" className="w-full md:hidden mt-8" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Why International Buyers Trust Us - NEW */}
      <section className="py-24 bg-[#f0f8f0]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Why International Buyers Trust Us"
            subtitle="From certified farms to your doorstep - every step is transparent, tested, and quality-assured."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {trustPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-2xl bg-white border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <point.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-outfit text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
            {[
              { num: 8, label: "Years Experience", suffix: "+" },
              { num: 150, label: "Retail Outlets", suffix: "+" },
              { num: 100, label: "Quality Assured", suffix: "%" },
              { num: 24, label: "Customer Support", suffix: "/7" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <Counter end={stat.num} suffix={stat.suffix} />
                <div className="text-sm md:text-base text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Process Timeline - NEW */}
      <section className="py-24 bg-[#f0f8f0]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Farm to Export Process"
            subtitle="Our transparent, quality-controlled journey from seed to shipment ensures every product meets international standards."
          />

          <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-0 justify-center mt-16">
            {exportTimelineSteps.map((step, i) => (
              <TimelineStep
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isLast={i === exportTimelineSteps.length - 1}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <SectionHeading
            title="Ready to Partner With Us?"
            subtitle="Whether you're looking for supermarket retail supply or bulk agriculture export, Green Hills Agriculture is your trusted partner for premium leafy vegetables."
          />
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button size="lg" className="h-14 px-8 text-lg" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-white" asChild>
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}