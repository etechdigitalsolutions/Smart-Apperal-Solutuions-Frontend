"use client";

import { FormEvent, useState } from "react";
import { Camera, Check, UserRound } from "lucide-react";
import AccountPanel from "@/components/account/AccountPanel";
import { useAuth } from "@/hooks/useAuth";
import { Toast } from "@/components/ui/toast";

const AVATAR_KEY = "profile-avatar";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(() =>
    typeof window === "undefined" ? user?.name ?? "Nimal Perera" : localStorage.getItem("profile-name") || user?.name || "Nimal Perera"
  );
  const [phone, setPhone] = useState(() =>
    typeof window === "undefined" ? "+94 71 206 1850" : localStorage.getItem("profile-phone") || "+94 71 206 1850"
  );
  const [avatar, setAvatar] = useState<string | null>(() =>
    typeof window === "undefined" ? null : localStorage.getItem(AVATAR_KEY)
  );
  const [saved, setSaved] = useState(false);
  const [initialName, setInitialName] = useState(name);
  const [initialPhone, setInitialPhone] = useState(phone);

  function save(event: FormEvent) {
    event.preventDefault();
    localStorage.setItem("profile-name", name);
    localStorage.setItem("profile-phone", phone);
    if (avatar) localStorage.setItem(AVATAR_KEY, avatar);
    setInitialName(name);
    setInitialPhone(phone);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  function cancel() {
    setName(initialName);
    setPhone(initialPhone);
  }

  function onAvatarChange(file: File | null) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    setAvatar(null);
    localStorage.removeItem(AVATAR_KEY);
  }

  const dirty = name !== initialName || phone !== initialPhone;

  return (
    <AccountPanel
      title="My profile"
      description="Keep your contact details current for faster quotations and delivery updates."
    >
      <form className="account-card account-form" onSubmit={save}>
        <div className="profile-hero">
          <div className="profile-avatar-wrap">
            <div className="account-avatar large" aria-hidden>
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" />
              ) : (
                <UserRound size={25} />
              )}
            </div>
            <label className="profile-avatar-action" title="Change photo">
              <Camera size={14} aria-hidden />
              <span className="sr-only">Upload profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => onAvatarChange(event.target.files?.[0] ?? null)}
              />
            </label>
            {avatar ? (
              <button type="button" className="profile-avatar-remove" onClick={removeAvatar}>
                Remove photo
              </button>
            ) : null}
          </div>
          <div>
            <h2>Personal information</h2>
            <p>This information is only used to support your orders.</p>
          </div>
        </div>

        <div className="account-form-grid">
          <label htmlFor="profile-name">
            Full name
            <input
              id="profile-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </label>
          <label htmlFor="profile-email">
            Email address
            <input
              id="profile-email"
              name="email"
              value={user?.email ?? ""}
              readOnly
              autoComplete="email"
            />
          </label>
          <label htmlFor="profile-phone">
            Phone number
            <input
              id="profile-phone"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoComplete="tel"
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={cancel}
            disabled={!dirty}
          >
            Cancel
          </button>
          {saved ? (
            <span className="saved-message">
              <Check size={16} aria-hidden /> Profile updated
            </span>
          ) : null}
        </div>
      </form>

      {saved ? (
        <Toast variant="success">
          <Check size={16} aria-hidden /> Profile saved successfully
        </Toast>
      ) : null}
    </AccountPanel>
  );
}
