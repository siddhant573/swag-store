"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartBadge() {
  const { count, ready } = useCart();
  return (
    <Link href="/cart" data-testid="nav-cart" aria-label={`Cart, ${ready ? count : 0} items`}>
      Cart{ready && count > 0 ? <span className="badge" data-testid="cart-count">{count}</span> : null}
    </Link>
  );
}
