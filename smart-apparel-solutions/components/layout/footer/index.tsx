import Link from "next/link";

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
              <span className="payment-pill">Visa</span>
              <span className="payment-pill">Mastercard</span>
              <span className="payment-pill">Koko</span>
              <span className="payment-pill">Wallets</span>
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
            <div className="payment-row">
              <Link href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</Link>
              <Link href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</Link>
              <Link href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Smart Apparel Solutions</p>
          <Link href="#top" className="btn btn-outline btn-small">Back to top</Link>
        </div>
      </div>
    </footer>
  );
}
