import Link from "next/link";
import { readOrders } from "@/server/orders";
import { orderSummary } from "@/server/orderSummary";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await readOrders();
  return (
    <section>
      <p className="crumbs"><Link href="/account">Account</Link> / <span>Orders</span></p>
      <h1>Order history</h1>
      {orders.length === 0 ? (
        <p className="muted" data-testid="orders-empty">No orders yet. <Link href="/shop">Start shopping</Link></p>
      ) : (
        <table className="lines" data-testid="orders-list">
          <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Status</th><th>Total</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} data-testid={`order-row-${o.id}`}>
                <td><Link href={`/orders/${o.id}`}>{o.id}</Link></td>
                <td>{new Date(o.placedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</td>
                <td>{o.items.reduce((n, i) => n + i.qty, 0)}</td>
                <td><span className={`status ${o.status.toLowerCase().replace(/\s+/g, "-")}`}>{o.status}</span></td>
                <td data-testid={`order-total-${o.id}`}>${orderSummary(o).total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
