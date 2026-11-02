import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero.jpg.asset.json";
import stack from "@/assets/stack.jpg.asset.json";
import row from "@/assets/row.jpg.asset.json";
import squares from "@/assets/squares.jpg.asset.json";
import bars from "@/assets/bars.jpg.asset.json";
import praline from "@/assets/praline.jpg.asset.json";
import blanca from "@/assets/blanca.jpg.asset.json";
import truffle from "@/assets/truffle.jpg.asset.json";
import gold from "@/assets/gold.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Occasion Chocolate — Saudi-Swiss Luxury Chocolatier" },
      { name: "description", content: "A Saudi-Swiss luxury chocolate brand since 2017. Over 800 flavours and fillings, delivered across the Gulf." },
      { property: "og:title", content: "Occasion Chocolate — Luxury Chocolatier" },
      { property: "og:description", content: "Saudi-Swiss chocolate since 2017. 800+ flavours, delivered across the Gulf." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/";

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** progress 0→1 of an element passing through the viewport */
function useProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return [ref, p] as const;
}

const values = [
  { en: "Authenticity", ar: "الأصالة", text: "Rooted in the traditions of chocolate making — classic craftsmanship and original methods, with a taste, design and story all our own." },
  { en: "Quality", ar: "الجودة", text: "World-class standards, carefully selected ingredients from raw cacao to nuts and fruit, and precision at every step of production." },
  { en: "Creativity", ar: "الإبداع", text: "Bold new flavours balanced with refined taste, distinctive packaging, and inventive ways to present and gift chocolate." },
  { en: "Passion", ar: "الشغف", text: "Devotion in every detail — texture, taste and finish. Every piece reflects the love behind it." },
  { en: "Sensory Excellence", ar: "التميز الحسي", text: "A complete experience of flavour, texture and aroma that makes every bite unforgettable." },
];

const products = [
  { img: bars.url, ar: "كرانشي مانجو", en: "Crunchy Mango" },
  { img: praline.url, ar: "كرانشي برالين", en: "Crunchy Praline" },
  { img: blanca.url, ar: "بلانكا", en: "Blanca" },
  { img: truffle.url, ar: "ترافل مغلف", en: "Wrapped Truffle" },
];

const fillings = [
  "Gianduja", "Pistachio", "Tiramisu", "White Coconut Cream", "Black Digestive", "Crêpe",
  "Vanilla", "Salted Caramel", "Fruit Rouge", "Praline", "French Crêpe", "Hazelnut",
  "Coffee", "Baby Lotus", "Red Fruit", "Praline Noir",
];

