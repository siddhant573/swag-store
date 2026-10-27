import Link from "next/link";
import { CATALOG, CATEGORIES, type Category } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { AutoSubmitSelect } from "@/components/AutoSubmitSelect";

type SP = { q?: string; category?: string; sort?: string };

export default async function ShopPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const category = CATEGORIES.some((c) => c.id === sp.category) ? (sp.category as Category) : undefined;
  const sort = ["price-asc", "price-desc", "name"].includes(sp.sort ?? "") ? sp.sort! : "featured";

  let products = CATALOG.filter(
    (p) => (!category || p.category === category) && (!q || `${p.name} ${p.blurb}`.toLowerCase().includes(q.toLowerCase())),
  );
  products = [...products].sort((a, b) =>
    sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name) : a.featured - b.featured,
  );

  const href = (c?: Category) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (c) p.set("category", c);
    if (sort !== "featured") p.set("sort", sort);
    const s = p.toString();
    return s ? `/shop?${s}` : "/shop";
  };
  const title = q ? `Results for “${q}”` : category ? CATEGORIES.find((c) => c.id === category)!.label : "Shop all";

  return (
    <>
      <p className="crumbs"><Link href="/">Home</Link> / {category && !q ? <span>{title}</span> : <span>Shop</span>}</p>
      <h1 data-testid="shop-title">{title}</h1>
      <div className="toolbar">
        <nav className="chips" aria-label="Categories" data-testid="category-filter">
          <Link href={href()} className={`chip ${!category ? "on" : ""}`} data-testid="category-all">All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={href(c.id)} className={`chip ${category === c.id ? "on" : ""}`} data-testid={`category-${c.id}`}>{c.label}</Link>
          ))}
        </nav>
        <span className="count muted small" data-testid="result-count">{products.length} {products.length === 1 ? "product" : "products"}</span>
        <form action="/shop" method="get">
          {q ? <input type="hidden" name="q" value={q} /> : null}
          {category ? <input type="hidden" name="category" value={category} /> : null}
          <AutoSubmitSelect name="sort" defaultValue={sort} label="Sort products" testid="sort-select">
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </AutoSubmitSelect>
        </form>
      </div>
      <section className="grid" data-testid="catalog">
        {products.length === 0 ? (
          <div className="card empty no-results" data-testid="no-results">
            <h2>No products match</h2>
            <p className="muted">Check the spelling or <Link href="/shop">browse everything</Link>.</p>
          </div>
        ) : (
          products.map((p) => <ProductCard key={p.id} p={p} />)
        )}
      </section>
    </>
  );
}
