import { createFileRoute } from "@tanstack/react-router";
import { useScrollEffects } from "@/hooks/use-scroll-effects";
import { GiftingExperience } from "@/components/gifting-experience";
import { Button } from "@/components/ui/button";
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
      { name: "description", content: "Discover Occasion Chocolate: Saudi-Swiss chocolates, bespoke wedding gifts, corporate hospitality and seasonal gifting, delivered across the Gulf." },
      { property: "og:title", content: "Occasion Chocolate — Luxury Chocolatier" },
      { property: "og:description", content: "Saudi-Swiss chocolate since 2017. Explore bespoke wedding, corporate and seasonal gifting with Occasion Chocolate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

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
  useScrollEffects();

  return (
    <main className="bg-background text-foreground">
      {/* Nav */}
      <div data-page-progress aria-hidden="true" className="page-scroll-progress" />
      <header className="scroll-nav fixed inset-x-0 top-0 z-50 py-6 transition-all duration-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#top" className="font-display text-lg tracking-[0.3em] text-primary">OCCASION</a>
          <nav className="hidden gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:flex">
            <a href="#story" className="hover:text-primary">Story</a>
            <a href="#collection" className="hover:text-primary">Collection</a>
            <a href="#occasions" className="hover:text-primary">Gifting</a>
            <a href="#fillings" className="hover:text-primary">Fillings</a>
            <a href="#visit" className="hover:text-primary">Visit</a>
          </nav>
          <Button asChild variant="outline" className="rounded-none border-primary bg-transparent px-3 text-[10px] uppercase text-primary hover:bg-primary hover:text-primary-foreground"><a href="#concierge">Bespoke enquiry</a></Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative h-[92svh] overflow-hidden">
        <img
          src={hero.url}
          alt="Stacked Occasion milk chocolates"
           className="hero-scroll-photo absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div
          className="hero-scroll-title relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-primary">Luxury Chocolatier · Est. 2017</p>
          <h1 className="font-display text-4xl leading-[0.95] text-gold-gradient sm:text-7xl md:text-8xl lg:text-9xl">
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
      <section id="story" className="scroll-story relative h-[200svh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] max-h-[45vh] w-full overflow-hidden md:aspect-[4/5] md:max-h-none">
              <img
                src={stack.url}
                alt="Stack of Occasion branded chocolates"
                className="story-scroll-photo h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-primary">Our Story</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">
                {"A Saudi-Swiss brand, born in the Kingdom in 2017.".split(" ").map((w, i, a) => (
                  <span key={i} className="story-word transition-opacity duration-200" style={{ opacity: `clamp(0.25, calc(var(--story-progress, 0) * ${a.length * 2} - ${i}), 1)` }}>
                    {w}{" "}
                  </span>
                ))}
              </h2>
              <p lang="ar" dir="rtl" className="story-translation mt-8 text-xl text-muted-foreground">
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
                  <div data-scroll-photo className="scroll-photo-window aspect-square overflow-hidden bg-background">
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

      <GiftingExperience />

      {/* Pinned, scroll-driven chocolate gallery */}
      <section data-scroll-gallery className="scroll-gallery">
        <div className="gallery-stage">
          <div className="mx-auto mb-10 w-full max-w-7xl px-6">
            <p className="reveal text-[10px] uppercase text-primary">A closer look</p>
            <h2 className="reveal mt-4 font-serif text-4xl md:text-6xl">Every piece, a little masterpiece.</h2>
          </div>
          <div className="gallery-viewport">
            <div data-gallery-track className="gallery-track flex w-max gap-6 px-6">
              {[row, squares, gold, praline, blanca, truffle, stack].map((a, i) => (
                <img key={i} src={a.url} alt="Occasion chocolates" loading="lazy" className="gallery-photo shrink-0 object-cover" />
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="gallery-progress mx-6 mt-10 h-px bg-border"><div className="h-full origin-left bg-primary" /></div>
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
      <section data-scroll-photo className="scroll-photo-window relative overflow-hidden py-40">
        <img src={gold.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
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
          <Button asChild className="mt-10 h-auto rounded-none px-8 py-4 text-xs uppercase"><a href="#concierge">Enquire about a tasting</a></Button>
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
