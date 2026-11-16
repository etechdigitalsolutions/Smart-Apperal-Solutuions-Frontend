"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Check, LockKeyhole, LogOut, Trash2 } from "lucide-react";
import AccountPanel from "@/components/account/AccountPanel";
import { useAuth } from "@/hooks/useAuth";
import { Modal } from "@/components/ui/modal";
import { Toast } from "@/components/ui/toast";

export default function UserSettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [saved, setSaved] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [whatsapp, setWhatsapp] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function save(event: FormEvent) {
    event.preventDefault();
    localStorage.setItem("account-settings", JSON.stringify({ emailUpdates, whatsapp }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  function handleLogout() {
    logout();
    setConfirmLogout(false);
    router.replace("/login");
  }

  function handleDelete() {
    localStorage.removeItem("account-settings");
    localStorage.removeItem("profile-name");
    localStorage.removeItem("profile-phone");
    localStorage.removeItem("profile-avatar");
    logout();
    setConfirmDelete(false);
    router.replace("/login");
  }

  return (
    <AccountPanel
      title="Account settings"
      description="Choose how we keep you informed and manage your account security."
    >
      <form className="settings-stack" onSubmit={save}>
        <section className="account-card settings-card">
          <div className="settings-heading">
            <span className="stat-icon blue" aria-hidden>
              <Bell size={19} />
            </span>
            <div>
              <h2>Notification preferences</h2>
              <p>Stay informed about your orders and new equipment.</p>
            </div>
          </div>

          <label className="setting-toggle">
            <span>
              <strong>Email updates</strong>
              <small>Order confirmations and quotation updates</small>
            </span>
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={(event) => setEmailUpdates(event.target.checked)}
              aria-label="Email updates"
            />
          </label>

          <label className="setting-toggle">
            <span>
              <strong>WhatsApp updates</strong>
              <small>Delivery and service notifications</small>
            </span>
            <input
              type="checkbox"
              checked={whatsapp}
              onChange={(event) => setWhatsapp(event.target.checked)}
              aria-label="WhatsApp updates"
            />
          </label>
        </section>

        <section className="account-card settings-card">
          <div className="settings-heading">
            <span className="stat-icon green" aria-hidden>
              <LockKeyhole size={19} />
            </span>
            <div>
              <h2>Password & security</h2>
              <p>Keep your account protected with a strong password.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => router.push("/reset-password")}
          >
            Change password
          </button>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save preferences
          </button>
          {saved ? (
            <span className="saved-message">
              <Check size={16} aria-hidden /> Preferences saved
            </span>
          ) : null}
        </div>
      </form>

      <section className="account-card settings-card danger-zone" aria-labelledby="danger-zone-title">
        <div className="settings-heading">
          <span className="stat-icon pink" aria-hidden>
            <Trash2 size={19} />
          </span>
          <div>
            <h2 id="danger-zone-title">Danger zone</h2>
            <p>Sign out of this device or permanently remove local account data.</p>
          </div>
        </div>
        <div className="danger-actions">
          <button type="button" className="btn btn-outline" onClick={() => setConfirmLogout(true)}>
            <LogOut size={16} aria-hidden /> Logout
          </button>
          <button
            type="button"
            className="btn btn-danger-outline"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 size={16} aria-hidden /> Delete account data
          </button>
        </div>
      </section>

      {saved ? (
        <Toast variant="success">
          <Check size={16} aria-hidden /> Preferences saved
        </Toast>
      ) : null}

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
        <p>You will need to sign in again to access your account.</p>
      </Modal>

      <Modal
        open={confirmDelete}
        title="Delete account data?"
        onClose={() => setConfirmDelete(false)}
        actions={
          <>
            <button type="button" className="btn btn-outline" onClick={() => setConfirmDelete(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete and logout
            </button>
          </>
        }
      >
        <p>
          This removes locally stored profile and preference data from this browser, then signs you
          out. This demo action cannot be undone.
        </p>
      </Modal>
    </AccountPanel>
  );
}
