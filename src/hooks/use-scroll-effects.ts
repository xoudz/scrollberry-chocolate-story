import { useEffect } from "react";

/** One animation frame updates local CSS variables without rerendering the page. */
export function useScrollEffects() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.getElementById("top");
    const story = document.getElementById("story");
    const gallery = document.querySelector<HTMLElement>("[data-scroll-gallery]");
    const track = gallery?.querySelector<HTMLElement>("[data-gallery-track]");
    const photos = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-photo]"));
    const header = document.querySelector("header");
    const progress = document.querySelector<HTMLElement>("[data-page-progress]");
    let frame = 0;
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const y = window.scrollY;
      header?.classList.toggle("nav-scrolled", y > 60);
      const total = document.documentElement.scrollHeight - height;
      progress?.style.setProperty("--page-progress", String(total > 0 ? clamp(y / total) : 0));
      if (media.matches) return;
      if (hero && y < hero.offsetHeight + height) {
        hero.style.setProperty("--hero-shift", `${Math.min(y, hero.offsetHeight) * 0.24}px`);
        hero.style.setProperty("--title-shift", `${-y * 0.12}px`);
        hero.style.setProperty("--title-opacity", String(clamp(1 - y / (hero.offsetHeight * 0.65))));
      }
      if (story) {
        const r = story.getBoundingClientRect();
        if (r.top < height && r.bottom > 0) {
          const p = clamp(-r.top / Math.max(1, r.height - height));
          story.style.setProperty("--story-progress", String(p));
          story.style.setProperty("--story-scale", String(1.15 - p * 0.15));
          story.style.setProperty("--story-inset", `${(1 - clamp(p * 3)) * 12}%`);
        }
      }
      photos.forEach(photo => {
        const r = photo.getBoundingClientRect();
        if (r.top < height && r.bottom > 0) {
          photo.style.setProperty("--photo-shift", `${(clamp((height - r.top) / (height + r.height)) - 0.5) * 60}px`);
        }
      });
      if (gallery && track) {
        const r = gallery.getBoundingClientRect();
        const wide = window.innerWidth >= 768;
        const p = clamp(-r.top / Math.max(1, r.height - height));
        const distance = Math.max(0, track.scrollWidth - window.innerWidth + 48);
        gallery.style.setProperty("--gallery-shift", `${wide ? -p * distance : 0}px`);
        gallery.style.setProperty("--gallery-progress", String(p));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll<HTMLElement>(".reveal").forEach(el => {
      const siblings = Array.from(el.parentElement?.children ?? []).filter(child => child.classList.contains("reveal"));
      el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el), 4) * 85}ms`);
      observer.observe(el);
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);
}