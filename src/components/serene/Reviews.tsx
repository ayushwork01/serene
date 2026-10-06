import { useState } from "react";
import type { Product } from "@/data/products";
// import { ratingStats, useSereneData, type Packaging, type Review } from "@/lib/serene-store";
// import { Choice, SButton, StarsDisplay, StarsInput } from "./ui";
import { ratingStats, useSereneData, type Review } from "@/lib/serene-store";
import { SButton, StarsDisplay, StarsInput } from "./ui";

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="rounded-2xl border border-border/70 bg-background p-4">
      <div className="flex items-center justify-between gap-2">
        <StarsDisplay value={review.rating} size={14} />
        <time className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</time>
      </div>
      {review.reviewText && <p className="mt-2 font-serif text-lg italic">“{review.reviewText}”</p>}
      <p className="mt-2 text-xs text-muted-foreground">Received in: <span className="text-primary">{review.packagingType}</span></p>
    </li>
  );
}

export function RatingDisplay({ product, reviews }: { product: Product; reviews: Review[] }) {
  const s = ratingStats(reviews, product.id);
  if (!s.count) return <p className="text-sm text-muted-foreground">No ratings yet for {product.name}. Be the first to share your experience.</p>;
  return (
    <div>
      <div className="flex items-end gap-4">
        <span className="font-serif text-4xl text-primary">{s.average.toFixed(1)}</span>
        <div className="pb-1">
          <StarsDisplay value={s.average} />
          <p className="text-xs text-muted-foreground">{s.average.toFixed(1)} / 5 · Based on {s.count} rating{s.count > 1 ? "s" : ""}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-1.5">
        {s.distribution.map((d) => (
          <li key={d.stars} className="flex items-center gap-3 text-xs">
            <span className="w-10">{d.stars} ★</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span className="block h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${(d.count / s.count) * 100}%` }} />
            </span>
            <span className="w-6 text-right text-muted-foreground">{d.count}</span>
          </li>
        ))}
      </ul>
      <h4 className="mt-6 text-xl text-primary">Recent reviews</h4>
      <ul className="mt-3 max-h-64 space-y-3 overflow-y-auto pr-1">
        {s.reviews.slice(0, 4).map((r, i) => <ReviewCard key={r.date + i} review={r} />)}
      </ul>
    </div>
  );
}

export function RatingForm({ product, onDone }: { product: Product; onDone: () => void }) {
  const { update } = useSereneData();
  const [rating, setRating] = useState(0);
  // const [pack, setPack] = useState<Packaging | null>(null);
  // const [text, setText] = useState("");
  // const submit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!rating || !pack) return;
  //   update((d) => ({ ...d, reviews: [...d.reviews, { productId: product.id, rating, packagingType: pack, reviewText: text.trim().slice(0, 500), date: new Date().toISOString() }] }));
  //   setRating(0); setPack(null); setText("");
  //   onDone();
  // };
  const submit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!rating) return;

  update((d) => ({
    ...d,
    reviews: [
      ...d.reviews,
      {
        productId: product.id,
        rating,
        packagingType: "Cream",
        reviewText: "",
        date: new Date().toISOString(),
      } as Review,
    ],
  }));

  setRating(0);
  onDone();
};
  return (
    <form onSubmit={submit} className="space-y-5">
      <h4 className="text-xl text-primary">Rate this cream</h4>
      <div>
                <StarsInput value={rating} onChange={setRating} label={`Rate ${product.name}`} />
        <p className="mt-1 text-xs text-muted-foreground" aria-live="polite">{rating ? `You selected ${rating} out of 5` : "Tap a star to rate"}</p>
      </div>
      {/* <div>
        <p className="mb-2 text-sm">How did you receive the product?</p>
        <div className="flex gap-2">
          <Choice selected={pack === "Cream"} onClick={() => setPack("Cream")}>Cream</Choice>
          <Choice selected={pack === "Sachet"} onClick={() => setPack("Sachet")}>Sachet</Choice>
        </div>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm">What did you think? <span className="text-muted-foreground">(optional)</span></span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={500} rows={3} className="w-full rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-gold" />
      </label> */}
      {/* <SButton type="submit" disabled={!rating || !pack}>Submit Review</SButton> */}
      <SButton type="submit" disabled={!rating}>Submit Review</SButton>
    </form>
  );
}

