import CheckoutForm from "@/components/storefront/checkout/CheckoutForm";

export default function CheckoutPage() {
  return <main className="page-shell"><div className="container narrow-content"><div className="page-heading"><p className="eyebrow">Quotation cart</p><h1>Tell us where to send your setup</h1><p>There is no payment obligation. We will confirm availability and delivery before you commit.</p></div><CheckoutForm /></div></main>;
}
