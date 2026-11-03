"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useCart } from "@/hooks/useCart";

export type DeliveryMethod = "ship" | "pickup";

export interface AddressData {
  country: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface CheckoutFormData {
  delivery: DeliveryMethod;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Shipping address (empty strings when delivery === "pickup")
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  // New
  createAccount: boolean;
  billingSameAsShipping: boolean;
  billing: AddressData | null; // billing address (always set for pickup)
  pickupLocation: string; // "" when shipping
  contact: string;
  payment: string;
  notes: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting?: boolean;
}

/* ------------------------------------------------------------------ */
/* Config: edit these to suit the business                             */
/* ------------------------------------------------------------------ */
const COUNTRIES = ["Sri Lanka"];

const CITIES = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle",
  "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle",
  "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala",
  "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura",
  "Trincomalee", "Vavuniya",
];

const PICKUP_LOCATION = {
  name: "Smart Apparel Solutions",
  address: "No.248, Pamunuwa Rd, Maharagama, Colombo, 10250",
};

const CARD_PAYMENT = "Visa / MasterCard";
const CARD_BRANDS =
  "Visa / Master / Amex / Diners Club / Discover / China Union Pay / DFCC Wallet / Sampath Vishwa / eZcash / MCash / FriMi / UPay / Genie";

