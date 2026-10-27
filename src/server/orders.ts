import { cookies } from "next/headers";
import type { CartItem } from "@/cart/pricing";
import { HOME_ADDRESS, type Address } from "@/data/address";

// Orders live in a cookie so the store needs no database and works the same locally and on Vercel.
export type OrderStatus = "Processing" | "Delivered" | "Cancelled" | "Return requested";
export type ReturnRequest = { id: string; lines: string[]; reason: string; refundTo: "card" | "credit" };
export type Order = {
  id: string;
  placedAt: string;
  deliveredAt?: string;
  items: CartItem[];
  promo?: string;
  shipTo: Address;
  status: OrderStatus;
  charged: number; // what checkout charged
  returnRequest?: ReturnRequest;
  seeded?: boolean;
};

export const ORDERS_COOKIE = "swag_orders";

const HOME: Address = HOME_ADDRESS;

// The demo account's past orders, so order history and returns have something real to show.
export const SEED_ORDERS: Order[] = [
  {
    id: "UV-0987", placedAt: "2026-09-14T17:20:00Z", deliveredAt: "2026-09-18T19:02:00Z", status: "Delivered", shipTo: HOME, seeded: true,
    items: [{ id: "mona-hoodie:L", name: "Mona hoodie (L)", price: 60, qty: 1 }, { id: "universe-mug", name: "Universe mug", price: 15, qty: 2 }],
    charged: 90,
  },
  {
    id: "UV-0942", placedAt: "2026-08-03T15:05:00Z", deliveredAt: "2026-08-07T16:40:00Z", status: "Delivered", shipTo: HOME, seeded: true,
    items: [{ id: "sticker-pack", name: "Sticker pack", price: 20, qty: 1 }, { id: "copilot-cap", name: "Copilot cap", price: 22, qty: 1 }],
    charged: 47,
  },
];

export async function readOrders(): Promise<Order[]> {
  const raw = (await cookies()).get(ORDERS_COOKIE)?.value;
  if (!raw) return SEED_ORDERS;
  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as Order[];
    // Skip orders saved by an older build of the store (no status or address).
    return Array.isArray(parsed) ? parsed.filter((o) => o && typeof o.status === "string" && o.shipTo) : SEED_ORDERS;
  } catch {
    return SEED_ORDERS;
  }
}

export function nextOrderId(orders: Order[]): string {
  return `UV-${1001 + orders.filter((o) => !o.seeded).length}`;
}

export function encodeOrders(orders: Order[]): string {
  return Buffer.from(JSON.stringify(orders.slice(0, 12)), "utf8").toString("base64url");
}

export const cookieOpts = { httpOnly: true, sameSite: "lax" as const, path: "/" };
