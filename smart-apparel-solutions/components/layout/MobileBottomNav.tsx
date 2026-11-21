"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid2X2, Home, Search, ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const items = [
    { href: "/", label: t("home"), icon: Home, active: pathname === "/" },
    { href: "/categories", label: t("categories"), icon: Grid2X2, active: pathname.startsWith("/categories") || pathname.startsWith("/products") },
    { href: "/search", label: t("search"), icon: Search, active: pathname === "/search" },
    { href: "/cart", label: t("cart"), icon: ShoppingBag, active: pathname === "/cart" },
    { href: user ? "/account" : "/login", label: t("account"), icon: UserRound, active: pathname.startsWith("/account") || pathname === "/login" },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.map(({ href, label, icon: Icon, active }) => (
        <Link key={href} href={href} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined}>
          <span className="mobile-bottom-icon">
            <Icon size={21} strokeWidth={2} />
            {href === "/cart" && itemCount > 0 ? <b className="mobile-cart-badge">{itemCount}</b> : null}
          </span>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
