"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ShoppingBag } from "lucide-react";

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
          <ChevronDown size={18} aria-hidden="true" className={noteOpen ? "chevron open" : "chevron"} />
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
        <ShoppingBag size={20} aria-hidden="true" />
        Checkout
      </Link>
    </aside>
  );
}