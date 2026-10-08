"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star, ShieldCheck, ArrowRight, MessageCircle, Package } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductModal } from "@/components/ui/ProductModal";
import { products, productCategories } from "@/lib/productData";
import type { Product } from "@/lib/productData";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto mt-8">
          <SectionHeading 
            title="Our Premium Products" 
            subtitle="Explore our export-quality Centella asiatica product range, harvested with care and processed to perfection."
            light
          />
          {/* SL-GAP Badge in Header */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-semibold">All Products SL-GAP Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-border flex flex-col md:flex-row gap-6 justify-between items-center">
          
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted/50 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="w-full overflow-x-auto pb-2 md:pb-0 hide-scrollbar flex gap-2">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white text-foreground border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 md:px-6 mt-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex w-20 h-20 bg-muted items-center justify-center rounded-full mb-6 text-muted-foreground">
              <Filter className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-outfit text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            <Button className="mt-6" onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                {/* Product Image */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center p-6">
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  {product.certifications.includes("SL-GAP Certified") && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-2.5 py-1 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> SL-GAP
                      </span>
                    </div>
                  )}
                  <img
                    src={product.frontImage}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-outfit text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.shortDesc}</p>

                  {/* Export Grade */}
                  <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-primary" />
                    {product.exportGrade}
                  </div>

                  {/* Packaging Sizes Preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.packagingSizes.slice(0, 3).map((size) => (
                      <span key={size} className="px-2 py-0.5 bg-muted/50 border border-border rounded text-[10px] font-medium text-muted-foreground">
                        {size}
                      </span>
                    ))}
                    {product.packagingSizes.length > 3 && (
                      <span className="px-2 py-0.5 bg-muted/50 border border-border rounded text-[10px] font-medium text-primary">
                        +{product.packagingSizes.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-foreground font-outfit">{product.price}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full px-3 text-[#25D366] border-[#25D366] hover:bg-[#25D366]/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          const msg = encodeURIComponent(`Hello, I'm interested in "${product.name}" from Green Hills Agriculture.`);
                          window.open(`https://wa.me/94774652552?text=${msg}`, "_blank");
                        }}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={product.inStock ? "default" : "secondary"}
                        disabled={!product.inStock}
                        className="rounded-full px-5"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductModal(product);
                        }}
                      >
                        {product.inStock ? (
                          <>View Details <ArrowRight className="ml-1 w-4 h-4" /></>
                        ) : (
                          "Unavailable"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
