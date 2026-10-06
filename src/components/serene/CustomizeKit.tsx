// import { Check, Plus } from "lucide-react";
// import { useState } from "react";
// import { products } from "@/data/products";
// import { useSereneData } from "@/lib/serene-store";
// import { cn } from "@/lib/utils";
// import { SButton, SectionHeading } from "./ui";

// const formats = ["Cream", "Sachet"] as const;
// const keyOf = (id: number, f: string) => `${id}-${f}`;
// const label = (k: string) => {
//   const [id, f] = k.split("-");
//   return `${products.find((p) => p.id === Number(id))?.name} — ${f}`;
// };

// export function CustomizeKit() {
//   const { update } = useSereneData();
//   const [sel, setSel] = useState<string[]>([]);
//   const [created, setCreated] = useState(false);
//   const toggle = (k: string) => { setCreated(false); setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k])); };
//   const create = () => {
//     update((d) => ({ ...d, kits: [...d.kits, { items: sel, date: new Date().toISOString() }] }));
//     setSel([]);
//     setCreated(true);
//   };
//   return (
//     <section id="kit" className="scroll-mt-16 bg-beige/60 px-5 py-20">
//       <SectionHeading eyebrow="Made for you" title="Customize Your Kit" text="Choose the creams and formats you'd like to include in your Serene ritual." />
//       <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
//           {products.map((p) => (
//             <div key={p.id} className="flex gap-4 rounded-3xl border border-border bg-card p-3 shadow-soft">
//               <img src={p.image} alt={p.name} loading="lazy" width={768} height={960} className="h-28 w-24 shrink-0 rounded-2xl object-cover" />
//               <div className="flex min-w-0 flex-1 flex-col">
//                 <span className="font-serif text-xl text-primary">{p.name}</span>
//                 <div className="mt-auto flex flex-wrap gap-2 pt-2">
//                   {formats.map((f) => {
//                     const k = keyOf(p.id, f);
//                     const on = sel.includes(k);
//                     return (
//                       <button key={f} type="button" aria-pressed={on} onClick={() => toggle(k)}
//                         className={cn("inline-flex min-h-9 items-center gap-1 rounded-full border px-3 text-xs transition-all", on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-gold")}>
//                         {on ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />} {f}{on && " · Added"}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <aside className="glass h-fit rounded-3xl border border-border p-6 shadow-soft lg:sticky lg:top-24" aria-live="polite">
//           <h3 className="text-3xl text-primary">Your Serene Kit</h3>
//           <p className="mt-2 text-sm">{sel.length} item{sel.length === 1 ? "" : "s"} selected</p>
//           {sel.length ? (
//             <ul className="mt-4 space-y-2 text-sm">
//               {sel.map((k) => <li key={k} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" />{label(k)}</li>)}
//             </ul>
//           ) : <p className="mt-4 text-sm text-muted-foreground">Select creams or sachets to begin.</p>}
//           <SButton className="mt-5 w-full" disabled={!sel.length} onClick={create}>Create My Kit</SButton>
//           {created && <p className="animate-fade-in mt-4 text-center font-serif text-lg text-primary">Your Serene Kit has been created.</p>}
//         </aside>
//       </div>
//     </section>
//   );
// }
import { Check, Plus, ShoppingBag, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { products } from "@/data/products";
import { useSereneData } from "@/lib/serene-store";
import { cn } from "@/lib/utils";
import { SButton, SectionHeading } from "./ui";


const formats = ["Cream", "Sachet"] as const;

type Format = (typeof formats)[number];

const keyOf = (id: number, f: string) => `${id}-${f}`;

const label = (k: string) => {
  const [id, f] = k.split("-");
  return `${products.find((p) => p.id === Number(id))?.name} — ${f}`;
};

export function CustomizeKit() {
  const { update } = useSereneData();
  const navigate = useNavigate();

  const [sel, setSel] = useState<string[]>([]);
  const [created, setCreated] = useState(false);

  /*
   * Add a single product/format to cart
   */
  const addToCart = (productId: number, format: Format) => {
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    const cartKey = keyOf(productId, format);

    update((d) => {
      const cart = d.cart ?? [];

      const existing = cart.find(
        (item) => item.key === cartKey
      );

      if (existing) {
        return {
          ...d,
          cart: cart.map((item) =>
            item.key === cartKey
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        ...d,
        cart: [
          ...cart,
          {
            key: cartKey,
            productId,
            productName: product.name,
            format,
            // image:
            //   format === "Sachet"
            //     ? product.sachetImage ?? product.image
            //     : product.image,
            image: product.image,
            quantity: 1,
            date: new Date().toISOString(),
          },
        ],
      };
    });
  };

  /*
   * Buy Now
   *
   * Adds the selected item to cart and sends
   * the user directly to the cart page.
   */
  // const buyNow = (productId: number, format: Format) => {
  //   addToCart(productId, format);

  //   // Change this route if your cart page uses another URL
  //   window.location.href = "/cart";
  // };
  const buyNow = (productId: number, format: Format) => {
  addToCart(productId, format);

  navigate({
    to: "/cart",
  });
};

  /*
   * Toggle item inside Customize Your Kit
   */
  const toggle = (k: string) => {
    setCreated(false);

    setSel((s) =>
      s.includes(k)
        ? s.filter((x) => x !== k)
        : [...s, k]
    );
  };

  /*
   * Create customized kit
   *
   * IMPORTANT:
   * The selected kit items are immediately added to cart.
   */
  const create = () => {
    if (!sel.length) return;

    update((d) => {
      const cart = d.cart ?? [];

      let updatedCart = [...cart];

      sel.forEach((k) => {
        const [id, formatValue] = k.split("-");

        const productId = Number(id);
        const format = formatValue as Format;

        const product = products.find(
          (p) => p.id === productId
        );

        if (!product) return;

        const existingIndex = updatedCart.findIndex(
          (item) => item.key === k
        );

        if (existingIndex !== -1) {
          updatedCart = updatedCart.map((item) =>
            item.key === k
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        } else {
          updatedCart.push({
            key: k,
            productId,
            productName: product.name,
            format,
            image: product.image,
            quantity: 1,
            date: new Date().toISOString(),
          });
        }
      });

      return {
        ...d,

        // Kit history
        kits: [
          ...d.kits,
          {
            items: sel,
            date: new Date().toISOString(),
          },
        ],

        // Directly add customized kit to cart
        cart: updatedCart,
      };
    });

    setSel([]);
    setCreated(true);
  };

  return (
    <section
      id="kit"
      className="scroll-mt-16 bg-beige/60 px-5 py-20"
    >
      <SectionHeading
        eyebrow="Made for you"
        title="Customize Your Kit"
        text="Choose the creams and formats you'd like to include in your Serene ritual."
      />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

          {products.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-3xl border border-border bg-card p-3 shadow-soft"
            >

              {/* Product Image */}
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={768}
                height={960}
                className="h-48 w-full rounded-2xl object-cover"
              />

              <div className="flex flex-1 flex-col pt-4">

                {/* Product Name */}
                <span className="font-serif text-xl text-primary">
                  {p.name}
                </span>

                {/* Description */}
                {p.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                )}

                {/* FORMAT OPTIONS */}
                <div className="mt-4 space-y-3">

                  {formats.map((f) => {
                    const k = keyOf(p.id, f);
                    const on = sel.includes(k);

                    return (
                      <div
                        key={f}
                        className={cn(
                          "rounded-2xl border p-3 transition-all",
                          on
                            ? "border-primary/40 bg-primary/5"
                            : "border-border bg-background/40"
                        )}
                      >

                        {/* Format */}
                        <div className="flex items-center justify-between">

                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggle(k)}
                            className={cn(
                              "inline-flex min-h-9 items-center gap-1 rounded-full border px-3 text-xs transition-all",
                              on
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-gold"
                            )}
                          >
                            {on ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Plus className="h-3 w-3" />
                            )}

                            {f}

                            {on && " · Added"}
                          </button>

                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="mt-3 grid grid-cols-2 gap-2">

                          {/* ADD TO CART */}
                          <button
                            type="button"
                            onClick={() =>
                              addToCart(p.id, f)
                            }
                            className="inline-flex min-h-9 items-center justify-center gap-1 rounded-full border border-border px-3 text-xs transition-all hover:border-primary hover:bg-primary/5"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            Add to Cart
                          </button>

                          {/* BUY NOW */}
                          <button
                            type="button"
                            onClick={() =>
                              buyNow(p.id, f)
                            }
                            className="inline-flex min-h-9 items-center justify-center gap-1 rounded-full bg-primary px-3 text-xs text-primary-foreground transition-all hover:opacity-90"
                          >
                            <Zap className="h-3.5 w-3.5" />
                            Buy Now
                          </button>

                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* KIT SUMMARY */}
        <aside
          className="glass h-fit rounded-3xl border border-border p-6 shadow-soft lg:sticky lg:top-24"
          aria-live="polite"
        >

          <div className="flex items-start justify-between gap-4">

            <div>
              <h3 className="text-3xl text-primary">
                Your Serene Kit
              </h3>

              <p className="mt-2 text-sm">
                {sel.length} item
                {sel.length === 1 ? "" : "s"} selected
              </p>
            </div>

            <ShoppingBag className="h-6 w-6 text-primary" />

          </div>

          {/* SELECTED ITEMS */}
          {sel.length ? (
            <ul className="mt-5 space-y-3 text-sm">

              {sel.map((k) => (
                <li
                  key={k}
                  className="flex items-center justify-between gap-2 rounded-xl border border-border bg-background/50 p-3"
                >

                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    {label(k)}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSel((s) =>
                        s.filter((x) => x !== k)
                      )
                    }
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    Remove
                  </button>

                </li>
              ))}

            </ul>
          ) : (
            <p className="mt-5 text-sm text-muted-foreground">
              Select creams or sachets to begin.
            </p>
          )}

          {/* CREATE KIT */}
          <SButton
            className="mt-5 w-full"
            disabled={!sel.length}
            onClick={create}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add Customized Kit to Cart
          </SButton>

          {created && (
            <div className="animate-fade-in mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center">

              <Check className="mx-auto h-5 w-5 text-primary" />

              <p className="mt-2 font-serif text-lg text-primary">
                Your Serene Kit has been added to cart.
              </p>

              {/* <button
                type="button"
                onClick={() =>
                  (window.location.href = "/cart")
                }
                className="mt-2 text-sm underline underline-offset-4"
              >
                View Cart
              </button> */}
              <button
                type="button"
                onClick={() =>
                  navigate({
                    to: "/cart",
                  })
                }
                className="mt-2 text-sm underline underline-offset-4"
              >
                View Cart
              </button>

            </div>
          )}

        </aside>
      </div>
    </section>
  );
}