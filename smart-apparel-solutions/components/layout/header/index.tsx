"use client";

import Link from "next/link";
import { useState } from "react";

import config from "@/config";
import { navigation } from "@/data/navigation";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";

const secondaryLinks = [
  { label: "මහමු (Mahamu)", href: "/mahamu" },
  { label: "Installments", href: "/installments" },
  { label: "Services & Repair", href: "/services-repair" },
  { label: "News / Blog", href: "/blog" },
  { label: "Track Order", href: "/track-order" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { itemCount, subtotal } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <span>{config.announcement}</span>
          <Link href={config.whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </Link>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-inner">
          <Link href="/" className="brand-mark" aria-label="Smart Apparel Solutions home">
            <span className="brand-mark-badge">S</span>
            <span className="brand-copy">
              <span>Smart Apparel</span>
              <small>Solutions</small>
            </span>
          </Link>

          <form className="header-search" action="/search" method="get">
            <input type="search" name="q" placeholder="Search machines, parts and brands" aria-label="Search products" />
            <select name="category" aria-label="Search category">
              <option value="all">All</option>
              <option value="machines">Machines</option>
              <option value="spare-parts">Spare Parts</option>
              <option value="needles">Needles</option>
              <option value="accessories">Accessories</option>
            </select>
          </form>

          <div className="header-meta">
            <Link href={`tel:${config.phone.replace(/\s+/g, "")}`} className="header-meta-link">
              <span>☎</span>
              <strong>{config.phone}</strong>
            </Link>
            <Link href={config.whatsappUrl} target="_blank" rel="noreferrer" className="header-meta-link">
              WhatsApp
            </Link>
            <Link href="/login" className="header-action">Login</Link>
            <Link href="/cart" className="header-action">
              <span>Wishlist</span>
              <span className="header-badge">{0}</span>
            </Link>
            <Link href="/cart" className="header-action">
              <span>Cart</span>
              <span className="header-badge">{itemCount}</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </Link>
            <button type="button" className="header-action" onClick={() => setMobileOpen((value) => !value)} aria-label="Open menu">
              Menu
            </button>
          </div>
        </div>
      </div>

      <nav className="mega-nav" aria-label="Main navigation">
        <div className="container mega-nav-inner">
          {navigation.map((item) => (
            <div key={item.slug} className="nav-item">
              <Link href={`/products?category=${item.slug}`}>{item.label}</Link>
              {item.children && item.children.length > 0 ? (
                <div className="mega-panel" aria-label={`${item.label} menu`}>
                  {item.children.slice(0, 4).map((child) => (
                    <div key={child.slug} className="mega-column">
                      <h4>{child.label}</h4>
                      {item.children && item.children.slice(0, 4).map((nested) => (
                        <Link key={nested.slug} href={`/products?tag=${nested.slug}`}>
                          {nested.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </nav>

      <div className="secondary-links">
        <div className="container secondary-links-inner">
          {secondaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>
      </div>

      {mobileOpen ? (
        <div className="mobile-menu">
          {navigation.map((item) => (
            <div key={item.slug} className="mobile-menu-group">
              <Link href={`/products?category=${item.slug}`} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
              {item.children?.slice(0, 4).map((child) => (
                <Link key={child.slug} href={`/products?tag=${child.slug}`} onClick={() => setMobileOpen(false)} className="mobile-menu-subitem">
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </header>
  );
}
