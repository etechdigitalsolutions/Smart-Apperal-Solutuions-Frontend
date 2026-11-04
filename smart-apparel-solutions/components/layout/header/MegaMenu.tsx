"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, LayoutGrid } from "lucide-react";

import { megaMenuGroups, type MegaMenuGroup } from "@/data/mega-menu";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

type AllCategoriesTriggerProps = {
  open: boolean;
  onToggle: () => void;
};

const categoryHref = (slug: string) => `/products?category=${encodeURIComponent(slug)}`;
const itemHref = (group: MegaMenuGroup, slug: string) => `/products?category=${encodeURIComponent(group.slug)}&tag=${encodeURIComponent(slug)}`;

export function AllCategoriesTrigger({ open, onToggle }: AllCategoriesTriggerProps) {
  return (
    <button type="button" className={`all-categories-trigger${open ? " is-open" : ""}`} onClick={onToggle} aria-expanded={open} aria-haspopup="true">
      <LayoutGrid size={17} aria-hidden="true" />
      <span>All Categories</span>
      <ChevronDown size={15} aria-hidden="true" />
    </button>
  );
}

export default function MegaMenu({ open, onClose, pathname }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="mega-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          onMouseEnter={() => undefined}
          role="menu"
          aria-label="All product categories"
        >
          <div className="mega-menu-inner">
            {megaMenuGroups.map((group) => (
              <section className={`mega-menu-group mega-menu-group-${group.slug}`} key={group.label}>
                <Link href={categoryHref(group.slug)} className={`mega-menu-heading${pathname.includes(group.slug) ? " is-active" : ""}`} onClick={onClose}>
                  <span>{group.label}</span><span aria-hidden="true">↗</span>
                </Link>
                <div className="mega-menu-links">
                  {group.items.map((item) => (
                    <Link key={item.slug} href={itemHref(group, item.slug)} onClick={onClose} role="menuitem">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function MobileMegaMenu({ openGroup, onToggle, onClose }: { openGroup: string | null; onToggle: (slug: string) => void; onClose: () => void }) {
  return (
    <div className="mobile-category-menu">
      <div className="mobile-category-title"><LayoutGrid size={17} aria-hidden="true" /><strong>All Categories</strong></div>
      {megaMenuGroups.map((group) => (
        <div className="mobile-menu-group mobile-category-group" key={group.label}>
          <div className="mobile-menu-heading">
            <Link href={categoryHref(group.slug)} onClick={onClose}>{group.label}</Link>
            <button type="button" aria-label={`${openGroup === group.slug ? "Collapse" : "Expand"} ${group.label}`} aria-expanded={openGroup === group.slug} onClick={() => onToggle(group.slug)}>
              <ChevronDown size={17} aria-hidden="true" />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {openGroup === group.slug ? (
              <motion.div className="mobile-menu-children" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                {group.items.map((item) => <Link key={item.slug} href={itemHref(group, item.slug)} onClick={onClose} className="mobile-menu-subitem">{item.label}</Link>)}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
