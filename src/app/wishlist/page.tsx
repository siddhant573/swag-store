"use client";
import Link from "next/link";
import { CATALOG } from "@/data/catalog";
import { useWishlist } from "@/components/WishlistButton";
import { useCart } from "@/components/CartProvider";
import { ProductArt } from "@/components/ProductArt";

export default function WishlistPage() {
  const [list, setList, ready] = useWishlist();
  const { add } = useCart();
  if (!ready) return <p className="muted">Loading…</p>;
  const products = CATALOG.filter((p) => list.includes(p.id));
  return (
    <>
      <h1>Wishlist</h1>
      {products.length === 0 ? (
        <div className="empty" data-testid="wishlist-empty">
          <p className="muted">Nothing saved yet. Tap ♡ on any product to save it for later.</p>
          <Link href="/shop" className="btn primary">Browse products</Link>
        </div>
      ) : (
        <section data-testid="wishlist-list" style={{ maxWidth: 760 }}>
          {products.map((p) => (
            <div className="cart-line" key={p.id} data-testid={`wishlist-row-${p.id}`}>
              <ProductArt id={p.id} />
              <div><Link href={`/product/${p.id}`} className="pname">{p.name}</Link><div className="small muted">${p.price.toFixed(2)}</div></div>
              {p.sizes ? (
                <Link href={`/product/${p.id}`} className="btn ghost" data-testid={`wishlist-choose-${p.id}`}>Choose size</Link>
              ) : (
                <button className="btn" data-testid={`wishlist-move-${p.id}`} onClick={() => { add(p.id); setList((l) => l.filter((x) => x !== p.id)); }}>Move to cart</button>
              )}
              <button className="link danger small" data-testid={`wishlist-remove-${p.id}`} onClick={() => setList((l) => l.filter((x) => x !== p.id))}>Remove</button>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
