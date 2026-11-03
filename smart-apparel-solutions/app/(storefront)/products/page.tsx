"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/storefront/products/ProductCard";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

function ProductsCatalogue() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category") ?? "";
  const initialTag = searchParams.get("tag") ?? "";
  const [query, setQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const haystack = `${product.name} ${product.brand} ${product.modelCode} ${product.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !query && !initialTag || haystack.includes(query.toLowerCase()) || product.tags.includes(initialTag);
      const matchesCategory = !category || product.category.toLowerCase().replaceAll(" ", "-") === category || category === "sewing-machines" && product.category === "Sewing Machines";
      const matchesBrand = !brand || product.brand === brand;
      const matchesAvailability = availability === "all" || product.stockStatus === availability;
      return matchesQuery && matchesCategory && matchesBrand && matchesAvailability;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return a.id.localeCompare(b.id);
    });
  }, [availability, brand, category, initialTag, query, sort]);

  return (
    <main className="page-shell">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Industrial equipment catalogue</p>
          <h1>Machines, parts & workshop essentials</h1>
          <p>Compare production-ready equipment, filter by application, and request help choosing the right setup.</p>
        </div>
        <div className="catalog-layout">
          <aside className="filter-panel">
            <div className="filter-heading"><strong>Filter catalogue</strong><button type="button" onClick={() => { setQuery(""); setCategory(""); setBrand(""); setAvailability("all"); }}>Reset</button></div>
            <label>Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Model, brand or use" /></label>
            <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
            <label>Brand<select value={brand} onChange={(event) => setBrand(event.target.value)}><option value="">All brands</option>{brands.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label>
            <label>Availability<select value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="all">All stock states</option><option value="in_stock">In stock</option><option value="pre_order">Pre-order</option><option value="out_of_stock">Out of stock</option></select></label>
            <div className="filter-note"><strong>Need a recommendation?</strong><p>Send us your fabric, operation and daily output. We will suggest a practical machine setup.</p><a href="/contact" className="link-arrow">Talk to a specialist</a></div>
          </aside>
          <section className="catalog-results">
            <div className="catalog-toolbar"><p><strong>{filteredProducts.length}</strong> products</p><label className="sort-control">Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
            {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>No matching products</h2><p>Try a different model, category or stock filter.</p></div>}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return <Suspense fallback={<main className="page-shell"><div className="container"><div className="empty-state"><p>Loading catalogue...</p></div></div></main>}><ProductsCatalogue /></Suspense>;
}
