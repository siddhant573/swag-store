"use client";
import { useState } from "react";
import { useStored } from "@/components/useStored";

const TOPICS = ["An order", "Sizing", "Promo codes", "Something else"];

export default function ContactPage() {
  const [sent, setSent] = useStored<number>("swag_tickets", 0);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ticket, setTicket] = useState("");

  const submit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Enter your name";
    if (!topic) e.topic = "Choose a topic";
    if (order && !/^UV-\d{4}$/.test(order.trim())) e.order = "Order numbers look like UV-1001";
    if (message.trim().length < 20) e.message = "Tell us a bit more (at least 20 characters)";
    setErrors(e);
    if (Object.keys(e).length) return;
    const n = sent + 1;
    setSent(n);
    setTicket(`SUP-${2000 + n}`);
  };

  if (ticket)
    return (
      <section className="narrow" data-testid="contact-success">
        <h1>Thanks, {name.trim()}</h1>
        <p>We&apos;ve opened ticket <b data-testid="ticket-number">{ticket}</b>. Our team usually replies within one business day.</p>
      </section>
    );

  return (
    <section className="narrow">
      <h1>Contact us</h1>
      <p className="muted">Questions about an order, sizing or a return? Send us a message.</p>
      <div className="card stack" data-testid="contact-form">
        <label className="field"><span>Your name</span><input value={name} onChange={(e) => setName(e.target.value)} data-testid="contact-name" />
          {errors.name ? <small className="err" data-testid="contact-name-error">{errors.name}</small> : null}</label>
        <label className="field"><span>Topic</span>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} data-testid="contact-topic">
            <option value="">Choose…</option>{TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
          {errors.topic ? <small className="err" data-testid="contact-topic-error">{errors.topic}</small> : null}</label>
        <label className="field"><span>Order number (optional)</span><input value={order} placeholder="UV-1001" onChange={(e) => setOrder(e.target.value)} data-testid="contact-order" />
          {errors.order ? <small className="err" data-testid="contact-order-error">{errors.order}</small> : null}</label>
        <label className="field"><span>Message</span><textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} data-testid="contact-message" />
          {errors.message ? <small className="err" data-testid="contact-message-error">{errors.message}</small> : null}</label>
        <button className="btn primary wide" data-testid="contact-submit" onClick={submit}>Send message</button>
      </div>
    </section>
  );
}
