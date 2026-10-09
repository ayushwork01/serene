// import { ChevronDown } from "lucide-react";
// import { useState } from "react";
// import { products, type Product } from "@/data/products";
// import { ratingStats, useSereneData } from "@/lib/serene-store";
// import { RatingDisplay, RatingForm } from "./Reviews";
// import { SectionHeading, StarsDisplay } from "./ui";

// function ProductCard({ product, onDone }: { product: Product; onDone: () => void }) {
//   const { data } = useSereneData();
//   const [open, setOpen] = useState(false);
//   const s = ratingStats(data.reviews, product.id);
//   const interested = data.trialInterest.filter((t) => t.productId === product.id && t.interested).length;
//   return (
//     <article className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:shadow-lift">
//       <div className="aspect-[4/5] overflow-hidden bg-beige">
//         <img src={product.image} alt={`Serene ${product.name} cream jar`} loading="lazy" width={768} height={960} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
//       </div>
//       <div className="flex flex-1 flex-col p-5">
//         <h3 className="text-2xl text-primary">{product.name}</h3>
//         <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
//         <p className="mt-3 text-xs tracking-wide text-lavender">{product.notes}</p>
//         <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
//           <StarsDisplay value={s.average} size={14} />
//           <span className="text-primary">{s.count ? s.average.toFixed(1) : "–"}</span>
//           <span className="text-xs text-muted-foreground">Based on {s.count} rating{s.count === 1 ? "" : "s"}</span>
//         </div>
//         <p className="mt-1 text-xs text-muted-foreground">{interested} interested in trying</p>
//         <button onClick={() => setOpen(!open)} aria-expanded={open}
//           className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4 text-sm text-primary">
//           Rate this cream & see reviews
//           <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
//         </button>
//         {open && (
//           <div className="animate-fade-in mt-5 space-y-6">
//             <RatingForm product={product} onDone={onDone} />
//             <div className="border-t border-border pt-5"><RatingDisplay product={product} reviews={data.reviews} /></div>
//           </div>
//         )}
//       </div>
//     </article>
//   );
// }

// export function ProductGrid({ onDone }: { onDone: () => void }) {
//   return (
//     <section id="creams" className="scroll-mt-16 px-5 py-20">
//       <SectionHeading eyebrow="The collection" title="Explore Our Creams" text="Choose the cream that fits your moment of calm." />
//       <div className="mx-auto grid max-w-7xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {products.map((p) => <ProductCard key={p.id} product={p} onDone={onDone} />)}
//       </div>
//     </section>
//   );
// }

import { ChevronDown, ShoppingBag, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { products, type Product } from "@/data/products";
import { ratingStats, useSereneData } from "@/lib/serene-store";
import { RatingDisplay, RatingForm } from "./Reviews";
import { SectionHeading, StarsDisplay } from "./ui";
import { toast } from "sonner";

type Format = "Cream" | "Sachet";

const keyOf = (id: number, format: Format) => `${id}-${format}`;

const creamInstructions = {
  title: "How to Use",
  usage:
    "Gently massage a small amount onto clean, dry skin until fully absorbed. Use twice daily, morning and evening, for best results.",
  caution:
    "For external use only; avoid contact with eyes. Keep out of reach of children and store in a cool, dry place.",
};

const sachetInstructions = {
  title: "How to Use",
  usage:
    "Place or hang the sachet in your closet, drawer, car, or living space to naturally diffuse essential oils. Gently squeeze or shake the pouch occasionally to reactivate and intensify the aroma.",
  caution:
    "For aromatic use only; do not ingest or open the inner pouch. Keep out of reach of children and pets, and avoid placing directly on finished wood or delicate fabrics.",
};

function ProductCard({
  product,
  format,
  onDone,
}: {
  product: Product;
  format: Format;
  onDone: () => void;
}) {
  const { data, update } = useSereneData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isSachet = format === "Sachet";
  const image = isSachet
    ? product.sachetImage ?? product.image
    : product.image;

  const stats = ratingStats(data.reviews, product.id);
  const interested = data.trialInterest.filter(
    (t) => t.productId === product.id && t.interested
  ).length;

  const addToCart = () => {
    const key = keyOf(product.id, format);

    update((d) => {
      const cart = d.cart ?? [];
      const existing = cart.find((item) => item.key === key);

      if (existing) {
        return {
          ...d,
          cart: cart.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...d,
        cart: [
          ...cart,
          {
            key,
            productId: product.id,
            productName: product.name,
            format,
            image,
            quantity: 1,
            date: new Date().toISOString(),
          },
        ],
      };
    });
     toast.success(`${product.name} ${format} added to cart!`);
  };

  const buyNow = () => {
    addToCart();
    navigate({ to: "/cart" });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:shadow-lift">
      <div className="aspect-[4/5] overflow-hidden bg-beige">
        <img
          src={image}
          alt={`Serene ${product.name} ${format}`}
          loading="lazy"
          width={768}
          height={960}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl text-primary">
          {product.name} {isSachet ? "Sachet" : ""}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <p className="mt-3 text-xs tracking-wide text-lavender">
          {product.notes}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <StarsDisplay value={stats.average} size={14} />
          <span className="text-primary">
            {stats.count ? stats.average.toFixed(1) : "–"}
          </span>
          <span className="text-xs text-muted-foreground">
            Based on {stats.count} rating{stats.count === 1 ? "" : "s"}
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {interested} interested in trying
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={addToCart}
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full border border-primary px-3 text-xs text-primary transition hover:bg-primary/5 sm:text-sm"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>

          <button
            type="button"
            onClick={buyNow}
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-primary px-3 text-xs text-primary-foreground transition hover:opacity-90 sm:text-sm"
          >
            <Zap className="h-4 w-4" />
            Buy Now
          </button>
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <h4 className="font-serif text-lg text-primary">
            {creamInstructions.title}
          </h4>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {isSachet ? sachetInstructions.usage : creamInstructions.usage}
          </p>

          <h4 className="mt-4 font-serif text-lg text-primary">
            Safety / Caution
          </h4>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {isSachet
              ? sachetInstructions.caution
              : creamInstructions.caution}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-4 text-left text-sm text-primary"
        >
          {isSachet ? "Rate this sachet & see reviews" : "Rate this cream & see reviews"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="mt-5 animate-fade-in space-y-6">
            <RatingForm product={product} onDone={onDone} />
            <div className="border-t border-border pt-5">
              <RatingDisplay product={product} reviews={data.reviews} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function ProductGrid({ onDone }: { onDone: () => void }) {
  return (
    <>
      <section id="creams" className="scroll-mt-16 px-5 py-20">
        <SectionHeading
          eyebrow="The collection"
          title="Explore Our Creams"
          text="Choose the cream that fits your moment of calm."
        />

        <div className="mx-auto grid max-w-7xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={`${product.id}-cream`}
              product={product}
              format="Cream"
              onDone={onDone}
            />
          ))}
        </div>
      </section>

      <section id="sachets" className="scroll-mt-16 bg-beige/40 px-5 py-20">
        <SectionHeading
          eyebrow="Aromatic essentials"
          title="Explore Our Sachets"
          text="Bring your favourite Serene aromas into your everyday spaces."
        />

        <div className="mx-auto grid max-w-7xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={`${product.id}-sachet`}
              product={product}
              format="Sachet"
              onDone={onDone}
            />
          ))}
        </div>
      </section>
    </>
  );
}