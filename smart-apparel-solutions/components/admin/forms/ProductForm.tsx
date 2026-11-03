"use client";

import { FormEvent, useState } from "react";

export default function ProductForm() {
  const [saved, setSaved] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaved(true); }
  return saved ? <div className="success-panel"><h2>Product draft saved</h2><p>The listing is ready for a final review.</p></div> : <form className="page-card form-grid admin-form" onSubmit={submit}><label>Product name<input required placeholder="Industrial machine name" /></label><label>Brand<input required placeholder="Brand" /></label><label>Price<input required type="number" min="0" placeholder="0" /></label><label>Stock<input required type="number" min="0" placeholder="0" /></label><label className="form-span-two">Description<textarea required placeholder="Describe the operation and ideal use case" /></label><label>Category<select><option>Sewing Machines</option><option>Cutting</option><option>Ironing & Finishing</option><option>Spare Parts</option></select></label><label>Stock status<select><option>In stock</option><option>Pre-order</option><option>Out of stock</option></select></label><button className="btn btn-primary" type="submit">Save product</button></form>;
}
