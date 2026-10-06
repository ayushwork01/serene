// import { Check } from "lucide-react";
// import { ShoppingCart } from "lucide-react";
// import { useState } from "react";
// import { products } from "@/data/products";
// import { useSereneData } from "@/lib/serene-store";
// import { cn } from "@/lib/utils";
// import { SButton, SectionHeading } from "./ui";


export function TrialInterest({ onDone }: { onDone: () => void }) {
  // const { data, update } = useSereneData();
  // const [picked, setPicked] = useState<number[]>([]);
  // const toggle = (id: number) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  // const submit = () => {
  //   const date = new Date().toISOString();
  //   update((d) => ({ ...d, trialInterest: [...d.trialInterest, ...picked.map((productId) => ({ productId, interested: true, date }))] }));
  //   setPicked([]);
  //   onDone();
  // };
  // const interestCount = (id: number) => data.trialInterest.filter((t) => t.productId === id && t.interested).length;

  // return (
    // <section id="trial" className="scroll-mt-16 bg-lavender-soft/60 px-5 py-20">
    //   <SectionHeading eyebrow="Trial" title="Try Before You Decide" text="Tell us which cream you'd be interested in trying. Your feedback will help us understand what works best for you." />
    //   <fieldset className="mx-auto max-w-4xl">
    //     <legend className="mb-5 w-full text-center font-serif text-2xl text-primary">Which cream would you like to try?</legend>
    //     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
    //       {products.map((p) => {
    //         const on = picked.includes(p.id);
    //         return (
    //           <button
    //             key={p.id}
    //             type="button"
    //             aria-pressed={on}
    //             onClick={() => toggle(p.id)}
    //             className={cn("flex items-center gap-3 rounded-2xl border bg-card p-3 text-left transition-all duration-300 lg:flex-col lg:text-center", on ? "border-primary shadow-lift" : "border-border hover:border-gold")}
    //           >
    //             <img src={p.image} alt="" loading="lazy" width={768} height={960} className="h-16 w-14 rounded-xl object-cover lg:h-28 lg:w-full" />
    //             <span className="flex-1">
    //               <span className="block font-serif text-lg text-primary">{p.name}</span>
    //               <span className="text-xs text-muted-foreground">{interestCount(p.id)} interested</span>
    //             </span>
    //             <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border", on ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
    //               {on && <Check className="h-4 w-4" />}
    //             </span>
    //           </button>
    //         );
    //       })}
    //     </div>
    //     <div className="mt-8 text-center">
    //       <SButton disabled={!picked.length} onClick={submit}>Submit Trial Interest</SButton>
    //     </div>
    //   </fieldset>
    // </section>
//     <section id="shop" className="scroll-mt-16 bg-lavender-soft/60 px-5 py-20">
//   {/* <SectionHeading
//     eyebrow="Shop"
//     title="Choose Your Cream"
//     text="Explore our creams and add your favorite to your cart."
//   /> */}

//   <div className="mx-auto max-w-5xl">
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//       {products.map((p) => (
//         <div
//           key={p.id}
//           className="flex flex-col rounded-2xl border border-border bg-card p-3 transition-all duration-300 hover:border-gold hover:shadow-lift"
//         >
//           <img
//             src={p.image}
//             alt={p.name}
//             loading="lazy"
//             width={768}
//             height={960}
//             className="h-48 w-full rounded-xl object-cover"
//           />

//           <div className="flex flex-1 flex-col pt-3 text-center">
//             <h3 className="font-serif text-lg text-primary">
//               {p.name}
//             </h3>

//             <p className="mt-1 text-xs text-muted-foreground">
//               {p.description}
//             </p>

//             {/* <SButton
//               className="mt-auto pt-4"
//               onClick={() => onDone()}
//             >
//               <ShoppingCart className="mr-2 h-4 w-4" />
//               Add to Cart
//             </SButton> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>
//   );
return null;
}