import { useEffect, useState } from "react";
import mark from "@/assets/serene-mark.png.asset.json";
import { futureStats, useSereneData, type FutureAnswer } from "@/lib/serene-store";
import { Choice, SButton } from "./ui";

const options: { value: FutureAnswer; label: string }[] = [
  { value: "Yes", label: "Yes, I would try it" },
  { value: "Maybe", label: "Maybe" },
  { value: "Not sure yet", label: "Not sure yet" },
];

export function FutureInterest({ onDone }: { onDone: () => void }) {
  const { data, update } = useSereneData();
  const st = futureStats(data.futureInterest);
  const counts: Record<FutureAnswer, number> = { Yes: st.yes, Maybe: st.maybe, "Not sure yet": st.notSure };
  const [answer, setAnswer] = useState<FutureAnswer | null>(null);
  const submit = () => {
    if (!answer) return;
    update((d) => ({ ...d, futureInterest: [...d.futureInterest, { answer, date: new Date().toISOString() }] }));
    setAnswer(null);
    onDone();
  };
  return (
    <section className="px-5 py-20 text-center">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-border/70 bg-card p-8 shadow-soft md:p-12">
        <p className="eyebrow">Looking ahead</p>
        <h2 className="mt-3 text-4xl text-primary">Would You Try Serene in the Future?</h2>
        <p className="mt-4 text-muted-foreground">
          Serene may introduce new products and experiences in the future. If you haven't tried Serene yet, would you consider trying it when it becomes available?
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Future interest">
          {options.map((o) => <Choice key={o.value} selected={answer === o.value} onClick={() => setAnswer(o.value)}>{o.label} · {counts[o.value]}</Choice>)}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Total interested: <span className="text-primary">{st.totalInterested}</span></p>
        <SButton className="mt-6" disabled={!answer} onClick={submit}>Share my answer</SButton>
      </div>
    </section>
  );
}

export function ThankYou({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/20 p-5 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="ty-title">
      <div className="animate-scale-in w-full max-w-md rounded-[2rem] border border-border bg-card p-10 text-center shadow-lift">
        <img src={mark.url} alt="" className="mx-auto h-20 w-auto mix-blend-multiply" />
        <h2 id="ty-title" className="mt-4 text-5xl text-primary">Thank You</h2>
        <p className="mt-4 font-serif text-xl">Thank you for being a part of the Serene journey.</p>
        <p className="mt-2 text-sm text-muted-foreground">Your feedback helps us create better experiences for you.</p>
        <SButton className="mt-8" autoFocus onClick={onClose}>Back to Serene</SButton>
      </div>
    </div>
  );
}
