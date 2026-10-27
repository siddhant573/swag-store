"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RETURN_REASONS } from "@/data/returns";
import { ProductArt } from "@/components/ProductArt";

export function ReturnForm({ orderId, items }: { orderId: string; items: { id: string; name: string; qty: number }[] }) {
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [refundTo, setRefundTo] = useState<"card" | "credit">("card");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (lines.length === 0) return setError("Choose at least one item to return");
    if (!reason) return setError("Choose a reason");
    setError(""); setBusy(true);
    const res = await fetch(`/api/orders/${orderId}/return`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lines, reason, refundTo }) });
    const data = await res.json();
    if (!res.ok) { setBusy(false); return setError(data.error ?? "Couldn't start the return"); }
    router.push(`/orders/${orderId}?returned=1`);
    router.refresh();
  };

  return (
    <div className="stack" data-testid="return-form">
      <div className="card stack">
        <h3>Which items?</h3>
        {items.map((i) => (
          <label key={i.id} className={`choice ${lines.includes(i.id) ? "on" : ""}`}>
            <input type="checkbox" checked={lines.includes(i.id)} data-testid={`return-item-${i.id}`}
              onChange={(e) => setLines((l) => (e.target.checked ? [...l, i.id] : l.filter((x) => x !== i.id)))} />
            <span className="mini-line" style={{ padding: 0 }}><ProductArt id={i.id.split(":")[0]} /><span>{i.name} × {i.qty}</span></span>
          </label>
        ))}
      </div>
      <label className="field"><span>Reason</span>
        <select value={reason} onChange={(e) => setReason(e.target.value)} data-testid="return-reason">
          <option value="">Choose a reason…</option>{RETURN_REASONS.map((r) => <option key={r}>{r}</option>)}
        </select>
      </label>
      <fieldset className="stack" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="small" style={{ fontWeight: 600, marginBottom: 6 }}>Refund to</legend>
        <label className="check"><input type="radio" name="refund" checked={refundTo === "card"} onChange={() => setRefundTo("card")} data-testid="refund-card" /> Original card</label>
        <label className="check"><input type="radio" name="refund" checked={refundTo === "credit"} onChange={() => setRefundTo("credit")} data-testid="refund-credit" /> Store credit</label>
      </fieldset>
      {error ? <p className="notice err" data-testid="return-error" role="alert">{error}</p> : null}
      <button className="btn primary" data-testid="return-submit" onClick={submit} disabled={busy}>{busy ? "Submitting…" : "Request return"}</button>
    </div>
  );
}
