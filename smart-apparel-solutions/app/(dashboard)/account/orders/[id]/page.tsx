import Link from "next/link";
import AccountPanel from "@/components/account/AccountPanel";
interface Props { params: Promise<{ id: string }>; }
export default async function OrderDetailPage({ params }: Props) { const { id } = await params; return <AccountPanel title={`Order ${id}`} description="Your quotation and delivery status."><div className="page-card order-detail-card"><span className="status-pill">Quotation in progress</span><h2>Our team is checking stock</h2><p>We will confirm delivery and payment options by phone or WhatsApp.</p><Link href="/contact" className="btn btn-primary">Contact support</Link></div></AccountPanel>; }
