import Link from "next/link";
import { notFound } from "next/navigation";
import { readOrders } from "@/server/orders";
import { orderSummary } from "@/server/orderSummary";
import { formatAddress } from "@/data/address";
import { ProductArt } from "@/components/ProductArt";
import { OrderTimeline } from "@/components/OrderTimeline";
import { Reorder } from "./Reorder";

export const dynamic = "force-dynamic";
const money = (n: number) => `$${n.toFixed(2)}`;
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export default async function OrderPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ cancelled?: string; placed?: string; returned?: string }> }) {
  const { id } = await params;
  const sp = await searchParams;
  const order = (await readOrders()).find((o) => o.id === id);
  if (!order) notFound();
  const s = orderSummary(order);
  return (
    <div className="two-col" data-testid="confirmation">
      <section>
        <p className="crumbs"><Link href="/account">Account</Link> / <Link href="/orders">Orders</Link> / <span>{order.id}</span></p>
        {sp.placed ? <p className="notice ok" data-testid="placed-message">Thanks for your order. We&apos;ll get it on its way soon.</p> : null}
        {sp.cancelled ? <p className="notice err" data-testid="cancelled-message">Order cancelled. You won&apos;t be charged.</p> : null}
        {sp.returned && order.returnRequest ? <p className="notice ok" data-testid="return-message">Return {order.returnRequest.id} requested. Print the label from your email and drop the parcel off within 14 days.</p> : null}
        <div className="row"><h1>Order <span data-testid="order-number">{order.id}</span></h1><span className={`status ${slug(order.status)}`} data-testid="order-status">{order.status}</span></div>
        <p className="muted small" style={{ marginTop: -8 }}>Placed {new Date(order.placedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</p>
        <OrderTimeline order={order} />
        <div className="card" style={{ marginTop: 18 }}>
          {order.items.map((i) => (
            <div className="mini-line" key={i.id}><ProductArt id={i.id.split(":")[0]} /><span className="grow">{i.name} × {i.qty}</span><span>{money(i.price * i.qty)}</span></div>
          ))}
        </div>
        {order.returnRequest ? (
          <div className="card" style={{ marginTop: 14 }} data-testid="return-details">
            <h3>Return {order.returnRequest.id}</h3>
            <p className="small">Items: {order.returnRequest.lines.map((l) => order.items.find((i) => i.id === l)?.name).join(", ")}</p>
            <p className="small">Reason: {order.returnRequest.reason} · Refund to: {order.returnRequest.refundTo === "card" ? "original card" : "store credit"}</p>
          </div>
        ) : null}
        <div className="actions" style={{ marginTop: 18 }}>
          <Reorder lines={order.items.map((i) => ({ id: i.id, qty: i.qty }))} />
          {order.status === "Delivered" ? <Link href={`/orders/${order.id}/return`} className="btn ghost" data-testid="start-return">Start a return</Link> : null}
          {order.status === "Processing" ? (
            <form action={`/api/orders/${order.id}/cancel`} method="post">
              <button className="btn ghost danger" data-testid="cancel-order">Cancel order</button>
            </form>
          ) : null}
        </div>
      </section>
      <aside className="card summary">
        <h2>Summary</h2>
        <div className="row"><span>Subtotal</span><span data-testid="confirmation-subtotal">{money(s.subtotal)}</span></div>
        {s.giftWrap > 0 ? <div className="row" data-testid="confirmation-gift-wrap"><span>Gift wrap</span><span>{money(s.giftWrap)}</span></div> : null}
        <div className="row"><span>Discount{order.promo ? ` (${order.promo})` : ""}</span><span data-testid="confirmation-discount">−{money(s.discount)}</span></div>
        <div className="row"><span>Shipping</span><span data-testid="confirmation-shipping">{money(s.shipping)}</span></div>
        <hr />
        <div className="row total-row"><span>Total</span><span data-testid="confirmation-total">{money(s.total)}</span></div>
        <hr />
        <h3>Ships to</h3>
        <p className="small" data-testid="order-ship-to">{formatAddress(order.shipTo)}</p>
        <p className="small"><Link href="/help#returns">Returns policy</Link> · <Link href="/contact">Need help?</Link></p>
      </aside>
    </div>
  );
}
