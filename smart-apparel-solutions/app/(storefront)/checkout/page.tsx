
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import CheckoutForm, {
  type CheckoutFormData,
} from "@/components/storefront/checkout/CheckoutForm";
import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleCheckout(data: CheckoutFormData) {
    if (items.length === 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      sessionStorage.setItem(
        "checkoutDetails",
        JSON.stringify(data)
      );

      router.push("/checkout/confirmation");
    } catch {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <p className="mt-4">Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-4 inline-block underline"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2">
      <section>
        <h1 className="mb-8 text-3xl font-semibold">Checkout</h1>

        <CheckoutForm
          onSubmit={handleCheckout}
          isSubmitting={isSubmitting}
        />
      </section>

      <aside className="h-fit rounded-lg border p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Order Summary
        </h2>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size ?? ""}-${item.color ?? ""}`}
              className="flex justify-between gap-4 text-sm"
            >
              <div>
                <p>{item.product.name}</p>
                <p className="text-gray-500">
                  Qty: {item.quantity}
                  {item.size ? ` · Size: ${item.size}` : ""}
                  {item.color ? ` · Color: ${item.color}` : ""}
                </p>
              </div>
              <p>
                Rs.{" "}
                {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-5" />

        <div className="flex justify-between">
          <span>Total items</span>
          <span>{itemCount}</span>
        </div>

        <div className="mt-3 flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Shipping costs will be confirmed before the order is placed.
        </p>
      </aside>
    </main>
  );
}
