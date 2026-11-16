"use client";

import Link from "next/link";
import { useState } from "react";
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
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  function toggleGroup(slug: string) {
    setExpandedGroup((current) => (current === slug ? null : slug));
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="mega-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          role="menu"
          aria-label="All product categories"
        >
          <div className="mega-menu-inner">
            {megaMenuGroups.map((group) => {
              const isExpanded = expandedGroup === group.label;

              return (
                <section
                  className={`mega-menu-group mega-menu-group-${group.slug}${
                    isExpanded ? " is-expanded" : ""
                  }`}
                  key={group.label}
                >
                  <div className="mega-menu-heading">
                    <Link
                      href={categoryHref(group.slug)}
                      className={
                        pathname.includes(group.slug) ? "is-active" : ""
                      }
                      onClick={onClose}
                    >
                      {group.label}
                    </Link>

                    <button
                      type="button"
                      className="mega-menu-expand"
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.label}`}
                      aria-expanded={isExpanded}
                      onClick={() => toggleGroup(group.label)}
                    >
                      <ChevronDown
                        size={17}
                        className={isExpanded ? "is-rotated" : ""}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className="mega-menu-links"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {group.items.map((item) => (
                          <Link
                            key={item.slug}
                            href={itemHref(group, item.slug)}
                            onClick={onClose}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}



export function MobileMegaMenu({
  openGroup,
  onToggle,
  onClose,
}: {
  openGroup: string | null;
  onToggle: (slug: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="mobile-category-menu">
      <div className="mobile-category-title">
        <LayoutGrid size={17} aria-hidden="true" />
        <strong>All Categories</strong>
      </div>

      {megaMenuGroups.map((group) => {
        const isExpanded = openGroup === group.label;

        return (
          <div
            className="mobile-menu-group mobile-category-group"
            key={group.label}
          >
            <div className="mobile-menu-heading">
              <Link href={categoryHref(group.slug)} onClick={onClose}>
                {group.label}
              </Link>

              <button
                type="button"
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.label}`}
                aria-expanded={isExpanded}
                onClick={() => onToggle(group.label)}
              >
                <ChevronDown
                  size={17}
                  className={isExpanded ? "is-rotated" : ""}
                />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  className="mobile-menu-children"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={itemHref(group, item.slug)}
                      onClick={onClose}
                      className="mobile-menu-subitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

