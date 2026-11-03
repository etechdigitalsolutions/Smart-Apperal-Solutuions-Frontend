import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";

interface Props { params: Promise<{ slug: string }>; }
export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return <main className="page-shell"><article className="container article-content"><p className="eyebrow">{post.author} · {post.publishedAt}</p><h1>{post.title}</h1><p className="article-lede">{post.excerpt}</p><div className="article-image"><Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 900px) 100vw, 900px" /></div><div className="article-copy"><p>{post.content}</p><p>For practical advice specific to your operation, share your machine type and fabric with our team. We can help you compare the next step.</p></div></article></main>;
}
