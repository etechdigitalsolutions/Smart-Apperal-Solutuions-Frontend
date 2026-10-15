"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";

export default function CartSummary() {
  const { subtotal } = useCart();
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");

  return (
    <aside className="cart-summary">
      <h2>Order summary</h2>

      <div className="cart-summary-section">
        <button
          type="button"
          className="cart-note-toggle"
          aria-expanded={noteOpen}
          aria-controls="cart-note"
          onClick={() => setNoteOpen((open) => !open)}
        >
          <span>Add order note</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={noteOpen ? "chevron open" : "chevron"}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {noteOpen && (
          <textarea
            id="cart-note"
            className="cart-note-input"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything we should know about your order?"
          />
        )}
      </div>

      <p className="cart-summary-hint">
        Taxes, discounts and shipping calculated at checkout.
      </p>

      <div className="cart-summary-subtotal">
        <strong>Subtotal:</strong>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <Link href="/checkout" className="btn btn-primary cart-checkout-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 9h18l-2 10a2 2 0 0 1-2 1.6H7A2 2 0 0 1 5 19L3 9zM8 9l3-5M16 9l-3-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Checkout
      </Link>
    </aside>
  );
}