"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product } = item;

  const lineTotal = product.price * item.quantity;
  const atMin = item.quantity <= 1;
  const atMax = item.quantity >= product.stock;

  const handleDecrease = () => {
    if (atMin) return;
    updateQuantity(item.productId, item.quantity - 1, item.size, item.color);
  };

  const handleIncrease = () => {
    if (atMax) return;
    updateQuantity(item.productId, item.quantity + 1, item.size, item.color);
  };

  return (
    <article className="cart-item">
      <Link
        href={`/products/${product.slug}`}
        className="cart-item-media"
        aria-label={product.name}
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 96px, 140px"
          />
        ) : null}
      </Link>

      <div className="cart-item-info">
        <div className="cart-item-top">
          <div>
            <p className="cart-item-brand">{product.brand}</p>
            <h3 className="cart-item-name">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
          </div>

          <strong className="cart-item-total">{formatCurrency(lineTotal)}</strong>
        </div>

        <div className="cart-item-meta">
          {item.size && <p>Size: {item.size}</p>}
          {item.color && <p>Color: {item.color}</p>}
        </div>

        <strong className="cart-item-price">{formatCurrency(product.price)}</strong>

        <div className="cart-item-controls">
          <div className="qty-stepper">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={atMin}
              aria-label={`Decrease quantity of ${product.name}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <span aria-live="polite">{item.quantity}</span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={atMax}
              aria-label={`Increase quantity of ${product.name}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            className="cart-item-remove"
            onClick={() => removeItem(item.productId, item.size, item.color)}
            aria-label={`Remove ${product.name} from cart`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}