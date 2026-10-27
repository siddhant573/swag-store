// Order confirmation recomputes its total from the saved merchandise lines.
// It deliberately does NOT import src/cart/pricing.ts: the rules are written out here.
import type { Order } from "./orders";

export type Summary = { subtotal: number; discount: number; shipping: number; total: number };

const cents = (n: number) => Math.round(n * 100) / 100;

export function orderSummary(order: Order): Summary {
  const merchandise = cents(order.items.reduce((s, i) => s + i.price * i.qty, 0));
  const off = order.promo === "UNIVERSE20" ? cents(merchandise * 0.2) : 0;
  const ship = merchandise >= 50 ? 0 : 5;
  return { subtotal: merchandise, discount: off, shipping: ship, total: cents(merchandise - off + ship) };
}
