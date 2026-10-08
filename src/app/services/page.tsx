"use client";

import { motion } from "framer-motion";
import { Globe, Truck, Store, ShieldCheck, Package, Leaf, ArrowRight, Check, Users, Sprout, Award, Zap, Activity, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const services = [
  {
    title: "Fresh Leafy Vegetable Supply",
    description: "Daily sourcing and supply of safe, premium-grade fresh leafy vegetables including Gotu Kola, Kankun, Mukunuwanna, and other traditional greens under hygienic conditions.",
    icon: Leaf,
    features: ["Harvested fresh at dawn", "SL-GAP certified farm practices", "Hygienic washing and sorting", "Nutrient-locked delivery"]
  },
  {
    title: "Export Grade Agricultural Products",
    description: "Premium quality vegetables prepared and sorted specifically to meet international phytosanitary and export grade requirements for global markets.",
    icon: Globe,
    features: ["Zero chemical residue tolerances", "Consistent leaf size and quality", "High-standard selection criteria", "Tailored to international food laws"]
  },
  {
    title: "Contract Farming",
    description: "Long-term contract cultivation plans structured for bulk buyers, exporters, and large-scale enterprises to guarantee stable yields, pricing, and volumes.",
    icon: Users,
    features: ["Customized planting schedules", "Price stability and hedging", "Dedicated crop blocks", "Traceability and compliance logs"]
  },
  {
    title: "Outgrower Development Program",
    description: "Empowering rural communities by training local farmers, providing high-quality seeds, and purchasing harvest at fair, pre-agreed contract prices.",
    icon: Sprout,
    features: ["Technical agricultural guidance", "Fairtrade pricing practices", "Local youth employment creation", "Community growth initiatives"]
  },
  {
    title: "Bulk Supply for Manufacturers",
    description: "Reliable bulk delivery of raw fresh crops to processors, dehydrators, wellness product producers, and commercial food manufacturers.",
    icon: Truck,
    features: ["High-volume production capacity", "Consistent year-round availability", "Flexible shipping schedules", "Optimized raw material handling"]
  },
  {
    title: "Retail Supermarket Supply",
    description: "Dedicated supply channels for leading supermarkets including Cargills and Keells, delivering farm-fresh, premium products daily to shelves.",
    icon: Store,
    features: ["Direct-to-store cold chain logistics", "Retail-ready barcoded packaging", "Traceability QR code support", "Consistent daily delivery schedules"]
  },
  {
    title: "International Export Logistics",
    description: "Partnerships with top logistics providers to ensure cold-chain integration from our Chilaw facility directly to air cargo or sea freight containers.",
    icon: Truck,
    features: ["Temperature-controlled transport", "Minimized transit delays", "Global port delivery coordination", "Real-time shipment tracking"]
  },
  {
    title: "GAP Certified Production",
    description: "Adhering to Sri Lanka Good Agricultural Practices standards, ensuring our cultivation processes minimize ecological and chemical impacts.",
    icon: ShieldCheck,
    features: ["Verified crop management", "Clean soil and water usage", "Regular agricultural audits", "GAP compliance certificates"]
  },
  {
    title: "Quality Assurance & Food Safety",
    description: "Strict quality control procedures implemented at every stage of the supply chain, from seed testing to final export dispatch.",
    icon: Award,
    features: ["Microbiological screening", "Pesticide-free verification", "Strict worker hygiene protocols", "Traceability from farm to table"]
  },
  {
    title: "Sustainable Farming Solutions",
    description: "Operating with future generations in mind by incorporating green energy, efficient water purification systems, and organic soil building.",
    icon: Zap,
    features: ["80% solar energy implementation", "Reverse Osmosis (RO) water systems", "Eco-friendly composting models", "Smart natural resource management"]
  },
  {
    title: "Private Label Supply",
    description: "Custom branding and packaging options for retail chains, import distributors, and overseas brands looking for pre-packed premium leafy greens.",
    icon: Package,
    features: ["Custom brand tag integration", "Retail weight specifications", "High-barrier packaging materials", "Professional export compliance labels"]
  },
  {
    title: "Custom Packaging",
    description: "Advanced packaging options designed to preserve color, freshness, and nutrients of delicate leafy greens during long distance transport.",
    icon: Package,
    features: ["Modified atmosphere packaging", "Eco-friendly biodegradable wraps", "Multi-size retail pack options", "Crush-resistant transport crates"]
  },
  {
    title: "Processing & Sorting",
    description: "State-of-the-art sorting and washing services using purified water to ensure zero debris and uniform premium export grade.",
    icon: Activity,
    features: ["Multi-stage bubble washing", "Air-drying to prevent decay", "Optical size sorting", "Contaminant removal screens"]
  },
  {
    title: "Export Documentation Support",
    description: "Complete phytosanitary documentation, certificate of origin, and custom clearance support for international importers.",
    icon: FileText,
    features: ["Phytosanitary certification handling", "Certificate of origin processing", "Customs declarations ready", "Hassle-free global clearance"]
  },
  {
    title: "Agricultural Consultancy",
    description: "Agronomy advice, GAP training, and clean cultivation guidance for outgrowers and corporate farming partners.",
    icon: HelpCircle,
    features: ["Farming expert consultation", "GAP compliance preparation", "Disease control training", "Efficient irrigation planning"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto mt-8">
          <SectionHeading 
            title="Our Services" 
            subtitle="Providing end-to-end solutions from sustainable agriculture to global export distribution."
            light
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 md:px-6 mt-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-border p-8 hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-sm"
              >
                {/* Icon block */}
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-outfit text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-2.5 border-t border-border/50 pt-6 mt-auto">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <div className="w-4 h-4 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA section */}
      <section className="container mx-auto px-4 md:px-6 mt-20 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary via-emerald-800 to-teal-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
          
          <h2 className="font-outfit text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Ready to Partner With Us?
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-8 relative z-10">
            Whether you need custom export volumes, retail supply, or private labeling, Green Hills is ready to collaborate. Get in touch with our team today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-white hover:bg-white/95 text-primary font-bold shadow-md hover:shadow" asChild>
              <Link href="/contact">
                Contact Our Exports Team
                <ArrowRight className="ml-2 w-5 h-5 text-primary" />
              </Link>
            </Button>
            <a 
              href="https://wa.me/94774652552" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all shadow-sm"
            >
              <Globe className="w-5 h-5 text-white" />
              WhatsApp Business
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
