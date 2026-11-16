"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import CheckoutForm, {
  type CheckoutFormData,
} from "@/components/storefront/checkout/CheckoutForm";
import CheckoutSummary from "@/components/storefront/checkout/CheckoutSummary";
import { useCart } from "@/hooks/useCart";

import { saveOrder, createOrderReference } from "@/data/orders";
import { validatePromoCode } from "@/data/promoCodes";
import type { TrackingOrder } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shellRef = useRef<HTMLElement>(null);
  const hasItems = items.length > 0;


  const [promoInput, setPromoInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [promoMessageType, setPromoMessageType] = useState<
    "success" | "error" | ""
  >("");


  // Keeps the fixed summary just below the header: it starts under the
  // header block, then follows the sticky header while the page scrolls.
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const header = document.querySelector<HTMLElement>(".site-header");

    const updateTop = () => {
      const shellTop = shell.getBoundingClientRect().top;
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      shell.style.setProperty(
        "--checkout-top",
        `${Math.max(shellTop, headerBottom, 0)}px`
      );
    };

    updateTop();
    window.addEventListener("scroll", updateTop, { passive: true });
    window.addEventListener("resize", updateTop);

    return () => {
      window.removeEventListener("scroll", updateTop);
      window.removeEventListener("resize", updateTop);
    };
  }, [hasItems]);


function handleApplyPromo() {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const result = validatePromoCode(promoInput, subtotal);

  setPromoMessage(result.message);

  if (!result.valid) {
    setPromoMessageType("error");
    return;
  }

  setAppliedPromoCode(result.code);
  setDiscount(result.discount);
  setPromoInput(result.code);
  setPromoMessageType("success");
}

function handleRemovePromo() {
  setPromoInput("");
  setAppliedPromoCode("");
  setDiscount(0);
  setPromoMessage("");
  setPromoMessageType("");
}



function handleCheckout(data: CheckoutFormData) {
  if (items.length === 0 || isSubmitting) return;

  setIsSubmitting(true);

  try {
    const reference = createOrderReference();

    // Calculate the original cart subtotal.
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Calculate the final discount and total.
    const finalDiscount = Math.min(discount, subtotal);
    const total = Math.max(0, subtotal - finalDiscount);

    // Create the order with promo code information.
    const order: TrackingOrder = {
      reference,
      customerName: data.fullName,
      email: data.email,
      phone: data.phone,
      items,
      subtotal,
      promoCode: appliedPromoCode || undefined,
      discount: finalDiscount,
      total,
      status: "pending",
      delivery: data.delivery,
      createdAt: new Date().toISOString(),
      trackingMessage:
        "Your order request has been received and is awaiting confirmation from our team.",
    };

    saveOrder(order);

    sessionStorage.setItem("checkoutDetails", JSON.stringify(data));
    sessionStorage.setItem("orderReference", reference);

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
    <main className="checkout-shell" ref={shellRef}>
      <div className="checkout-main">
        <div className="checkout-main-inner">
          <header className="checkout-intro">
            <div className="checkout-home-link">
              <Link href="/">
                <span aria-hidden="true">←</span>
                Back to Home
              </Link>
            </div>
            <p className="eyebrow">Quotation cart</p>
            <h1>Tell us where to send your setup</h1>
            <p>
              There is no payment obligation. We will confirm availability
              and delivery before you commit.
            </p>
          </header>

          <CheckoutForm
            onSubmit={handleCheckout}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      <aside className="checkout-aside">
        <div className="checkout-aside-inner">
          <CheckoutSummary
            promoInput={promoInput}
            appliedPromoCode={appliedPromoCode}
            discount={discount}
            promoMessage={promoMessage}
            promoMessageType={promoMessageType}
            onPromoInputChange={setPromoInput}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={handleRemovePromo}
          />
          <p className="co-aside-note">
            Delivery and final pricing will be confirmed by the sales team.
          </p>
        </div>
      </aside>
    </main>
  );
}