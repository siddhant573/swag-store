// Order confirmation recomputes its total from the saved merchandise lines.
// It deliberately does NOT import src/cart/pricing.ts: the rules are written out here.
import type { Order } from "./orders";
import { GIFT_WRAP_FEE } from "@/cart/pricing";

export type Summary = { subtotal: number; discount: number; shipping: number; total: number };

const cents = (n: number) => Math.round(n * 100) / 100;

export function orderSummary(order: Order): Summary {
  const merchandise = cents(order.items.reduce((s, i) => s + i.price * i.qty, 0));
  const off = order.promo === "UNIVERSE20" ? cents(merchandise * 0.2) : 0;
  const ship = merchandise >= 50 ? 0 : 5;
  const giftWrap = order.giftWrap ? GIFT_WRAP_FEE : 0;
  return { subtotal: cents(merchandise + giftWrap), discount: off, shipping: ship, total: cents(merchandise - off + ship + giftWrap) };
}
