
import Link from "next/link";
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
                We're here to help your workshop.
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
