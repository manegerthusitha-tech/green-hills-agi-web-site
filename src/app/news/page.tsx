"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, ArrowLeft, Newspaper, Award, Leaf, Zap, Globe, Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  featured?: boolean;
  image?: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Green Hills Agriculture Secures Approved Supplier Status with Keells Supermarket",
    excerpt: "In a major milestone for our retail expansion, Green Hills Agriculture has officially become an approved supplier to Keells Supermarket in February 2023.",
    content: "In February 2023, Green Hills Agriculture reached a major business milestone by becoming an approved supplier to Keells Supermarket. This partnership marks a significant milestone in our corporate history, requiring our processing facilities and supply chain to meet stringent hygiene and quality guidelines. Initially, our sales started gradually as we aligned our harvesting times to Keells' strict delivery windows. However, this partnership laid the foundation for rapid business expansion. By delivering farm-fresh, GAP-certified greens directly to supermarket shelves, we have established Green Hills as a household name for quality leafy vegetables.",
    date: "February 15, 2023",
    author: "Management",
    category: "Partnerships",
    featured: true,
    image: "/img/SL-GAP-Cerificate.png",
  },
  {
    id: 2,
    title: "Company Founded: Launching the Green Hills Agriculture Journey",
    excerpt: "Green Hills Agriculture was officially established on 23 July 2018 with a vision to supply safe, fresh, and premium leafy vegetables to Sri Lanka and the world.",
    content: "On 23 July 2018, Green Hills Agriculture was officially established. Our founding goal was to cultivate premium-quality leafy vegetables that are 100% safe, fresh, and fully traceable. Recognizing the gaps in traditional farming supply chains, our founder Sanjeewa Rathnayaka established a modern facility in Chilaw. From day one, Green Hills committed to strict quality controls, avoiding chemical excesses, and establishing a professional pathway to scale local agriculture into a global brand.",
    date: "July 23, 2018",
    author: "Founder",
    category: "Business",
  },
  {
    id: 3,
    title: "Pioneering GAP-Certified Leafy Vegetable Supply and Cargills Partnership",
    excerpt: "Green Hills launches its certified leafy vegetable supply through a strategic retail partnership with Cargills Supermarket.",
    content: "To build a strong reputation for reliability, Green Hills Agriculture entered into a partnership with Cargills Supermarket, Sri Lanka's largest retail operator. Under this partnership, we began supplying premium leafy vegetables certified under Good Agricultural Practices (GAP). By working closely with Cargills, we proved that local leafy greens could meet high commercial safety standards, establishing our reputation for quality.",
    date: "October 12, 2019",
    author: "Sales Team",
    category: "Partnerships",
  },
  {
    id: 4,
    title: "Expanding to International Export Suppliers",
    excerpt: "Green Hills expands its distribution network to supply premium leafy vegetables to Middle Eastern and European export markets.",
    content: "Following our success in domestic retail, Green Hills successfully expanded its supply network to collaborate with leading agricultural export companies. Our fresh leafy greens, including high-demand Gotu Kola, are now regularly exported to Middle Eastern and European markets. This expansion has enabled us to adapt our packing, sorting, and chilling systems to match strict international food importation standards.",
    date: "November 08, 2021",
    author: "Exports Team",
    category: "Business",
  },
  {
    id: 5,
    title: "Rapid Business Growth and Increased Production Capacity",
    excerpt: "By 2025, Green Hills has achieved unprecedented growth, becoming one of Sri Lanka's leading suppliers of premium leafy vegetables.",
    content: "Through continuous innovation and expansion of our outgrower networks, Green Hills achieved rapid business growth by 2025. We have significantly increased our production capacity, expanding our processing facility to handle higher daily volumes. This growth has allowed us to create job opportunities for local youth, bringing modern, professional agriculture practices to the community.",
    date: "December 18, 2025",
    author: "Finance Dept",
    category: "Business",
  },
  {
    id: 6,
    title: "Sustainability Drive: 80% Solar Powered Target & RO Purification",
    excerpt: "As part of our green vision, Green Hills launches a major solar energy project and installs a state-of-the-art Reverse Osmosis water purification system.",
    content: "Green Hills is proud to launch its comprehensive sustainability strategy. To reduce our carbon footprint, we have initiated a solar energy project with the target of operating approximately 80% of our business using solar power. Additionally, we have implemented a state-of-the-art Reverse Osmosis (RO) water purification system. This ensures that all irrigation water used on our farms is free from heavy metals and contaminants, securing the purity and safety of our premium leafy vegetables.",
    date: "March 10, 2026",
    author: "Sustainability Lead",
    category: "Sustainability",
  },
  {
    id: 7,
    title: "Looking Ahead: Modern Net House Cultivation Projects",
    excerpt: "Green Hills announces plans to introduce advanced Net House cultivation systems to optimize production quality and safety.",
    content: "To further improve production quality and protect crops from extreme weather and pests, Green Hills is preparing to introduce modern Net House cultivation systems. Net houses allow us to control humidity, reduce water evaporation, and completely eliminate insect entry, ensuring chemical-free growth. This technological step aligns with our long-term vision of becoming an internationally recognized Sri Lankan agricultural export brand known for quality, sustainability, and trust.",
    date: "June 20, 2026",
    author: "Agronomist",
    category: "New Launches",
  },
];

