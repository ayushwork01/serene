import { Star } from "lucide-react";
import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center rise">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl text-primary md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "soft" | "ghost"; children: ReactNode };
export function SButton({ variant = "primary", className, ...p }: BtnProps) {
  return (
    <button
      {...p}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-normal tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-40",
        variant === "primary" && "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
        variant === "soft" && "border border-border bg-card text-foreground hover:border-gold",
        variant === "ghost" && "text-primary underline-offset-4 hover:underline",
        className,
      )}
    />
  );
}

export function Choice({ selected, children, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      {...p}
      className={cn(
        "min-h-11 rounded-full border px-4 text-sm transition-all duration-300",
        selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-gold",
        p.className,
      )}
    >
      {children}
    </button>
  );
}

export function StarsDisplay({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} width={size} height={size} className={i <= Math.round(value) ? "fill-gold text-gold" : "text-border"} />
      ))}
    </span>
  );
}

export function StarsInput({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange(i)}
          className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:scale-110"
        >
          <Star className={cn("h-7 w-7 transition-colors", i <= shown ? "fill-gold text-gold" : "text-border")} />
        </button>
      ))}
    </div>
  );
}
