import Link from "next/link";
import AccountPanel from "@/components/account/AccountPanel";
export default function WishlistPage() { return <AccountPanel title="Saved equipment" description="Your shortlist for the next workshop upgrade."><div className="page-card empty-state"><h2>Your shortlist is empty</h2><p>Save machines while you compare specifications and pricing.</p><Link href="/products" className="btn btn-primary">Browse equipment</Link></div></AccountPanel>; }
