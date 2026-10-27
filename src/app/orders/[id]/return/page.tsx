import Link from "next/link";
import { notFound } from "next/navigation";
import { readOrders } from "@/server/orders";
import { ReturnForm } from "./ReturnForm";

export const dynamic = "force-dynamic";

export default async function ReturnPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = (await readOrders()).find((o) => o.id === id);
  if (!order) notFound();
  return (
    <section className="wide-ish">
      <p className="crumbs"><Link href="/orders">Orders</Link> / <Link href={`/orders/${order.id}`}>{order.id}</Link> / <span>Return</span></p>
      <h1>Start a return</h1>
      {order.status !== "Delivered" ? (
        <p className="notice err" data-testid="return-ineligible">Only delivered orders can be returned. This order is {order.status.toLowerCase()}.</p>
      ) : (
        <ReturnForm orderId={order.id} items={order.items.map((i) => ({ id: i.id, name: i.name, qty: i.qty }))} />
      )}
    </section>
  );
}
