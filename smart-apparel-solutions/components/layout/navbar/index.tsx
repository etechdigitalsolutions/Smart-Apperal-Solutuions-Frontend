import Link from "next/link";

import { navigation } from "@/data/navigation";

export default function Navbar() {
  return <nav className="mega-nav" aria-label="Product navigation"><div className="container mega-nav-inner">{navigation.map((item) => <div key={item.slug} className="nav-item"><Link href={`/products?category=${item.slug}`}>{item.label}</Link>{item.children?.length ? <div className="mega-panel">{item.children.slice(0, 4).map((child) => <Link key={child.slug} href={`/products?tag=${child.slug}`}>{child.label}</Link>)}</div> : null}</div>)}</div></nav>;
}
