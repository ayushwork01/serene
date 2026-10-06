// // import {
// //   Minus,
// //   Plus,
// //   ShoppingBag,
// //   Trash2,
// // } from "lucide-react";
// // import { useSereneData } from "@/lib/serene-store";
// // import { SButton, SectionHeading } from "./ui";

// // export function Cart() {
// //   const { data, update } = useSereneData();

// //   const cart = data.cart ?? [];

// //   const updateQuantity = (
// //     key: string,
// //     change: number
// //   ) => {
// //     update((d) => ({
// //       ...d,
// //       cart: d.cart
// //         .map((item) =>
// //           item.key === key
// //             ? {
// //                 ...item,
// //                 quantity: item.quantity + change,
// //               }
// //             : item
// //         )
// //         .filter((item) => item.quantity > 0),
// //     }));
// //   };

// //   const removeItem = (key: string) => {
// //     update((d) => ({
// //       ...d,
// //       cart: d.cart.filter(
// //         (item) => item.key !== key
// //       ),
// //     }));
// //   };

// //   const clearCart = () => {
// //     update((d) => ({
// //       ...d,
// //       cart: [],
// //     }));
// //   };

// //   const totalItems = cart.reduce(
// //     (total, item) => total + item.quantity,
// //     0
// //   );

// //   return (
// //     <section
// //       id="cart"
// //       className="scroll-mt-16 bg-beige/60 px-5 py-20"
// //     >
// //       <SectionHeading
// //         eyebrow="Your Serene selection"
// //         title="Your Cart"
// //         text="Everything you've selected for your Serene ritual."
// //       />

// //       <div className="mx-auto max-w-5xl">

// //         {/* EMPTY CART */}
// //         {cart.length === 0 ? (
// //           <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
// //             <ShoppingBag className="mx-auto h-10 w-10 text-primary" />

// //             <h3 className="mt-5 font-serif text-2xl text-primary">
// //               Your cart is empty
// //             </h3>

// //             <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
// //               Explore our creams and sachets and create
// //               your own Serene ritual.
// //             </p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* CART ITEMS */}
// //             <div className="space-y-4">
// //               {cart.map((item) => (
// //                 <div
// //                   key={item.key}
// //                   className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center"
// //                 >
// //                   {/* IMAGE */}
// //                   <img
// //                     src={item.image}
// //                     alt={item.productName}
// //                     loading="lazy"
// //                     className="h-24 w-20 shrink-0 rounded-2xl object-cover"
// //                   />

// //                   {/* PRODUCT INFO */}
// //                   <div className="min-w-0 flex-1">
// //                     <h3 className="font-serif text-xl text-primary">
// //                       {item.productName}
// //                     </h3>

// //                     <p className="mt-1 text-sm text-muted-foreground">
// //                       Format: {item.format}
// //                     </p>
// //                   </div>

// //                   {/* QUANTITY */}
// //                   <div className="flex items-center gap-2">
// //                     <button
// //                       type="button"
// //                       onClick={() =>
// //                         updateQuantity(item.key, -1)
// //                       }
// //                       className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:border-primary"
// //                       aria-label="Decrease quantity"
// //                     >
// //                       <Minus className="h-4 w-4" />
// //                     </button>

// //                     <span className="min-w-8 text-center text-sm font-medium">
// //                       {item.quantity}
// //                     </span>

// //                     <button
// //                       type="button"
// //                       onClick={() =>
// //                         updateQuantity(item.key, 1)
// //                       }
// //                       className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:border-primary"
// //                       aria-label="Increase quantity"
// //                     >
// //                       <Plus className="h-4 w-4" />
// //                     </button>
// //                   </div>

// //                   {/* REMOVE */}
// //                   <button
// //                     type="button"
// //                     onClick={() =>
// //                       removeItem(item.key)
// //                     }
// //                     className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-red-600"
// //                     aria-label={`Remove ${item.productName}`}
// //                   >
// //                     <Trash2 className="h-5 w-5" />
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* CART SUMMARY */}
// //             <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
// //               <div className="flex items-center justify-between">
// //                 <span className="text-sm text-muted-foreground">
// //                   Total items
// //                 </span>

