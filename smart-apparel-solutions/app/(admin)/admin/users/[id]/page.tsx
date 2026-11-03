import AdminPanel from "@/components/admin/AdminPanel";
interface Props { params: Promise<{ id: string }>; }
export default async function AdminUserDetailPage({ params }: Props) { const { id } = await params; return <AdminPanel title={`Customer ${id}`} description="Review contact details and account activity."><div className="page-card admin-user-detail"><h2>Customer profile</h2><p>No additional notes have been recorded for this customer.</p><button type="button" className="btn btn-primary">Add support note</button></div></AdminPanel>; }
