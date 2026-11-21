"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [submitted, setSubmitted] = useState(false);
  return <main className="page-shell"><div className="container narrow-content"><div className="page-heading"><p className="eyebrow">Delivery updates</p><h1>Track your order</h1><p>Enter the reference number from your quotation or delivery confirmation.</p></div><form className="tracking-form page-card" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Order reference<input required placeholder="SAS-000123" /></label><label>Phone number<input required placeholder="07x xxx xxxx" /></label><button className="btn btn-primary" type="submit">Check status</button></form>{submitted ? <div className="success-panel"><h2>We have received your request.</h2><p>Our team will confirm the latest delivery status by phone or WhatsApp.</p></div> : null}</div></main>;
}
