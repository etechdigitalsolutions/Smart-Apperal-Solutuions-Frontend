
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
        !parsed.fullName ||
        !parsed.email ||
        !parsed.phone ||
        !parsed.line1 ||
        !parsed.city ||
        !parsed.postalCode ||
        !parsed.country
      ) {
        sessionStorage.removeItem("checkoutDetails");
        router.replace("/checkout");
        return;
      }

      // The customer details are read from sessionStorage after navigation.
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
      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p>Loading confirmation...</p>
      </main>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
        ✓
      </div>

      <h1 className="text-3xl font-semibold">
        Thank You!
      </h1>

      <p className="mt-3 text-gray-600">
        Your checkout details have been received.
      </p>

      <section className="mt-8 rounded-lg border p-6 text-left">
        <h2 className="text-lg font-semibold">
          Shipping Information
        </h2>

        <p className="mt-3">{customer.fullName}</p>
        <p>{customer.email}</p>
        <p>{customer.phone}</p>
        <p>{customer.line1}</p>

        {customer.line2 && <p>{customer.line2}</p>}

        <p>
          {customer.city}
          {customer.state ? `, ${customer.state}` : ""}
          {" "}
          {customer.postalCode}
        </p>

        <p>{customer.country}</p>
      </section>

      <p className="mt-6 text-sm text-gray-500">
        This is a frontend confirmation preview. No order has
        been submitted to the server yet.
      </p>

      <Link
        href="/products"
        className="mt-8 inline-block rounded-md bg-black px-6 py-3 font-medium text-white"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
