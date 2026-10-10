
"use client";

import { useState, type FormEvent } from "react";

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
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting?: boolean;
}

export default function CheckoutForm({
  onSubmit,
  isSubmitting = false,
}: CheckoutFormProps) {
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
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
    });
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Contact Information
        </h2>

        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            className={inputClass}
            required
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
            maxLength={254}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            required
            maxLength={25}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Shipping Address
        </h2>

        <div>
          <label htmlFor="line1" className="mb-1 block text-sm">
            Address Line 1 *
          </label>
          <input
            id="line1"
            name="line1"
            autoComplete="address-line1"
            value={formData.line1}
            onChange={handleChange}
            className={inputClass}
            required
            maxLength={200}
          />
        </div>

        <div>
          <label htmlFor="line2" className="mb-1 block text-sm">
            Address Line 2
          </label>
          <input
            id="line2"
            name="line2"
            autoComplete="address-line2"
            value={formData.line2}
            onChange={handleChange}
            className={inputClass}
            maxLength={200}
          />
        </div>

        <div>
          <label htmlFor="city" className="mb-1 block text-sm">
            City *
          </label>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            value={formData.city}
            onChange={handleChange}
            className={inputClass}
            required
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="state" className="mb-1 block text-sm">
            Province / State
          </label>
          <input
            id="state"
            name="state"
            autoComplete="address-level1"
            value={formData.state}
            onChange={handleChange}
            className={inputClass}
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="mb-1 block text-sm">
            Postal Code *
          </label>
          <input
            id="postalCode"
            name="postalCode"
            autoComplete="postal-code"
            value={formData.postalCode}
            onChange={handleChange}
            className={inputClass}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="country" className="mb-1 block text-sm">
            Country *
          </label>
          <input
            id="country"
            name="country"
            autoComplete="country-name"
            value={formData.country}
            onChange={handleChange}
            className={inputClass}
            required
            maxLength={100}
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-black px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : "Continue to Place Order"}
      </button>
    </form>
  );
}
