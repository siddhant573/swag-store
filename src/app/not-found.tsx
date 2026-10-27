import Link from "next/link";

export default function NotFound() {
  return (
    <section className="empty" data-testid="not-found">
      <h1>Page not found</h1>
      <p className="muted">That page doesn&apos;t exist.</p>
      <Link href="/shop" className="btn primary">Back to the shop</Link>
    </section>
  );
}
