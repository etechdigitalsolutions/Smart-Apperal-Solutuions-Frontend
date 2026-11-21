"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/utils/helpers";
import { createReference, saveQuotation } from "@/lib/utils/inquiries";

export default function QuotationPage() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [reference, setReference] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const items = products
      .filter((product) => (selected[product.id] ?? 0) > 0)
      .map((product) => ({
        productId: product.id,
        name: product.name,
        quantity: selected[product.id],
        price: product.price,
      }));
    if (!items.length) return;
    const nextReference = createReference("QT");
    saveQuotation({
      id: crypto.randomUUID(),
      reference: nextReference,
      name: String(data.get("name") || user?.name || ""),
      email: String(data.get("email") || user?.email || ""),
      phone: String(data.get("phone") || ""),
      items,
      notes: String(data.get("notes") || ""),
      status: "Pending",
      userId: user?.id,
      createdAt: new Date().toISOString(),
    });
    setReference(nextReference);
    setSelected({});
    form.reset();
  }

  return (
    <main className="page-shell">
      <div className="container quotation-layout">
        <div className="page-heading">
          <p className="eyebrow">Request pricing</p>
          <h1>Quotation request</h1>
          <p>Select products and quantities. No payment is required to submit a request.</p>
        </div>
        <form className="page-card quotation-form" onSubmit={submit}>
          <div className="form-grid">
            <label>Name<input name="name" required defaultValue={user?.name ?? ""} /></label>
            <label>Phone<input name="phone" required type="tel" /></label>
            <label className="form-span-two">Email<input name="email" required type="email" defaultValue={user?.email ?? ""} /></label>
            <label className="form-span-two">Additional notes<textarea name="notes" rows={4} /></label>
          </div>
          <div className="quotation-products">
            {products.slice(0, 8).map((product) => (
              <label key={product.id} className="quotation-product">
                <span><strong>{product.name}</strong><small>{formatCurrency(product.price)}</small></span>
                <input
                  type="number"
                  min="0"
                  max="999"
                  value={selected[product.id] ?? 0}
                  onChange={(event) => setSelected((current) => ({ ...current, [product.id]: Math.max(0, Number(event.target.value)) }))}
                  aria-label={`Quantity for ${product.name}`}
                />
              </label>
            ))}
          </div>
          <button type="submit" className="btn btn-primary">Submit quotation request</button>
          {reference ? <div className="form-feedback form-success" role="status">Quotation submitted. Reference: <strong>{reference}</strong></div> : null}
        </form>
        {user ? <Link href="/account/quotations" className="link-arrow">View my quotation history →</Link> : null}
      </div>
    </main>
  );
}
