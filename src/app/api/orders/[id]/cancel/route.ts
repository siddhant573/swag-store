import { NextResponse } from "next/server";
import { cookieOpts, encodeOrders, ORDERS_COOKIE, readOrders } from "@/server/orders";
import { currentUser } from "@/server/session";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await currentUser())) return NextResponse.redirect(new URL(`/login?next=/orders/${id}`, req.url), 303);
  const orders = await readOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return NextResponse.redirect(new URL("/orders", req.url), 303);
  if (order.status === "Processing") order.status = "Cancelled";
  const res = NextResponse.redirect(new URL(`/orders/${id}?cancelled=1`, req.url), 303);
  res.cookies.set(ORDERS_COOKIE, encodeOrders(orders), cookieOpts);
  return res;
}
