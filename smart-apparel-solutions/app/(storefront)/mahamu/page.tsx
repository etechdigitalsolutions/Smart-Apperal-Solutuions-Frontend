import Link from "next/link";

export default function MahamuPage() {
  return <main className="page-shell"><div className="container narrow-content"><div className="page-heading"><p className="eyebrow">For growing workshops</p><h1>Mahamu: build your production line with confidence</h1><p>Get practical guidance for choosing machines, planning operations and improving output without overbuying equipment.</p></div><div className="feature-list"><div className="page-card"><strong>Map the operation</strong><p>We identify each seam, finish and material in your workflow.</p></div><div className="page-card"><strong>Match the machine</strong><p>Compare speed, stitch type, fabric handling and service availability.</p></div><div className="page-card"><strong>Plan the next step</strong><p>Start with what your workshop needs today and expand with a clear path.</p></div></div><Link href="/contact" className="btn btn-primary">Start a conversation</Link></div></main>;
}
