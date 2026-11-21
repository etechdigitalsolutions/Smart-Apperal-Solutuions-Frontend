"use client";

import AccountPanel from "@/components/account/AccountPanel";
import { useAuth } from "@/hooks/useAuth";
import { getQuotations } from "@/lib/utils/inquiries";
import { formatCurrency } from "@/lib/utils/helpers";
import { useState } from "react";
import type { Quotation } from "@/types";

export default function QuotationHistoryPage() {
  const { user } = useAuth();
  const [quotations] = useState<Quotation[]>(() =>
    getQuotations().filter((item) => !item.userId || item.userId === user?.id)
  );

  return (
    <AccountPanel title="My quotations" description="View quotation requests and their current status.">
      {quotations.length ? (
        <div className="quotation-history">
          {quotations.map((item) => (
            <article className="account-card quotation-history-card" key={item.id}>
              <div className="inquiry-card-heading">
                <div><strong>{item.reference}</strong><span>{new Date(item.createdAt).toLocaleDateString()}</span></div>
                <span className={`status-pill ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span>
              </div>
              <div className="quotation-history-items">
                {item.items.map((line) => (
                  <p key={line.productId}><span>{line.name}</span><b>× {line.quantity}</b><strong>{formatCurrency(line.price * line.quantity)}</strong></p>
                ))}
              </div>
              {item.notes ? <p>{item.notes}</p> : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state"><h2>No quotations yet</h2><p>Your submitted quotation requests will appear here.</p></div>
      )}
    </AccountPanel>
  );
}
