// import { createFileRoute } from "@tanstack/react-router";
// import { Cart } from "@/components/serene/Cart";

// export const Route = createFileRoute("/cart")({
//   component: CartPage,
// });

// function CartPage() {
//   return (
//     <>
//       <Cart />
//     </>
//   );
// }
import { createFileRoute } from "@tanstack/react-router";
import { Cart } from "@/components/serene/Cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  return <Cart />;
}