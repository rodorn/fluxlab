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
      if (!form || form.dataset.pomiar === "wlasny" || zaczete.has(form)) return;
      zaczete.add(form);
      const id =
        form.id || form.getAttribute("aria-label") || `formularz${location.pathname}`;
      gaEvent("form_start", { form_id: id });
      zglosZdarzenie("form_start");
    };
    document.addEventListener("focusin", naFokus);
    const naKlik = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (a?.getAttribute("href")?.startsWith("tel:")) zglosZdarzenie("klik_tel");
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

    let widziany = false;
    const obserwator = new IntersectionObserver(
      (wpisy) => {
        if (widziany || !wpisy.some((w) => w.isIntersecting)) return;
        widziany = true;
        zglosZdarzenie("widok_formularza");
        obserwator.disconnect();
      },
      { threshold: 0.3 },
    );
    const obserwuj = () => {
      if (!widziany) document.querySelectorAll("form").forEach((f) => obserwator.observe(f));
    };
    const t1 = setTimeout(obserwuj, 300);
    const t2 = setTimeout(obserwuj, 2500);
    return () => {
      removeEventListener("scroll", naScroll);
      obserwator.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [sciezka]);

  return null;
}
