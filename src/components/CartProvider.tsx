"use client";
import { createContext, useContext, type ReactNode } from "react";
import { lineName, parseLineKey } from "@/data/catalog";
import type { CartItem } from "@/cart/pricing";
import { useStored } from "./useStored";

type Line = { key: string; qty: number };
type Cart = {
  ready: boolean;
  items: CartItem[];
  count: number;
  giftWrap: boolean;
  setGiftWrap: (enabled: boolean) => void;
  add: (key: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const Ctx = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines, cartReady] = useStored<Line[]>("swag_cart", []);
  const [giftWrap, setGiftWrap, giftWrapReady] = useStored("swag_gift_wrap", true);

  // CartItem.id is the line key, so two sizes of one tee are two lines.
  const items: CartItem[] = lines.filter((l) => typeof l?.key === "string").flatMap((l) => {
    const { product, size } = parseLineKey(l.key);
    return product ? [{ id: l.key, name: lineName(product, size), price: product.price, qty: l.qty }] : [];
  });

  const value: Cart = {
    ready: cartReady && giftWrapReady,
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    giftWrap,
    setGiftWrap,
    add: (key, qty = 1) =>
      setLines((ls) => (ls.some((l) => l.key === key) ? ls.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...ls, { key, qty }])),
    setQty: (key, qty) =>
      setLines((ls) => (qty <= 0 ? ls.filter((l) => l.key !== key) : ls.map((l) => (l.key === key ? { ...l, qty: Math.min(99, qty) } : l)))),
    remove: (key) => setLines((ls) => ls.filter((l) => l.key !== key)),
    clear: () => setLines([]),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): Cart {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
