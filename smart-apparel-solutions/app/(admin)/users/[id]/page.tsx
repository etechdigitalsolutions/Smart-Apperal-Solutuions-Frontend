interface Props {
  params: { id: string };
}

export default function AdminUserDetailPage({ params }: Props) {
  return <div>Admin User: {params.id}</div>;
}
