// The ONLY place prices are computed. The cart, checkout and the order API import it.

export type CartItem = { id: string; name: string; price: number; qty: number };

export const SHIPPING_FEE = 5; // flat
export const FREE_SHIPPING_FROM = 50; // merchandise subtotal, inclusive
export const PROMOS: Record<string, number> = { UNIVERSE20: 0.2 }; // percent off merchandise

const cents = (n: number) => Math.round(n * 100) / 100;

export function isValidPromo(code?: string): boolean {
  return !!code && code in PROMOS;
}

export function subtotal(items: CartItem[]): number {
  return cents(items.reduce((s, i) => s + i.price * i.qty, 0));
}

export function discount(sub: number, code?: string): number {
  if (!code || !(code in PROMOS)) return 0;
  return cents(sub * PROMOS[code]);
}

export function shipping(sub: number): number {
  return sub >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
}

export type Breakdown = { subtotal: number; discount: number; shipping: number; total: number };

// One pipeline for the whole order: each step works on the running amount,
// so checkout, the confirmation and the order API can never disagree.
export function breakdown(items: CartItem[], code?: string): Breakdown {
  let running = subtotal(items);
  const sub = running;

  const off = discount(running, code);
  running -= off;

  // Free shipping is checked against the merchandise subtotal before any discount (PRD).
  const ship = shipping(sub);
  running += ship;

  return { subtotal: sub, discount: off, shipping: ship, total: cents(running) };
}

export function total(items: CartItem[], code?: string): number {
  return breakdown(items, code).total;
}
