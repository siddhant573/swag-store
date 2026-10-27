import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { CartBadge } from "@/components/CartBadge";
import { currentUser } from "@/server/session";
import { CATEGORIES } from "@/data/catalog";

export const metadata: Metadata = { title: "Universe Swag Store", description: "Apparel, accessories and stickers from the Universe 2026 collection." };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="announce" data-testid="announcement">Free shipping on orders of $50 or more · Free returns</div>
          <header className="top">
            <div className="wrap top-in">
              <Link href="/" className="brand" data-testid="home-link"><span className="brand-mark">✦</span>Universe Swag Store</Link>
              <nav className="catnav" aria-label="Shop">
                <Link href="/shop" data-testid="nav-shop-all">Shop all</Link>
                {CATEGORIES.map((c) => <Link key={c.id} href={`/shop?category=${c.id}`} data-testid={`nav-${c.id}`}>{c.label}</Link>)}
              </nav>
              <form action="/shop" method="get" className="hsearch" role="search">
                <input name="q" placeholder="Search products" aria-label="Search products" data-testid="search-input" />
              </form>
              <nav className="icons" aria-label="Account">
                {user ? <Link href="/account" data-testid="nav-account">Account</Link> : <Link href="/login" data-testid="nav-sign-in">Sign in</Link>}
                <Link href="/wishlist" data-testid="nav-wishlist">Wishlist</Link>
                <CartBadge />
              </nav>
            </div>
          </header>
          <main className="wrap">{children}</main>
          <footer className="foot">
            <div className="wrap foot-grid">
              <div>
                <div className="brand"><span className="brand-mark">✦</span>Universe Swag Store</div>
                <p className="small muted">Apparel, accessories and stickers from the Universe 2026 collection.</p>
              </div>
              <div><h4>Shop</h4><ul>{CATEGORIES.map((c) => <li key={c.id}><Link href={`/shop?category=${c.id}`}>{c.label}</Link></li>)}<li><Link href="/shop">Shop all</Link></li></ul></div>
              <div><h4>Help</h4><ul><li><Link href="/help" data-testid="footer-help">Help centre</Link></li><li><Link href="/help#shipping">Shipping</Link></li><li><Link href="/help#returns">Returns</Link></li><li><Link href="/contact" data-testid="footer-contact">Contact us</Link></li></ul></div>
              <div><h4>Account</h4><ul>{user ? <><li><Link href="/account">Your account</Link></li><li><Link href="/orders" data-testid="nav-orders">Orders</Link></li><li><form action="/api/logout" method="post"><button className="link" data-testid="sign-out">Sign out</button></form></li></> : <li><Link href="/login">Sign in</Link></li>}<li><Link href="/wishlist">Wishlist</Link></li></ul></div>
            </div>
            <div className="wrap foot-base"><span>© 2026 Universe Swag Store</span><span>Payments run in test mode. No card is charged.</span></div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
