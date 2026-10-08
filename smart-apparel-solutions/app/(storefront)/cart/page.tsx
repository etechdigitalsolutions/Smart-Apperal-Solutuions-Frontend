"use client";

import Link from "next/link";

import CartItem from "@/components/storefront/cart/CartItem";
import CartSummary from "@/components/storefront/cart/CartSummary";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main>
        <h1>Shopping Cart</h1>

        <p>Your cart is currently empty.</p>

        <Link href="/products">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Shopping Cart</h1>

      <p>
        {items.length}{" "}
        {items.length === 1 ? "item" : "items"}
      </p>

      <section>
        {items.map((item) => (
          <CartItem
            key={`${item.productId}-${item.size ?? ""}-${item.color ?? ""}`}
            item={item}
          />
        ))}
      </section>

      <button type="button" onClick={clearCart}>
        Clear Cart
      </button>

      <CartSummary />
    </main>
  );
}