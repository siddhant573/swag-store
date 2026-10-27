import { NextResponse } from "next/server";
import { total, isValidPromo, type CartItem } from "@/cart/pricing";
import { lineName, parseLineKey } from "@/data/catalog";
import { validateAddress, type Address } from "@/data/address";
import { cookieOpts, encodeOrders, nextOrderId, ORDERS_COOKIE, readOrders, type Order } from "@/server/orders";
import { currentUser } from "@/server/session";

export async function POST(req: Request) {
  if (!(await currentUser())) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const body = (await req.json()) as { items?: { id: string; qty: number }[]; promo?: string; giftWrap?: boolean; shipTo?: Partial<Address> };

  // Re-price from the catalog: never trust prices sent by the browser.
  const items: CartItem[] = [];
  for (const line of body.items ?? []) {
    const { product, size } = parseLineKey(String(line.id));
    const qty = Math.floor(Number(line.qty));
    if (product && qty > 0 && qty <= 99) items.push({ id: line.id, name: lineName(product, size), price: product.price, qty });
  }
  if (items.length === 0) return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
  const addrErrors = validateAddress(body.shipTo ?? {});
  if (Object.keys(addrErrors).length) return NextResponse.json({ error: "Check the shipping address", fields: addrErrors }, { status: 400 });
  const promo = isValidPromo(body.promo) ? body.promo : undefined;
  const giftWrap = body.giftWrap === true;

  const orders = await readOrders();
  const s = body.shipTo as Address;
  const order: Order = {
    id: nextOrderId(orders),
    placedAt: new Date().toISOString(),
    items,
    promo,
    giftWrap,
    shipTo: { id: "ship", name: s.name, street: s.street, city: s.city, state: s.state, zip: s.zip },
    status: "Processing",
    charged: total(items, promo, giftWrap),
  };
  const res = NextResponse.json({ id: order.id });
  res.cookies.set(ORDERS_COOKIE, encodeOrders([order, ...orders]), cookieOpts);
  return res;
}
