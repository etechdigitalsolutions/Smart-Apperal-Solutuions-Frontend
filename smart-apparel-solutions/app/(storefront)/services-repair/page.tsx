"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { createReference, saveInquiry } from "@/lib/utils/inquiries";
import {
  Wrench,
  Settings2,
  ClipboardCheck,
  PackageCheck,
  ArrowRight,
  Headset,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Installation & Setup",
    description:
      "Get your machine positioned, assembled and ready for the first production run.",
    icon: Settings2,
    tag: "Machine setup",
  },
  {
    number: "02",
    title: "Preventive Maintenance",
    description:
      "Reduce interruptions with scheduled checks, adjustments and consumable guidance.",
    icon: ClipboardCheck,
    tag: "Keep machines running",
  },
  {
    number: "03",
    title: "Repair Support",
    description:
      "Share the symptoms and our team will help identify the next sensible step.",
    icon: Wrench,
    tag: "Technical assistance",
  },
  {
    number: "04",
    title: "Genuine Spare Parts",
    description:
      "Source the right needles, feet, motors and replacement parts for your machine.",
    icon: PackageCheck,
    tag: "Parts & accessories",
  },
];

export default function ServicesRepairPage() {
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState("");
  const [submittedReference, setSubmittedReference] = useState("");

  function handleImages(event: ChangeEvent<HTMLInputElement>) {
    setImageError("");
    const files = Array.from(event.target.files ?? []);
    if (files.length + images.length > 5) {
      setImageError("You can upload up to 5 images.");
      return;
    }
    files.forEach((file) => {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setImageError("Only JPG, JPEG, PNG and WEBP files are supported.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Each image must be 5 MB or smaller.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") setImages((current) => [...current, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const reference = createReference("INQ");
    saveInquiry({
      id: crypto.randomUUID(),
      reference,
      type: "Service & Repair",
      name: String(data.get("name") || user?.name || ""),
      email: String(data.get("email") || user?.email || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
      status: "Pending",
      images,
      userId: user?.id,
      createdAt: new Date().toISOString(),
    });
    form.reset();
    setImages([]);
    setSubmittedReference(reference);
  }

  return (
    <main className="page-shell services-page">
      <div className="container">
        <Link href="/" className="link-arrow account-back-home">
          ← Back to Home
        </Link>

        <section className="services-hero">
          <div className="services-hero-content">
            <span className="services-label">
              <Wrench size={15} />
              PROFESSIONAL MACHINE SUPPORT
            </span>

            <h1>
              Keep your production
              <span> moving forward.</span>
            </h1>

            <p>
              From machine installation to expert repairs and genuine spare
              parts, we help keep your workshop running smoothly.
            </p>

            <div className="services-hero-actions">
              <Link href="/contact" className="btn btn-primary">
                Contact Support <ArrowRight size={17} />
              </Link>
              <span className="services-response-note">
                We&apos;re here to help your workshop.
              </span>
            </div>
          </div>

          <div className="services-hero-visual">
            <div className="services-hero-icon">
              <Wrench size={68} strokeWidth={1.3} />
            </div>
            <span className="services-visual-caption">
              Reliable support for every stage of production
            </span>
          </div>
        </section>

        <section className="services-options">
          <div className="services-section-heading">
            <div>
              <p className="eyebrow">HOW WE CAN HELP</p>
              <h2>Our Service & Repair Solutions</h2>
              <p>
                Explore our support options and find the right assistance for
                your equipment.
              </p>
            </div>
          </div>

          <div className="services-card-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article className="services-option-card" key={service.number}>
                  <div className="services-card-top">
                    <div className="services-card-icon">
                      <Icon size={27} strokeWidth={1.7} />
                    </div>
                    <span className="services-card-number">
                      {service.number}
                    </span>
                  </div>

                  <span className="services-card-tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <Link
                    href="/contact"
                    className="services-card-link"
                    aria-label={`Contact us about ${service.title}`}
                  >
                    Get support <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="services-inquiry-section">
          <div className="services-section-heading">
            <div>
              <p className="eyebrow">REQUEST ASSISTANCE</p>
              <h2>Submit a Service or Repair Inquiry</h2>
              <p>Guest submissions are welcome. Add photos to help our technicians understand the issue.</p>
            </div>
          </div>
          <form className="services-inquiry-form page-card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>Name<input required name="name" defaultValue={user?.name ?? ""} placeholder="Your name" /></label>
              <label>Phone<input required name="phone" type="tel" placeholder="07x xxx xxxx" /></label>
              <label className="form-span-two">Email<input required name="email" type="email" defaultValue={user?.email ?? ""} placeholder="you@example.com" /></label>
              <label className="form-span-two">Describe the issue<textarea required name="message" rows={5} placeholder="Machine model, symptoms and preferred support" /></label>
            </div>
            <label className="inquiry-upload">
              <strong>Upload images</strong>
              <span>JPG, PNG or WEBP, up to 5 MB each</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleImages} />
            </label>
            {imageError ? <p className="form-error-text" role="alert">{imageError}</p> : null}
            {images.length ? (
              <div className="inquiry-previews">
                {images.map((image, index) => (
                  <div key={`${index}-${image.slice(-12)}`}>
                    {/* eslint-disable-next-next-line @next/next/no-img-element */}
                    <img src={image} alt={`Upload preview ${index + 1}`} />
                    <button type="button" onClick={() => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
                  </div>
                ))}
              </div>
            ) : null}
            <button type="submit" className="btn btn-primary">Submit inquiry</button>
            {submittedReference ? (
              <div className="form-feedback form-success" role="status">
                Inquiry submitted successfully. Your reference number is <strong>{submittedReference}</strong>.
              </div>
            ) : null}
          </form>
        </section>

        <section className="services-bottom-cta">
          <div className="services-cta-icon">
            <Headset size={28} />
          </div>
          <div>
            <h2>Need help with your machine?</h2>
            <p>
              Get in touch with our team and tell us how we can assist your
              workshop.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Contact Us <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}
