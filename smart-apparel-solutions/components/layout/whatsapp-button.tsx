import Link from "next/link";

import config from "@/config";

export default function WhatsAppButton() {
  return (
    <Link
      href={config.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </Link>
  );
}
