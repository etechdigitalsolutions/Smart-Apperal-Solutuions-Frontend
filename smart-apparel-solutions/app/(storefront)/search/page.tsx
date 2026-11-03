"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/storefront/products/ProductCard";
import { products } from "@/data/products";

function SearchResults() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const matches = useMemo(() => { const normalized = query.trim().toLowerCase(); if (!normalized) return []; return products.filter((product) => `${product.name} ${product.brand} ${product.modelCode} ${product.tags.join(" ")}`.toLowerCase().includes(normalized)); }, [query]);
  return <main className="page-shell"><div className="container"><div className="page-heading"><p className="eyebrow">Search the catalogue</p><h1>Find your next machine</h1><div className="search-page-form"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by model, brand or operation" /><button className="btn btn-primary" type="button">Search</button></div></div>{query ? <><div className="catalog-toolbar"><p><strong>{matches.length}</strong> results for &quot;{query}&quot;</p></div>{matches.length ? <div className="product-grid">{matches.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>No results yet</h2><p>Try a broader machine type such as overlock, denim or buttonhole.</p></div>}</> : <div className="search-suggestions"><h2>Popular searches</h2><div className="suggestion-list">{["overlock", "heavy-duty", "denim", "button-hole", "finishing"].map((suggestion) => <button key={suggestion} type="button" onClick={() => setQuery(suggestion)}>{suggestion}</button>)}</div></div>}</div></main>;
}

export default function SearchPage() {
  return <Suspense fallback={<main className="page-shell"><div className="container"><div className="empty-state"><p>Loading search...</p></div></div></main>}><SearchResults /></Suspense>;
}
