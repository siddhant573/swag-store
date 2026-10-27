import Link from "next/link";
import type { Product } from "@/data/catalog";
import { SEED_REVIEWS, averageRating, starText } from "@/data/reviews";
import { ProductArt } from "./ProductArt";
import { AddToCart } from "./AddToCart";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ p }: { p: Product }) {
  const reviews = SEED_REVIEWS.filter((r) => r.productId === p.id);
  const avg = averageRating(reviews);
  return (
    <article className="product" data-testid={`product-${p.id}`}>
      <Link href={`/product/${p.id}`} className="art" aria-label={p.name}><ProductArt id={p.id} /></Link>
      {p.badge ? <span className="tag">{p.badge}</span> : null}
      <Link href={`/product/${p.id}`} className="pname">{p.name}</Link>
      <span className="rating">{avg ? <><span className="stars">{starText(avg)}</span> {avg} ({reviews.length})</> : "No reviews yet"}</span>
      <span className="price" data-testid={`price-${p.id}`}>${p.price.toFixed(2)}</span>
      <div className="actions">
        <AddToCart id={p.id} name={p.name} hasSizes={!!p.sizes} />
        <WishlistButton id={p.id} name={p.name} />
      </div>
    </article>
  );
}
