import Link from "next/link";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const sp = await searchParams;
  return (
    <section className="narrow">
      <h1>Sign in</h1>
      <p className="muted">Sign in to check out, track orders and manage returns.</p>
      <form action="/api/login" method="post" className="card stack">
        <input type="hidden" name="next" value={sp.next ?? "/"} />
        <label className="field"><span>Username</span><input name="username" autoComplete="username" data-testid="login-username" /></label>
        <label className="field"><span>Password</span><input name="password" type="password" autoComplete="current-password" data-testid="login-password" /></label>
        {sp.error ? <p className="notice err" data-testid="login-error" role="alert">Username or password is incorrect</p> : null}
        <button className="btn primary wide" data-testid="login-submit">Sign in</button>
        <Link href="/forgot-password" className="small" data-testid="forgot-password">Forgot your password?</Link>
      </form>
    </section>
  );
}
