interface Props {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: Props) {
  return <div>Product: {params.slug}</div>;
}
