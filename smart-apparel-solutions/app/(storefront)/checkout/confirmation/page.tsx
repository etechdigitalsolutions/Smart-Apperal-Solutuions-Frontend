import Link from "next/link";

export default function OrderConfirmationPage() {
  return <main className="page-shell"><div className="container narrow-content"><div className="success-panel"><p className="eyebrow">Thank you</p><h1>Your request is with our team.</h1><p>We will contact you with availability, delivery timing and the best payment option for your order.</p><Link href="/products" className="btn btn-primary">Browse more equipment</Link></div></div></main>;
}
