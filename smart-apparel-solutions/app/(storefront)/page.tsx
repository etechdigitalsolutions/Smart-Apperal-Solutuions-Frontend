import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/components/storefront/products/ProductCard";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

const applications = [
  { title: "Sewing & construction", copy: "Single needle, overlock and interlock systems.", tag: "sewing-machines" },
  { title: "Cutting & preparation", copy: "Tools that keep every cut accurate and efficient.", tag: "cutting" },
  { title: "Finishing & pressing", copy: "A polished finish for every production line.", tag: "ironing-finishing" },
  { title: "Embroidery & detail", copy: "Bring precision and personality to every piece.", tag: "embroidery" },
];

const categoryImages: Record<string, string> = {
  "sewing-machines": products[0].images[0],
  cutting: products[2].images[0],
  "ironing-finishing": products[4].images[0],
  embroidery: products[6].images[0],
  "spare-parts": products[7].images[0],
};

export default function HomePage() {
  const featureProducts = products.slice(0, 4);
  const collections = categories.filter((category) => categoryImages[category.slug]).slice(0, 5);

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">The workshop partner</p>
            <h1>Make more.<br /><em>Make it better.</em></h1>
            <p className="hero-lede">Industrial sewing, cutting and finishing equipment selected for the people who keep Sri Lanka&apos;s apparel industry moving.</p>
            <div className="hero-actions">
              <Link href="/products" className="btn btn-primary">Explore equipment <span>↗</span></Link>
              <Link href="/services-repair" className="text-link">Talk to a specialist <span>↗</span></Link>
            </div>
            <div className="hero-proof"><span>01</span><p>Trusted machines<br />for serious makers</p></div>
          </div>
          <div className="home-hero-image">
            <Image src={products[0].images[0]} alt="Industrial sewing equipment" fill priority sizes="(max-width: 900px) 100vw, 60vw" />
            <div className="hero-image-note"><span>01 / 03</span><strong>Built for<br />productive workshops.</strong></div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-strip-inner">
          <span>Genuine brands</span><span>Island-wide delivery</span><span>Technician support</span><span>Koko 3× installments</span>
        </div>
      </section>

      <section className="section home-section">
        <div className="container">
          <div className="section-intro"><div><p className="eyebrow">Find your fit</p><h2>What are you making?</h2></div><p>Start with the work you do. We&apos;ll help you find equipment that earns its place on the floor.</p></div>
          <div className="application-grid">
            {applications.map((application, index) => (
              <Link key={application.tag} href={`/products?category=${application.tag}`} className="application-card">
                <span className="application-number">0{index + 1}</span><div><h3>{application.title}</h3><p>{application.copy}</p></div><span className="card-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-section home-section-tint">
        <div className="container">
          <div className="section-header"><div><p className="eyebrow">Selected equipment</p><h2>Ready for the next run</h2></div><Link href="/products" className="text-link">Shop all products <span>↗</span></Link></div>
          <div className="product-grid">{featureProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="section home-section">
        <div className="container">
          <div className="section-intro"><div><p className="eyebrow">The right tools, together</p><h2>Build your line</h2></div><p>From first stitch to final press, explore the equipment families that make a complete workshop.</p></div>
          <div className="collection-grid">
            {collections.map((category) => <Link href={`/products?category=${category.slug}`} key={category.slug} className="collection-card"><Image src={categoryImages[category.slug]} alt="" fill sizes="(max-width: 640px) 100vw, 20vw" /><span className="collection-overlay" /><div><p>{category.description}</p><h3>{category.name}</h3><span className="text-link">View collection ↗</span></div></Link>)}
          </div>
        </div>
      </section>

      <section className="section service-callout">
        <div className="container service-callout-inner"><div><p className="eyebrow">More than a machine</p><h2>Keep production moving.</h2><p>Need a recommendation, installation, or a part that keeps a familiar machine running? Our team knows the work behind the work.</p></div><div className="service-actions"><Link href="/services-repair" className="btn btn-primary">Service & repair</Link><Link href="/contact" className="btn btn-light">Get a quotation</Link></div></div>
      </section>

      <section className="section home-section brand-section">
        <div className="container"><div className="section-header"><div><p className="eyebrow">Brands we stand behind</p><h2>Made to work hard</h2></div></div><div className="brand-grid">{brands.slice(0, 6).map((brand) => <div className="brand-wordmark" key={brand.id}>{brand.name}</div>)}</div></div>
      </section>
    </>
  );
}
