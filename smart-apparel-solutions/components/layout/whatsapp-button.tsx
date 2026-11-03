import Link from "next/link";
import Image from "next/image";

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
      <Image src="/images/social/whatsapp.png" alt="" width={19} height={19} />
      <span>WhatsApp</span>
    </Link>
  );
}
