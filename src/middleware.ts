import { NextResponse, type NextRequest } from "next/server";

// The cart, checkout, orders, account and wishlist need a signed-in shopper. The catalog, help and contact don't.
export function middleware(req: NextRequest) {
  if (req.cookies.get("swag_session")?.value) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(req.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/cart", "/checkout", "/orders", "/orders/:path*", "/account", "/wishlist"] };