// //                 <span className="font-medium">
// //                   {totalItems}
// //                 </span>
// //               </div>

// //               <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
// //                 <SButton
// //                   variant="outline"
// //                   onClick={clearCart}
// //                 >
// //                   Clear Cart
// //                 </SButton>

// //                 <SButton>
// //                   Continue
// //                 </SButton>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }
// import {
//     Check,
//   Minus,
//   Plus,
//   ShoppingBag,
//   Trash2,
// } from "lucide-react";
// import { useState } from "react";
// import { useSereneData } from "@/lib/serene-store";
// import { SButton, SectionHeading } from "./ui";

// // export function Cart() {
// //   const { data, update } = useSereneData();

// //   const cart = data.cart ?? [];
// export function Cart() {
//   const { data, update } = useSereneData();

//   const [ordered, setOrdered] = useState(false);

//   const cart = data.cart ?? [];

//   const updateQuantity = (
//     key: string,
//     change: number
//   ) => {
//     update((d) => ({
//       ...d,
//       cart: d.cart
//         .map((item) =>
//           item.key === key
//             ? {
//                 ...item,
//                 quantity: item.quantity + change,
//               }
//             : item
//         )
//         .filter((item) => item.quantity > 0),
//     }));
//   };

//   const removeItem = (key: string) => {
//     update((d) => ({
//       ...d,
//       cart: d.cart.filter(
//         (item) => item.key !== key
//       ),
//     }));
//   };

//   const clearCart = () => {
//     update((d) => ({
//       ...d,
//       cart: [],
//     }));
//   };
//   const completeOrder = () => {
//   setOrdered(true);

//   update((d) => ({
//     ...d,
//     cart: [],
//   }));
// };

//   const totalItems = cart.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );
//    /*
//    * THANK YOU SCREEN
//    */
//   if (ordered) {
//     return (
//       <section
//         id="cart"
//         className="scroll-mt-16 bg-beige/60 px-5 py-20"
//       >
//         <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-10 text-center shadow-soft">

//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//             <Check className="h-8 w-8 text-primary" />
//           </div>

//           <h2 className="mt-6 font-serif text-4xl text-primary">
//             Thank You for Choosing Serene
//           </h2>

//           <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
//             Your Serene selection has been received.
//             We hope it brings a little more calm,
//             comfort and balance to your day.
//           </p>

//           <p className="mt-6 font-serif text-xl text-primary">
//             Inhale Calm. Embrace Serene.
//           </p>

//           <p className="mt-3 text-sm text-muted-foreground">
//             Thank you for visiting Serene.
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
    
//       id="cart"
//       className="scroll-mt-16 bg-beige/60 px-5 py-20"
//     >
//       <SectionHeading
//         eyebrow="Your Serene selection"
//         title="Your Cart"
//         text="Everything you've selected for your Serene ritual."
//       />

//       <div className="mx-auto max-w-5xl">

//         {cart.length === 0 ? (
//           <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
//             <ShoppingBag className="mx-auto h-10 w-10 text-primary" />

//             <h3 className="mt-5 font-serif text-2xl text-primary">
//               Your cart is empty
//             </h3>

//             <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
//               Explore our creams and sachets and create
//               your own Serene ritual.
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="space-y-4">
//               {cart.map((item) => (
//                 <div
//                   key={item.key}
//                   className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.productName}
//                     loading="lazy"
//                     className="h-24 w-20 shrink-0 rounded-2xl object-cover"
//                   />

//                   <div className="min-w-0 flex-1">
//                     <h3 className="font-serif text-xl text-primary">
//                       {item.productName}
//                     </h3>

//                     <p className="mt-1 text-sm text-muted-foreground">
//                       Format: {item.format}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         updateQuantity(item.key, -1)
//                       }
//                       className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:border-primary"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </button>

