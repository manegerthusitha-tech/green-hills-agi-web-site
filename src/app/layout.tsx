import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

import "./globals.css";

// Using modern typography for a premium look
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Green Hills Agriculture | Premium Leafy Vegetable Exporter & Supplier",
    template: "%s | Green Hills Agriculture",
  },
  description: "Leading Sri Lankan supplier and exporter of premium GAP-certified leafy vegetables, serving Cargills, Keells Supermarkets, and Middle Eastern and European export markets.",
  keywords: [
    "Green Hills Agriculture",
    "Green Hills Chiliaw",
    "leafy vegetable supplier Sri Lanka",
    "leafy vegetable exporter",
    "Sri Lanka GAP certified greens",
    "Gotu Kola exporter Sri Lanka",
    "Cargills leafy vegetable supplier",
    "Keells supermarket supplier Sri Lanka",
    "agricultural export Sri Lanka",
    "sustainable farming Sri Lanka",
    "solar powered agriculture Sri Lanka",
    "clean leafy greens supplier",
    "premium agricultural products export",
  ],
  authors: [{ name: "Green Hills Agriculture" }],
  creator: "Green Hills Agriculture",
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://www.greenhillsagri.com",
    title: "Green Hills Agriculture | Premium Leafy Vegetable Exporter & Supplier",
    description: "Leading Sri Lankan supplier and exporter of premium GAP-certified leafy vegetables, serving retail supermarkets and global export markets.",
    siteName: "Green Hills Agriculture",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Hills Agriculture",
    description: "Premium GAP-certified leafy vegetable exporter and supermarket supplier from Sri Lanka.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Green Hills Agriculture",
    "url": "https://www.greenhillsagri.com",
    "logo": "https://www.greenhillsagri.com/logo.png",
    "description": "Leading supplier and exporter of premium GAP-certified leafy vegetables in Sri Lanka, supplying Cargills and Keells supermarkets and global export markets.",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+94-77-465-2552",
        "contactType": "sales",
        "areaServed": ["LK", "Worldwide"],
        "availableLanguage": "English"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Manuwangama/E",
      "addressLocality": "Chilaw",
      "addressCountry": "LK"
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 pt-[72px]">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />

      </body>
    </html>
  );
}
