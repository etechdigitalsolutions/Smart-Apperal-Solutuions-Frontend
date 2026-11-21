import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return <main className="page-shell"><div className="container"><div className="page-heading"><p className="eyebrow">Guides & news</p><h1>Useful knowledge for busy workshops</h1><p>Practical guidance on machine selection, maintenance and production planning.</p></div><div className="blog-grid">{blogPosts.map((post) => <article key={post.id} className="product-card"><div className="product-media"><Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="product-body"><p className="product-brand">{post.author} · {post.publishedAt}</p><h2>{post.title}</h2><p>{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="link-arrow">Read guide</Link></div></article>)}</div></div></main>;
}
