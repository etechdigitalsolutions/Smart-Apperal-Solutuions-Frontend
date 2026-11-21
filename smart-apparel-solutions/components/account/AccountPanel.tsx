"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Settings,
  UserRound,
  ClipboardList,
  ReceiptText,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";

interface AccountPanelProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const navigation = [
  { label: "Overview", href: "/account", icon: LayoutDashboard },
  { label: "My Profile", href: "/account/profile", icon: UserRound },
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "My Inquiries", href: "/account/inquiries", icon: ClipboardList },
  { label: "My Quotations", href: "/account/quotations", icon: ReceiptText },
  { label: "My Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Saved Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Account Settings", href: "/account/settings", icon: Settings },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/account") return pathname === "/account";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AccountPanel({ title, description, children }: AccountPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isHydrated } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("profile-avatar");
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  useEffect(() => {
    if (isHydrated && !user) router.replace("/login?returnTo=%2Faccount");
  }, [isHydrated, router, user]);

  if (!isHydrated || !user) {
    return (
      <main className="account-loading" aria-busy="true" aria-live="polite">
        <div className="account-loading-card" aria-hidden>
          <div className="account-skeleton account-skeleton-sidebar" />
          <div className="account-skeleton account-skeleton-main" />
        </div>
        <p>Loading your account…</p>
      </main>
    );
  }

  function handleLogout() {
    logout();
    setConfirmLogout(false);
    router.replace("/login");
  }

  return (
    <main className="account-shell">
      <div className="account-layout container">
        <aside className="account-sidebar">
          <Link href="/" className="account-brand">
            <span>SAS</span>
            <strong>My account</strong>
          </Link>

          <div className="account-user">
            <Avatar name={user.name} src={avatar} />
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>

          <nav className="account-nav" aria-label="Account navigation">
            {navigation.map(({ label, href, icon: Icon }) => {
              const active = isActivePath(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={active ? "is-active" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={18} aria-hidden />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="account-logout"
            onClick={() => setConfirmLogout(true)}
          >
            <LogOut size={18} aria-hidden /> Logout
          </button>
        </aside>

        <section className="account-content">
          <div className="account-heading">
            <div>
              <p className="eyebrow">Customer account</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <Link href="/products" className="btn btn-primary">
              Explore equipment
            </Link>
          </div>
          {children}
        </section>
      </div>

      <Modal
        open={confirmLogout}
        title="Sign out?"
        onClose={() => setConfirmLogout(false)}
        actions={
          <>
            <button type="button" className="btn btn-outline" onClick={() => setConfirmLogout(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        }
      >
        <p>You will need to sign in again to access your account, orders and wishlist.</p>
      </Modal>
    </main>
  );
}
