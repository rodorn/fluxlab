"use client";

import { useEffect } from "react";

/** Najechanie na link wewnętrzny w artykule pokazuje kartę z tytułem i opisem strony.
 *  Indeks stron ładuje się dopiero przy pierwszym najechaniu. */
export default function PodgladLinkow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let indeks: Map<string, { tytul: string; opis: string }> | null = null;
    let karta: HTMLDivElement | null = null;
    let timer = 0;
    let aktywny: Element | null = null;

    const ukryj = () => {
      aktywny = null;
      window.clearTimeout(timer);
      karta?.remove();
      karta = null;
    };

    const onOver = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("article a[href^='/']") as HTMLAnchorElement | null;
      if (!a || a.closest("nav")) return;
      const href = a.getAttribute("href")!.split("#")[0].split("?")[0];
      window.clearTimeout(timer);
      aktywny = a;
      timer = window.setTimeout(async () => {
        if (!indeks) {
          const { INDEKS_STRON } = await import("@/lib/indeks-stron");
          indeks = new Map(INDEKS_STRON.map((w) => [w.url, w]));
        }
        const w = indeks.get(href);
        if (!w || aktywny !== a) return;
        karta?.remove();
        karta = document.createElement("div");
        karta.setAttribute("role", "tooltip");
        karta.className =
          "fixed z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-xl dark:border-white/10 dark:bg-gray-900 pointer-events-none";
        const t = document.createElement("p");
        t.className = "text-sm font-semibold text-gray-900 dark:text-white";
        t.textContent = w.tytul;
        const o = document.createElement("p");
        o.className = "mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400";
        o.style.textAlign = "left";
        o.textContent = w.opis;
        karta.append(t, o);
        document.body.appendChild(karta);
        const r = a.getBoundingClientRect();
        const lewo = Math.min(Math.max(8, r.left), window.innerWidth - 296);
        const wys = karta.offsetHeight;
        const gora = r.bottom + 8 + wys > window.innerHeight ? r.top - wys - 8 : r.bottom + 8;
        karta.style.left = `${lewo}px`;
        karta.style.top = `${gora}px`;
      }, 350);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.("article a[href^='/']")) ukryj();
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", ukryj, { passive: true });
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", ukryj);
      ukryj();
    };
  }, []);
  return null;
}
