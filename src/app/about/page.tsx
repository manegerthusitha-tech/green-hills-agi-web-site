"use client";

import { motion } from "framer-motion";
import { Leaf, Award, Globe2, Users, ShieldCheck, Target, Eye, Sprout, Droplets, Recycle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineStep } from "@/components/ui/TimelineStep";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { exportTimelineSteps, trustBadges } from "@/lib/certificationsData";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-20 px-4 md:px-6">
        <div className="container mx-auto mt-8">
          <SectionHeading
            title="Our Story"
            subtitle="From local roots to global reach: The Green Hills Agriculture journey of premium Gotu Kola cultivation and export."
            light
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-border p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-xl mx-auto w-full">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/img/Cover Image.jpeg"
                  alt="Green Hills Gotu Kola Farm"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="bg-white rounded-xl p-4 border border-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground font-outfit text-base">Since 2018</h4>
                  <p className="text-sm text-muted-foreground">Growing Trust. Delivering Excellence.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground font-outfit">Green Hills Agriculture</strong> was established on 23 July 2018 with the vision of supplying safe, fresh, and premium-quality leafy vegetables to both the Sri Lankan and international markets.
              </p>
              <p>
                Our journey began by supplying GAP-certified leafy vegetables to Cargills Supermarket, building a strong reputation for quality and reliability. Over the years, we expanded our supply network by providing premium leafy vegetables to export companies serving Middle Eastern and European markets, showcasing Sri Lankan agricultural excellence globally.
              </p>
              <p>
                In February 2023, Green Hills became an approved supplier to Keells Supermarket. Through gradual, dedicated growth, we achieved significant expansion by 2025, becoming one of Sri Lanka&apos;s leading suppliers of premium leafy vegetables, committed to strict quality control and hygienic farming practices.
              </p>
              {/* SL-GAP Certification Highlight */}
              <div className="flex items-start gap-4 p-5 bg-green-50 border border-green-200 rounded-xl mt-4">
                <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground font-outfit mb-1">GAP Certified Production</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our supply chain and farming practices are GAP-certified, ensuring clean, safe, and traceable agricultural products for both local supermarkets and international export markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Our Mission & Vision"
            subtitle="Guided by purpose, driven by quality."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-outfit text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To supply safe, fresh, and premium-quality agricultural products to Sri Lankan and international markets while integrating local farmers into our supply chain, providing technical guidance, and practicing sustainable farming.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-outfit text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become an internationally recognized Sri Lankan agricultural export brand known for quality, sustainability, trust, and continuous innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide our cultivation, processing, and export operations."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { icon: ShieldCheck, title: "Uncompromising Quality", desc: "Rigorous quality control at every stage, from seed to shipment. SL-GAP certified farming ensures the highest standards." },
              { icon: Globe2, title: "Global Standards", desc: "Adhering to international agricultural and export certifications, ensuring our products are accepted worldwide." },
              { icon: Leaf, title: "Sustainability", desc: "Eco-friendly farming practices including organic fertilization, water recycling, and biodiversity preservation." },
              { icon: Users, title: "Community Focus", desc: "Empowering local farmers through fair partnerships, training programs, and sustainable livelihood support." }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#FAFAF9] p-8 rounded-2xl shadow-sm border border-border text-center hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm to Export Process Timeline */}
      <section className="py-24 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Our Process: Farm to Export"
            subtitle="A transparent, quality-controlled journey ensuring every product meets international standards."
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

      {/* Sustainability */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Sustainability & Innovation"
            subtitle="We are dedicated to environment-friendly practices and clean production systems."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            {[
              { icon: Sprout, title: "Clean Cultivation & RO Water", desc: "Implementing a modern Reverse Osmosis (RO) water purification system to ensure clean, contaminant-free irrigation water for all our crops." },
              { icon: Droplets, title: "80% Solar Powered Operations", desc: "Aiming to operate approximately 80% of our business using solar energy to significantly reduce our environmental footprint and promote sustainable green energy." },
              { icon: Recycle, title: "Empowering Local Farmers", desc: "Supporting local outgrowers by providing training, technical guidance, and fair purchasing prices to integrate them into our growing export supply chain." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-[#FAFAF9] p-8 rounded-2xl border border-border hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold font-outfit text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Quick View */}
      <section className="py-16 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-center text-xl font-bold font-outfit text-foreground mb-8">Our Certifications & Standards</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {trustBadges.map((badge, i) => (
              <TrustBadge key={badge.id} badge={badge} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Keells & Cargills Partnership */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary/5 rounded-3xl border border-primary/20 p-8 md:p-16 text-center max-w-4xl mx-auto">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-foreground mb-6">Trusted by the Best</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We are honored to be an approved supplier of premium leafy vegetables to Cargills and Keells Supermarkets, Sri Lanka&apos;s leading retail chains, as well as trusted partners for international exporters serving Middle Eastern and European markets.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-sm border border-border">
                <span className="font-bold text-xl text-[#d01e2e]">Cargills Supermarket</span>
              </div>
              <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-sm border border-border">
                <img src="/img/Keells_Logo.jpg" alt="Keells Logo" className="w-12 h-12 rounded-full object-cover" />
                <span className="font-bold text-xl text-[#00a651]">Keells Supermarket</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Trust */}
      <section className="py-24 bg-gradient-to-b from-[#FAFAF9] to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Owner Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/img/Owner.png"
                    alt="Founder & Managing Director - Green Hills Agriculture"
                    className="w-full h-auto object-cover aspect-[4/5]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
                    <h3 className="text-white font-outfit font-bold text-2xl">Sanjeewa Rathnayaka</h3>
                    <p className="text-white/90 text-sm font-medium">Founder & Managing Director</p>
                    <p className="text-white/70 text-xs mt-1">Green Hills Agriculture</p>
                  </div>
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/5 rounded-full -z-10" />
              </motion.div>

              {/* Trust Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  <Users className="w-4 h-4" />
                  Leadership
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-outfit text-foreground leading-tight">
                  Built on Trust,<br />Driven by Passion
                </h2>
                <blockquote className="border-l-4 border-primary pl-5 italic text-muted-foreground text-lg leading-relaxed">
                  &ldquo;Our promise is simple - growing trust, delivering excellence. Every leafy vegetable that leaves Green Hills carries our unwavering commitment to safety, freshness, and quality.&rdquo;
                </blockquote>

                {/* Trust Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-border">
                    <p className="text-2xl md:text-3xl font-bold text-primary font-outfit">8+</p>
                    <p className="text-xs text-muted-foreground mt-1">Years of Experience</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-border">
                    <p className="text-2xl md:text-3xl font-bold text-primary font-outfit">150+</p>
                    <p className="text-xs text-muted-foreground mt-1">Outlets & Partners</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-border">
                    <p className="text-2xl md:text-3xl font-bold text-primary font-outfit">100%</p>
                    <p className="text-xs text-muted-foreground mt-1">GAP Compliant</p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full text-sm">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-medium">Verified Supplier</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-medium">GAP Certified</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full text-sm">
                    <Globe2 className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-medium">Export Ready</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
