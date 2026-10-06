interface Props {
  params: { slug: string };
}

export default function BlogPostPage({ params }: Props) {
  return <div>Blog Post: {params.slug}</div>;
}
