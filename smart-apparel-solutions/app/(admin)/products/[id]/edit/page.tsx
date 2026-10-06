interface Props {
  params: { id: string };
}

export default function EditProductPage({ params }: Props) {
  return <div>Edit Product: {params.id}</div>;
}
