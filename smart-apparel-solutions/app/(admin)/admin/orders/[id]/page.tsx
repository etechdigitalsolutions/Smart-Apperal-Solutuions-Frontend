interface Props {
  params: { id: string };
}

export default function AdminOrderDetailPage({ params }: Props) {
  return <div>Admin Order: {params.id}</div>;
}
