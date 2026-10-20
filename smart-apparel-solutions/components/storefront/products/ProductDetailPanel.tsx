"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/helpers";
import { formatKokoInstallment } from "@/lib/utils/koko";
import type { Product } from "@/types";

export default function ProductDetailPanel({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const isOutOfStock = product.stockStatus === "out_of_stock";

  return (
    <main className="page-shell">
      <div className="container">
        <div className="breadcrumbs"><Link href="/products">Products</Link><span>/</span><span>{product.name}</span></div>
        <div className="product-detail-shell">
          <section className="gallery-panel">
            <div className="gallery-main"><Image src={activeImage} alt={product.name} fill sizes="(max-width: 980px) 100vw, 60vw" /></div>
            <div className="gallery-thumbs">{product.images.map((image) => <button key={image} type="button" className={`gallery-thumb ${activeImage === image ? "gallery-thumb-active" : ""}`} onClick={() => setActiveImage(image)}><Image src={image} alt="" width={180} height={120} /></button>)}</div>
          </section>
          <aside className="buy-box">
            <p className="eyebrow">{product.brand} · {product.modelCode}</p>
            <h1>{product.name}</h1>
            <p className="detail-description">{product.description}</p>
            <div className="detail-price"><strong>{formatCurrency(product.price)}</strong>{product.comparePrice ? <span className="strike">{formatCurrency(product.comparePrice)}</span> : null}</div>
            
            <div className="product-installment">
              <span>{formatKokoInstallment(product.price)}</span>

              <a
                href={`https://paykoko.com/customer-education?Amount=${(product.price / 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                target="_blank"
                rel="noopener noreferrer"
                className="koko-link"
                aria-label="Learn more about Koko installments"
              >
                <Image
                  src="/images/payments/koko-logo.png"
                  alt="Koko"
                  width={38}
                  height={18}
                  className="koko-logo"
                />
              </a>

              <a
                href={`https://paykoko.com/customer-education?Amount=${(product.price / 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                target="_blank"
                rel="noopener noreferrer"
                className="koko-link"
                aria-label="Koko payment information"
              >
                <span className="koko-info-icon" aria-hidden="true">i</span>
              </a>
            </div>

            <div className="product-stock"><span className={`stock-dot ${product.stockStatus}`} />{product.stockStatus === "in_stock" ? `${product.stock} ready to dispatch` : product.stockStatus === "pre_order" ? "Available for pre-order" : "Currently unavailable"}</div>
            <div className="quantity-control"><span>Quantity</span><div><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity(Math.min(Math.max(product.stock, 1), quantity + 1))}>+</button></div></div>
            <div className="buy-actions"><button type="button" className="btn btn-primary" disabled={isOutOfStock} onClick={() => addItem({ productId: product.id, product, quantity })}>{isOutOfStock ? "Unavailable" : "Add to quotation cart"}</button><a className="btn btn-secondary" href={`https://wa.me/94712061850?text=${encodeURIComponent(`I need a quotation for ${product.name}`)}`}>Ask on WhatsApp</a></div>
            <div className="detail-trust"><span>✓ Island-wide delivery</span><span>✓ Genuine parts support</span><span>✓ Technician guidance</span></div>
          </aside>
        </div>
        <section className="detail-lower-grid"><div className="page-card"><p className="eyebrow">Technical information</p><h2>Specifications</h2><dl className="spec-list">{Object.entries(product.specs).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}<div><dt>SKU</dt><dd>{product.sku}</dd></div></dl></div><div className="page-card"><p className="eyebrow">Choosing the right machine</p><h2>Need help comparing?</h2><p>Tell us about your operation, fabric weight and output target. Our team can recommend the right machine and accessories for your workshop.</p><Link href="/contact" className="btn btn-primary">Request expert advice</Link></div></section>
      </div>
    </main>
  );
}
