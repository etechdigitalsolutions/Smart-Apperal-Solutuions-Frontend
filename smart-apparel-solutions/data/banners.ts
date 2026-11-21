export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
};

export const banners: Banner[] = [
  {
    id: "banner-1",
    title: "Built for productive workshops.",
    subtitle: "Industrial sewing machines, cutting systems and genuine spare parts for Sri Lanka’s garment makers.",
    cta: "Shop Machines",
    href: "/products",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "banner-2",
    title: "Faster output. Lower downtime.",
    subtitle: "Reliable overlock, interlock and finishing machines backed by after-sales support.",
    cta: "Get a Quotation",
    href: "/contact",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "banner-3",
    title: "Repair, service and parts that keep production moving.",
    subtitle: "From maintenance to genuine parts, our team keeps your line running at peak performance.",
    cta: "Book Service",
    href: "/services-repair",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
  },
];
