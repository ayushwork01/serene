import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { CustomizeKit } from "@/components/serene/CustomizeKit";
import { Comments, Splash, ThanksForVisiting, useScrollReveal } from "@/components/serene/Extras";
import { FutureInterest, ThankYou } from "@/components/serene/FutureAndThanks";
import { Benefits, Introduction } from "@/components/serene/Intro";
import { Hero } from "@/components/serene/Hero";
import { Footer, Navbar } from "@/components/serene/Navbar";
import { ProductGrid } from "@/components/serene/Products";
import { TrialInterest } from "@/components/serene/TrialInterest";
import { Cart } from "@/components/serene/Cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Serene | Nourish your skin, calm your mind" },
      { name: "description", content: "Discover five Serene creams, try one, share your rating and build your own kit." },
      { property: "og:title", content: "Serene — Nourish your skin, calm your mind" },
      { property: "og:description", content: "Nourish your skin, calm your mind. Inhale Calm. Embrace Serene." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [thanks, setThanks] = useState(false);
  const [entered, setEntered] = useState(false);
  const done = useCallback(() => setThanks(true), []);
  const close = useCallback(() => setThanks(false), []);
  useScrollReveal();
  return (
    <>
      {!entered && <Splash onEnter={() => setEntered(true)} />}
      <Navbar />
      <main>
        <Introduction />
        <Benefits />
        <Hero />
        <ProductGrid onDone={done} />
        <TrialInterest onDone={done} />
        {/* <CustomizeKit />
        <FutureInterest onDone={done} /> */}
        <CustomizeKit />
        <Cart />
        <FutureInterest onDone={done} />
        <Comments />
        <ThanksForVisiting />
      </main>
      <Footer />
      <ThankYou open={thanks} onClose={close} />
    </>
  );
}
