import Link from "next/link";
import { notFound } from "next/navigation";
import { CATALOG, CATEGORIES, findProduct } from "@/data/catalog";
import { SEED_REVIEWS, averageRating, starText } from "@/data/reviews";
import { ProductCard } from "@/components/ProductCard";
import { Gallery } from "./Gallery";
import { ProductBuy } from "./ProductBuy";
import { Reviews } from "./Reviews";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const p = findProduct((await params).id);
  if (!p) notFound();
  const cat = CATEGORIES.find((c) => c.id === p.category)!;
  const seed = SEED_REVIEWS.filter((r) => r.productId === p.id);
  const avg = averageRating(seed);
  const related = CATALOG.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  return (
    <>
      <p className="crumbs"><Link href="/">Home</Link> / <Link href={`/shop?category=${cat.id}`}>{cat.label}</Link> / <span>{p.name}</span></p>
      <div className="detail">
        <Gallery id={p.id} />
        <div>
          {p.badge ? <span className="pill test" style={{ marginBottom: 8, display: "inline-block" }}>{p.badge}</span> : null}
          <h1 data-testid="product-name">{p.name}</h1>
          <a href="#reviews" className="rating" data-testid="product-rating">{avg ? <><span className="stars">{starText(avg)}</span> {avg} · {seed.length} reviews</> : "No reviews yet"}</a>
          <div className="price big" data-testid="product-price">${p.price.toFixed(2)}</div>
          <p style={{ color: "var(--ink2)" }}>{p.blurb}</p>
          <ProductBuy id={p.id} name={p.name} sizes={p.sizes} category={p.category} />
          <ul className="perks">
            <li>🚚 Ships in 1–2 business days. Free shipping on orders of $50 or more.</li>
            <li>↩︎ Free returns on delivered orders.</li>
          </ul>
          <div className="acc" style={{ marginTop: 18 }}>
            <details open><summary>Details</summary><ul>{p.details.map((d) => <li key={d}>{d}</li>)}</ul></details>
            <details><summary>Shipping & returns</summary><p>Standard shipping is $5, or free when your merchandise subtotal is $50 or more. Changed your mind? Start a return from your order history once the order is delivered.</p></details>
          </div>
        </div>
      </div>
      <Reviews productId={p.id} seed={seed} />
      {related.length > 0 ? (
        <section className="related" data-testid="related-products">
          <h2>You might also like</h2>
          <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      ) : null}
    </>
  );
}
