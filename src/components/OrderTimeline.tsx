import type { Order } from "@/server/orders";

export function OrderTimeline({ order }: { order: Order }) {
  const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }) : "");
  if (order.status === "Cancelled")
    return (
      <ol className="timeline" data-testid="order-timeline">
        <li className="done">Placed<br />{fmt(order.placedAt)}</li><li className="stop">Cancelled</li><li /><li />
      </ol>
    );
  const delivered = order.status === "Delivered" || order.status === "Return requested";
  return (
    <ol className="timeline" data-testid="order-timeline">
      <li className="done">Placed<br />{fmt(order.placedAt)}</li>
      <li className="done">Processing</li>
      <li className={delivered ? "done" : ""}>Shipped</li>
      <li className={delivered ? "done" : ""}>Delivered{delivered ? <><br />{fmt(order.deliveredAt)}</> : null}</li>
    </ol>
  );
}
