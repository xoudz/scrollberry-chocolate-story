import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Gift, Gem, Truck, Ribbon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessWhatsAppNumber, eventTypes, formatGiftingEnquiry, giftingWhatsAppUrl, guestVolumes, presentations } from "@/lib/gifting";
import wedding from "@/assets/wedding-gifting.jpg";
import corporate from "@/assets/corporate-gifting.jpg";
import seasonal from "@/assets/seasonal-gifting.jpg";

const occasions = [
  { name: "Weddings & Celebrations", ar: "الأعراس والمناسبات الخاصة", image: wedding, title: "A celebration, beautifully yours.", description: "From intimate gatherings to wedding celebrations, explore monogrammed wrappers, tiered chocolate displays and velvet trays in your chosen palette.", detail: "Monograms · Foil wrappers · Velvet trays", event: "Wedding" },
  { name: "Corporate & VIP", ar: "الضيافة والشركات", image: corporate, title: "A gesture that leaves an impression.", description: "Consider signature chocolate embossing, refined wooden gift boxes and curated reception platters for your guests, colleagues and partners.", detail: "Brand personalization · Gift boxes · Reception platters", event: "Corporate Hospitality" },
  { name: "Seasonal Occasions", ar: "الأعياد والمناسبات الوطنية", image: seasonal, title: "Traditions, wrapped in chocolate.", description: "Celebrate Eid Al-Fitr, Eid Al-Adha, Saudi National Day and Founding Day with thoughtful collections and occasion-inspired presentation.", detail: "Eid · Saudi National Day · Founding Day", event: "Seasonal Gifting" },
];

