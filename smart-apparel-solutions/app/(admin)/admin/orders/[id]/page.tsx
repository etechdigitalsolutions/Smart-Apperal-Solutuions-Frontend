import Link from "next/link";
import AdminPanel from "@/components/admin/AdminPanel";
interface Props { params: Promise<{ id: string }>; }
export default async function AdminOrderDetailPage({ params }: Props) { const { id } = await params; return <AdminPanel title={`Order ${id}`} description="Review quotation details and keep the customer updated."><div className="admin-two-column"><div className="page-card"><span className="status-pill">Checking stock</span><h2>Worlden W-918 Single Needle</h2><p>Quantity: 2 · Delivery: Colombo</p><strong>රු 236,000</strong></div><div className="page-card"><h2>Next action</h2><p>Confirm availability and contact the customer with a delivery window.</p><Link href="/contact" className="btn btn-primary">Open support channel</Link></div></div></AdminPanel>; }
