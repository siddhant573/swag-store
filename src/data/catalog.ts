export type Category = "apparel" | "accessories" | "stickers";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  sizes?: string[]; // apparel: a size must be chosen before adding to the cart
  blurb: string;
  details: string[];
  badge?: "Bestseller" | "New" | "Limited";
  featured: number; // order for "Featured" sort
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "apparel", label: "Apparel" },
  { id: "accessories", label: "Accessories" },
  { id: "stickers", label: "Stickers" },
];

// Fixed seed: prices never change, nothing sells out.
export const CATALOG: Product[] = [
  { id: "octocat-tee", name: "Octocat tee", price: 25, category: "apparel", sizes: ["S", "M", "L", "XL"], badge: "Bestseller", featured: 1,
    blurb: "Our everyday tee in midnight navy, with the Universe 26 mark on the chest and the wordmark across the back.",
    details: ["100% organic cotton, 180 gsm", "Regular fit: true to size", "Machine wash cold, tumble dry low"] },
  { id: "sticker-pack", name: "Sticker pack", price: 20, category: "stickers", badge: "Bestseller", featured: 2,
    blurb: "Twelve thick vinyl die-cut stickers to give your laptop lid some personality.",
    details: ["12 stickers, 2–3 inch", "Waterproof, UV-resistant vinyl", "Removes cleanly, no residue"] },
  { id: "mona-hoodie", name: "Mona hoodie", price: 60, category: "apparel", sizes: ["S", "M", "L", "XL"], featured: 3,
    blurb: "A heavyweight pullover hoodie with an embroidered mark, a lined hood and a kangaroo pocket.",
    details: ["80% cotton, 20% recycled polyester, 400 gsm", "Relaxed fit: size down for a closer fit", "Machine wash cold, inside out"] },
  { id: "universe-mug", name: "Universe mug", price: 15, category: "accessories", featured: 4,
    blurb: "A 12 oz ceramic mug for the long build, with “ship it” printed on the back.",
    details: ["12 oz / 350 ml stoneware", "Dishwasher and microwave safe", "Printed on both sides"] },
  { id: "copilot-cap", name: "Copilot cap", price: 22, category: "accessories", badge: "New", featured: 5,
    blurb: "A six-panel dad cap in forest green with an embroidered mark and an adjustable strap.",
    details: ["100% cotton twill", "One size, adjustable brass buckle", "Spot clean only"] },
  { id: "pixel-socks", name: "Pixel socks", price: 12, category: "apparel", sizes: ["S/M", "L/XL"], featured: 6,
    blurb: "Two pairs of crew socks with pixel-art patterns, one white and one navy cuff.",
    details: ["Combed cotton blend with reinforced heel and toe", "S/M fits US 5–9, L/XL fits US 9–13", "Machine wash warm"] },
  { id: "dependabot-plush", name: "Dependabot plush", price: 30, category: "accessories", badge: "Limited", featured: 7,
    blurb: "A 10-inch plush robot that keeps your desk company and your dependencies up to date.",
    details: ["10 in / 25 cm tall", "Soft polyester, embroidered face", "Surface wash only. Not for children under 3"] },
  { id: "laptop-sleeve", name: "Laptop sleeve", price: 35, category: "accessories", featured: 8,
    blurb: "A padded neoprene sleeve for 14-inch laptops, with a clear sticker window on the front.",
    details: ["Fits most 13–14 inch laptops", "6 mm padded neoprene, water-resistant zip", "Clear window fits stickers up to 3 inch"] },
  { id: "holo-stickers", name: "Holographic stickers", price: 9, category: "stickers", badge: "New", featured: 9,
    blurb: "Five holographic stickers that shift colour as the light moves.",
    details: ["5 stickers, 2 inch", "Holographic vinyl with gloss laminate", "Waterproof"] },
];

export function findProduct(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id);
}

// A cart line is a product, plus its size when it has sizes: "octocat-tee:M".
export function lineKey(id: string, size?: string): string {
  return size ? `${id}:${size}` : id;
}

export function parseLineKey(key: string): { product?: Product; size?: string } {
  const [id, size] = key.split(":");
  const product = findProduct(id);
  if (!product) return {};
  if (product.sizes) {
    if (!size || !product.sizes.includes(size)) return {};
    return { product, size };
  }
  return size ? {} : { product };
}

export function lineName(product: Product, size?: string): string {
  return size ? `${product.name} (${size})` : product.name;
}
