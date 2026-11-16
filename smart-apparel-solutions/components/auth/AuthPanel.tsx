"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MailCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";

type Mode = "login" | "register" | "forgot" | "reset";

interface AuthPanelProps {
  mode: Mode;
}

const DEMO_EMAIL = "demo@smartapparel.com";
const DEMO_PASSWORD = "SmartApparel123!";
// Demo credentials are only shown outside production.
const SHOW_DEMO = process.env.NODE_ENV !== "production";

const titles: Record<Mode, string> = {
  login: "Welcome back",
  register: "Create your account",
  forgot: "Recover your account",
  reset: "Set a new password",
};

const descriptions: Record<Mode, string> = {
  login: "Access quotations, orders and saved equipment.",
  register: "Save your workshop preferences and track requests.",
  forgot: "Enter your email and we will send recovery instructions.",
  reset: "Choose a secure password for your account.",
};

const submitLabels: Record<Mode, string> = {
  login: "Sign in",
  register: "Create account",
  forgot: "Send recovery link",
  reset: "Update password",
};

const busyLabels: Record<Mode, string> = {
  login: "Signing in…",
  register: "Creating account…",
  forgot: "Sending…",
  reset: "Updating…",
};

/** Only allow same-site relative paths to avoid open-redirect attacks. */
function getSafeReturnTo(): string {
  if (typeof window === "undefined") return "/account";
  const value = new URLSearchParams(window.location.search).get("returnTo");
  if (value && value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) {
    return value;
  }
  return "/account";
}

