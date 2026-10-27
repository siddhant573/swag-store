"use client";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { ProductArt } from "@/components/ProductArt";
import { FREE_SHIPPING_FROM, subtotal } from "@/cart/pricing";

const money = (n: number) => `$${n.toFixed(2)}`;

export default function CartPage() {
  const { ready, items, setQty, remove } = useCart();
  if (!ready) return <p className="muted">Loading your cart…</p>;
  if (items.length === 0)
    return (
      <div className="empty" data-testid="cart-empty">
        <h1>Your cart is empty</h1>
        <p className="muted">Find something you like and it will show up here.</p>
        <Link href="/shop" className="btn primary">Start shopping</Link>
      </div>
    );
  const sub = subtotal(items);
  const toFree = Math.max(0, FREE_SHIPPING_FROM - sub);
  return (
    <>
      <h1>Your cart</h1>
      <div className="two-col">
        <section data-testid="cart-lines">
          {items.map((i) => (
            <div className="cart-line" key={i.id} data-testid={`cart-line-${i.id}`}>
              <ProductArt id={i.id.split(":")[0]} />
              <div>
                <Link href={`/product/${i.id.split(":")[0]}`} className="pname">{i.name}</Link>
                <div className="small muted">{money(i.price)} each</div>
                <button className="link small danger" data-testid={`remove-${i.id}`} onClick={() => remove(i.id)}>Remove</button>
              </div>
              <input type="number" min={0} max={99} value={i.qty} aria-label={`Quantity of ${i.name}`} data-testid={`qty-${i.id}`} onChange={(e) => setQty(i.id, Number(e.target.value))} />
              <b>{money(i.price * i.qty)}</b>
            </div>
          ))}
        </section>
        <aside className="card summary">
          <div className="ship-progress small" data-testid="free-shipping">
            <span data-testid="free-shipping-message">{toFree > 0 ? <>You&apos;re <b data-testid="free-shipping-remaining">{money(toFree)}</b> away from free shipping.</> : <>You&apos;ve unlocked <b>free shipping</b>.</>}</span>
            <div className="bar"><span style={{ width: `${Math.min(100, (sub / FREE_SHIPPING_FROM) * 100)}%` }} /></div>
          </div>
          <div className="row total-row"><span>Subtotal</span><span data-testid="cart-subtotal">{money(sub)}</span></div>
          <p className="muted small">Promo codes and shipping are applied at checkout.</p>
          <Link href="/checkout" className="btn primary wide" data-testid="go-checkout">Checkout</Link>
          <Link href="/shop" className="btn ghost wide" style={{ marginTop: 8 }}>Continue shopping</Link>
        </aside>
      </div>
    </>
  );
}