export default function NewsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      // Smooth scroll to the expanded item after a brief delay for transition to initiate
      setTimeout(() => {
        const element = document.getElementById(`article-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const featuredArticle = newsArticles.find((a) => a.featured);
  const regularArticles = newsArticles.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto mt-8">
          <SectionHeading 
            title="Company News" 
            subtitle="Stay up to date with the latest announcements, partnerships, and milestones from Green Hills Agriculture."
            light
          />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 mt-16 max-w-6xl">
        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            id={`article-${featuredArticle.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Side: Featured Accent */}
              <div className="lg:col-span-5 bg-gradient-to-br from-primary via-emerald-800 to-teal-900 p-8 flex flex-col justify-between text-white relative min-h-[300px] lg:min-h-full">
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wider text-white border border-white/20">
                    Latest Highlight
                  </span>
                </div>
                <div className="my-auto flex flex-col items-center text-center">
                  <Award className="w-20 h-20 text-accent mb-6 animate-pulse" />
                  <span className="text-accent text-sm font-bold tracking-widest uppercase mb-1 font-outfit">SL-GAP Standard</span>
                  <h4 className="text-xl font-bold font-outfit text-white/95 max-w-xs">Certified Quality & Direct Export</h4>
                </div>
                <div className="text-xs text-white/60 text-center">
                  Green Hills Agriculture Products
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-foreground mb-4 leading-tight">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-base mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  <AnimatePresence>
                    {expandedId === featuredArticle.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden border-t border-border mt-6 pt-6"
                      >
                        <div className="prose max-w-none text-foreground leading-relaxed space-y-4">
                          {featuredArticle.content.split("\n\n").map((para, i) => (
                            <p key={i} className="text-muted-foreground">{para}</p>
                          ))}
                          {featuredArticle.image && (
                            <div className="mt-8 relative w-full h-[500px] rounded-xl overflow-hidden border border-border bg-white shadow-sm">
                              <Image 
                                src={featuredArticle.image} 
                                alt="SL-GAP Certificate" 
                                fill 
                                className="object-contain p-4" 
                                sizes="(max-width: 1200px) 100vw, 1200px"
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex justify-end border-t border-border/50 pt-6">
                  <Button 
                    onClick={() => toggleExpand(featuredArticle.id)}
                    variant="default" 
                    className="rounded-full px-6 py-2 shadow-sm font-semibold hover:shadow"
                  >
                    {expandedId === featuredArticle.id ? (
                      <>
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Read Less
                      </>
                    ) : (
                      <>
                        Read Full Story 
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        <h4 className="text-xl font-bold font-outfit text-foreground mb-8 border-b border-border pb-4 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary" />
          More News & Updates
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularArticles.map((article, index) => {
            const isExpanded = expandedId === article.id;
            
            // Get category icons for visuals
            const getCategoryIcon = (category: string) => {
              switch (category) {
                case "Certifications": return <Shield className="w-12 h-12 text-primary/20" />;
                case "New Launches": return <Leaf className="w-12 h-12 text-primary/20" />;
                case "Partnerships": return <Globe className="w-12 h-12 text-primary/20" />;
                case "Sustainability": return <Zap className="w-12 h-12 text-primary/20" />;
                default: return <Newspaper className="w-12 h-12 text-primary/20" />;
              }
            };

            return (
              <motion.article
                id={`article-${article.id}`}
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group shadow-sm"
              >
                {/* Gradient Header */}
                <div className="h-32 bg-gradient-to-br from-primary/5 to-accent/15 relative overflow-hidden flex items-center justify-center border-b border-border">
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {getCategoryIcon(article.category)}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 border border-border/50 backdrop-blur-sm rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{article.author}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-outfit text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-border mt-4 pt-4"
                      >
                        <div className="prose max-w-none text-sm text-foreground leading-relaxed space-y-3">
                          {article.content.split("\n\n").map((para, i) => (
                            <p key={i} className="text-muted-foreground">{para}</p>
                          ))}
                          {article.image && (
                            <div className="mt-6 relative w-full h-[300px] rounded-xl overflow-hidden border border-border bg-white shadow-sm">
                              <Image 
                                src={article.image} 
                                alt={article.title} 
                                fill 
                                className="object-contain p-4" 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                    <Button 
                      onClick={() => toggleExpand(article.id)}
                      variant="outline" 
                      className="rounded-full text-xs py-1.5 px-4 group/btn border-primary/20 hover:border-primary hover:bg-primary/5 text-primary font-semibold"
                    >
                      {isExpanded ? (
                        <>
                          <ArrowLeft className="mr-1.5 w-3.5 h-3.5" />
                          Read Less
                        </>
                      ) : (
                        <>
                          Read Full Article 
                          <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
