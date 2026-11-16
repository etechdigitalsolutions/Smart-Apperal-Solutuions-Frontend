
"use client";

import Image from "next/image";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";

interface CheckoutSummaryProps {
  promoInput: string;
  appliedPromoCode: string;
  discount: number;
  promoMessage: string;
  promoMessageType: "success" | "error" | "";
  onPromoInputChange: (value: string) => void;
  onApplyPromo: () => void;
  onRemovePromo: () => void;
}

export default function CheckoutSummary({
  promoInput,
  appliedPromoCode,
  discount,
  promoMessage,
  promoMessageType,
  onPromoInputChange,
  onApplyPromo,
  onRemovePromo,
}: CheckoutSummaryProps) {
  const { items, itemCount, subtotal } = useCart();

  const savings = items.reduce((sum, item) => {
    const compare = item.product.comparePrice ?? 0;
    return compare > item.product.price
      ? sum + (compare - item.product.price) * item.quantity
      : sum;
  }, 0);

  const finalTotal = Math.max(0, subtotal - discount);

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
                {onSale && <s>{formatCurrency(compare * item.quantity)}</s>}
                <span>{formatCurrency(lineTotal)}</span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Promo code */}
      <div className="co-promo">
        <label htmlFor="checkout-promo-code" className="co-promo-label">
          Promo code
        </label>

        <div className="co-promo-controls">
          <input
            id="checkout-promo-code"
            type="text"
            value={promoInput}
            onChange={(event) => onPromoInputChange(event.target.value)}
            placeholder="Enter promo code"
            maxLength={30}
            disabled={Boolean(appliedPromoCode)}
          />

          {appliedPromoCode ? (
            <button type="button" onClick={onRemovePromo}>
              Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={onApplyPromo}
              disabled={!promoInput.trim()}
            >
              Apply
            </button>
          )}
        </div>

        {promoMessage && (
          <p
            className={`co-promo-message ${
              promoMessageType === "success" ? "is-success" : "is-error"
            }`}
            role="status"
            aria-live="polite"
          >
            {promoMessage}
          </p>
        )}
      </div>

      <div className="co-totals">
        <div className="co-row">
          <span>
            Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="co-row co-promo-discount">
            <span>Promo discount ({appliedPromoCode})</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="co-row co-row-muted">
          <span>Shipping</span>
          <span>Confirmed by our sales team</span>
        </div>

        <div className="co-row co-row-total">
          <strong>Total</strong>
          <strong>{formatCurrency(finalTotal)}</strong>
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
            Product savings {formatCurrency(savings)}
          </p>
        )}
      </div>
    </section>
  );
}
