
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import type { CheckoutFormData } from "@/components/storefront/checkout/CheckoutForm";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  const [customer, setCustomer] = useState<CheckoutFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedDetails = sessionStorage.getItem("checkoutDetails");

      if (!savedDetails) {
        router.replace("/checkout");
        return;
      }

      const parsed = JSON.parse(savedDetails) as CheckoutFormData;

      if (
        !parsed.fullName?.trim() ||
        !parsed.email?.trim() ||
        !parsed.phone?.trim() ||
        !parsed.line1?.trim() ||
        !parsed.city?.trim() ||
        !parsed.postalCode?.trim() ||
        !parsed.country?.trim()
      ) {
        sessionStorage.removeItem("checkoutDetails");
        router.replace("/checkout");
        return;
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCustomer(parsed);
      clearCart();
      sessionStorage.removeItem("checkoutDetails");
    } catch {
      router.replace("/checkout");
    } finally {
      setIsLoading(false);
    }
  }, [clearCart, router]);

  if (isLoading) {
    return (
      <main className="page-shell">
        <div className="container narrow-content">
          <p>Loading confirmation...</p>
        </div>
      </main>
    );
  }

  if (!customer) return null;

  return (
    <main className="page-shell">
      <div className="container narrow-content">
        <div className="success-panel">
          <p className="eyebrow">Thank you</p>
          <h1>Your request is with our team.</h1>
          <p>
            We will contact you with availability, delivery timing
            and the best payment option for your order.
          </p>

          <section className="mt-6 text-left">
            <h2 className="font-semibold">Shipping Information</h2>
            <p className="mt-3">{customer.fullName}</p>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            <p>{customer.line1}</p>
            {customer.line2 && <p>{customer.line2}</p>}
            <p>
              {customer.city}
              {customer.state ? `, ${customer.state}` : ""}
              {" "}{customer.postalCode}
            </p>
            <p>{customer.country}</p>
          </section>

          <p className="mt-5 text-sm">
            This is a frontend preview. No quotation request has
            been submitted to the server yet.
          </p>

          <Link href="/products" className="btn btn-primary">
            Browse more equipment
          </Link>
        </div>
      </div>
    </main>
  );
}
