export type Review = { id: string; productId: string; author: string; rating: number; title: string; body: string; date: string; verified?: boolean };

// Fictional seed reviews. No real people.
export const SEED_REVIEWS: Review[] = [
  { id: "r1", productId: "octocat-tee", author: "Priya S.", rating: 5, date: "2026-10-02", verified: true, title: "My new favourite tee", body: "Soft, thick cotton and it held its shape after a dozen washes. True to size." },
  { id: "r2", productId: "octocat-tee", author: "Marcus T.", rating: 4, date: "2026-09-18", verified: true, title: "Great print", body: "The back print is crisp. I'd size up if you like a looser fit." },
  { id: "r3", productId: "octocat-tee", author: "Elena R.", rating: 5, date: "2026-08-29", title: "Bought two", body: "Wore one to a meetup and got asked where it was from three times." },
  { id: "r4", productId: "sticker-pack", author: "Tomás G.", rating: 5, date: "2026-10-11", verified: true, title: "Laptop upgraded", body: "Thick vinyl, the colours really pop, and they peeled off my old laptop cleanly." },
  { id: "r5", productId: "sticker-pack", author: "Hana K.", rating: 4, date: "2026-09-03", verified: true, title: "Nice set", body: "Good mix of designs. Two were smaller than I expected." },
  { id: "r6", productId: "mona-hoodie", author: "Devon A.", rating: 5, date: "2026-10-07", verified: true, title: "Warmest hoodie I own", body: "Heavy, well made and the embroidery is lovely. Worth the price." },
  { id: "r7", productId: "mona-hoodie", author: "Sofia M.", rating: 3, date: "2026-09-21", verified: true, title: "Runs large", body: "Great quality, but it's roomy. I'd size down." },
  { id: "r8", productId: "universe-mug", author: "Kwame O.", rating: 4, date: "2026-09-30", verified: true, title: "Good mug", body: "Holds a proper amount of coffee and survives the dishwasher." },
  { id: "r9", productId: "copilot-cap", author: "Lena W.", rating: 4, date: "2026-10-14", title: "Comfortable", body: "Nice colour, soft brim, and the buckle feels solid." },
  { id: "r10", productId: "pixel-socks", author: "Raj P.", rating: 5, date: "2026-10-01", verified: true, title: "Fun socks", body: "Comfortable and the pattern hasn't faded." },
  { id: "r11", productId: "dependabot-plush", author: "Chloe B.", rating: 5, date: "2026-10-09", verified: true, title: "Adorable", body: "Bigger than I expected. My whole team wants one now." },
  { id: "r12", productId: "laptop-sleeve", author: "Ivan D.", rating: 4, date: "2026-09-12", verified: true, title: "Snug fit", body: "Fits my 14-inch laptop perfectly. The sticker window is a nice touch." },
];

export function averageRating(reviews: Review[]): number | null {
  if (reviews.length === 0) return null;
  return Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
}

export function starText(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}
