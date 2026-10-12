"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";

export default function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return <div className="success-panel"><p className="eyebrow">Request received</p><h1>We will prepare your quotation.</h1><p>Our sales team will contact you shortly to confirm stock, delivery and payment options.</p><Link href="/products" className="btn btn-primary">Continue browsing</Link></div>;
  }

  return <form className="checkout-form" onSubmit={handleSubmit}><div className="form-grid"><label>Full name<input required name="name" placeholder="Your name" /></label><label>Phone number<input required name="phone" placeholder="07x xxx xxxx" /></label><label className="form-span-two">Email address<input type="email" required name="email" placeholder="you@example.com" /></label><label className="form-span-two">Delivery address<textarea required name="address" placeholder="Workshop or delivery address" /></label><label>Preferred contact<select name="contact"><option>WhatsApp</option><option>Phone call</option><option>Email</option></select></label><label>Payment preference<select name="payment"><option>Quotation first</option><option>Cash on delivery</option><option>Koko installments</option><option>Bank transfer</option></select></label><label className="form-span-two">Notes<textarea name="notes" placeholder="Fabric type, machine questions, or delivery notes" /></label></div><div className="checkout-total"><span>{items.length} line items</span><strong>{formatCurrency(subtotal)}</strong></div><button type="submit" className="btn btn-primary" disabled={!items.length}>{items.length ? "Request quotation" : "Your cart is empty"}</button></form>;
}
