
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function MahamuPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;

    setIsSubmitting(true);
    setStatus(null);

    try {
      // Frontend demonstration only.
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
          <p className="eyebrow">For growing workshops</p>
          <h1>Mahamu: build your production line with confidence</h1>
          <p>
            Get practical guidance for choosing machines, planning
            operations and improving output without overbuying equipment.
          </p>
        </div>

        <div className="contact-layout">
          <form
            className="page-card contact-form"
            onSubmit={handleSubmit}
          >
            <h2>Tell us about your workshop</h2>
            <p>
              Share your requirements and our team can help you plan
              your production setup.
            </p>

            <div className="form-grid">
              <label>
                Name
                <input required placeholder="Your name" maxLength={100} />
              </label>

              <label>
                Phone
                <input
                  required
                  type="tel"
                  placeholder="07x xxx xxxx"
                  maxLength={25}
                />
              </label>

              <label className="form-span-two">
                Email
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  maxLength={254}
                />
              </label>

              <label className="form-span-two">
                Workshop requirements
                <textarea
                  required
                  placeholder="Tell us about your workshop, production needs and the equipment you are looking for."
                  maxLength={2000}
                />
              </label>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit inquiry"}
            </button>

            {status === "success" && (
              <div className="form-feedback form-success" role="status">
                Your inquiry has been submitted successfully. Thank you
                for contacting Smart Apparel Solutions!
              </div>
            )}

            {status === "error" && (
              <div className="form-feedback form-error" role="alert">
                We couldn't submit your inquiry. Please try again.
              </div>
            )}
          </form>

          <aside className="page-card contact-aside">
            <p className="eyebrow">How Mahamu helps</p>
            <h2>Plan your production line</h2>

            <div className="feature-list">
              <div>
                <strong>01. Map the operation</strong>
                <p>
                  We identify each seam, finish and material in your
                  workflow.
                </p>
              </div>

              <div>
                <strong>02. Match the machine</strong>
                <p>
                  Compare speed, stitch type, fabric handling and
                  service availability.
                </p>
              </div>

              <div>
                <strong>03. Plan the next step</strong>
                <p>
                  Start with what your workshop needs today and expand
                  with a clear path.
                </p>
              </div>
            </div>

            <Link href="/contact" className="link-arrow">
              Contact our team
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
