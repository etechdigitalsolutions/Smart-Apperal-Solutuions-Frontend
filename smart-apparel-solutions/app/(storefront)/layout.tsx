import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
