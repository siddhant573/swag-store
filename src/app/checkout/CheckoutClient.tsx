"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { discount, GIFT_WRAP_FEE, isValidPromo, merchandiseSubtotal, shipping, subtotal, total } from "@/cart/pricing";
import type { UiVersion } from "@/ui/version";
import { AddressForm } from "@/components/AddressForm";
import { useAddresses } from "@/components/useAddresses";
import { formatAddress, type Address } from "@/data/address";
import { ProductArt } from "@/components/ProductArt";
import { validateCard, DECLINED_CARD } from "@/data/card";

const money = (n: number) => `$${n.toFixed(2)}`;

export function CheckoutClient({ ui }: { ui: UiVersion }) {
  const { ready, items, giftWrap, clear } = useCart();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | undefined>();
  const [promoError, setPromoError] = useState(false);
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [addresses, setAddresses, addrReady] = useAddresses();
  const [chosen, setChosen] = useState<string>("");
  const [newAddr, setNewAddr] = useState<Address | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [saveToAccount, setSaveToAccount] = useState(true);

  if (!ready || !addrReady) return <p className="muted">Loading checkout…</p>;
  if (items.length === 0)
    return (
      <div className="card empty" data-testid="checkout-empty">
        <h1>Nothing to check out</h1>
        <p className="muted">Your cart is empty.</p>
        <Link href="/shop" className="btn primary">Start shopping</Link>
      </div>
    );

  const merchandise = merchandiseSubtotal(items);
  const sub = subtotal(items, giftWrap);
  const off = discount(merchandise, applied);
  const ship = shipping(merchandise);
  const tot = total(items, applied, giftWrap);

  const applyPromo = () => {
    const c = code.trim().toUpperCase();
    if (isValidPromo(c)) {
      setApplied(c);
      setPromoError(false);
    } else {
      setApplied(undefined);
      setPromoError(true);
    }
  };

  const showForm = addingNew || (addresses.length === 0 && !newAddr);
  const selected: Address | undefined = newAddr ?? addresses.find((a) => a.id === (chosen || addresses[0]?.id));

  const placeOrder = async () => {
    setError("");
    if (!selected || showForm) {
      setError("Add a shipping address.");
      return;
    }
    const ce = validateCard(card);
    setCardErrors(ce);
    if (Object.keys(ce).length) {
      setError("Check your card details.");
      return;
    }
    if (card.number.replace(/\s/g, "") === DECLINED_CARD) {
      setError("Your card was declined. Try a different card.");
      return;
    }
    setPlacing(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items: items.map((i) => ({ id: i.id, qty: i.qty })), promo: applied, giftWrap, shipTo: selected }),
    });
    const data = await res.json();
    if (!res.ok) {
      setPlacing(false);
      setError(data.error ?? "Couldn't place the order.");
      return;
    }
    clear();
    router.push(`/orders/${data.id}?placed=1`);
  };

  const promo = (
    <section className="card" data-testid="promo-section">
      <h2>Promo code</h2>
      <div className="inline">
        <input
          placeholder="Promo code" value={code} data-testid="promo-input" aria-label="Promo code"
          onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && applyPromo()}
        />
        <button className="btn ghost" data-testid="promo-apply" onClick={applyPromo}>Apply</button>
      </div>
      {promoError ? <p className="err" data-testid="promo-error">This code isn&apos;t valid</p> : null}
      {applied ? <p className="ok" data-testid="promo-applied">{applied} applied</p> : null}
    </section>
  );

  const shippingTo = (
    <section className="card" data-testid="shipping-section">
      <h2>Shipping address</h2>
      {!showForm ? (
        <div className="stack">
          {newAddr ? (
            <label className="choice on"><input type="radio" checked readOnly data-testid="address-option-new" />{formatAddress(newAddr)}</label>
          ) : (
            addresses.map((a, idx) => (
              <label key={a.id} className={`choice ${selected?.id === a.id ? "on" : ""}`}>
                <input type="radio" name="shipto" checked={selected?.id === a.id} onChange={() => setChosen(a.id)} data-testid={`address-option-${idx + 1}`} />
                {formatAddress(a)}
              </label>
            ))
          )}
          <button className="link" data-testid="address-new" onClick={() => { setAddingNew(true); setNewAddr(null); }}>+ Use a new address</button>
        </div>
      ) : (
        <>
          <AddressForm
            prefix="ship"
            submitLabel="Use this address"
            onCancel={addresses.length ? () => setAddingNew(false) : undefined}
            onSave={(a) => {
              const full = { ...a, id: `addr-${Date.now()}` };
              if (saveToAccount) {
                setAddresses((l) => [...l, full]);
                setChosen(full.id);
                setNewAddr(null);
              } else setNewAddr(full);
              setAddingNew(false);
            }}
          />
          <label className="check small"><input type="checkbox" checked={saveToAccount} onChange={(e) => setSaveToAccount(e.target.checked)} data-testid="ship-save-to-account" /> Save to my account</label>
        </>
      )}
    </section>
  );

  const payment = (
    <section className="card">
      <div className="row"><h2>Payment</h2><span className="pill test" data-testid="test-mode">Test mode · no real charge</span></div>
      <div className="stack">
        <label className="field"><span>Card number</span>
          <input placeholder="1234 1234 1234 1234" value={card.number} inputMode="numeric" autoComplete="cc-number" aria-invalid={!!cardErrors.number}
            data-testid="card-input" onChange={(e) => setCard({ ...card, number: e.target.value })} />
          {cardErrors.number ? <small className="err" data-testid="card-number-error">{cardErrors.number}</small> : null}
        </label>
        <div className="two">
          <label className="field"><span>Expiry (MM/YY)</span>
            <input placeholder="MM/YY" value={card.expiry} autoComplete="cc-exp" aria-invalid={!!cardErrors.expiry}
              data-testid="card-expiry" onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
            {cardErrors.expiry ? <small className="err" data-testid="card-expiry-error">{cardErrors.expiry}</small> : null}
          </label>
          <label className="field"><span>Security code</span>
            <input placeholder="CVC" value={card.cvc} inputMode="numeric" autoComplete="cc-csc" maxLength={4} aria-invalid={!!cardErrors.cvc}
              data-testid="card-cvc" onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
            {cardErrors.cvc ? <small className="err" data-testid="card-cvc-error">{cardErrors.cvc}</small> : null}
          </label>
        </div>
        <label className="field"><span>Name on card</span>
          <input value={card.name} autoComplete="cc-name" aria-invalid={!!cardErrors.name}
            data-testid="card-name" onChange={(e) => setCard({ ...card, name: e.target.value })} />
          {cardErrors.name ? <small className="err" data-testid="card-name-error">{cardErrors.name}</small> : null}
        </label>
      </div>
      {error ? <p className="notice err" style={{ marginTop: 12 }} data-testid="checkout-error" role="alert">{error}</p> : null}
    </section>
  );

  const orderButton =
    ui === "v2" ? (
      <button className="btn wide alt" onClick={placeOrder} disabled={placing}>
        {placing ? "Processing…" : "Complete purchase"}
      </button>
    ) : (
      <button className="btn primary wide" onClick={placeOrder} disabled={placing}>
        {placing ? "Placing order…" : "Place order"}
      </button>
    );

  return (
    <div className="two-col">
      <div className="stack">
        <h1>Checkout</h1>
        <div className="steps" aria-hidden="true"><b>1. Shipping</b><span>›</span><b>2. Payment</b><span>›</span><span>3. Confirmation</span></div>
        {shippingTo}
        {ui === "v2" ? payment : promo}
        {ui === "v2" ? promo : payment}
        {ui === "v1" ? orderButton : null}
      </div>
      <aside className="card summary" data-testid="checkout-summary">
        <h2>Order summary</h2>
        {items.map((i) => (
          <div className="mini-line small" key={i.id}><ProductArt id={i.id.split(":")[0]} /><span className="grow">{i.name} × {i.qty}</span><span>{money(i.price * i.qty)}</span></div>
        ))}
        <hr />
        {giftWrap ? <div className="row"><span>Gift wrap</span><span data-testid="checkout-gift-wrap">{money(GIFT_WRAP_FEE)}</span></div> : null}
        <div className="row"><span>Subtotal</span><span data-testid="checkout-subtotal">{money(sub)}</span></div>
        <div className="row"><span>Discount</span><span data-testid="checkout-discount">−{money(off)}</span></div>
        <div className="row"><span>Shipping</span><span data-testid="checkout-shipping">{money(ship)}</span></div>
        <hr />
        <div className="row total-row"><span>Total</span><span data-testid="checkout-total">{money(tot)}</span></div>
        {ui === "v2" ? orderButton : null}
      </aside>
    </div>
  );
}
