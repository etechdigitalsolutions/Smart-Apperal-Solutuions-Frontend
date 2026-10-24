import Link from "next/link";

interface AccountPanelProps { title: string; description: string; children?: React.ReactNode; }

export default function AccountPanel({ title, description, children }: AccountPanelProps) {
  return <main className="dashboard-shell"><div className="container"><div className="dashboard-heading"><p className="eyebrow">Customer account</p><h1>{title}</h1><p>{description}</p></div><div className="dashboard-nav"><Link href="/account">Overview</Link><Link href="/account/orders">Orders</Link><Link href="/account/addresses">Addresses</Link><Link href="/account/profile">Profile</Link><Link href="/account/wishlist">Wishlist</Link><Link href="/account/settings">Settings</Link></div>{children}</div></main>;
}
