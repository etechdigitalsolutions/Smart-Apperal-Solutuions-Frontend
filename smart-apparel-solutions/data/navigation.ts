export type NavChild = { label: string; slug: string; href?: string; image?: string };

export type NavItem = {
  label: string;
  slug: string;
  href?: string;
  image?: string;
  children?: NavChild[];
};

export const navigation: NavItem[] = [
  {
    label: "Equipment",
    slug: "equipment",
    href: "/products",
    children: [
      { label: "Sewing Machines", slug: "sewing-machines", href: "/products?category=sewing-machines" },
      { label: "Cutting", slug: "cutting", href: "/products?category=cutting" },
      { label: "Ironing & Finishing", slug: "ironing-finishing", href: "/products?category=ironing-finishing" },
      { label: "Embroidery", slug: "embroidery", href: "/products?category=embroidery" },
      { label: "Home Appliances", slug: "home-appliances", href: "/products?category=home-appliances" },
    ],
  },
  {
    label: "Parts & Supplies",
    slug: "parts-supplies",
    href: "/products?category=spare-parts",
    children: [
      { label: "Spare Parts", slug: "spare-parts", href: "/products?category=spare-parts" },
      { label: "Needles", slug: "needles", href: "/products?category=needles" },
      { label: "Accessories", slug: "accessories", href: "/products?category=accessories" },
    ],
  },
  {
    label: "Brands",
    slug: "brands",
    href: "/products",
    children: [
      { label: "Worlden", slug: "worlden", href: "/products?brand=Worlden" },
      { label: "Jack", slug: "jack", href: "/products?brand=Jack" },
      { label: "Silverstar", slug: "silverstar", href: "/products?brand=Silverstar" },
      { label: "Singer", slug: "singer", href: "/products?brand=Singer" },
      { label: "Golden Eagle", slug: "golden-eagle", href: "/products?brand=Golden%20Eagle" },
      { label: "Juki", slug: "juki", href: "/products?brand=Juki" },
    ],
  },
  {
    label: "Services & Support",
    slug: "services-support",
    href: "/services-repair",
    children: [
      { label: "Services & Repair", slug: "services-repair", href: "/services-repair" },
      { label: "Installments", slug: "installments", href: "/installments" },
      { label: "Track Order", slug: "track-order", href: "/track-order" },
    ],
  },
  {
    label: "Company",
    slug: "company",
    href: "/contact",
    children: [
      { label: "මහමු (Mahamu)", slug: "mahamu", href: "/mahamu" },
      { label: "News / Blog", slug: "blog", href: "/blog" },
      { label: "Contact", slug: "contact", href: "/contact" },
    ],
  },
];
