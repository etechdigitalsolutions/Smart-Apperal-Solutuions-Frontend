import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import StorefrontHomePage from "@/app/(storefront)/page";

export default function Home() {
  return (
    <div className="site-shell">
      <Header />
      <main className="main-content">
        <StorefrontHomePage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
//test