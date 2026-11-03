export type NavChild = { label: string; slug: string; image?: string };

export type NavItem = {
  label: string;
  slug: string;
  image?: string;
  children?: NavChild[];
};

export const navigation: NavItem[] = [
  {
    label: "Sewing Machines",
    slug: "sewing-machines",
    children: [
      { label: "Budget Series", slug: "budget-series" },
      { label: "Automated", slug: "automated" },
      { label: "Single Needle", slug: "single-needle" },
      { label: "Overlock", slug: "overlock" },
      { label: "Double Needle", slug: "double-needle" },
      { label: "Interlock", slug: "interlock" },
    ],
  },
  {
    label: "Cutting",
    slug: "cutting",
    children: [
      { label: "Cloth Cutting", slug: "cloth-cutting" },
      { label: "Pattern Cutting", slug: "pattern-cutting" },
      { label: "Finishing Tools", slug: "finishing-tools" },
    ],
  },
  {
    label: "Ironing & Finishing",
    slug: "ironing-finishing",
    children: [
      { label: "Ironing & Boilers", slug: "ironing-boilers" },
      { label: "Heat Transfer", slug: "heat-transfer" },
      { label: "Ultrasonic", slug: "ultrasonic" },
      { label: "Fusing", slug: "fusing" },
    ],
  },
  {
    label: "Embroidery",
    slug: "embroidery",
    children: [
      { label: "Multi-Needle", slug: "multi-needle" },
      { label: "Pattern Sewing", slug: "pattern-sewing" },
      { label: "Smocking", slug: "smocking" },
    ],
  },
  { label: "Spare Parts", slug: "spare-parts" },
  { label: "Needles", slug: "needles" },
  { label: "Accessories", slug: "accessories" },
  { label: "Home Appliances", slug: "home-appliances" },
  { label: "Brands", slug: "brands" },
];
