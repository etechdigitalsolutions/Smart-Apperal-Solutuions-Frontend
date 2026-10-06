interface Props {
  params: { slug: string };
}

export default function CategoryPage({ params }: Props) {
  return <div>Category: {params.slug}</div>;
}
