import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return <main className="page-shell"><div className="container"><div className="page-heading"><p className="eyebrow">Browse by workflow</p><h1>Find the equipment for your operation</h1><p>From first stitch to final finish, explore the machines, parts and tools used by modern workshops.</p></div><div className="category-directory">{categories.map((category) => <article key={category.id} className="page-card category-directory-card"><p className="eyebrow">{category.children?.length ? "Equipment family" : "Workshop essential"}</p><h2>{category.name}</h2><p>{category.description}</p><Link href={`/categories/${category.slug}`} className="link-arrow">Explore category</Link>{category.children?.length ? <div className="child-links">{category.children.map((child) => <Link key={child.slug} href={`/products?tag=${child.slug}`}>{child.name}</Link>)}</div> : null}</article>)}</div></div></main>;
}
