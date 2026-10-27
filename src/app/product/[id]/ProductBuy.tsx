"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { WishlistButton } from "@/components/WishlistButton";
import { lineKey, type Category } from "@/data/catalog";

const SIZE_GUIDE = {
  tops: [["S", "34–36", "27"], ["M", "38–40", "28"], ["L", "42–44", "29"], ["XL", "46–48", "30"]],
  socks: [["S/M", "US 5–9", "EU 36–41"], ["L/XL", "US 9–13", "EU 42–46"]],
};

export function ProductBuy({ id, name, sizes, category }: { id: string; name: string; sizes?: string[]; category: Category }) {
  const { add } = useCart();
  const [size, setSize] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const guide = useRef<HTMLDialogElement>(null);

  const onAdd = () => {
    if (sizes && !size) return setError("Choose a size");
    if (!Number.isInteger(qty) || qty < 1 || qty > 10) return setError("Quantity must be between 1 and 10");
    setError("");
    add(lineKey(id, size || undefined), qty);
    setAdded(true);
  };
  const socks = id === "pixel-socks";

  return (
    <div className="stack buy">
      {sizes ? (
        <fieldset className="sizes" data-testid="size-picker">
          <legend>
            <span>Size{size ? `: ${size}` : ""}</span>
            {category === "apparel" ? <button type="button" className="link small" data-testid="size-guide" onClick={() => guide.current?.showModal()}>Size guide</button> : null}
          </legend>
          <div className="size-row">
            {sizes.map((s) => (
              <label key={s} className={`size ${size === s ? "on" : ""}`}>
                <input type="radio" name="size" value={s} checked={size === s} onChange={() => { setSize(s); setError(""); }} data-testid={`size-${s}`} />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
      <div className="actions">
        <label className="field qty"><span>Quantity</span>
          <input type="number" min={1} max={10} value={qty} data-testid="product-qty" onChange={(e) => setQty(Number(e.target.value))} />
        </label>
      </div>
      {error ? <p className="err" data-testid="add-error" role="alert">{error}</p> : null}
      <div className="actions">
        <button className="btn primary" style={{ flex: 1 }} data-testid="product-add" onClick={onAdd}>Add to cart</button>
        <WishlistButton id={id} name={name} />
      </div>
      {added ? <p className="notice ok" data-testid="added-message">Added to your cart. <Link href="/cart">View cart →</Link></p> : null}

      <dialog ref={guide} data-testid="size-guide-dialog">
        <h2>Size guide</h2>
        <table className="lines">
          <thead>{socks ? <tr><th>Size</th><th>US shoe</th><th>EU shoe</th></tr> : <tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th></tr>}</thead>
          <tbody>{(socks ? SIZE_GUIDE.socks : SIZE_GUIDE.tops).map((r) => <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>)}</tbody>
        </table>
        <div className="actions" style={{ marginTop: 16 }}><button className="btn" onClick={() => guide.current?.close()} data-testid="size-guide-close">Close</button></div>
      </dialog>
    </div>
  );
}
