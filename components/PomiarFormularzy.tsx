"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";

export default function PomiarFormularzy() {
  const sciezka = usePathname();

  useEffect(() => {
    const zaczete = new WeakSet<HTMLFormElement>();
    const naFokus = (e: FocusEvent) => {
      const pole = e.target as HTMLElement | null;
      if (!pole?.matches?.("input, textarea, select")) return;
      const form = pole.closest("form");
      if (!form || form.dataset.pomiar === "wlasny" || zaczete.has(form))
        return;
      zaczete.add(form);
      const id =
        form.id ||
        form.getAttribute("aria-label") ||
        `formularz${location.pathname}`;
      gaEvent("form_start", { form_id: id });
      zglosZdarzenie("form_start");
    };
    document.addEventListener("focusin", naFokus);
    const naKlik = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) zglosZdarzenie("klik_telefon");
      else if (
        /^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//.test(
          href,
        )
      )
        zglosZdarzenie("klik_whatsapp");
    };
    document.addEventListener("click", naKlik, true);
    return () => {
      document.removeEventListener("focusin", naFokus);
      document.removeEventListener("click", naKlik, true);
    };
  }, []);

  // Czas na stronie liczony tylko przy karcie na wierzchu: otwarta w tle
  // karta nie jest czytaniem.
  useEffect(() => {
    let sekundy = 0;
    const zegar = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (++sekundy < 30) return;
      clearInterval(zegar);
      zglosZdarzenie("aktywny_30s", sciezka);
    }, 1000);
    return () => clearInterval(zegar);
  }, [sciezka]);

  useEffect(() => {
    let polowa = false;
    const naScroll = () => {
      const d = document.documentElement;
      if (polowa || d.scrollHeight <= innerHeight) return;
      if ((scrollY + innerHeight) / d.scrollHeight < 0.5) return;
      polowa = true;
      zglosZdarzenie("przewiniecie_50");
      removeEventListener("scroll", naScroll);
    };
    addEventListener("scroll", naScroll, { passive: true });

    // Formularz liczy się jako zobaczony, gdy co najmniej połowa stoi w oknie
    // przez sekundę. Samo przecięcie z oknem przy wejściu zawyżało liczbę.
    const zegary = new Map<Element, ReturnType<typeof setTimeout>>();
    const policzone = new WeakSet<Element>();
    let zgloszone = false;
    const obserwator = new IntersectionObserver(
      (wpisy) => {
        for (const w of wpisy) {
          const f = w.target;
          if (policzone.has(f)) continue;
          if (w.isIntersecting && w.intersectionRatio >= 0.5) {
            if (zegary.has(f)) continue;
            zegary.set(
              f,
              setTimeout(() => {
                zegary.delete(f);
                if (zgloszone || document.visibilityState !== "visible") return;
                zgloszone = true;
                policzone.add(f);
                obserwator.disconnect();
                zglosZdarzenie("widok_formularza");
              }, 1000),
            );
          } else if (zegary.has(f)) {
            clearTimeout(zegary.get(f));
            zegary.delete(f);
          }
        }
      },
      { threshold: [0, 0.5] },
    );
    const obserwuj = () => {
      document.querySelectorAll("form").forEach((f) => {
        if (!policzone.has(f)) obserwator.observe(f);
      });
    };
    const t1 = setTimeout(obserwuj, 300);
    const t2 = setTimeout(obserwuj, 2500);
    return () => {
      removeEventListener("scroll", naScroll);
      obserwator.disconnect();
      zegary.forEach((z) => clearTimeout(z));
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [sciezka]);

  return null;
}
