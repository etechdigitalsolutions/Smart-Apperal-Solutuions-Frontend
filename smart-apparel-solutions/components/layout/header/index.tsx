"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";

import config from "@/config";
import { navigation } from "@/data/navigation";
import { products } from "@/data/products";
import MegaMenu, { AllCategoriesTrigger, MobileMegaMenu } from "./MegaMenu";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
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
  const { wishlist } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [allCategoriesOpen, setAllCategoriesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const isNavItemActive = (slug: string) => {
    if (slug === "equipment") return pathname === "/products";
    if (slug === "brands") return false;
    return pathname.includes(slug);
  };

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];
    return products
      .filter((product) => `${product.name} ${product.brand} ${product.modelCode}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 4);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
        setOpenNav(null);
        setAllCategoriesOpen(false);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setSearchOpen(false);
      if (navigationRef.current && !navigationRef.current.contains(event.target as Node)) setOpenNav(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId: number | null = null;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 8 || currentScrollY < lastScrollY - 8) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY + 12 && !mobileOpen && !searchOpen) {
        setIsHidden(true);
      }

      lastScrollY = currentScrollY;
      frameId = null;
    };

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [mobileOpen, searchOpen]);

  return (
    <header id="top" className={`site-header${isHidden ? " is-hidden" : ""}`}>
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <span>{config.announcement}</span>
          <Link href={config.whatsappUrl} target="_blank" rel="noreferrer">
            <span className="header-whatsapp-link"><Image src="/images/social/whatsapp.png" alt="" width={15} height={15} /> WhatsApp</span>
          </Link>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-inner">
          <Link href="/" className="brand-mark" aria-label="Smart Apparel Solutions home">
            <Image src="/images/logo/smart-apperal-logo.png" alt="Smart Apparel Solutions" width={142} height={68} priority />
          </Link>

          <div className="header-search-wrap" ref={searchRef}>
            <form className="header-search" action="/search" method="get" onSubmit={() => setSearchOpen(false)}>
              <span className="header-search-icon" aria-hidden="true"><Search size={21} strokeWidth={2.25} /></span>
              <input type="search" name="q" value={query} onFocus={() => setSearchOpen(true)} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }} placeholder="Search machines, parts and brands" aria-label="Search products" />
            </form>
            <AnimatePresence>
              {searchOpen && query.trim() ? (
                <motion.div className="search-suggestions" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} role="listbox">
                  {suggestions.length ? suggestions.map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="search-suggestion" onClick={() => setSearchOpen(false)}>
                      <span><strong>{product.name}</strong><small>{product.brand} · {product.modelCode}</small></span>
                      <b>{formatCurrency(product.price)}</b>
                    </Link>
                  )) : <p className="search-empty">No products found. Try a brand or model number.</p>}
                  <Link href={`/search?q=${encodeURIComponent(query)}`} className="search-view-all" onClick={() => setSearchOpen(false)}>View all results <span>↗</span></Link>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="header-meta">
            <Link href={`tel:${config.phone.replace(/\s+/g, "")}`} className="header-meta-link">
              <span aria-hidden="true"></span>
              <strong>{config.phone}</strong>
            </Link>
            <Link href="/login" className="header-action header-icon-action" aria-label="Account"><UserRound size={18} /><span>Account</span></Link>
            <Link href="/account/wishlist" className="header-action">
              <Heart size={18} aria-hidden="true" /><span className="header-action-label">Wishlist</span>
              <span className="header-badge">{wishlist.length}</span>
            </Link>
            <Link href="/cart" className="header-action">
              <ShoppingBag size={18} aria-hidden="true" /><span className="header-action-label">Cart</span>
              <span className="header-badge">{itemCount}</span>
              <strong className="header-cart-total">{formatCurrency(subtotal)}</strong>
            </Link>
            <button type="button" className="header-action mobile-menu-trigger" onClick={() => { setIsHidden(false); setMobileOpen((value) => !value); }} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}<span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="mega-nav" aria-label="Main navigation" ref={navigationRef}>
        <div className="container mega-nav-inner">
          <div className="all-categories-nav-item" onMouseEnter={() => setAllCategoriesOpen(true)} onMouseLeave={() => setAllCategoriesOpen(false)}>
            <AllCategoriesTrigger open={allCategoriesOpen} onToggle={() => setAllCategoriesOpen((value) => !value)} />
            <MegaMenu open={allCategoriesOpen} onClose={() => setAllCategoriesOpen(false)} pathname={pathname} />
          </div>
          {navigation.map((item) => (
            <div key={item.slug} className={`nav-item${openNav === item.slug ? " is-open" : ""}`}>
              <div className="nav-item-link">
                <Link href={item.href ?? `/products?category=${item.slug}`} className={isNavItemActive(item.slug) ? "is-active" : ""}>{item.label}</Link>
                {item.children?.length ? (
                  <button
                    type="button"
                    className="nav-item-toggle"
                    aria-label={`${openNav === item.slug ? "Close" : "Open"} ${item.label} menu`}
                    aria-expanded={openNav === item.slug}
                    aria-haspopup="menu"
                    onClick={() => setOpenNav((value) => value === item.slug ? null : item.slug)}
                  >
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
              {item.children && item.children.length > 0 ? (
                <div className="mega-panel" aria-label={`${item.label} menu`}>
                  <div className="mega-panel-intro">
                    <span className="mega-panel-kicker">Explore</span>
                    <strong>{item.label}</strong>
                    <Link href={item.href ?? `/products?category=${item.slug}`}>View all <span aria-hidden="true">↗</span></Link>
                  </div>
                  <div className="mega-panel-links" role="menu">
                    {item.children.map((child) => (
                      <Link key={child.slug} href={child.href ?? `/products?tag=${child.slug}`} className={pathname.includes(child.slug) ? "is-active" : ""} role="menuitem" onClick={() => setOpenNav(null)}>
                        <span>{child.label}</span><span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </nav>

      <AnimatePresence>
      {mobileOpen ? (
        <>
          <motion.button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="mobile-menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }}>
          <div className="mobile-menu-header">
            <span>Menu</span>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu"><X size={20} /></button>
          </div>
          <MobileMegaMenu openGroup={mobileCategoryOpen} onToggle={(slug) => setMobileCategoryOpen((value) => value === slug ? null : slug)} onClose={() => setMobileOpen(false)} />
          {navigation.filter((item) => item.slug === "services-support" || item.slug === "company").map((item) => (
            <div key={item.slug} className="mobile-menu-group">
              <div className="mobile-menu-heading"><Link href={item.href ?? `/products?category=${item.slug}`} onClick={() => setMobileOpen(false)}>{item.label}</Link>{item.children?.length ? <button type="button" aria-label={`Expand ${item.label}`} aria-expanded={expandedMobile === item.slug} onClick={() => setExpandedMobile((value) => value === item.slug ? null : item.slug)}><ChevronDown size={17} /></button> : null}</div>
              <AnimatePresence>{expandedMobile === item.slug ? <motion.div className="mobile-menu-children" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{item.children?.map((child) => <Link key={child.slug} href={child.href ?? `/products?tag=${child.slug}`} onClick={() => setMobileOpen(false)} className="mobile-menu-subitem">{child.label}</Link>)}</motion.div> : null}</AnimatePresence>
            </div>
          ))}
          <div className="mobile-menu-secondary">
            <Link href="/login" onClick={() => setMobileOpen(false)}>Account</Link>
            {secondaryLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</Link>)}
          </div>
          </motion.div>
        </>
      ) : null}
      </AnimatePresence>
    </header>
  );
}
