"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

interface AuthPanelProps { mode: "login" | "register" | "forgot" | "reset"; }

export default function AuthPanel({ mode }: AuthPanelProps) {
  const [submitted, setSubmitted] = useState(false);
  const titles = { login: "Welcome back", register: "Create your account", forgot: "Recover your account", reset: "Set a new password" };
  const descriptions = { login: "Access quotations, orders and saved equipment.", register: "Save your workshop preferences and track requests.", forgot: "Enter your email and we will send recovery instructions.", reset: "Choose a secure password for your account." };
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <main className="auth-shell"><div className="auth-panel"><p className="eyebrow">Smart Apparel Solutions</p><h1>{titles[mode]}</h1><p>{descriptions[mode]}</p>{submitted ? <div className="success-panel"><h2>Request received</h2><p>Check your inbox or continue browsing the catalogue.</p><Link href="/products" className="btn btn-primary">Browse equipment</Link></div> : <form className="auth-form" onSubmit={submit}>{mode === "register" ? <label>Full name<input required placeholder="Your name" /></label> : null}<label>Email address<input type="email" required placeholder="you@example.com" /></label>{mode !== "forgot" ? <label>Password<input type="password" required minLength={8} placeholder="At least 8 characters" /></label> : null}{mode === "register" ? <label>Phone number<input placeholder="07x xxx xxxx" /></label> : null}<button type="submit" className="btn btn-primary">{mode === "login" ? "Sign in" : mode === "register" ? "Create account" : "Continue"}</button></form>}<div className="auth-links">{mode !== "login" ? <Link href="/login">Sign in</Link> : <Link href="/forgot-password">Forgot password?</Link>}{mode !== "register" ? <Link href="/register">Create account</Link> : null}</div></div></main>;
}
