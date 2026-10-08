"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "News", href: "/news" },
  { name: "Events", href: "/events" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300",
        isScrolled
          ? "bg-[#145C1D]/95 backdrop-blur-md shadow-lg"
          : "bg-[#145C1D]"
      )}
    >
      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-8 xl:px-20">
        <div className="flex items-center justify-between h-[95px]">

          {/* Logo */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center shrink-0 group ml-3 lg:ml-2"
            >
              <div className="flex items-center h-[160px] overflow-visible">
                <img
                  src="/img/Green_Hills_Logo_Footer.svg"
                  alt="Green Hills Agriculture"
                  className="
                    w-[60px]
                    md:w-[70px]
                    lg:w-[110px]
                    xl:w-[120px]
                    h-auto
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-105
                    -translate-y-[0px]
                  "
                />
              </div>
            </Link>
            <div className="flex flex-col border-l border-white/30 pl-3">
              <span className="text-white font-karla font-bold text-sm leading-tight">Green Hills</span>
              <span className="text-white/70 text-[10px] uppercase tracking-widest font-semibold">Agriculture Products</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative text-[15px] xl:text-[18px] font-semibold tracking-wide transition-all duration-300",
                    isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.name}

                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-white"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">


            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#145C1D] border-t border-white/10"
          >
            <div className="px-5 py-5 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}