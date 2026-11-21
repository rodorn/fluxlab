"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const BEZ_PASKA = [
  "/kontakt",
  "/dziekuje",
  "/panel",
  "/cv",
  "/koszyk",
  "/zakup",
  "/crm",
  "/demo",
  "/polityka",
  "/regulamin",
];

// Landingi z reklam: pasek z trzema drogami kontaktu zamiast jednego przycisku.
const LANDINGI_REKLAM = [
  "/ksef-integracja",
  "/ksef-integracja-erp",
  "/e-doreczenia-wycena",
  "/e-doreczenia-integracja",
  "/wdrozenie-n8n-cena",
  "/automatyzacja-procesow-biznesowych",
  "/strony-www",
  "/tansze-automatyzacje",
];

/* Pasek „Bezpłatna wycena” w telefonie na każdej stronie: pokazuje się po
   zjechaniu z pierwszego ekranu, prowadzi do formularza tej strony
   (albo do /kontakt, gdy strona go nie ma) i chowa się przy formularzu,
   żeby nie zasłaniał pól. */
export default function PasekAkcji() {
  const sciezka = usePathname();
  const wylaczony = BEZ_PASKA.some(
    (p) => sciezka === p || sciezka.startsWith(`${p}/`) || sciezka.startsWith(`${p}-`),
  );
  const [widoczny, setWidoczny] = useState(false);
  const [cel, setCel] = useState(sciezka === "/ksef-integracja-erp" ? "#wycena" : "/kontakt");
  const [napis, setNapis] = useState("Bezpłatna wycena");

  useEffect(() => {
    if (wylaczony) return;
    const formularz =
      (document.documentElement.hasAttribute("data-reklama")
        ? document.querySelector<HTMLElement>('form[id^="krotki-"]')
        : null) ??
      document.querySelector<HTMLElement>("#kontakt, #zamow, #diagnoza") ??
      document
        .querySelector("form input[name=website]")
        ?.closest<HTMLElement>("[id]") ??
      null;
    setCel(formularz ? `#${formularz.id}` : "/kontakt");
    setNapis(formularz?.dataset.pasek ?? "Bezpłatna wycena");
    const ctaHero = document.getElementById("cta-hero");
    let przyFormularzu = false;
    let ctaWidoczne = !!ctaHero;
    const obsCta = ctaHero
      ? new IntersectionObserver(([w]) => {
          ctaWidoczne = w.isIntersecting;
          sprawdz();
        })
      : null;
    if (ctaHero) obsCta?.observe(ctaHero);
    const obs = formularz
      ? new IntersectionObserver(([w]) => {
          przyFormularzu = w.isIntersecting;
          sprawdz();
        })
      : null;
    if (formularz) obs?.observe(formularz);
    // Kalkulator (data-bez-paska) na ekranie: pasek nie zasłania jego pól ani wyniku.
    const bezPaska = new Set<Element>();
    const obsBez = new IntersectionObserver((wpisy) => {
      for (const w of wpisy) w.isIntersecting ? bezPaska.add(w.target) : bezPaska.delete(w.target);
      sprawdz();
    });
    document.querySelectorAll("[data-bez-paska]").forEach((el) => obsBez.observe(el));

    function sprawdz() {
      const w = window.scrollY > window.innerHeight * 0.6 && !przyFormularzu && !ctaWidoczne && !bezPaska.size;
      setWidoczny(w);
      document.body.toggleAttribute("data-pasek-akcji", w);
    }
    sprawdz();
    window.addEventListener("scroll", sprawdz, { passive: true });
    return () => {
      window.removeEventListener("scroll", sprawdz);
      obs?.disconnect();
      obsCta?.disconnect();
      obsBez.disconnect();
      document.body.removeAttribute("data-pasek-akcji");
      setWidoczny(false);
    };
  }, [sciezka, wylaczony]);

  // Wejście z reklamy: „Bezpłatna wycena” i pasek przewijają do krótkiego
  // formularza na tej stronie zamiast otwierać /kontakt.
  useEffect(() => {
    const klik = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!document.documentElement.hasAttribute("data-reklama")) return;
      const href = (e.target as Element | null)?.closest?.("a[href]")?.getAttribute("href") ?? "";
      if (href !== "/kontakt" && !href.startsWith("#krotki-")) return;
      const f = document.querySelector<HTMLFormElement>('form[id^="krotki-"]');
      if (!f || !f.offsetParent) return;
      e.preventDefault();
      f.scrollIntoView({ behavior: "smooth", block: "center" });
      f.animate(
        [
          { boxShadow: "0 0 0 0 rgba(79,70,229,0)" },
          { boxShadow: "0 0 0 6px rgba(79,70,229,0.45)" },
          { boxShadow: "0 0 0 0 rgba(79,70,229,0)" },
        ],
        { duration: 1400, delay: 350 },
      );
    };
    document.addEventListener("click", klik, true);
    return () => document.removeEventListener("click", klik, true);
  }, []);

  if (wylaczony) return null;

  if (LANDINGI_REKLAM.includes(sciezka)) {
    const przycisk = "btn-lg flex-1 justify-center px-2";
    return (
      <div
        className={`pasek-akcji fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-gray-200 bg-white px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden dark:border-white/10 dark:bg-gray-950 ${
          widoczny ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!widoczny}
      >
        <a href="tel:+48665466565" tabIndex={widoczny ? 0 : -1} className={`${przycisk} btn-secondary`}>
          Zadzwoń
        </a>
        <a
          href="https://wa.me/48665466565"
          target="_blank"
          rel="noopener"
          tabIndex={widoczny ? 0 : -1}
          className={`${przycisk} btn-secondary`}
        >
          WhatsApp
        </a>
        <a
          href={cel}
          tabIndex={widoczny ? 0 : -1}
          onClick={() => zglosZdarzenie("klik_wycena")}
          className={`${przycisk} btn-primary`}
        >
          Wycena
        </a>
      </div>
    );
  }

  return (
    <div
      className={`pasek-akcji fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden dark:border-white/10 dark:bg-gray-950 ${
        widoczny ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!widoczny}
    >
      <a
        href={cel}
        tabIndex={widoczny ? 0 : -1}
        className="btn-primary btn-lg w-full"
      >
        {napis}
      </a>
    </div>
  );
}
