"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Plus } from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { formatCurrency } from "@/lib/utils/helpers";
import { formatKokoInstallment } from "@/lib/utils/koko";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stockStatus === "out_of_stock";
  const { addItem } = useCart();
  const { wishlist, toggle } = useWishlist();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <div className="product-media">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.images[1] ? (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="product-image-alt"
            />
          ) : null}
        </Link>

        <div className="product-badges">
          {product.badges.map((badge) => (
            <span key={badge} className={badge.includes("%") ? "badge badge-sale" : badge === "Out of Stock" ? "badge badge-soldout" : "badge badge-new"}>
              {badge}
            </span>
          ))}
        </div>

        <motion.button type="button" whileTap={{ scale: 0.88 }} className={`product-favorite ${isWishlisted ? "is-wishlisted" : ""}`} aria-label={`${isWishlisted ? "Remove" : "Save"} ${product.name}`} onClick={() => toggle(product.id)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={isWishlisted ? "saved" : "empty"} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
              <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} />
            </motion.span>
          </AnimatePresence>
          <span className="sr-only">{isWishlisted ? "Saved" : "Save"}</span>
        </motion.button>
      </div>

      <div className="product-body">
        <p className="product-brand">{product.brand}</p>
        <h3>{product.name}</h3>

        <div className="product-pricing">
          {product.comparePrice ? <span className="strike">{formatCurrency(product.comparePrice)}</span> : null}
          <strong>{formatCurrency(product.price)}</strong>
        </div>

        
          <div className="product-installment">
            <span>{formatKokoInstallment(product.price)}</span>

            <a
              href={`https://paykoko.com/customer-education?Amount=${(product.price / 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              target="_blank"
              rel="noopener noreferrer"
              className="koko-link"
              aria-label="Learn more about Koko installments"
            >
              <Image
                src="/images/payments/koko-logo.png"
                alt="Koko"
                width={38}
                height={18}
                className="koko-logo"
              />
            </a>

            <a
              href={`https://paykoko.com/customer-education?Amount=${(product.price / 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              target="_blank"
              rel="noopener noreferrer"
              className="koko-link"
              aria-label="Koko payment information"
            >
              <span className="koko-info-icon" aria-hidden="true">i</span>
            </a>
          </div>


        <div className="product-stock">
          <span className={`stock-dot ${product.stockStatus}`} aria-hidden="true" />
          {product.stockStatus === "in_stock" ? "In stock" : product.stockStatus === "pre_order" ? "Pre-order" : "Out of stock"}
        </div>

        <div className="product-actions">
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            className="btn btn-primary btn-small"
            disabled={isOutOfStock}
            onClick={() => addItem({ productId: product.id, product, quantity: 1 })}
          >{isOutOfStock ? "View details" : <><Plus size={15} /> Add to cart</>}</motion.button>
          <Link href={`/products/${product.slug}`} className="btn btn-small-outline btn-small">
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
