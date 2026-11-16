
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

 
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (isSubmitting) return;

      const form = event.currentTarget;

      setIsSubmitting(true);
      setStatus(null);

      try {
        // Frontend demonstration only
        await new Promise((resolve) => setTimeout(resolve, 1000));

        form.reset();
        setStatus("success");
      } catch {
        setStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    }


  return (
    <main className="page-shell">
      <div className="container">
        <Link href="/" className="link-arrow account-back-home">
          ← Back to Home
        </Link>

        <div className="page-heading">
          <p className="eyebrow">Talk to a machine specialist</p>
          <h1>Let us help you build the right setup</h1>
          <p>
            Tell us what you make and we will help you choose equipment,
            accessories and after-sales support.
          </p>
        </div>

        <div className="contact-layout">
          <form className="page-card contact-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Name
                <input required placeholder="Your name" />
              </label>

              <label>
                Phone
                <input required type="tel" placeholder="07x xxx xxxx" />
              </label>

              <label className="form-span-two">
                Email
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </label>

              <label className="form-span-two">
                How can we help?
                <textarea
                  required
                  placeholder="Machine, spare part, service or quotation question"
                />
              </label>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send enquiry"}
            </button>

            {status === "success" && (
              <div className="form-feedback form-success" role="status">
                Your inquiry has been submitted successfully. Thank you for
                contacting Smart Apparel Solutions!
              </div>
            )}

            {status === "error" && (
              <div className="form-feedback form-error" role="alert">
                We couldn't submit your inquiry. Please try again.
              </div>
            )}
          </form>

          <aside className="page-card contact-aside">
            <p className="eyebrow">Direct contact</p>
            <h2>Smart Apparel Solutions</h2>
            <p>{config.address}</p>
            <p><strong>{config.phone}</strong></p>
            <p>{config.email}</p>

            <Link href="/services-repair" className="link-arrow">
              View service support
            </Link>

            <a
              href={config.whatsappUrl}
              className="btn btn-secondary whatsapp-action"
            >
              <Image
                src="/images/social/whatsapp.png"
                alt=""
                width={18}
                height={18}
              />
              Message on WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}
