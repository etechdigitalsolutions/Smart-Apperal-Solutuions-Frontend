import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "sewing-machines",
    name: "Sewing Machines",
    slug: "sewing-machines",
    description: "Single needle, overlock, interlock and heavy-duty industrial machines.",
    children: [
      { id: "budget-series", name: "Budget Series", slug: "budget-series", parentSlug: "sewing-machines" },
      { id: "automated", name: "Automated", slug: "automated", parentSlug: "sewing-machines" },
      { id: "single-needle", name: "Single Needle", slug: "single-needle", parentSlug: "sewing-machines" },
      { id: "overlock", name: "Overlock", slug: "overlock", parentSlug: "sewing-machines" },
      { id: "double-needle", name: "Double Needle", slug: "double-needle", parentSlug: "sewing-machines" },
      { id: "interlock", name: "Interlock", slug: "interlock", parentSlug: "sewing-machines" },
    ],
  },
  {
    id: "cutting",
    name: "Cutting",
    slug: "cutting",
    description: "Cutting tables, knives and precision cutting systems.",
    children: [
      { id: "cloth-cutting", name: "Cloth Cutting", slug: "cloth-cutting", parentSlug: "cutting" },
      { id: "fabric-cutting", name: "Fabric Cutting", slug: "fabric-cutting", parentSlug: "cutting" },
    ],
  },
  {
    id: "ironing-finishing",
    name: "Ironing & Finishing",
    slug: "ironing-finishing",
    description: "Pressing, steam and finishing equipment for production lines.",
    children: [
      { id: "ironing-boilers", name: "Ironing & Boilers", slug: "ironing-boilers", parentSlug: "ironing-finishing" },
      { id: "heat-transfer", name: "Heat Transfer", slug: "heat-transfer", parentSlug: "ironing-finishing" },
      { id: "ultrasonic", name: "Ultrasonic", slug: "ultrasonic", parentSlug: "ironing-finishing" },
      { id: "fusing", name: "Fusing", slug: "fusing", parentSlug: "ironing-finishing" },
      { id: "finishing", name: "Finishing", slug: "finishing", parentSlug: "ironing-finishing" },
    ],
  },
  {
    id: "embroidery",
    name: "Embroidery",
    slug: "embroidery",
    description: "Computer and multi-needle embroidery systems.",
    children: [
      { id: "multi-needle", name: "Multi-Needle", slug: "multi-needle", parentSlug: "embroidery" },
      { id: "pattern-sewing", name: "Pattern Sewing", slug: "pattern-sewing", parentSlug: "embroidery" },
      { id: "smocking", name: "Smocking", slug: "smocking", parentSlug: "embroidery" },
    ],
  },
  { id: "spare-parts", name: "Spare Parts", slug: "spare-parts", description: "Essential replacement parts and motors." },
  { id: "needles", name: "Needles", slug: "needles", description: "Industrial needles for every machine type." },
  { id: "accessories", name: "Accessories", slug: "accessories", description: "Presser feet, parts, tools and workshop essentials." },
  { id: "home-appliances", name: "Home Appliances", slug: "home-appliances", description: "Domestic appliances and support units." },
  { id: "brands", name: "Brands", slug: "brands", description: "Trusted global machine brands." },
];
