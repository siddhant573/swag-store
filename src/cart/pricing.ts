// The ONLY place prices are computed. The cart, checkout and the order API import it.

export type CartItem = { id: string; name: string; price: number; qty: number };

export const SHIPPING_FEE = 5; // flat
export const GIFT_WRAP_FEE = 5;
export const FREE_SHIPPING_FROM = 50; // merchandise subtotal, inclusive
export const PROMOS: Record<string, number> = { UNIVERSE20: 0.2 }; // percent off merchandise

const cents = (n: number) => Math.round(n * 100) / 100;

export function isValidPromo(code?: string): boolean {
  return !!code && code in PROMOS;
}

export function subtotal(items: CartItem[], giftWrap = false): number {
  return cents(items.reduce((s, i) => s + i.price * i.qty, 0) + (giftWrap ? GIFT_WRAP_FEE : 0));
}

export function discount(sub: number, code?: string): number {
  if (!code || !(code in PROMOS)) return 0;
  return cents(sub * PROMOS[code]);
}

export function shipping(sub: number): number {
  return sub >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
}

export function total(items: CartItem[], code?: string, giftWrap = false): number {
  const merchandise = subtotal(items);
  return cents(merchandise + (giftWrap ? GIFT_WRAP_FEE : 0) - discount(merchandise, code) + shipping(merchandise));
}
