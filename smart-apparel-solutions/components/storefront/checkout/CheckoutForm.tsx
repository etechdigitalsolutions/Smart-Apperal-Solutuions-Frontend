"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/hooks/useCart";

export type DeliveryMethod = "ship" | "pickup";

export interface CheckoutFormData {
  delivery: DeliveryMethod;
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  contact: string;
  payment: string;
  notes: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting?: boolean;
}

function Chevron() {
  return (
    <svg className="co-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CheckoutForm({
  onSubmit,
  isSubmitting = false,
}: CheckoutFormProps) {
  const { items } = useCart();
  const [website, setWebsite] = useState(""); //added the honeypot field to prevent spam submissions

  const [formData, setFormData] = useState<CheckoutFormData>({
    delivery: "ship",
    fullName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Sri Lanka",
    contact: "WhatsApp",
    payment: "Quotation first",
    notes: "",
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function setDelivery(delivery: DeliveryMethod) {
    setFormData((previous) => ({ ...previous, delivery }));
  }

  const isPickup = formData.delivery === "pickup";

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  // Reject submissions that fill the honeypot.
  if (website.trim() !== "") {
    return;
  }

  if (items.length === 0 || isSubmitting) return;

  onSubmit({
    ...formData,
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    line1: isPickup ? "" : formData.line1.trim(),
    line2: isPickup ? "" : formData.line2.trim(),
    city: isPickup ? "" : formData.city.trim(),
    state: isPickup ? "" : formData.state.trim(),
    postalCode: isPickup ? "" : formData.postalCode.trim(),
    country: formData.country.trim(),
    notes: formData.notes.trim(),
  });
}

  return (
    <form className="co-form" onSubmit={handleSubmit}>
      {/* Honeypot field: hidden from real customers */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor="checkout-website">
            Leave this field empty
          </label>

          <input
            id="checkout-website"
            type="text"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
      {/* ---------- Delivery method ---------- */}
      <h2 className="co-heading">Delivery method</h2>

      <div className="co-toggle" role="radiogroup" aria-label="Choose a delivery method">
        <label className={`co-toggle-btn${!isPickup ? " is-active" : ""}`}>
          <input
            type="radio"
            name="delivery"
            value="ship"
            className="sr-only"
            checked={!isPickup}
            onChange={() => setDelivery("ship")}
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3l8 4v10l-8 4-8-4V7l8-4zM4 7l8 4 8-4M12 11v10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          Ship
        </label>

        <label className={`co-toggle-btn${isPickup ? " is-active" : ""}`}>
          <input
            type="radio"
            name="delivery"
            value="pickup"
            className="sr-only"
            checked={isPickup}
            onChange={() => setDelivery("pickup")}
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Pickup
        </label>
      </div>

      {/* ---------- Contact ---------- */}
      <h2 className="co-heading">Contact</h2>

      <div className="co-grid">
        <label className="co-field co-span-2">
          <input
            required
            name="fullName"
            autoComplete="name"
            maxLength={100}
            placeholder=" "
            value={formData.fullName}
            onChange={handleChange}
          />
          <span>Full name</span>
        </label>

        <label className="co-field co-span-2">
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
          />
          <span>Email address</span>
        </label>

        <label className="co-field co-span-2">
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={25}
            placeholder=" "
            value={formData.phone}
            onChange={handleChange}
          />
          <span>Phone number (07x xxx xxxx)</span>
        </label>
      </div>

      {isPickup ? (
        <>
          <h2 className="co-heading">Pickup</h2>
          <div className="co-pickup">
            <p>
              No shipping address needed. We will confirm the pickup
              location, date and time with you once your quotation is ready.
            </p>
          </div>
        </>
      ) : (
        <>
          {/* ---------- Shipping address ---------- */}
          <h2 className="co-heading">Shipping address</h2>

          <div className="co-grid">
            <label className="co-field co-span-2">
              <input
                required
                name="country"
                autoComplete="country-name"
                maxLength={100}
                placeholder=" "
                value={formData.country}
                onChange={handleChange}
              />
              <span>Country / Region</span>
            </label>


            <label className="co-field co-span-2">
              <input
                required
                name="line1"
                autoComplete="address-line1"
                maxLength={200}
                placeholder=" "
                value={formData.line1}
                onChange={handleChange}
              />
              <span>Address</span>
            </label>

            <label className="co-field co-span-2">
              <input
                name="line2"
                autoComplete="address-line2"
                maxLength={200}
                placeholder=" "
                value={formData.line2}
                onChange={handleChange}
              />
              <span>Apartment, suite, etc. (optional)</span>
            </label>
          </div>

          <div className="co-grid co-grid-3">
            <label className="co-field">
              <input
                required
                name="city"
                autoComplete="address-level2"
                maxLength={100}
                placeholder=" "
                value={formData.city}
                onChange={handleChange}
              />
              <span>City</span>
            </label>

            <label className="co-field">
              <input
                name="state"
                autoComplete="address-level1"
                maxLength={100}
                placeholder=" "
                value={formData.state}
                onChange={handleChange}
              />
              <span>Province (optional)</span>
            </label>

            <label className="co-field">
              <input
                required
                name="postalCode"
                autoComplete="postal-code"
                maxLength={20}
                placeholder=" "
                value={formData.postalCode}
                onChange={handleChange}
              />
              <span>Postal code</span>
            </label>
          </div>
        </>
      )}

      {/* ---------- Preferences ---------- */}
      <h2 className="co-heading">Preferences</h2>

      <div className="co-grid">
        <label className="co-field co-field-select">
          <select name="contact" value={formData.contact} onChange={handleChange}>
            <option>WhatsApp</option>
            <option>Phone call</option>
            <option>Email</option>
          </select>
          <span>Preferred contact</span>
          <Chevron />
        </label>

        <label className="co-field co-field-select">
          <select name="payment" value={formData.payment} onChange={handleChange}>
            <option>Quotation first</option>
            <option>Cash on delivery</option>
            <option>Koko installments</option>
            <option>Bank transfer</option>
          </select>
          <span>Payment preference</span>
          <Chevron />
        </label>

        <label className="co-field co-field-textarea co-span-2">
          <textarea
            name="notes"
            placeholder=" "
            value={formData.notes}
            onChange={handleChange}
          />
          <span>Notes: product questions or delivery notes (optional)</span>
        </label>
      </div>

      {/* ---------- Actions ---------- */}
      <div className="co-actions">
        <Link href="/cart" className="co-return">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Return to cart
        </Link>

        <button
          type="submit"
          className="btn btn-primary co-submit"
          disabled={!items.length || isSubmitting}
        >
          {!items.length
            ? "Your cart is empty"
            : isSubmitting
              ? "Processing..."
              : "Request quotation"}
        </button>
      </div>
    </form>
  );
}