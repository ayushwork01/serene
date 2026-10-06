import { Leaf, Moon, Sparkles, Waves, Wind } from "lucide-react";
import aroma from "@/assets/intro-aroma.jpg";
import texture from "@/assets/intro-texture.jpg";
// import lavender from "@/assets/cream-lavender.jpg";
import mind from "@/assets/Mind.png";
import { SectionHeading } from "./ui";

const blocks = [
  {
    title: "Your Daily Reset for Body and Mind",
    text: "Modern life brings constant pressure, fatigue, and sensory overload. We created our formula with a single, clear purpose: to deliver a calming, natural moment of relief from daily stress through the experience of therapeutic aromatherapy. Designed as an intentional sensory pause, it helps create a feeling of calm, ease tension, quiet mental noise, and restore a sense of emotional balance whenever you need it most.",
    img: mind, alt: "Serene Patchouli Orange cream jar beside fresh patchouli and orange blossoms",
  },
  {
    title: "Therapeutic Aromatics in Every Breath",
    text: "The true core of this cream lies in its targeted essential oil blend, crafted to engage your olfactory system and create a sensory signal associated with relaxation. Applied to warm pulse points, body heat helps diffuse botanical aromas into the air around you. Inhaling these gentle aromas can create a calming sensory experience, helping you pause, breathe deeply, and bring your mind back to center.",
    img: aroma, alt: "Cream applied to the wrist pulse point among lavender, chamomile and rose petals",
  },
  {
    title: "Added Nourishment for Your Skin",
    text: "While aromatherapy leads the experience, your skin receives a replenishing secondary benefit. The light, soothing cream base provides gentle hydration and helps leave skin feeling soft and comfortable without a heavy, greasy finish. Simply massage a small amount onto your wrists, neck, or temples, breathe deeply, and let the calming aromas create your moment of pause while your skin stays soft and cared for.",
    img: texture, alt: "Close-up of soft cream texture with lavender buds and a rose petal",
  },
];

export function Introduction() {
  return (
    <section id="about" className="scroll-mt-16 px-5 py-20">
      <SectionHeading eyebrow="Introduction" title="Why Serene exists" text="A calming sensory pause, made for everyday life." />
      <div className="mx-auto max-w-6xl space-y-20">
        {blocks.map((b, i) => (
          <article key={b.title} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="overflow-hidden rounded-[2rem] shadow-soft">
              <img src={b.img} alt={b.alt} loading="lazy" width={1024} height={1152}
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105" />
            </div>
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <h3 className="mt-3 text-4xl leading-tight text-primary md:text-5xl">{b.title}</h3>
              <p className="mt-5 leading-relaxed text-muted-foreground">{b.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const benefits = [
  { icon: Leaf, title: "Calming Ritual", text: "Aromatherapy can turn a simple skincare moment into a calming sensory ritual." },
  { icon: Wind, title: "Pause & Breathe", text: "The gentle aroma encourages you to slow down, breathe deeply and take a moment for yourself." },
  { icon: Moon, title: "Quiet Your Mind", text: "A familiar, soothing scent can help create a sense of mental calm during busy moments." },
  { icon: Waves, title: "Everyday Stress Reset", text: "Use the ritual as a small pause between work, travel, study or everyday responsibilities." },
  { icon: Sparkles, title: "Skin + Senses", text: "Enjoy the sensory experience of aromatherapy while the cream helps leave your skin feeling soft and moisturized." },
];

export function Benefits() {
  return (
    <section className="bg-lavender-soft/50 px-5 py-20">
      <SectionHeading eyebrow="Benefits" title="Why Aromatherapy?" text="A simple sensory ritual for your everyday reset." />
      <ul className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {benefits.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-3xl border border-border/70 bg-card p-6 text-center shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-beige text-gold"><Icon className="h-5 w-5" /></span>
            <h3 className="mt-4 text-2xl text-primary">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