function passwordScore(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

type StrengthTone = "weak" | "fair" | "good" | "strong";

const strengthMeta: Array<{ label: string; tone: StrengthTone }> = [
  { label: "Too weak", tone: "weak" },
  { label: "Weak", tone: "weak" },
  { label: "Fair", tone: "fair" },
  { label: "Good", tone: "good" },
  { label: "Strong", tone: "strong" },
];

interface FieldProps {
  id: string;
  label: string;
  icon: ReactNode;
  trailing?: ReactNode;
  error?: string;
  children: (className: string) => ReactNode;
}

function Field({ id, label, icon, trailing, error, children }: FieldProps) {
  return (
    <div className={`auth-field${error ? " is-invalid" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <span className="auth-field-icon" aria-hidden>
          {icon}
        </span>
        {children("auth-field-input")}
        {trailing ? <span className="auth-field-trailing">{trailing}</span> : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="auth-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function AuthPanel({ mode }: AuthPanelProps) {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { add } = useWishlist();

  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(mode === "login" && SHOW_DEMO ? DEMO_EMAIL : "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const busy = isLoading || pending;
  const needsEmail = mode !== "reset";
  const needsPassword = mode !== "forgot";
  const score = useMemo(() => passwordScore(password), [password]);

  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  function validateFields(): Record<string, string> {
    const next: Record<string, string> = {};
    if (mode === "register" && name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (needsEmail && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (mode === "register" && phone && !/^[0-9+\s-]{9,15}$/.test(phone.trim())) {
      next.phone = "Enter a valid phone number.";
    }
    if (needsPassword && password.length < 8) {
      next.password = "Your password must be at least 8 characters.";
    } else if ((mode === "register" || mode === "reset") && score < 2) {
      next.password = "Choose a stronger password – mix upper/lower case letters, numbers or symbols.";
    }
    if (mode === "reset" && password !== confirm) {
      next.confirm = "Passwords do not match.";
    }
    return next;
  }

  function validate(): string | null {
    const next = validateFields();
    setFieldErrors(next);
    const first = Object.values(next)[0];
    return first ?? null;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setTouched(true);
    setError("");

    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }

    if (mode !== "login") {
      // TODO: wire these to your real API (register / forgot-password / reset-password).
      setPending(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 700));
        setSubmitted(true);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setPending(false);
      }
      return;
    }

    try {
      await login({ email: email.trim(), password }, rememberMe);
      try {
        const pendingProduct = sessionStorage.getItem("pending-wishlist-product");
        if (pendingProduct) {
          add(pendingProduct);
          sessionStorage.removeItem("pending-wishlist-product");
        }
      } catch {
        /* storage unavailable – ignore */
      }
      setSubmitted(true);
      const returnTo = getSafeReturnTo();
      redirectTimer.current = setTimeout(() => router.replace(returnTo), 700);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    }
  }

  function useDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
    setFieldErrors({});
  }

  function onBlurValidate() {
    if (!touched) return;
    setFieldErrors(validateFields());
  }

  const strength = strengthMeta[score];

  return (
    <main className="auth-shell">
      <div className="auth-layout">
        <aside className="auth-visual" aria-hidden={false}>
          <div className="auth-visual-glow auth-visual-glow-top" />
          <div className="auth-visual-glow auth-visual-glow-bottom" />
          <div className="auth-visual-grid" />

          <Link href="/" className="auth-logo">
            <Image
              src="/images/logo/smart-apperal-logo.png"
              alt="Smart Apparel Solutions"
              width={150}
              height={70}
              priority
            />
          </Link>

          <div className="auth-visual-copy">
            <span className="auth-visual-kicker">
              <Sparkles size={13} aria-hidden /> Built for better production
            </span>
            <h2>Everything your workshop needs, in one place.</h2>
            <p>
              Save the equipment you love, track quotations and keep your next production upgrade
              moving.
            </p>
            <ul>
              {[
                "Curated industrial equipment",
                "Expert support when you need it",
                "Simple, secure account access",
              ].map((item) => (
                <li key={item}>
                  <span>
                    <Check size={14} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="auth-visual-footer">
            Smart Apparel Solutions <span className="auth-dot">·</span> Colombo, Sri Lanka
          </p>
        </aside>

        <section className="auth-panel">
          <div className="auth-mobile-home">
            <Link href="/" className="account-back-home">
              <ArrowLeft size={16} aria-hidden /> Back to home
            </Link>
          </div>

          <div className="auth-heading">
            <span className="auth-heading-icon" aria-hidden>
              <LockKeyhole size={20} />
            </span>
            <div>
              <p className="eyebrow">Customer account</p>
              <h1>{titles[mode]}</h1>
              <p>{descriptions[mode]}</p>
            </div>
          </div>

          {submitted ? (
            <div role="status" className="success-panel">
              <span className="success-icon" aria-hidden>
                {mode === "login" ? <ShieldCheck size={28} /> : <MailCheck size={28} />}
              </span>
              <h2>
                {mode === "login"
                  ? "Welcome back!"
                  : mode === "reset"
                    ? "Password updated"
                    : "Request received"}
              </h2>
              <p>
                {mode === "login"
                  ? "Taking you to your dashboard…"
                  : mode === "reset"
                    ? "You can now sign in with your new password."
                    : "Check your inbox or continue browsing the catalogue."}
              </p>
              {mode === "login" ? (
                <LoaderCircle size={20} className="animate-spin" aria-hidden />
              ) : (
                <Link
                  href={mode === "reset" || mode === "register" ? "/login" : "/"}
                  className="btn btn-primary"
                >
                  {mode === "reset" || mode === "register" ? "Go to sign in" : "Back to home"}{" "}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              )}
            </div>
          ) : (
            <form className="auth-form" onSubmit={submit} noValidate>
              {mode === "register" ? (
                <Field
                  id="name"
                  label="Full name"
                  icon={<User size={17} />}
                  error={fieldErrors.name}
                >
                  {(cls) => (
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={onBlurValidate}
                      disabled={busy}
                      className={cls}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    />
                  )}
                </Field>
              ) : null}

              {needsEmail ? (
                <Field
                  id="email"
                  label="Email address"
                  icon={<Mail size={17} />}
                  error={fieldErrors.email}
                >
                  {(cls) => (
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={onBlurValidate}
                      disabled={busy}
                      className={cls}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    />
                  )}
                </Field>
              ) : null}

              {mode === "register" ? (
                <Field
                  id="phone"
                  label="Phone number (optional)"
                  icon={<Phone size={17} />}
                  error={fieldErrors.phone}
                >
                  {(cls) => (
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="07x xxx xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={onBlurValidate}
                      disabled={busy}
                      className={cls}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                    />
                  )}
                </Field>
              ) : null}

              {needsPassword ? (
                <div>
                  <Field
                    id="password"
                    label={mode === "reset" ? "New password" : "Password"}
                    icon={<LockKeyhole size={17} />}
                    error={fieldErrors.password}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="auth-password-toggle"
                      >
                        {showPassword ? <EyeOff size={17} aria-hidden /> : <Eye size={17} aria-hidden />}
                      </button>
                    }
                  >
                    {(cls) => (
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={onBlurValidate}
                        disabled={busy}
                        className={cls}
                        aria-invalid={Boolean(fieldErrors.password)}
                        aria-describedby={fieldErrors.password ? "password-error" : undefined}
                      />
                    )}
                  </Field>

                  {(mode === "register" || mode === "reset") && password ? (
                    <div aria-live="polite">
                      <div className="password-strength" aria-hidden>
                        {[1, 2, 3, 4].map((i) => (
                          <span
                            key={i}
                            className={`strength-bar${i <= score ? ` is-filled is-${strength.tone}` : ""}`}
                          />
                        ))}
                      </div>
                      <p className={`strength-label is-${strength.tone}`}>{strength.label}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {mode === "reset" ? (
                <Field
                  id="confirm"
                  label="Confirm new password"
                  icon={<LockKeyhole size={17} />}
                  error={fieldErrors.confirm}
                >
                  {(cls) => (
                    <input
                      id="confirm"
                      name="confirm"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Repeat your password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      onBlur={onBlurValidate}
                      disabled={busy}
                      className={cls}
                      aria-invalid={Boolean(fieldErrors.confirm)}
                      aria-describedby={fieldErrors.confirm ? "confirm-error" : undefined}
                    />
                  )}
                </Field>
              ) : null}

              {mode === "login" ? (
                <div className="auth-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="auth-checkbox"
                    />
                    Remember me
                  </label>
                  <Link href="/forgot-password" className="auth-link">
                    Forgot password?
                  </Link>
                </div>
              ) : null}

              <div aria-live="assertive">
                {error ? (
                  <p role="alert" className="form-error">
                    <AlertCircle size={17} aria-hidden />
                    {error}
                  </p>
                ) : null}
              </div>

              <button type="submit" disabled={busy} className="btn btn-primary" aria-busy={busy}>
                {busy ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" aria-hidden /> {busyLabels[mode]}
                  </>
                ) : (
                  <>
                    {submitLabels[mode]}
                    <ArrowRight size={17} aria-hidden />
                  </>
                )}
              </button>

              {mode === "login" && SHOW_DEMO ? (
                <div className="demo-hint">
                  <div>
                    <span>Demo access</span>
                    <strong>{DEMO_EMAIL}</strong>
                  </div>
                  <button type="button" onClick={useDemo} className="btn btn-outline">
                    Autofill
                  </button>
                </div>
              ) : null}
            </form>
          )}

          <div className="auth-links">
            {mode === "login" ? (
              <span>
                New to Smart Apparel?{" "}
                <Link href="/register">Create an account</Link>
              </span>
            ) : (
              <span>
                {mode === "register" ? "Already have an account?" : "Remembered your password?"}{" "}
                <Link href="/login">Sign in</Link>
              </span>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
