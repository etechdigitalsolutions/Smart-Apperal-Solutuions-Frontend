
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import CheckoutForm, {
  type CheckoutFormData,
} from "@/components/storefront/checkout/CheckoutForm";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleCheckout(data: CheckoutFormData) {
    if (items.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      sessionStorage.setItem("checkoutDetails", JSON.stringify(data));
      router.push("/checkout/confirmation");
    } catch {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="page-shell">
        <div className="container narrow-content">
          <div className="page-heading">
            <p className="eyebrow">Quotation cart</p>
            <h1>Tell us where to send your setup</h1>
            <p>Your cart is empty. Add products before requesting a quotation.</p>
          </div>
          <Link href="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Quotation cart</p>
          <h1>Tell us where to send your setup</h1>
          <p>
            There is no payment obligation. We will confirm availability
            and delivery before you commit.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <section>
            <CheckoutForm
              onSubmit={handleCheckout}
              isSubmitting={isSubmitting}
            />
          </section>

          <aside className="h-fit rounded-lg border p-6">
            <h2 className="mb-5 text-xl font-semibold">
              Quotation Summary
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
                    {formatCurrency(item.product.price * item.quantity)}
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
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Delivery and final pricing will be confirmed by the sales team.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
