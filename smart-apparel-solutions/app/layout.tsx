import type { Metadata } from "next";
import { Inter, Noto_Sans_Sinhala } from "next/font/google";
import { CartProvider } from "@/hooks/useCart";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import "@/styles/auth-account.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/context/LanguageContext";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

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
  icons: {
    icon: "/images/logo/smart-apperal-logo.png",
    shortcut: "/images/logo/smart-apperal-logo.png",
    apple: "/images/logo/smart-apperal-logo.png",
  },
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
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <MobileBottomNav />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
