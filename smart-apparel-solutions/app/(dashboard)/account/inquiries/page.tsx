"use client";

import AccountPanel from "@/components/account/AccountPanel";
import { useAuth } from "@/hooks/useAuth";
import { getInquiries } from "@/lib/utils/inquiries";
import { useState } from "react";
import type { Inquiry } from "@/types";

export default function InquiriesPage() {
  const { user } = useAuth();
  const [inquiries] = useState<Inquiry[]>(() =>
    getInquiries().filter((item) => !item.userId || item.userId === user?.id)
  );

  return (
    <AccountPanel title="My inquiries" description="Review service and repair requests submitted to our team.">
      {inquiries.length ? (
        <div className="inquiry-history">
          {inquiries.map((item) => (
            <article className="account-card inquiry-card" key={item.id}>
              <div className="inquiry-card-heading">
                <div><strong>{item.reference}</strong><span>{item.type}</span></div>
                <span className={`status-pill ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span>
              </div>
              <p>{item.message}</p>
              <small>{new Date(item.createdAt).toLocaleString()}</small>
              {item.images.length ? (
                <div className="inquiry-history-images">
                  {item.images.map((image, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={`${item.id}-${index}`} src={image} alt={`Submitted inquiry image ${index + 1}`} />
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state"><h2>No inquiries yet</h2><p>Submitted service and repair requests will appear here.</p></div>
      )}
    </AccountPanel>
  );
}