function Index() {
  const y = useScrollY();
  useReveal();
  const [storyRef, sp] = useProgress<HTMLElement>();

  return (
    <main className="bg-background text-foreground">
      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${y > 60 ? "bg-background/85 py-3 backdrop-blur-md" : "py-6"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#top" className="font-display text-lg tracking-[0.3em] text-primary">OCCASION</a>
          <nav className="hidden gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
            <a href="#story" className="hover:text-primary">Story</a>
            <a href="#collection" className="hover:text-primary">Collection</a>
            <a href="#fillings" className="hover:text-primary">Fillings</a>
            <a href="#visit" className="hover:text-primary">Visit</a>
          </nav>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="border border-primary px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            Book a tasting
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative h-[100svh] overflow-hidden">
        <img
          src={hero.url}
          alt="Stacked Occasion milk chocolates"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: `translateY(${y * 0.35}px) scale(${1.1 + y * 0.0003})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ transform: `translateY(${y * -0.2}px)`, opacity: Math.max(0, 1 - y / 500) }}
        >
          <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-primary">Luxury Chocolatier · Est. 2017</p>
          <h1 className="font-display text-5xl leading-[0.95] text-gold-gradient sm:text-7xl md:text-9xl">
            OCCASION<br />CHOCOLATE
          </h1>
          <p lang="ar" dir="rtl" className="mt-8 text-lg text-foreground/80">براند سعودي سويسري</p>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Scroll
          <div className="mx-auto mt-3 h-12 w-px animate-pulse bg-primary" />
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-secondary py-5">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl tracking-[0.2em] text-primary">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Saudi · Swiss", "800+ Flavours", "Since 2017", "Gulf Delivery", "Handcrafted", "Luxury Chocolatier"].map((t) => (
              <span key={t + k}>{t} <span className="mx-6 text-accent">✦</span></span>
            )),
          )}
        </div>
      </div>

      {/* Story with pinned image */}
      <section id="story" ref={storyRef} className="relative h-[250vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={stack.url}
                alt="Stack of Occasion branded chocolates"
                className="h-full w-full object-cover"
                style={{ transform: `scale(${1.3 - sp * 0.3})`, clipPath: `inset(${(1 - Math.min(1, sp * 2)) * 30}% round 2px)` }}
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-primary">Our Story</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">
                {"A Saudi-Swiss brand, born in the Kingdom in 2017.".split(" ").map((w, i, a) => (
                  <span key={i} className="transition-opacity duration-300" style={{ opacity: sp * a.length * 1.4 > i ? 1 : 0.15 }}>
                    {w}{" "}
                  </span>
                ))}
              </h2>
              <p lang="ar" dir="rtl" className="mt-8 text-xl text-muted-foreground" style={{ opacity: sp > 0.6 ? 1 : 0, transition: "opacity .8s" }}>
                براند سعودي سويسري، تأسس منذ عام ٢٠١٧ بالمملكة العربية السعودية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <div className="reveal text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary">Our Standards</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">The Occasion Way</h2>
        </div>
        <div className="mt-20 divide-y divide-border border-y border-border">
          {values.map((v, i) => (
            <div key={v.en} className="reveal group grid gap-4 py-10 md:grid-cols-[80px_1fr_1.4fr] md:items-baseline" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h3 className="font-serif text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
                {v.en} <span lang="ar" className="ml-3 text-xl text-primary">{v.ar}</span>
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collection (cream) */}
      <section id="collection" className="bg-accent py-32 text-accent-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal frame-ornate px-6 py-16 text-center md:px-16">
            <p className="text-[10px] uppercase tracking-[0.5em]">Signature Collection</p>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-7xl">OCCASION CHOCOLATE</h2>
            <p lang="ar" dir="rtl" className="mt-4 text-lg">يوجد أكثر من ٨٠٠ صنف وحشوة</p>
            <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
              {products.map((p, i) => (
                <div key={p.en} className="reveal group" style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="aspect-square overflow-hidden bg-background">
                    <img src={p.img} alt={p.en} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <p lang="ar" className="mt-4 text-xl">{p.ar}</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">{p.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal parallax gallery */}
      <section className="overflow-hidden py-24">
        <div className="flex gap-6" style={{ transform: `translateX(${-(y * 0.25) % 2000 + 200}px)` }}>
          {[row, squares, gold, praline, blanca, truffle, stack].map((a, i) => (
            <img key={i} src={a.url} alt="Occasion chocolates" loading="lazy" className="h-64 w-auto shrink-0 object-cover md:h-96" />
          ))}
        </div>
      </section>

      {/* Fillings */}
      <section id="fillings" className="bg-secondary py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-primary">Chocolate Filling</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">800+ Flavours</h2>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {fillings.map((f, i) => (
              <span
                key={f}
                className="reveal cursor-default border border-border px-5 py-3 font-serif text-lg transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="relative overflow-hidden py-40">
        <img src={gold.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" style={{ transform: `translateY(${(y - 5000) * 0.1}px) scale(1.2)` }} />
        <div className="reveal relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-4xl italic md:text-6xl">Delivered across the Gulf</h2>
          <p className="mt-6 text-muted-foreground">
            Delivered in modern, air-conditioned vehicles that keep every piece perfect — to all Gulf countries.
          </p>
          <p lang="ar" dir="rtl" className="mt-4 text-primary">متاح التوصيل إلى جميع دول الخليج</p>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="mx-auto grid max-w-6xl gap-12 px-6 py-32 md:grid-cols-2">
        <div className="reveal">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary">Visit & Taste</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Our Location</h2>
          <p className="mt-6 font-serif text-2xl">12 B Street, Ash Shati Ash Sharqi<br />Dammam, Saudi Arabia</p>
          <p className="mt-6 text-sm text-muted-foreground">Office visits and tastings are by appointment only. Enquiries via WhatsApp.</p>
          <p lang="ar" dir="rtl" className="mt-2 text-sm text-muted-foreground">لحضور المكتب والتذوق يلزم حجز موعد مسبق</p>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-10 inline-block bg-primary px-8 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-transform hover:-translate-y-1">
            Book on WhatsApp
          </a>
        </div>
        <div className="reveal aspect-square overflow-hidden">
          <iframe
            title="Occasion Chocolate location"
            className="h-full w-full grayscale"
            loading="lazy"
            src="https://www.google.com/maps?q=Occasion+Chocolate+Ash+Shati+Ash+Sharqi+Dammam&output=embed"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-20 text-center">
        <p className="reveal mx-auto max-w-2xl font-serif text-2xl italic md:text-3xl">
          Let's take you through an exceptional adventure & experience you won't forget.
        </p>
        <a href="https://instagram.com/occasionchoclat" target="_blank" rel="noreferrer" className="mt-10 inline-block font-display tracking-[0.3em] text-primary">
          @OCCASIONCHOCLAT
        </a>
      </footer>
    </main>
  );
}
