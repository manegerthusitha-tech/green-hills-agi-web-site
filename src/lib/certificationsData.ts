import { ShieldCheck, Award, Leaf, Globe, CheckCircle, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Certification {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  validityInfo: string;
  issuer: string;
  icon: LucideIcon;
  image?: string;
}

export interface TrustBadgeData {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export const certifications: Certification[] = [
  {
    id: "sl-gap",
    title: "SL-GAP Certification",
    shortTitle: "SL-GAP Certified",
    description:
      "Certified by SL-GAP (Sri Lanka Good Agricultural Practices) ensuring safe, hygienic, and internationally accepted agricultural production standards. This certification validates that our farming practices meet rigorous safety, quality, and environmental sustainability benchmarks recognized by global buyers.",
    validityInfo: "Valid & Renewed Annually",
    issuer: "Sri Lanka Standards Institution (SLSI)",
    icon: ShieldCheck,
    image: "/img/SL-GAP-Cerificate.png",
  },
];

export const trustBadges: TrustBadgeData[] = [
  {
    id: "sl-gap",
    label: "SL-GAP Certified",
    icon: ShieldCheck,
    description: "Certified under Sri Lanka Good Agricultural Practices",
  },
  {
    id: "export-quality",
    label: "Export Quality",
    icon: Globe,
    description: "Meeting international export standards",
  },
  {
    id: "hygienically-processed",
    label: "Hygienically Processed",
    icon: CheckCircle,
    description: "Processed in certified hygienic facilities",
  },
  {
    id: "premium-agriculture",
    label: "Premium Agriculture Standards",
    icon: Award,
    description: "Adhering to the highest agricultural quality benchmarks",
  },
];

export const trustPoints = [
  {
    icon: BadgeCheck,
    title: "Certified Quality",
    description: "SL-GAP certified farms ensuring every product meets international agricultural standards.",
  },
  {
    icon: Leaf,
    title: "Direct Farm Sourcing",
    description: "Harvested directly from our own farms and premium local outgrowers, guaranteeing complete traceability.",
  },
  {
    icon: Globe,
    title: "Consistent Supply",
    description: "Year-round cultivation ensures reliable supply to leading supermarkets and international export markets.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    description: "From seed to shipment, every step is documented, tested, and quality-assured.",
  },
];

export const exportTimelineSteps = [
  {
    step: 1,
    title: "Farm",
    description: "SL-GAP certified organic cultivation",
    icon: Leaf,
  },
  {
    step: 2,
    title: "Harvest",
    description: "Hand-picked at optimal maturity",
    icon: CheckCircle,
  },
  {
    step: 3,
    title: "Processing",
    description: "Hygienic sorting, washing & drying",
    icon: Award,
  },
  {
    step: 4,
    title: "Quality Check",
    description: "Laboratory testing & certification",
    icon: ShieldCheck,
  },
  {
    step: 5,
    title: "Packaging",
    description: "Export-grade sealed packaging",
    icon: BadgeCheck,
  },
  {
    step: 6,
    title: "Export",
    description: "Cold-chain logistics worldwide",
    icon: Globe,
  },
];
