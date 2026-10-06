import { products } from "@/data/products";
import { SButton } from "./ui";

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-16 overflow-hidden px-5 pb-20 pt-14">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="text-center lg:text-left">
          <p className="eyebrow rise">Welcome to Serene</p>
          <h1 className="rise mt-4 text-5xl leading-tight text-primary md:text-6xl" style={{ animationDelay: "0.15s" }}>
            Nourish your skin, <em className="text-lavender">calm your mind</em>
          </h1>
          <p className="rise mx-auto mt-5 max-w-lg text-muted-foreground lg:mx-0" style={{ animationDelay: "0.3s" }}>
            Discover a calming skincare ritual created to bring together botanical aromas, everyday self-care and moments of quiet.
          </p>
          <div className="rise mt-8 flex flex-wrap justify-center gap-3 lg:justify-start" style={{ animationDelay: "0.45s" }}>
            <a href="#creams"><SButton tabIndex={-1}>Explore Our Creams</SButton></a>
            <a href="#trial"><SButton tabIndex={-1} variant="soft">Try a Cream</SButton></a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {products.slice(0, 3).map((p, i) => (
            <img key={p.id} src={p.image} alt={`Serene ${p.name} jar`} width={768} height={960}
              className={`rise aspect-[4/5] w-full rounded-3xl object-cover shadow-soft ${i === 1 ? "-translate-y-6" : "translate-y-4"}`}
              style={{ animationDelay: `${0.3 + i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
