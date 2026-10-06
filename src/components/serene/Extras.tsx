import { Leaf } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/serene-logo.png";
import { SButton, SectionHeading } from "./ui";

/** Fades every <section> in as it scrolls into view. */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("main section");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
    return () => io.disconnect();
  }, []);
}

export function Splash({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const enter = () => { setLeaving(true); setTimeout(onEnter, 600); };
  useEffect(() => { const t = setTimeout(enter, 9000); return () => clearTimeout(t); }, []);
  return (
    <div className={`fixed inset-0 z-[60] grid place-items-center bg-background px-5 text-center transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}>
      {[["top-[12%] left-[10%]", "0.6s", "-rotate-12"], ["top-[20%] right-[12%]", "0.9s", "rotate-45"], ["bottom-[18%] left-[16%]", "1.1s", "rotate-90"], ["bottom-[12%] right-[10%]", "1.3s", "-rotate-45"]].map(([pos, d, r]) => (
        <Leaf key={pos} aria-hidden className={`rise absolute h-10 w-10 text-lavender/50 ${pos} ${r}`} style={{ animationDelay: d }} />
      ))}
      <div>
        <img 
        src={logo}
        alt="SERENE logo"
        className="splash-logo mx-auto w-64 md:w-80"
        />        
        <p className="eyebrow rise mt-4" style={{ animationDelay: "1.2s" }}>Welcome to Serene</p>
        <h1 className="rise mt-3 text-4xl text-primary md:text-5xl" style={{ animationDelay: "1.8s" }}>
          Nourish your skin, <em className="text-lavender">calm your mind</em>
        </h1>
        <div className="rise mt-8" style={{ animationDelay: "2.4s" }}>
          <SButton autoFocus onClick={enter}>Enter Serene</SButton>
        </div>
      </div>
    </div>
  );
}

type Comment = { name: string; text: string; date: string };
const KEY = "serene-comments-v1";

export function Comments() {
  const [list, setList] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [anon, setAnon] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const last = useRef(0);

  useEffect(() => {
    try { setList(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return setMsg({ ok: false, t: "Please enter a comment." });
    if (!anon && !name.trim()) return setMsg({ ok: false, t: "Please enter your name or post anonymously." });
    if (Date.now() - last.current < 15000) return setMsg({ ok: false, t: "Please wait a moment before posting again." });
    if (list[0]?.text === t) return setMsg({ ok: false, t: "You've already posted this comment." });
    last.current = Date.now();
    const next = [{ name: anon ? "Anonymous" : name.trim().slice(0, 60), text: t.slice(0, 1000), date: new Date().toISOString() }, ...list];
    setList(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    setText(""); setName("");
    setMsg({ ok: true, t: "Thank you for sharing your thoughts." });
  };

  return (
    <section id="comments" className="scroll-mt-16 px-5 py-20">
      <SectionHeading eyebrow="General feedback" title="Share Your Thoughts" text="We'd love to hear from you." />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
          <label className="block">
            <span className="mb-2 block text-sm">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} disabled={anon} maxLength={60}
              className="w-full rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-gold disabled:opacity-50" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="accent-primary" /> Post anonymously
          </label>
          <label className="block">
            <span className="mb-2 block text-sm">Comment</span>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} maxLength={1000}
              className="w-full rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-gold" />
          </label>
          {msg && <p role="status" className={`text-sm ${msg.ok ? "text-primary" : "text-destructive"}`}>{msg.t}</p>}
          <SButton type="submit">Post Comment</SButton>
        </form>
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
          <h3 className="mb-4 text-2xl text-primary">What people are saying</h3>
          {list.length === 0 ? (
            <p className="text-sm text-muted-foreground">No comments yet. Be the first to share your thoughts.</p>
          ) : (
            <ul className="max-h-96 space-y-3 overflow-y-auto pr-1">
              {list.map((c, i) => (
                <li key={c.date + i} className="animate-fade-in rounded-2xl border border-border/70 bg-background p-4">
                  <div className="flex justify-between gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{c.name}</span>
                    <time>{new Date(c.date).toLocaleDateString()}</time>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm">{c.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export function ThanksForVisiting() {
  return (
    <section className="bg-beige/50 px-5 py-24 text-center">
      <img src={logo} alt="SERENE logo" loading="lazy" className="mx-auto w-48"/>
      <h2 className="mt-6 text-4xl text-primary md:text-5xl">Thanks for visiting Serene</h2>
      <p className="mt-4 text-muted-foreground">We hope you found your moment of calm.</p>
      <p className="mt-3 font-serif text-xl italic text-lavender">Inhale Calm. Embrace Serene.</p>
    </section>
  );
}
