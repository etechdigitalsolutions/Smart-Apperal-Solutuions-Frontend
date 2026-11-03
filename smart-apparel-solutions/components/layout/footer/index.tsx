import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

import config from "@/config";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Smart Apparel Solutions</h3>
            <p>Industrial sewing, cutting and finishing machines for workshops across Sri Lanka.</p>
            <div className="footer-newsletter">
              <input type="email" aria-label="Email address" placeholder="Your email" />
              <button type="button" className="btn btn-primary btn-small">Join</button>
            </div>
            <div className="payment-row">
              <Image src="/images/payments/visa-logo.png" alt="Visa" width={52} height={32} className="payment-logo" />
              <Image src="/images/payments/mastercard-logo.png" alt="Mastercard" width={52} height={32} className="payment-logo" />
              <Image src="/images/payments/koko-logo.png" alt="Koko" width={58} height={26} className="payment-logo payment-logo-koko" />
              <Image src="/images/payments/webxpay-cards.png" alt="Webxpay accepted cards" width={86} height={32} className="payment-logo payment-logo-webxpay" />
            </div>
          </div>

          <div className="footer-column">
            <h4>Product Index</h4>
            <ul>
              <li><Link href="/products?category=sewing-machines">Sewing Machines</Link></li>
              <li><Link href="/products?category=cutting">Cutting</Link></li>
              <li><Link href="/products?category=ironing-finishing">Ironing & Finishing</Link></li>
              <li><Link href="/products?category=spare-parts">Spare Parts</Link></li>
              <li><Link href="/products?category=accessories">Accessories</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Policies & Help</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/track-order">Track order</Link></li>
              <li><Link href="/installments">Installments</Link></li>
              <li><Link href="/services-repair">Services & Repair</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Visit our showroom</h4>
            <p>{config.address}</p>
            <p>Mon–Sat: 9:00 AM – 7:00 PM</p>
            <p>{config.phone}</p>
            <p>{config.email}</p>
            <div className="social-links" aria-label="Social media links">
              <Link href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Image src="/images/social/facebook.png" alt="" width={18} height={18} /><span>Facebook</span></Link>
              <Link href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Image src="/images/social/youtube.png" alt="" width={18} height={18} /><span>YouTube</span></Link>
              <Link href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Image src="/images/social/instagram.png" alt="" width={18} height={18} /><span>Instagram</span></Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Smart Apparel Solutions</p>
          <div className="footer-bottom-actions">
            <Link href={config.whatsappUrl} target="_blank" rel="noreferrer" className="footer-whatsapp" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
              <Image src="/images/social/whatsapp.png" alt="" width={22} height={22} />
            </Link>
            <Link href="#top" className="back-to-top" aria-label="Back to top" title="Back to top">
              <ArrowUp size={20} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
