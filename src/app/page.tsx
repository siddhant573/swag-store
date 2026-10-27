import Link from "next/link";
import { CATALOG, CATEGORIES } from "@/data/catalog";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";

const CAT_ART: Record<string, string> = { apparel: "mona-hoodie", accessories: "dependabot-plush", stickers: "sticker-pack" };

export default function HomePage() {
  const featured = [...CATALOG].sort((a, b) => a.featured - b.featured).slice(0, 4);
  const newIn = CATALOG.filter((p) => p.badge === "New" || p.badge === "Limited");
  return (
    <>
      <section className="hero" data-testid="hero">
        <div>
          <p className="small muted" style={{ margin: 0, fontWeight: 600 }}>THE UNIVERSE 2026 COLLECTION</p>
          <h1>Gear for people who ship.</h1>
          <p>Heavyweight hoodies, everyday tees and desk companions. Take 20% off merchandise this week with code <b>UNIVERSE20</b>.</p>
          <div className="actions">
            <Link href="/shop" className="btn primary" data-testid="hero-shop">Shop the collection</Link>
            <Link href="/shop?category=apparel" className="btn ghost">Shop apparel</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <ProductArt id="octocat-tee" /><ProductArt id="mona-hoodie" /><ProductArt id="copilot-cap" /><ProductArt id="universe-mug" />
        </div>
      </section>

      <section className="cats" aria-label="Shop by category">
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={`/shop?category=${c.id}`} className="cat" data-testid={`home-category-${c.id}`}>
            <ProductArt id={CAT_ART[c.id]} />
            <span><b>{c.label}</b><span className="small muted">{CATALOG.filter((p) => p.category === c.id).length} products</span></span>
          </Link>
        ))}
      </section>

      <section>
        <div className="section-head"><h2>Bestsellers</h2><Link href="/shop" className="small">View all →</Link></div>
        <div className="grid" data-testid="featured">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <section style={{ marginTop: 44 }}>
        <div className="section-head"><h2>New this season</h2></div>
        <div className="grid" data-testid="new-in">{newIn.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
    </>
  );
}
