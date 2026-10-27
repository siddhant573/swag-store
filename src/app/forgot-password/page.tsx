"use client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <section className="narrow" data-testid="reset-sent">
        <h1>Check your inbox</h1>
        <p>If an account exists for <b>{username.trim()}</b>, we&apos;ve sent a link to reset your password. It expires in 30 minutes.</p>
        <Link href="/login" className="btn ghost">Back to sign in</Link>
      </section>
    );
  return (
    <section className="narrow">
      <h1>Reset your password</h1>
      <p className="muted">Enter your username and we&apos;ll send you a reset link.</p>
      <div className="card stack">
        <label className="field"><span>Username</span><input value={username} onChange={(e) => setUsername(e.target.value)} data-testid="reset-username" /></label>
        {error ? <p className="err" data-testid="reset-error" role="alert">{error}</p> : null}
        <button className="btn primary wide" data-testid="reset-submit" onClick={() => (username.trim() ? setSent(true) : setError("Enter your username"))}>Send reset link</button>
        <Link href="/login" className="small">Back to sign in</Link>
      </div>
    </section>
  );
}
