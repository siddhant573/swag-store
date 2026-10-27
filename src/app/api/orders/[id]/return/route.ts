import { NextResponse } from "next/server";
import { cookieOpts, encodeOrders, ORDERS_COOKIE, readOrders } from "@/server/orders";
import { currentUser } from "@/server/session";
import { RETURN_REASONS } from "@/data/returns";


export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await currentUser())) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const body = (await req.json()) as { lines?: string[]; reason?: string; refundTo?: string };
  const orders = await readOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.status !== "Delivered") return NextResponse.json({ error: "Only delivered orders can be returned" }, { status: 400 });
  const lines = (body.lines ?? []).filter((l) => order.items.some((i) => i.id === l));
  if (lines.length === 0) return NextResponse.json({ error: "Choose at least one item to return" }, { status: 400 });
  if (!body.reason || !RETURN_REASONS.includes(body.reason)) return NextResponse.json({ error: "Choose a reason" }, { status: 400 });
  order.status = "Return requested";
  order.returnRequest = { id: `RMA-${order.id.slice(3)}`, lines, reason: body.reason, refundTo: body.refundTo === "credit" ? "credit" : "card" };
  const res = NextResponse.json({ id: order.returnRequest.id });
  res.cookies.set(ORDERS_COOKIE, encodeOrders(orders), cookieOpts);
  return res;
}
