import Link from "next/link";

const SECTIONS: { id: string; title: string; faq: [string, string][] }[] = [
  { id: "shipping", title: "Shipping", faq: [
    ["How much is shipping?", "Standard shipping is $5. It's free when your merchandise subtotal is $50 or more."],
    ["When will my order ship?", "Orders ship within 1–2 business days and usually arrive 3–5 business days after that."],
  ] },
  { id: "orders", title: "Orders & payment", faq: [
    ["How do promo codes work?", "Enter one code at checkout. UNIVERSE20 takes 20% off merchandise. Codes never apply to shipping."],
    ["Can I cancel an order?", "Yes, while it's still Processing. Open the order from your order history and choose Cancel order."],
    ["Can I buy the same items again?", "Open any past order and choose Buy again. The same items and quantities go back in your cart."],
  ] },
  { id: "returns", title: "Returns", faq: [
    ["How do I return something?", "Open a delivered order and choose Start a return. Pick the items and a reason, and choose a refund to your card or store credit."],
    ["Do returns cost anything?", "No. Returns are free."],
  ] },
  { id: "sizing", title: "Sizing", faq: [
    ["How do I pick a size?", "Choose a size on the product page before adding it to your cart. Each product page has a size guide."],
  ] },
];

export default function HelpPage() {
  let n = 0;
  return (
    <section className="wide-ish">
      <h1>Help centre</h1>
      <p className="muted">Answers to common questions. Can&apos;t find yours? <Link href="/contact" data-testid="help-contact">Contact us</Link>.</p>
      <div className="faq" data-testid="faq">
        {SECTIONS.map((s) => (
          <div key={s.id} id={s.id} style={{ marginTop: 22 }}>
            <h2>{s.title}</h2>
            {s.faq.map(([q, a]) => {
              n += 1;
              return (
                <details key={q} data-testid={`faq-${n}`}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