export function GiftingExperience() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [event, setEvent] = useState("");
  const [volume, setVolume] = useState("");
  const [presentation, setPresentation] = useState("");
  const [notes, setNotes] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const conciergeRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const occasion = occasions[active];
  if (!occasion) return null;
  const enquiry = { event, volume, presentation, notes };
  const message = formatGiftingEnquiry(enquiry);
  const whatsapp = giftingWhatsAppUrl(enquiry, businessWhatsAppNumber);
  const options = step === 0 ? eventTypes : step === 1 ? guestVolumes : presentations;
  const selected = step === 0 ? event : step === 1 ? volume : presentation;
  const stepNames = ["Occasion", "Guest count", "Presentation", "Your enquiry"];
  const choose = (value: string) => {
    setCopyStatus("");
    if (step === 0) setEvent(value);
    else if (step === 1) setVolume(value);
    else setPresentation(value);
  };
  const move = (next: number) => {
    setStep(next);
    setCopyStatus("");
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  };
  const start = () => {
    setEvent(occasion.event);
    move(0);
    conciergeRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopyStatus("Enquiry copied. You can share it with @occasionchoclat on Instagram."); }
    catch { setCopyStatus("Copy isn’t available here. Select and copy the enquiry below."); }
  };

  return <>
    <section id="occasions" className="scroll-mt-24 bg-accent py-24 text-accent-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="gifting-eyebrow">Occasions & Private Orders</p><h2 className="mt-5 font-serif text-4xl md:text-6xl">Made for your occasion.</h2></div>
          <p lang="ar" dir="rtl" className="text-xl">لكل مناسبة، حكاية</p>
        </div>
        <div role="tablist" aria-label="Gifting occasions" className="mt-12 grid grid-cols-1 border-b border-accent-foreground/20 sm:grid-cols-3">
          {occasions.map((item, i) => <Button key={item.name} id={`occasion-tab-${i}`} role="tab" aria-selected={active === i} aria-controls="occasion-panel" variant="ghost" onClick={() => setActive(i)} className={`h-auto min-h-20 justify-start rounded-none border-b-2 px-3 py-5 text-left whitespace-normal hover:bg-accent-foreground/5 hover:text-accent-foreground ${active === i ? "border-accent-foreground" : "border-transparent opacity-60"}`}><span className="mr-2 font-serif text-lg">0{i + 1}</span><span><span className="block text-sm">{item.name}</span><span lang="ar" className="mt-1 block text-sm font-normal">{item.ar}</span></span></Button>)}
        </div>
        <div id="occasion-panel" role="tabpanel" aria-labelledby={`occasion-tab-${active}`} className="mt-10 grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <div className="reveal"><div data-scroll-photo className="scroll-photo-window aspect-[1440/1024] overflow-hidden"><img key={occasion.image} src={occasion.image} width={1440} height={1024} loading="lazy" alt={`${occasion.name} chocolate gifting presentation concept`} className="gifting-photo h-full w-full object-cover" /></div><p className="mt-3 text-xs opacity-60">Presentation concept · Final details tailored by consultation</p></div>
          <div><Gift className="mb-6 size-6" strokeWidth={1} /><h3 className="font-serif text-3xl leading-tight md:text-4xl">{occasion.title}</h3><p className="mt-5 text-sm leading-7 opacity-80">{occasion.description}</p><p className="mt-6 text-xs leading-6 uppercase">{occasion.detail}</p><Button onClick={start} variant="link" className="mt-8 h-auto justify-start p-0 text-accent-foreground">Create your enquiry <ArrowRight /></Button></div>
        </div>
      </div>
    </section>

    <section className="border-b border-border py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        {[{ icon: Truck, title: "Handled with care", ar: "توصيل بعناية", text: "Temperature-controlled delivery across Saudi Arabia and the Gulf." }, { icon: Gem, title: "Your private tasting", ar: "تذوق خاص", text: "Discover your preferred fillings at a private Dammam tasting, by appointment." }, { icon: Ribbon, title: "The finishing touch", ar: "تفاصيل تصنع الفرق", text: "Explore metallic seals, silk ribbons and personalized calligraphy with our team." }].map(item => <div key={item.title} className="reveal"><item.icon className="mb-5 size-7 text-primary" strokeWidth={1} /><h3 className="font-serif text-2xl">{item.title}</h3><p lang="ar" className="mt-2 text-sm text-primary">{item.ar}</p><p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{item.text}</p></div>)}
      </div>
    </section>

    <section id="concierge" ref={conciergeRef} className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div className="reveal"><p className="gifting-eyebrow text-primary">Bespoke Gifting Concierge</p><h2 className="mt-5 font-serif text-4xl md:text-6xl">An occasion.<br /><span className="italic text-primary">Your signature.</span></h2><p lang="ar" dir="rtl" className="mt-6 text-xl text-primary md:text-left">هديتك، بتفاصيلك</p><p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">Every celebration is personal. Tell us what you have in mind, and let’s create something memorable.</p><p className="mt-8 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">By consultation · Personalization and availability confirmed with our team</p></div>
        <div className="min-w-0 border-y border-border py-8">
          <ol aria-label="Enquiry progress" className="grid grid-cols-4 gap-2">{stepNames.map((name, i) => <li key={name} aria-current={step === i ? "step" : undefined} className={`border-t-2 pt-3 ${step >= i ? "border-primary text-primary" : "border-border text-muted-foreground"}`}><span className="block text-xs">0{i + 1}</span><span className="mt-2 block text-[10px] leading-4 uppercase">{name}</span></li>)}</ol>
          <div className="mt-10 min-h-[340px]">
            <p className="text-xs text-muted-foreground">Step {step + 1} of 4</p><h3 ref={headingRef} tabIndex={-1} className="mt-3 font-serif text-3xl outline-none">{["What are you celebrating?", "How many guests or gifts?", "How would you like it presented?", "Your bespoke enquiry"][step]}</h3>
            {step < 3 ? <fieldset className="mt-8"><legend className="sr-only">{stepNames[step]}</legend><div className="grid gap-3">{options.map(option => <label key={option} className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 border px-4 py-4 text-sm transition-colors focus-within:ring-2 focus-within:ring-ring ${selected === option ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary"}`}><span className="flex items-center gap-3"><input type="radio" name={`gifting-step-${step}`} value={option} checked={selected === option} onChange={() => choose(option)} className="gifting-radio size-4 shrink-0" />{option}</span>{selected === option && <Check className="size-4 shrink-0" aria-hidden />}</label>)}</div></fieldset> : <div className="mt-6"><dl className="divide-y divide-border text-sm">{[["Occasion", event], ["Guest count", volume], ["Presentation", presentation]].map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></div>)}</dl><label htmlFor="gifting-notes" className="mt-5 block text-xs text-muted-foreground">Date, destination & personal touches (optional)</label><textarea id="gifting-notes" value={notes} onChange={e => { setNotes(e.target.value); setCopyStatus(""); }} maxLength={1500} rows={3} placeholder="Tell us about your occasion…" className="mt-2 w-full resize-y border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" /></div>}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            {step > 0 ? <Button variant="ghost" onClick={() => move(step - 1)} className="px-0 text-muted-foreground"><ArrowLeft /> Back</Button> : <span />}
            {step < 3 ? <Button disabled={!selected} onClick={() => move(step + 1)} className="min-h-12 rounded-none px-7">Continue <ArrowRight /></Button> : whatsapp ? <Button asChild className="min-h-12 rounded-none"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Request Bespoke Proposal</a></Button> : <Button onClick={copy} className="min-h-12 rounded-none px-5"><Copy /> Copy enquiry</Button>}
          </div>
          {step === 3 && !whatsapp && <div className="mt-6 border-t border-border pt-5"><p className="text-xs leading-6 text-muted-foreground">Direct WhatsApp enquiries will be available once our contact number is confirmed. Share your enquiry via <a href="https://instagram.com/occasionchoclat" target="_blank" rel="noreferrer" className="text-primary underline">@occasionchoclat</a> in the meantime.</p><details className="mt-3 text-xs text-muted-foreground"><summary className="cursor-pointer text-primary">View enquiry text</summary><pre className="mt-3 whitespace-pre-wrap break-words font-sans leading-6">{message}</pre></details></div>}
          <p role="status" className="mt-4 text-sm text-primary">{copyStatus}</p>
        </div>
      </div>
    </section>
  </>;
}