//                     <span className="min-w-8 text-center text-sm font-medium">
//                       {item.quantity}
//                     </span>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         updateQuantity(item.key, 1)
//                       }
//                       className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:border-primary"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       removeItem(item.key)
//                     }
//                     className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-red-600"
//                   >
//                     <Trash2 className="h-5 w-5" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">
//                   Total items
//                 </span>

//                 <span className="font-medium">
//                   {totalItems}
//                 </span>
//               </div>

//               <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
//                 <SButton
//                   variant="soft"
//                   onClick={clearCart}
//                 >
//                   Clear Cart
//                 </SButton>

//                 <SButton>
//                   Continue
//                 </SButton>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// }
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useSereneData } from "@/lib/serene-store";
import { SButton, SectionHeading } from "./ui";

export function Cart() {
  const { data, update } = useSereneData();

  const [ordered, setOrdered] = useState(false);

  const cart = data.cart ?? [];

  const updateQuantity = (
    key: string,
    change: number
  ) => {
    update((d) => ({
      ...d,
      cart: d.cart
        .map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: item.quantity + change,
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  };

  const removeItem = (key: string) => {
    update((d) => ({
      ...d,
      cart: d.cart.filter(
        (item) => item.key !== key
      ),
    }));
  };

  const clearCart = () => {
    update((d) => ({
      ...d,
      cart: [],
    }));
  };

  /*
   * Complete the order
   */
  const completeOrder = () => {
    setOrdered(true);

    update((d) => ({
      ...d,
      cart: [],
    }));
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /*
   * THANK YOU SCREEN
   */
  if (ordered) {
    return (
      <section
        id="cart"
        className="scroll-mt-16 bg-beige/60 px-5 py-20"
      >
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-10 text-center shadow-soft">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>

          <h2 className="mt-6 font-serif text-4xl text-primary">
            Thank You for Choosing Serene
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Your Serene selection has been received.
            We hope it brings a little more calm,
            comfort and balance to your day.
          </p>

          <p className="mt-6 font-serif text-xl text-primary">
            Inhale Calm. Embrace Serene.
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Thank you for visiting Serene.
          </p>
        </div>
      </section>
    );
  }

  /*
   * NORMAL CART SCREEN
   */
  return (
    <section
      id="cart"
      className="scroll-mt-16 bg-beige/60 px-5 py-20"
    >
      <SectionHeading
        eyebrow="Your Serene selection"
        title="Your Cart"
        text="Everything you've selected for your Serene ritual."
      />

      <div className="mx-auto max-w-5xl">

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">

            <ShoppingBag className="mx-auto h-10 w-10 text-primary" />

            <h3 className="mt-5 font-serif text-2xl text-primary">
              Your cart is empty
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Explore our creams and sachets and create
              your own Serene ritual.
            </p>

          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.key}
                  className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center"
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.productName}
                    loading="lazy"
                    className="h-24 w-20 shrink-0 rounded-2xl object-cover"
                  />

                  {/* PRODUCT INFO */}
                  <div className="min-w-0 flex-1">

                    <h3 className="font-serif text-xl text-primary">
                      {item.productName}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Format: {item.format}
                    </p>

                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.key, -1)
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:border-primary"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="min-w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.key, 1)
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:border-primary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.key)
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-red-600"
                    aria-label={`Remove ${item.productName}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                </div>
              ))}

            </div>

            {/* CART SUMMARY */}
            <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">

              <div className="flex items-center justify-between">

                <span className="text-sm text-muted-foreground">
                  Total items
                </span>

                <span className="font-medium">
                  {totalItems}
                </span>

              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

                {/* CLEAR CART */}
                <SButton
                  variant="soft"
                  onClick={clearCart}
                >
                  Clear Cart
                </SButton>

                {/* COMPLETE ORDER */}
                <SButton onClick={completeOrder}>
                  Continue
                </SButton>

              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
}