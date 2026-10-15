
"use client";

import { useState, type FormEvent } from "react";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";

export interface CheckoutFormData {
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

export default function CheckoutForm({
  onSubmit,
  isSubmitting = false,
}: CheckoutFormProps) {
  const { items, subtotal } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0 || isSubmitting) return;

    onSubmit({
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      line1: formData.line1.trim(),
      line2: formData.line2.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      postalCode: formData.postalCode.trim(),
      country: formData.country.trim(),
      notes: formData.notes.trim(),
    });
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full name
          <input
            required
            name="fullName"
            autoComplete="name"
            maxLength={100}
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <label>
          Phone number
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={25}
            value={formData.phone}
            onChange={handleChange}
            placeholder="07x xxx xxxx"
          />
        </label>

        <label className="form-span-two">
          Email address
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>

        <label className="form-span-two">
          Address line 1
          <input
            required
            name="line1"
            autoComplete="address-line1"
            maxLength={200}
            value={formData.line1}
            onChange={handleChange}
          />
        </label>

        <label className="form-span-two">
          Address line 2
          <input
            name="line2"
            autoComplete="address-line2"
            maxLength={200}
            value={formData.line2}
            onChange={handleChange}
          />
        </label>

        <label>
          City
          <input
            required
            name="city"
            autoComplete="address-level2"
            maxLength={100}
            value={formData.city}
            onChange={handleChange}
          />
        </label>

        <label>
          Province / State
          <input
            name="state"
            autoComplete="address-level1"
            maxLength={100}
            value={formData.state}
            onChange={handleChange}
          />
        </label>

        <label>
          Postal code
          <input
            required
            name="postalCode"
            autoComplete="postal-code"
            maxLength={20}
            value={formData.postalCode}
            onChange={handleChange}
          />
        </label>

        <label>
          Country
          <input
            required
            name="country"
            autoComplete="country-name"
            maxLength={100}
            value={formData.country}
            onChange={handleChange}
          />
        </label>

        <label>
          Preferred contact
          <select
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          >
            <option>WhatsApp</option>
            <option>Phone call</option>
            <option>Email</option>
          </select>
        </label>

        <label>
          Payment preference
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option>Quotation first</option>
            <option>Cash on delivery</option>
            <option>Koko installments</option>
            <option>Bank transfer</option>
          </select>
        </label>

        <label className="form-span-two">
          Notes
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Product questions or delivery notes"
          />
        </label>
      </div>

      <div className="checkout-total">
        <span>{items.length} line items</span>
        <strong>{formatCurrency(subtotal)}</strong>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!items.length || isSubmitting}
      >
        {!items.length
          ? "Your cart is empty"
          : isSubmitting
            ? "Processing..."
            : "Request quotation"}
      </button>
    </form>
  );
}
