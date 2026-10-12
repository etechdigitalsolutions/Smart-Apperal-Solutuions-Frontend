import Link from "next/link";

interface AdminPanelProps { title: string; description: string; children?: React.ReactNode; }

export default function AdminPanel({ title, description, children }: AdminPanelProps) {
  return <main className="admin-shell"><div className="container"><div className="dashboard-heading"><p className="eyebrow">Admin workspace</p><h1>{title}</h1><p>{description}</p></div><div className="dashboard-nav"><Link href="/admin/dashboard">Dashboard</Link><Link href="/admin/products">Products</Link><Link href="/admin/orders">Orders</Link><Link href="/admin/inventory">Inventory</Link><Link href="/admin/users">Users</Link><Link href="/admin/analytics">Analytics</Link><Link href="/admin/settings">Settings</Link></div>{children}</div></main>;
}
