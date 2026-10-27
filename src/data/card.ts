// Test-mode card checks. No card data leaves the browser.
export const DECLINED_CARD = "4000000000000002"; // always declined, like a processor's test card

export function luhn(digits: string): boolean {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

export function validateCard(c: { number: string; expiry: string; cvc: string; name: string }, now = new Date()): Record<string, string> {
  const e: Record<string, string> = {};
  const n = c.number.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(n) || !luhn(n)) e.number = "Card number is invalid";
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(c.expiry.trim());
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.expiry = "Enter the expiry as MM/YY";
  else {
    const end = new Date(2000 + Number(m[2]), Number(m[1]), 1); // first day after the expiry month
    if (end <= now) e.expiry = "This card has expired";
  }
  if (!/^\d{3,4}$/.test(c.cvc.trim())) e.cvc = "Enter the 3- or 4-digit code";
  if (!c.name.trim()) e.name = "Enter the name on the card";
  return e;
}
