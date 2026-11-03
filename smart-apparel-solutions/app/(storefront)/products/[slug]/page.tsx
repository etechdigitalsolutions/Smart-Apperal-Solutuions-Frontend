import { notFound } from "next/navigation";

import ProductDetailPanel from "@/components/storefront/products/ProductDetailPanel";
import { products } from "@/data/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  return <ProductDetailPanel product={product} />;
}
