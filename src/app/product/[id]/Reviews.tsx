"use client";
import { useState } from "react";
import { averageRating, starText, type Review } from "@/data/reviews";
import { useStored } from "@/components/useStored";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function Reviews({ productId, seed }: { productId: string; seed: Review[] }) {
  const [mine, setMine] = useStored<Review[]>("swag_reviews", []);
  const all = [...mine.filter((r) => r.productId === productId), ...seed];
  const avg = averageRating(all);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [thanks, setThanks] = useState(false);

  const submit = () => {
    const e: string[] = [];
    if (rating < 1) e.push("Choose a rating");
    if (!title.trim()) e.push("Add a title");
    if (body.trim().length < 10) e.push("Write at least 10 characters");
    setErrors(e);
    if (e.length) return;
    const today = new Date().toISOString().slice(0, 10);
    setMine((m) => [{ id: `mine-${m.length + 1}`, productId, author: "You", rating, title: title.trim(), body: body.trim(), date: today }, ...m]);
    setRating(0); setTitle(""); setBody(""); setOpen(false); setThanks(true);
  };

  return (
    <section className="reviews" id="reviews" data-testid="reviews">
      <div className="section-head">
        <h2>Customer reviews</h2>
        <span data-testid="review-summary">{avg ? <><span className="stars">{starText(avg)}</span> {avg} out of 5 · {all.length} {all.length === 1 ? "review" : "reviews"}</> : "No reviews yet"}</span>
      </div>
      {thanks ? <p className="notice ok" data-testid="review-thanks">Thanks, your review is posted.</p> : null}
      {!open ? (
        <button className="btn ghost" data-testid="write-review" onClick={() => { setOpen(true); setThanks(false); }}>Write a review</button>
      ) : (
        <div className="card stack" data-testid="review-form" style={{ maxWidth: 560 }}>
          <div className="field"><span>Your rating</span>
            <div className="star-input" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  className={n <= rating ? "star on" : "star"} data-testid={`rating-${n}`} onClick={() => setRating(n)}>★</button>
              ))}
            </div>
          </div>
          <label className="field"><span>Title</span><input value={title} onChange={(e) => setTitle(e.target.value)} data-testid="review-title" /></label>
          <label className="field"><span>Review</span><textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} data-testid="review-body" /></label>
          {errors.length ? <ul className="err" data-testid="review-errors" role="alert">{errors.map((x) => <li key={x}>{x}</li>)}</ul> : null}
          <div className="actions">
            <button className="btn primary" data-testid="review-submit" onClick={submit}>Post review</button>
            <button className="btn ghost" onClick={() => { setOpen(false); setErrors([]); }}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{ marginTop: 10 }}>
        {all.map((r) => (
          <article key={r.id} className="review" data-testid="review">
            <div className="row small"><span><span className="stars">{starText(r.rating)}</span> <b>{r.title}</b></span><span className="muted">{fmt(r.date)}</span></div>
            <p>{r.body}</p>
            <p className="small muted">{r.author}{r.verified ? " · Verified buyer" : ""}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
