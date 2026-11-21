import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/storefront/products/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import Image from "next/image";

interface Props { params: Promise<{ slug: string }>; }
export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })); }

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const categoryProducts = products.filter((product) => product.category.toLowerCase().replaceAll(" ", "-") === slug || slug === "sewing-machines" && product.category === "Sewing Machines" || product.tags.includes(slug));
  const fallbackImage = categoryProducts[0]?.images[0] ?? "/images/products/jack_f5.jpg";
  const bannerImage = category.image ?? fallbackImage;
  return (
    <main className="page-shell">
      <div className="container">
        <section className="category-banner">
          <Image src={bannerImage} alt="" fill sizes="(max-width: 768px) 100vw, 1320px" priority />
          <span className="category-banner-overlay" />
          <div>
            <p className="eyebrow">Category collection</p>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </section>
        <div className="category-detail-layout"><aside className="page-card category-aside"><strong>Explore this family</strong>{category.children?.map((child) => <Link key={child.slug} href={`/products?tag=${child.slug}`}>{child.name}</Link>)}<Link href="/contact" className="link-arrow">Need a recommendation?</Link></aside><section><div className="catalog-toolbar"><p><strong>{categoryProducts.length}</strong> products</p><Link href="/products" className="link-arrow">View all equipment</Link></div>{categoryProducts.length ? <div className="product-grid">{categoryProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>More equipment is coming</h2><p>Talk to our team for a sourcing recommendation.</p></div>}</section></div>
      </div>
    </main>
  );
}