const EMPTY_ADDRESS: AddressData = {
  country: "Sri Lanka",
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  city: "",
  postalCode: "",
  phone: "",
};

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
function Chevron() {
  return (
    <svg className="co-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface AddressFieldsProps {
  value: AddressData;
  onChange: (next: AddressData) => void;
  prefix: string; // keeps ids/autocomplete unique ("shipping" | "billing")
}

function AddressFields({ value, onChange, prefix }: AddressFieldsProps) {
  const [showLine2, setShowLine2] = useState(value.line2 !== "");

  function handle(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    onChange({ ...value, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="co-grid">
        <label className="co-field co-field-select co-span-2">
          <select name="country" value={value.country} onChange={handle} required autoComplete={`${prefix} country-name`}>
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <span>Country/Region</span>
          <Chevron />
        </label>

        <label className="co-field">
          <input required name="firstName" autoComplete={`${prefix} given-name`} maxLength={50} placeholder=" " value={value.firstName} onChange={handle} />
          <span>First name</span>
        </label>

        <label className="co-field">
          <input required name="lastName" autoComplete={`${prefix} family-name`} maxLength={50} placeholder=" " value={value.lastName} onChange={handle} />
          <span>Last name</span>
        </label>

        <label className="co-field co-span-2">
          <input required name="line1" autoComplete={`${prefix} address-line1`} maxLength={200} placeholder=" " value={value.line1} onChange={handle} />
          <span>Address</span>
        </label>

        {showLine2 ? (
          <label className="co-field co-span-2">
            <input name="line2" autoComplete={`${prefix} address-line2`} maxLength={200} placeholder=" " value={value.line2} onChange={handle} />
            <span>Apartment, suite, etc. (optional)</span>
          </label>
        ) : (
          <button type="button" className="co-link-btn co-span-2" onClick={() => setShowLine2(true)}>
            + Add apartment, suite, etc.
          </button>
        )}
      </div>

      <div className="co-grid">
        <label className="co-field co-field-select">
          <select required name="city" value={value.city} onChange={handle} autoComplete={`${prefix} address-level2`}>
            <option value="">Select a city</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <span>City</span>
          <Chevron />
        </label>

        <label className="co-field">
          <input required name="postalCode" autoComplete={`${prefix} postal-code`} maxLength={20} placeholder=" " value={value.postalCode} onChange={handle} />
          <span>Postal code</span>
        </label>

        <label className="co-field co-span-2">
          <input name="phone" type="tel" autoComplete="tel" maxLength={25} placeholder=" " value={value.phone} onChange={handle} />
          <span>Phone (optional)</span>
        </label>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Main form                                                           */
/* ------------------------------------------------------------------ */
export default function CheckoutForm({
  onSubmit,
  isSubmitting = false,
}: CheckoutFormProps) {
  const { items } = useCart();

  const [website, setWebsite] = useState(""); // honeypot

  const [delivery, setDeliveryState] = useState<DeliveryMethod>("ship");
  const [email, setEmail] = useState("");
  const [createAccount, setCreateAccount] = useState(false);

  const [address, setAddress] = useState<AddressData>(EMPTY_ADDRESS); // shipping (or billing when pickup)
  const [billing, setBilling] = useState<AddressData>(EMPTY_ADDRESS); // only used if "same as shipping" is off
  const [sameBilling, setSameBilling] = useState(true);

  const [payment, setPayment] = useState(CARD_PAYMENT);
  const [showNote, setShowNote] = useState(false);
  const [notes, setNotes] = useState("");

  const isPickup = delivery === "pickup";
  const cashLabel = isPickup ? "Cash on pickup" : "Cash on delivery";

  const paymentOptions = [
    CARD_PAYMENT,
    "Direct bank transfer",
    "Cheque payments",
    cashLabel,
    "Koko",
  ];

  function setDelivery(next: DeliveryMethod) {
    setDeliveryState(next);
    // keep the cash option in sync with the delivery method
    setPayment((p) =>
      p === "Cash on delivery" || p === "Cash on pickup"
        ? next === "pickup"
          ? "Cash on pickup"
          : "Cash on delivery"
        : p
    );
  }

  const shippingReady =
    address.line1.trim() !== "" && address.city !== "" && address.postalCode.trim() !== "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Reject submissions that fill the honeypot.
    if (website.trim() !== "") return;
    if (items.length === 0 || isSubmitting) return;

    const clean = (a: AddressData): AddressData => ({
      country: a.country.trim(),
      firstName: a.firstName.trim(),
      lastName: a.lastName.trim(),
      line1: a.line1.trim(),
      line2: a.line2.trim(),
      city: a.city.trim(),
      postalCode: a.postalCode.trim(),
      phone: a.phone.trim(),
    });

    const main = clean(address);

    // Pickup: the address form is the BILLING address, no shipping address.
    // Ship: billing = shipping unless the customer unchecked the box.
    const billingData: AddressData = isPickup
      ? main
      : sameBilling
        ? main
        : clean(billing);

    onSubmit({
      delivery,
      firstName: main.firstName,
      lastName: main.lastName,
      fullName: `${main.firstName} ${main.lastName}`.trim(),
      email: email.trim(),
      phone: main.phone,
      line1: isPickup ? "" : main.line1,
      line2: isPickup ? "" : main.line2,
      city: isPickup ? "" : main.city,
      state: "",
      postalCode: isPickup ? "" : main.postalCode,
      country: main.country,
      createAccount,
      billingSameAsShipping: isPickup ? false : sameBilling,
      billing: billingData,
      pickupLocation: isPickup ? PICKUP_LOCATION.name : "",
      contact: main.phone ? "WhatsApp" : "Email",
      payment,
      notes: showNote ? notes.trim() : "",
    });
  }

  return (
    <form className="co-form" onSubmit={handleSubmit}>
      {/* Honeypot field: hidden from real customers */}
      <div aria-hidden="true" className="checkout-honeypot">
        <label htmlFor="checkout-website">Leave this field empty</label>
        <input
          id="checkout-website"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* ---------- Contact information ---------- */}
      <div className="co-heading-row">
        <h2 className="co-heading">Contact information</h2>
        <Link href="/login" className="co-login">Log in</Link>
      </div>

      <label className="co-field">
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Email address</span>
      </label>
      <p className="co-hint">You are currently checking out as a guest.</p>

      <label className="co-check">
        <input
          type="checkbox"
          checked={createAccount}
          onChange={(e) => setCreateAccount(e.target.checked)}
        />
        Create an account with Smart Apparel Solutions
      </label>

      {/* ---------- Delivery ---------- */}
      <h2 className="co-heading">Delivery</h2>

      <div className="co-toggle" role="radiogroup" aria-label="Choose a delivery method">
        <label className={`co-toggle-btn${!isPickup ? " is-active" : ""}`}>
          <input type="radio" name="delivery" value="ship" className="sr-only" checked={!isPickup} onChange={() => setDelivery("ship")} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="7" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Ship
        </label>

        <label className={`co-toggle-btn${isPickup ? " is-active" : ""}`}>
          <input type="radio" name="delivery" value="pickup" className="sr-only" checked={isPickup} onChange={() => setDelivery("pickup")} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 10l1.5-5h13L20 10M4 10v9h16v-9M4 10h16M9 19v-5h6v5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          Store Pickup
        </label>
      </div>

      {/* ---------- Pickup locations (pickup only) ---------- */}
      {isPickup && (
        <>
          <h2 className="co-heading">Pickup locations</h2>
          <label className="co-pickup-loc is-selected">
            <input type="radio" name="pickupLocation" checked readOnly />
            <span className="co-pickup-loc-body">
              <span className="co-pickup-loc-top">
                <span>{PICKUP_LOCATION.name}</span>
                <span className="co-free">FREE</span>
              </span>
              <span className="co-pickup-loc-addr">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                {PICKUP_LOCATION.address}
              </span>
            </span>
          </label>
        </>
      )}

      {/* ---------- Shipping / Billing address ---------- */}
      <h2 className="co-heading">{isPickup ? "Billing address" : "Shipping address"}</h2>
      <AddressFields value={address} onChange={setAddress} prefix={isPickup ? "billing" : "shipping"} />

      {!isPickup && (
        <>
          <label className="co-check">
            <input
              type="checkbox"
              checked={sameBilling}
              onChange={(e) => setSameBilling(e.target.checked)}
            />
            Use same address for billing
          </label>

          {!sameBilling && (
            <>
              <h2 className="co-heading">Billing address</h2>
              <AddressFields value={billing} onChange={setBilling} prefix="billing" />
            </>
          )}

          {/* ---------- Shipping options ---------- */}
          <h2 className="co-heading">Shipping options</h2>
          {shippingReady ? (
            <div className="co-pay-list">
              <label className="co-pay-item is-selected">
                <span className="co-pay-row">
                  <input type="radio" name="shippingOption" checked readOnly />
                  <span>Standard delivery</span>
                  <span className="co-pay-aside">Confirmed after order</span>
                </span>
              </label>
            </div>
          ) : (
            <div className="co-box">Enter a shipping address to view shipping options.</div>
          )}
        </>
      )}

      {/* ---------- Payment options ---------- */}
      <h2 className="co-heading">Payment options</h2>

      <div className="co-pay-list" role="radiogroup" aria-label="Payment options">
        {paymentOptions.map((option) => {
          const selected = payment === option;
          const isCard = option === CARD_PAYMENT;
          const isKoko = option === "Koko";

          return (
            <label key={option} className={`co-pay-item${selected ? " is-selected" : ""}`}>
              <span className="co-pay-row">
                <input
                  type="radio"
                  name="payment"
                  value={option}
                  checked={selected}
                  onChange={() => setPayment(option)}
                />
                {isCard ? (
                  <span className="co-pay-brands">
                    {CARD_BRANDS}
                    <Image
                      src="/images/payments/webxpay-cards.png"
                      alt="Accepted cards: Visa, Mastercard, Amex and more"
                      width={116}
                      height={42}
                      className="co-pay-logo"
                    />
                  </span>
                ) : isKoko ? (
                  <span className="co-pay-koko">
                    <Image
                      src="/images/payments/koko-logo.png"
                      alt="Koko"
                      width={70}
                      height={24}
                    />
                    Koko: Buy Now Pay Later
                  </span>
                ) : (
                  <span>{option}</span>
                )}
              </span>
              {isCard && <span className="co-pay-detail">{CARD_PAYMENT}</span>}
            </label>
          );
        })}
      </div>

      {/* ---------- Order note ---------- */}
      <label className="co-check">
        <input
          type="checkbox"
          checked={showNote}
          onChange={(e) => setShowNote(e.target.checked)}
        />
        Add a note to your order
      </label>

      {showNote && (
        <label className="co-field co-field-textarea co-note">
          <textarea
            name="notes"
            maxLength={1000}
            placeholder=" "
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <span>Notes: product questions or delivery notes</span>
        </label>
      )}

      <p className="co-terms">
        By proceeding with your purchase you agree to our{" "}
        <Link href="/terms">Terms and Conditions</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>
      </p>

      {/* ---------- Actions ---------- */}
      <div className="co-actions">
        <Link href="/cart" className="co-return">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Return to Cart
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
              : "Place Order"}
        </button>
      </div>
    </form>
  );
}