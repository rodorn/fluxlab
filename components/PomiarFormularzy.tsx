"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";

// Formularz kontaktowy ma pole-pułapkę „website”; pole bez niej to narzędzie (NIP, numer KSeF, audyt).
const kontaktowy = (form: Element) =>
  form.matches("[data-kontaktowy]") || !!form.querySelector("input[name=website]");

export default function PomiarFormularzy() {
  const sciezka = usePathname();

  useEffect(() => {
    // form_start liczy dotyk pola albo wpisany znak. Sam fokus nie: 22.11
    // form_start z Androida z reklamy przyszedł w sekundzie wejścia, przed
    // odsłoną, a sesja wyszła po 5 s. Fokus bez dotyku i bez klawisza
    // zgłaszamy osobno (fokus_bez_dotyku), żeby było widać, jak często.
    const zaczete = new WeakSet<HTMLFormElement>();
    let ostatniDotyk = 0;
    let fokusZgloszony = false;
    const pole = (e: Event) => {
      const t = e.target as HTMLElement | null;
      return t?.matches?.("input, textarea, select") ? t : null;
    };
    const start = (form: HTMLFormElement) => {
      if (form.dataset.pomiar === "wlasny" || zaczete.has(form)) return;
      zaczete.add(form);
      const id =
        form.id ||
        form.getAttribute("aria-label") ||
        `formularz${location.pathname}`;
      gaEvent("form_start", { form_id: id });
      zglosZdarzenie(kontaktowy(form) ? "form_start" : "narzedzie_start");
    };
    const naDotyk = (e: PointerEvent) => {
      if (!e.isTrusted) return;
      ostatniDotyk = Date.now();
      const form = pole(e)?.closest("form");
      if (form) start(form);
    };
    const naKlawisz = (e: KeyboardEvent) => {
      if (e.isTrusted) ostatniDotyk = Date.now();
    };
    const naWpis = (e: Event) => {
      if (!e.isTrusted) return;
      const form = pole(e)?.closest("form");
      if (form) start(form);
    };
    const naFokus = (e: FocusEvent) => {
      const p = pole(e);
      if (!p?.closest("form") || fokusZgloszony) return;
      if (Date.now() - ostatniDotyk < 1500) return;
      fokusZgloszony = true;
      zglosZdarzenie("fokus_bez_dotyku");
    };
    document.addEventListener("pointerdown", naDotyk, true);
    document.addEventListener("keydown", naKlawisz, true);
    document.addEventListener("input", naWpis, true);
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
    const naCta = (e: MouseEvent) => {
      const c = (e.target as HTMLElement | null)?.closest?.("[data-cta]");
      const nazwa = c?.getAttribute("data-cta");
      if (nazwa) zglosZdarzenie(`klik_cta_${nazwa}`.slice(0, 40));
    };
    document.addEventListener("click", naKlik, true);
    document.addEventListener("click", naCta, true);
    return () => {
      document.removeEventListener("focusin", naFokus);
      document.removeEventListener("pointerdown", naDotyk, true);
      document.removeEventListener("keydown", naKlawisz, true);
      document.removeEventListener("input", naWpis, true);
      document.removeEventListener("click", naKlik, true);
      document.removeEventListener("click", naCta, true);
    };
  }, []);

  // Czas na stronie liczony tylko przy karcie na wierzchu: otwarta w tle
  // karta nie jest czytaniem.
  useEffect(() => {
    let sekundy = 0;
    const zegar = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      sekundy++;
      if (sekundy === 10) zglosZdarzenie("aktywny_10s", sciezka);
      if (sekundy < 30) return;
      clearInterval(zegar);
      zglosZdarzenie("aktywny_30s", sciezka);
    }, 1000);
    // Czas wyjścia: sekundy aktywne przy schowaniu karty (raz na odsłonę).
    let wyjscie = false;
    const naUkrycie = () => {
      if (document.visibilityState !== "hidden" || wyjscie) return;
      wyjscie = true;
      zglosZdarzenie(`wyjscie_${Math.min(sekundy, 999)}s`, sciezka);
    };
    document.addEventListener("visibilitychange", naUkrycie);
    return () => {
      clearInterval(zegar);
      document.removeEventListener("visibilitychange", naUkrycie);
    };
  }, [sciezka]);

  useEffect(() => {
    const progi = [25, 50, 75];
    const naScroll = () => {
      const d = document.documentElement;
      if (!progi.length || d.scrollHeight <= innerHeight) return;
      const udzial = ((scrollY + innerHeight) / d.scrollHeight) * 100;
      while (progi.length && udzial >= progi[0]) {
        zglosZdarzenie(`przewiniecie_${progi.shift()}`);
      }
      if (!progi.length) removeEventListener("scroll", naScroll);
    };
    addEventListener("scroll", naScroll, { passive: true });

    // Formularz liczy się jako zobaczony, gdy co najmniej połowa stoi w oknie
    // przez sekundę. Samo przecięcie z oknem przy wejściu zawyżało liczbę.
    // Narzędzia (sprawdzarki) dają osobne zdarzenie widok_narzedzia.
    const zegary = new Map<Element, ReturnType<typeof setTimeout>>();
    const policzone = new WeakSet<Element>();
    const zgloszone = new Set<string>();
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
                if (document.visibilityState !== "visible") return;
                const nazwa = kontaktowy(f) ? "widok_formularza" : "widok_narzedzia";
                policzone.add(f);
                if (zgloszone.has(nazwa)) return;
                zgloszone.add(nazwa);
                zglosZdarzenie(nazwa);
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
