import { Check } from "lucide-react";
import { finishes, finishingTouches, maxFillings, signatureFillings, toggleFilling, vessels, type GiftDesign } from "@/lib/gifting";

const finishClass: Record<string, string> = {
  "Deep Burgundy": "tray-burgundy",
  "Emerald Green": "tray-emerald",
  "Midnight Navy": "tray-navy",
  "Ivory & Pearl": "tray-ivory",
};

type Props = { design: GiftDesign; onChange: (d: GiftDesign) => void };

function Chip({ active, onClick, children, disabled }: { active: boolean; onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button type="button" aria-pressed={active} disabled={disabled} onClick={onClick}
      className={`flex min-h-11 items-center gap-2 border px-4 py-2 text-left text-sm transition-colors disabled:opacity-40 ${active ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary"}`}>
      {active && <Check className="size-3.5 shrink-0" aria-hidden />}{children}
    </button>
  );
}

export function GiftCustomizer({ design, onChange }: Props) {
  const set = (patch: Partial<GiftDesign>) => onChange({ ...design, ...patch });
  const pieces = Array.from({ length: 12 }, (_, i) => design.fillings[i % Math.max(design.fillings.length, 1)] ?? "");
  const vesselShape = design.vessel === "Clear Acrylic Display" ? "tray-acrylic" : design.vessel === "Wooden Gift Box" ? "tray-wood" : "";

  return (
    <section id="customizer" className="scroll-mt-24 border-b border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="gifting-eyebrow text-primary">Styling Studio</p><h2 className="mt-5 font-serif text-4xl md:text-6xl">Design your arrangement.</h2></div>
          <p lang="ar" dir="rtl" className="text-xl text-primary">صمّم هديتك بنفسك</p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <div className={`tray-preview ${finishClass[design.finish] ?? ""} ${vesselShape}`} role="img" aria-label={`Preview: ${design.vessel} in ${design.finish}`}>
              {design.touches.includes("Bespoke acrylic topper") && design.monogram.trim() && <div className="tray-topper font-display">{design.monogram.trim()}</div>}
              <div className="grid grid-cols-4 gap-3 p-6 sm:gap-4 sm:p-10">
                {pieces.map((f, i) => <span key={i} className={`tray-piece ${f ? "piece-" + signatureFillings.indexOf(f as never) : ""}`} />)}
              </div>
              {design.touches.includes("Calligraphed silk ribbon") && <div className="tray-ribbon" />}
              {design.touches.includes("Gold foil seal") && <div className="tray-seal font-display">{design.monogram.trim().slice(0, 3) || "O"}</div>}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Illustrative preview · Final styling tailored with our team</p>
          </div>

          <div className="space-y-9">
            <fieldset><legend className="gifting-eyebrow text-muted-foreground">01 · Vessel</legend>
              <div className="mt-3 flex flex-wrap gap-2">{vessels.map(v => <Chip key={v} active={design.vessel === v} onClick={() => set({ vessel: v })}>{v}</Chip>)}</div></fieldset>
            <fieldset><legend className="gifting-eyebrow text-muted-foreground">02 · Colour</legend>
              <div className="mt-3 flex flex-wrap gap-2">{finishes.map(f => <Chip key={f} active={design.finish === f} onClick={() => set({ finish: f })}><span className={`swatch ${finishClass[f]}`} aria-hidden />{f}</Chip>)}</div></fieldset>
            <fieldset><legend className="gifting-eyebrow text-muted-foreground">03 · Signature fillings (up to {maxFillings})</legend>
              <div className="mt-3 flex flex-wrap gap-2">{signatureFillings.map(f => { const on = design.fillings.includes(f); return <Chip key={f} active={on} disabled={!on && design.fillings.length >= maxFillings} onClick={() => set({ fillings: toggleFilling(design.fillings, f) })}>{f}</Chip>; })}</div></fieldset>
            <div><label htmlFor="monogram" className="gifting-eyebrow text-muted-foreground">04 · Monogram or message</label>
              <input id="monogram" value={design.monogram} maxLength={24} onChange={e => set({ monogram: e.target.value })} placeholder="e.g. S & N · 2026"
                className="mt-3 w-full border border-input bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" /></div>
            <fieldset><legend className="gifting-eyebrow text-muted-foreground">05 · Finishing touches</legend>
              <div className="mt-3 flex flex-wrap gap-2">{finishingTouches.map(t => <Chip key={t} active={design.touches.includes(t)} onClick={() => set({ touches: design.touches.includes(t) ? design.touches.filter(x => x !== t) : [...design.touches, t] })}>{t}</Chip>)}</div></fieldset>
            <a href="#concierge" className="inline-block border-b border-primary pb-1 text-xs uppercase tracking-[0.2em] text-primary">Add this design to my enquiry ↓</a>
          </div>
        </div>
      </div>
    </section>
  );
}
