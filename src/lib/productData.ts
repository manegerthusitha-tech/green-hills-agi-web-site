export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  shortDesc: string;
  exportGrade: string;
  packagingSizes: string[];
  availability: "In Stock" | "Pre-Order" | "Out of Stock";
  certifications: string[];
  benefits: string[];
  usage: string;
  storageInstructions: string;
  qualityStandards: string[];
  specifications: Record<string, string>;
  frontImage: string;
  backImage: string;
  thirdImage?: string;
  price: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "gotukola-100g",
    name: "Gotukola (100 g)",
    category: "Fresh Leaves",
    description:
      "Hand-picked, farm-fresh Centella asiatica (Gotukola) leaves harvested daily from our SL-GAP certified farms. Carefully sorted, washed, and packed within hours of harvest to preserve maximum freshness and nutritional value. Ideal for traditional culinary preparations, fresh juices, and sambol recipes.",
    shortDesc:
      "Farm-fresh, hand-picked Gotukola (Centella asiatica) leaves from our SL-GAP certified farm. 100 g pack.",
    exportGrade: "Grade A - SL-GAP Certified",
    packagingSizes: ["100g Pack"],
    availability: "In Stock",
    certifications: ["SL-GAP Certified", "Hygienically Processed", "Export Quality"],
    benefits: [
      "Rich in vitamins A, C, and K",
      "Supports cognitive function and memory",
      "Natural anti-inflammatory properties",
      "Promotes healthy skin and wound healing",
      "Boosts immune system naturally",
    ],
    usage:
      "Wash leaves thoroughly before use. Add to salads, smoothies, traditional sambol, or brew as a fresh herbal tea. Best consumed within 3–5 days of purchase for optimal freshness.",
    storageInstructions:
      "Store in a cool, dry place. Refrigerate at 4–8°C for up to 7 days. Keep in original packaging or wrap in a damp paper towel inside a sealed container.",
    qualityStandards: [
      "SL-GAP certified cultivation",
      "No harmful pesticides or chemical fertilizers",
      "Triple-washed before packaging",
      "Hygienically packed",
    ],
    specifications: {
      "Botanical Name": "Centella asiatica",
      Origin: "Sri Lanka",
      "Harvest Method": "Hand-picked",
      "Net Weight": "100 g",
      "Shelf Life": "5–7 days (refrigerated)",
    },
    frontImage: "/img/Feature_1 F.jpg",
    backImage: "/img/Feature_1 B.jpg",
    thirdImage: "/img/Feature_1 A.jpg",
    price: "LKR 200.00",
    rating: 4.9,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    slug: "kankun-150g",
    name: "Kankun (150 g)",
    category: "Fresh Leaves",
    description:
      "Fresh, farm-grown Kankun (Water Spinach / Ipomoea aquatica) leaves, hand-harvested and carefully packed to retain maximum freshness and nutritional value. A popular leafy green in Sri Lankan cuisine, rich in iron, vitamins, and minerals. Perfect for stir-fries, curries, and traditional mallum.",
    shortDesc:
      "Fresh farm-grown Kankun (Water Spinach) leaves, hygienically harvested and packed. 150 g pack.",
    exportGrade: "Grade A - Fresh Quality",
    packagingSizes: ["150g Pack"],
    availability: "In Stock",
    certifications: ["Hygienically Processed", "Fresh Quality"],
    benefits: [
      "Rich in iron and essential minerals",
      "High in vitamins A and C",
      "Supports healthy digestion",
      "Natural source of antioxidants",
      "Low in calories, nutrient-dense",
    ],
    usage:
      "Wash thoroughly before use. Ideal for stir-fries, curries, soups, and traditional Sri Lankan mallum. Best consumed within 2–4 days of purchase.",
    storageInstructions:
      "Store in a cool, dry place. Refrigerate at 4–8°C for up to 5 days. Keep loosely wrapped to maintain freshness.",
    qualityStandards: [
      "Freshly harvested daily",
      "Hygienically cleaned and sorted",
      "Free from visible contaminants",
      "Packed on same day as harvest",
    ],
    specifications: {
      "Common Name": "Kankun / Water Spinach",
      "Botanical Name": "Ipomoea aquatica",
      Origin: "Sri Lanka",
      "Harvest Method": "Hand-picked",
      "Net Weight": "150 g",
      "Shelf Life": "3–5 days (refrigerated)",
    },
    frontImage: "/img/Feature_2 F.png",
    backImage: "/img/Feature_2 B.png",
    price: "LKR 200.00",
    rating: 4.7,
    reviews: 98,
    inStock: true,
  },
  {
    id: 3,
    slug: "mukunuwanna-150g",
    name: "Mukunuwanna (150 g)",
    category: "Fresh Leaves",
    description:
      "Fresh, tender Mukunuwanna (Alternanthera sessilis) leaves, hand-harvested from clean, chemical-free farms. A nutritious leafy green widely used in traditional Sri Lankan cooking and Ayurvedic medicine. Known for its high iron content and health-supporting properties.",
    shortDesc:
      "Fresh tender Mukunuwanna leaves, hand-harvested from clean farms. A nutritious Sri Lankan leafy green. 150 g pack.",
    exportGrade: "Grade A - Fresh Quality",
    packagingSizes: ["150g Pack"],
    availability: "In Stock",
    certifications: ["Hygienically Processed", "Fresh Quality"],
    benefits: [
      "Exceptionally high in iron",
      "Supports liver health",
      "Natural diuretic properties",
      "Rich in vitamins and minerals",
      "Used in traditional Ayurvedic medicine",
    ],
    usage:
      "Wash leaves thoroughly before use. Use in traditional mallum, curries, soups, or as a cooked side dish. Best consumed within 2–4 days of purchase.",
    storageInstructions:
      "Store in a cool, dry place. Refrigerate at 4–8°C for up to 5 days. Keep in original packaging or loosely wrapped.",
    qualityStandards: [
      "Freshly harvested daily",
      "Hygienically cleaned and sorted",
      "Free from visible contaminants",
      "Packed on same day as harvest",
    ],
    specifications: {
      "Common Name": "Mukunuwanna / Sessile Joyweed",
      "Botanical Name": "Alternanthera sessilis",
      Origin: "Sri Lanka",
      "Harvest Method": "Hand-picked",
      "Net Weight": "150 g",
      "Shelf Life": "3–5 days (refrigerated)",
    },
    frontImage: "/img/Feature_3 F.jpg",
    backImage: "/img/Feature_3 B.jpg",
    price: "LKR 200.00",
    rating: 4.8,
    reviews: 76,
    inStock: true,
  },
  {
    id: 4,
    slug: "chopped-mukunuwanna-150g",
    name: "Chopped Mukunuwanna (150 g)",
    category: "Processed",
    description:
      "Pre-washed and freshly chopped Mukunuwanna (Alternanthera sessilis) leaves, hygienically processed and ready to cook. Saves preparation time while delivering all the natural goodness of fresh Mukunuwanna. Perfect for busy households who enjoy traditional Sri Lankan green dishes.",
    shortDesc:
      "Pre-washed and freshly chopped Mukunuwanna, ready to cook. Saves prep time without compromising freshness. 150 g pack.",
    exportGrade: "Grade A - Ready-to-Cook",
    packagingSizes: ["150g Pack"],
    availability: "In Stock",
    certifications: ["Hygienically Processed", "Fresh Quality"],
    benefits: [
      "Ready-to-cook - saves preparation time",
      "Pre-washed for food safety",
      "Retains full nutritional value",
      "High in iron and vitamins",
      "Consistent cut size for even cooking",
    ],
    usage:
      "No washing required - ready to cook straight from the pack. Use in traditional mallum, stir-fries, soups, or curries. Best consumed within 2–3 days of purchase.",
    storageInstructions:
      "Refrigerate immediately at 4–8°C. Keep sealed. Best consumed within 2–3 days of purchase for optimal freshness.",
    qualityStandards: [
      "Triple-washed before chopping",
      "Hygienically processed and packed",
      "Free from visible contaminants",
      "Chilled storage maintained throughout",
    ],
    specifications: {
      "Common Name": "Chopped Mukunuwanna",
      "Botanical Name": "Alternanthera sessilis",
      Origin: "Sri Lanka",
      "Processing Method": "Hand-washed and chopped",
      "Net Weight": "150 g",
      "Shelf Life": "2–3 days (refrigerated)",
    },
    frontImage: "/img/Feature_4 F.png",
    backImage: "/img/Feature_4 B.png",
    price: "LKR 200.00",
    rating: 4.6,
    reviews: 54,
    inStock: true,
  },
];

export const productCategories = [
  "All",
  "Fresh Leaves",
  "Processed",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
