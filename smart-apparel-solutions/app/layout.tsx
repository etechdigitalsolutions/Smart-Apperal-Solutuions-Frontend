import type { Metadata } from "next";
import { Inter, Noto_Sans_Sinhala } from "next/font/google";
import { CartProvider } from "@/hooks/useCart";
import "@/styles/tokens.css";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  variable: "--font-sinhala",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Apparel Solutions",
  description: "Industrial sewing, cutting & finishing machines, spare parts and accessories in Sri Lanka",
  metadataBase: new URL("https://www.smartapparelsolutions.lk"),
  openGraph: {
    title: "Smart Apparel Solutions",
    description: "Industrial sewing, cutting & finishing machines, spare parts and accessories in Sri Lanka",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansSinhala.variable}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
