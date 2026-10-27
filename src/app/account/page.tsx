import Link from "next/link";
import { currentUser } from "@/server/session";
import { readOrders } from "@/server/orders";
import { AddressBook } from "./AddressBook";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await currentUser();
  const orders = await readOrders();
  return (
    <div className="stack">
      <div className="row"><h1>Your account</h1><form action="/api/logout" method="post"><button className="btn ghost" data-testid="account-sign-out">Sign out</button></form></div>
      <section className="card row-cards">
        <div><p className="muted small">Signed in as</p><b data-testid="account-username">{user}</b></div>
        <div><p className="muted small">Orders</p><Link href="/orders" data-testid="account-orders">{orders.length} {orders.length === 1 ? "order" : "orders"}</Link></div>
        <div><p className="muted small">Saved items</p><Link href="/wishlist" data-testid="account-wishlist">Wishlist</Link></div>
      </section>
      <AddressBook />
    </div>
  );
}
