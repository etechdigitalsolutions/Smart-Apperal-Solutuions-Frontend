import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "How to choose the right industrial overlock for your factory",
    slug: "choose-right-industrial-overlock",
    excerpt: "A practical guide to balancing stitch quality, throughput and machine durability.",
    content: "Industrial sewing decisions should match your production needs, fabric type and maintenance plan. This guide walks through the most common machine choices for garment factories and workshops.",
    coverImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    author: "Smart Apparel Solutions",
    publishedAt: "2026-09-11",
    tags: ["Overlock", "Factory"]
  },
  {
    id: "blog-2",
    title: "Three signs it is time to replace your sewing machine motor",
    slug: "replace-sewing-machine-motor",
    excerpt: "Unusual vibration, overheating and inconsistent stitch quality can point to motor wear.",
    content: "A reliable production line depends on smooth motor operation. If the needle drifts or the machine slows under heavier fabric, it may be time for a service check.",
    coverImage: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
    author: "Smart Apparel Solutions",
    publishedAt: "2026-08-29",
    tags: ["Service", "Maintenance"]
  },
  {
    id: "blog-3",
    title: "5 ways to improve productivity on a garment cutting line",
    slug: "improve-cutting-line-productivity",
    excerpt: "From layout planning to maintenance checks, a few adjustments can reduce waste and speed up output.",
    content: "Cutting rooms benefit from organised material handling and machine calibration. These practical upgrades help maintain accuracy while improving daily output.",
    coverImage: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    author: "Smart Apparel Solutions",
    publishedAt: "2026-07-18",
    tags: ["Cutting", "Productivity"]
  },
];
