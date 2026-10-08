"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartSummary() {
  const { itemCount, subtotal } = useCart();

  return (
    <aside>
      <h2>Order Summary</h2>

      <div>
        <span>Items</span>
        <span>{itemCount}</span>
      </div>

      <div>
        <span>Subtotal</span>
        <span>Rs. {subtotal.toFixed(2)}</span>
      </div>

      <div>
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>

      <hr />

      <div>
        <strong>Total</strong>
        <strong>Rs. {subtotal.toFixed(2)}</strong>
      </div>

      <Link href="/checkout">
        Proceed to Checkout
      </Link>
    </aside>
  );
}