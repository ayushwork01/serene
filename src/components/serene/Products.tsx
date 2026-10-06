import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { products, type Product } from "@/data/products";
import { ratingStats, useSereneData } from "@/lib/serene-store";
import { RatingDisplay, RatingForm } from "./Reviews";
import { SectionHeading, StarsDisplay } from "./ui";

function ProductCard({ product, onDone }: { product: Product; onDone: () => void }) {
  const { data } = useSereneData();
  const [open, setOpen] = useState(false);
  const s = ratingStats(data.reviews, product.id);
  const interested = data.trialInterest.filter((t) => t.productId === product.id && t.interested).length;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:shadow-lift">
      <div className="aspect-[4/5] overflow-hidden bg-beige">
        <img src={product.image} alt={`Serene ${product.name} cream jar`} loading="lazy" width={768} height={960} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl text-primary">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-3 text-xs tracking-wide text-lavender">{product.notes}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <StarsDisplay value={s.average} size={14} />
          <span className="text-primary">{s.count ? s.average.toFixed(1) : "–"}</span>
          <span className="text-xs text-muted-foreground">Based on {s.count} rating{s.count === 1 ? "" : "s"}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{interested} interested in trying</p>
        <button onClick={() => setOpen(!open)} aria-expanded={open}
          className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4 text-sm text-primary">
          Rate this cream & see reviews
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="animate-fade-in mt-5 space-y-6">
            <RatingForm product={product} onDone={onDone} />
            <div className="border-t border-border pt-5"><RatingDisplay product={product} reviews={data.reviews} /></div>
          </div>
        )}
      </div>
    </article>
  );
}

export function ProductGrid({ onDone }: { onDone: () => void }) {
  return (
    <section id="creams" className="scroll-mt-16 px-5 py-20">
      <SectionHeading eyebrow="The collection" title="Explore Our Creams" text="Choose the cream that fits your moment of calm." />
      <div className="mx-auto grid max-w-7xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} product={p} onDone={onDone} />)}
      </div>
    </section>
  );
}
