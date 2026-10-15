import Image from "next/image";
import Link from "next/link";

import config from "@/config";
import ProductCard from "@/components/storefront/products/ProductCard";
import { banners } from "@/data/banners";
import { blogPosts } from "@/data/blog";
import { brands } from "@/data/brands";
import { products } from "@/data/products";

const applications = [
  { title: "T-shirt & Knitwear", slug: "t-shirt-knitwear" },
  { title: "Trousers / Coats / Denim", slug: "trousers-coats-denim" },
  { title: "Shirts & Blouses", slug: "shirts-blouses" },
  { title: "Frocks & Skirts", slug: "frocks-skirts" },
  { title: "Underwear", slug: "underwear" },
  { title: "Bags & Purses", slug: "bags-purses" },
  { title: "Shoes", slug: "shoes" },
  { title: "Upholstery", slug: "upholstery" },
];

const trustItems = [
  "Island-wide delivery",
  "Koko 3× installments",
  "In-house technicians",
  "Genuine brands",
  "WhatsApp support",
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-banners">
          <div className="hero-card">
            <Image src={banners[0].image} alt={banners[0].title} fill sizes="100vw" />
            <div className="hero-overlay" />
            <div className="hero-copy">
              <h1>{banners[0].title}</h1>
              <p>{banners[0].subtitle}</p>
              <div className="hero-actions">
                <Link href={banners[0].href} className="btn btn-primary">{banners[0].cta}</Link>
                <Link href="/contact" className="btn btn-secondary">Get a Quotation</Link>
              </div>
            </div>
          </div>

          <div className="hero-promo">
            {banners.slice(1).map((banner) => (
              <div key={banner.id} className="promo-box">
                <Image src={banner.image} alt={banner.title} fill sizes="50vw" />
                <div className="promo-copy">
                  <h3>{banner.title}</h3>
                  <Link href={banner.href} className="btn btn-primary btn-small">{banner.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Pick your application</p>
              <h2>What do you make?</h2>
            </div>
          </div>

          <div className="app-card-grid">
            {applications.map((app) => (
              <Link key={app.slug} href={`/products?tag=${app.slug}`} className="app-card">
                <span className="app-card-icon">→</span>
                <div>
                  <strong>{app.title}</strong>
                </div>
              </Link>
            ))}
          </div>

          <div className="section-header section-header-spaced">
            <div>
              <p className="eyebrow">Simple process</p>
              <h3>Pick your application → See the operations → Get the right machine</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Top sellers</h2>
            <Link href="/products" className="link-arrow">View all</Link>
          </div>
          <div className="product-grid">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>අඩුම මිල Guaranteed 🔥</h2>
            <Link href="/products" className="link-arrow">View all</Link>
          </div>
          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={`guaranteed-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Production Optimizers 📈</h2>
            <Link href="/products" className="link-arrow">View all</Link>
          </div>
          <div className="product-grid">
            {products.slice(4, 8).map((product) => (
              <ProductCard key={`optimizer-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Sewing Starts Here</h2>
            <Link href="/categories" className="link-arrow">Browse categories</Link>
          </div>
          <div className="category-grid category-grid-one">
            {[
              ["Sewing Machines", "/products?category=sewing-machines"],
              ["Spare Parts", "/products?category=spare-parts"],
              ["Needles", "/products?category=needles"],
              ["Accessories", "/products?category=accessories"],
              ["Ironing", "/products?category=ironing-finishing"],
            ].map(([title, href]) => (
              <Link key={title} href={href} className="promo-box category-tile">
                <Image src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80" alt={title} fill sizes="(max-width: 640px) 100vw, 20vw" />
                <div className="promo-copy">
                  <h3>{title}</h3>
                  <span className="link-arrow">View collection</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by demanding workshops</h2>
          </div>
          <div className="app-card-grid">
            {trustItems.map((item) => (
              <div key={item} className="app-card">
                <span className="app-card-icon">✓</span>
                <div><strong>{item}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Top brands</h2>
          </div>
          <div className="brand-grid brand-grid-six">
            {brands.map((brand) => (
              <div key={brand.id} className="app-card brand-card">
                <strong>{brand.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Guides & News</h2>
            <Link href="/blog" className="link-arrow">Read more</Link>
          </div>
          <div className="product-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="product-card">
                <div className="product-media">
                  <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="product-body">
                  <p className="product-brand">{new Date(post.publishedAt).toLocaleDateString("en-LK")}</p>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="link-arrow">Read article</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Why customers choose us</h2>
          </div>
          <div className="proof-grid proof-grid-four">
            <div className="app-card"><div><strong>4.9/5 Google rating</strong><p>Based on verified customer reviews.</p></div></div>
            <div className="app-card"><div><strong>3,500+</strong><p>Machines supplied across Sri Lanka.</p></div></div>
            <div className="app-card"><div><strong>36 hrs</strong><p>Average response from our service desk.</p></div></div>
            <div className="app-card"><div><strong>1k+</strong><p>Genuine spare part orders fulfilled.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Visit our showroom</h2>
          </div>
          <div className="product-grid showroom-grid">
            <div className="page-card map-placeholder">
              <p>Map placeholder</p>
            </div>
            <div className="page-card">
              <p><strong>Smart Apparel Solutions</strong></p>
              <p>No. 125, Galle Road, Colombo 03, Sri Lanka</p>
              <p>Mon–Sat: 9:00 AM – 7:00 PM</p>
              <p>{config.phone}</p>
              <Link href="/contact" className="btn btn-primary">Book a visit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
