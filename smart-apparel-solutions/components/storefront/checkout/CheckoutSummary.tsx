"use client";

import Image from "next/image";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";

export default function CheckoutSummary() {
  const { items, itemCount, subtotal } = useCart();

  // Savings come from real product data: comparePrice vs price.
  const savings = items.reduce((sum, item) => {
    const compare = item.product.comparePrice ?? 0;
    return compare > item.product.price
      ? sum + (compare - item.product.price) * item.quantity
      : sum;
  }, 0);

  return (
    <section className="co-summary" aria-label="Order summary">
      <ul className="co-items">
        {items.map((item) => {
          const { product } = item;
          const lineTotal = product.price * item.quantity;
          const compare = product.comparePrice ?? 0;
          const onSale = compare > product.price;

          return (
            <li
              key={`${item.productId}-${item.size ?? ""}-${item.color ?? ""}`}
              className="co-item"
            >
              <div className="co-thumb">
                <div className="co-thumb-img">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="64px"
                    />
                  ) : null}
                </div>
                <span className="co-qty" aria-label={`Quantity ${item.quantity}`}>
                  {item.quantity}
                </span>
              </div>

              <div className="co-item-info">
                <p className="co-item-name">{product.name}</p>
                {(item.size || item.color) && (
                  <p className="co-item-meta">
                    {[item.size, item.color].filter(Boolean).join(" / ")}
                  </p>
                )}
              </div>

              <div className="co-item-price">
                {onSale && (
                  <s>{formatCurrency(compare * item.quantity)}</s>
                )}
                <span>{formatCurrency(lineTotal)}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="co-totals">
        <div className="co-row">
          <span>
            Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="co-row co-row-muted">
          <span>Shipping</span>
          <span>Confirmed by our sales team</span>
        </div>

        <div className="co-row co-row-total">
          <strong>Total</strong>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>

        {savings > 0 && (
          <p className="co-savings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="8" r="1.4" fill="currentColor" />
            </svg>
            Total savings {formatCurrency(savings)}
          </p>
        )}
      </div>
    </section>
  );
}