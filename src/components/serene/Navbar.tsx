import { Menu, X } from "lucide-react";
import { useState } from "react";
import mark from "@/assets/serene-mark.png.asset.json";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#creams", label: "Creams" },
  // { href: "#trial", label: "Try a Cream" },
  { href: "#comments", label: "Comments" },
  { href: "#kit", label: "Customize Your Kit" },
];

export function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2">
      <img src={mark.url} alt="" className="h-9 w-auto mix-blend-multiply" />
      <span className="font-serif text-2xl tracking-[0.18em] text-gold-gradient">SERENE</span>
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass sticky top-0 z-40 border-b border-border/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#creams" className="hidden rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground shadow-soft transition hover:shadow-lift lg:inline-flex">
          Get Started
        </a>
        <button className="grid h-11 w-11 place-items-center lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="animate-fade-in border-t border-border/60 px-5 py-4 lg:hidden">
          {[...navLinks, { href: "#creams", label: "Get Started" }].map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-serif text-xl text-primary">{l.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-beige/50 px-5 py-14 text-center">
      <div className="flex justify-center"><Logo /></div>
      <p className="mt-3 font-serif text-lg italic text-primary">Inhale Calm. Embrace Serene.</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {[
          ["#home", "Home"], ["#creams", "Creams"], ["#trial", "Trial"], ["#kit", "Customize Your Kit"], ["mailto:hello@serene.com", "Contact"],
        ].map(([h, l]) => (
          <li key={l}><a href={h} className="hover:text-primary">{l}</a></li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-muted-foreground">© 2026 Serene. All rights reserved.</p>
    </footer>
  );
}
