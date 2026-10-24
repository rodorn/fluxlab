"use client";

import { useEffect, useRef } from "react";

/** Jedna linia przez całą stronę główną. Zaczyna się na końcu rysunku w hero,
 *  przechodzi marginesami i przecina oś w każdym punkcie [data-nic], na zmianę
 *  z prawej i z lewej, jak ścieg. Nad sekcją [data-nic-jasne] (fioletowe tło)
 *  biegnie biała kopia linii. Linia jest statyczna; przy przewijaniu zapalają
 *  się węzły, przez IntersectionObserver. Koralik jedzie ze stałą prędkością
 *  przez rysunek w hero i dalej po nici, za miejscem czytania. */
const KROK = 4;
const PREDKOSC = 420;
// Koralik rusza, gdy linia w hero jest już narysowana (0,5 s + 2,4 s).
const START = 2900;

export default function Nic() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = ref.current;
    const main = svg?.parentElement;
    if (!svg || !main) return;
    const linia = svg.querySelector<SVGPathElement>(".nic__linia")!;
    const jasna = svg.querySelector<SVGPathElement>(".nic__jasna")!;
    const maska = svg.querySelector<SVGRectElement>(".nic__maska rect")!;
    const grupaWezlow = svg.querySelector<SVGGElement>(".nic__wezly")!;
    const koralik = main.querySelector<HTMLElement>(".nic__koralik")!;
    const liniaHero = main.querySelector<SVGPathElement>(".hero-nic__linia");
    let punkty = new Float32Array(0);
    let yNici = new Float32Array(0);
    let koniecHero = 0;
    let gora = 0;
    let poz = 0;
    let cel = 0;
    let ruch = 0;
    let czas = 0;
    let ruszyl = false;
    let szer = 0;
    let wys = 0;
    let ramka = 0;
    let obserwatorWezlow: IntersectionObserver | null = null;

    function uloz() {
      ramka = 0;
      const W = main!.clientWidth;
      const H = main!.scrollHeight;
      if (W === szer && H === wys) return;
      szer = W;
      wys = H;
      const m = main!.getBoundingClientRect();
      svg!.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg!.style.height = `${H}px`;

      const elementy = [...main!.querySelectorAll<HTMLElement>("[data-nic]")];
      const kotwice = elementy.map((k) => {
        const r = k.getBoundingClientRect();
        return {
          x: r.left - m.left + r.width / 2,
          y: r.top - m.top + r.height / 2,
        };
      });
      if (kotwice.length < 2) return;

      const kontener = main!.querySelector<HTMLElement>(".container-wide");
      const brzeg = kontener
        ? kontener.getBoundingClientRect().left -
          m.left +
          parseFloat(getComputedStyle(kontener).paddingLeft)
        : 24;
      const tor = Math.max(9, brzeg / 2);
      const strony = [W - tor, tor];

      const [start] = kotwice;
      let d = `M${start.x} ${start.y}`;
      for (let i = 0; i < kotwice.length - 1; i++) {
        const a = kotwice[i];
        const b = kotwice[i + 1];
        const x = strony[i % 2];
        const r = Math.min(140, (b.y - a.y) / 3);
        if (i === 0) {
          const kat = Math.min(r, Math.abs(a.x - b.x));
          const zwrot = Math.sign(b.x - a.x);
          d += `L${a.x} ${b.y - kat}Q${a.x} ${b.y} ${a.x + zwrot * kat} ${b.y}L${b.x} ${b.y}`;
          continue;
        }
        d += `C${x} ${a.y} ${x} ${a.y} ${x} ${a.y + r}`;
        d += `L${x} ${b.y - r}C${x} ${b.y} ${x} ${b.y} ${b.x} ${b.y}`;
      }
      linia.setAttribute("d", d);
      jasna.setAttribute("d", d);

      obserwatorWezlow?.disconnect();
      grupaWezlow.replaceChildren();
      const kola = new Map<Element, SVGCircleElement>();
      kotwice.slice(1).forEach((k, i, lista) => {
        const c = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        c.setAttribute("cx", String(k.x));
        c.setAttribute("cy", String(k.y));
        c.setAttribute("r", i === lista.length - 1 ? "7" : "5");
        c.setAttribute("class", "nic__wezel");
        grupaWezlow.appendChild(c);
        kola.set(elementy[i + 1], c);
      });
      obserwatorWezlow = new IntersectionObserver(
        (wpisy) => {
          for (const w of wpisy)
            if (w.isIntersecting || w.boundingClientRect.top < 0)
              kola.get(w.target)?.classList.add("nic__wezel--jest");
        },
        { rootMargin: "0px 0px -28% 0px" },
      );
      for (const el of kola.keys()) obserwatorWezlow.observe(el);

      const jasne = main!.querySelector<HTMLElement>("[data-nic-jasne]");
      if (jasne) {
        const r = jasne.getBoundingClientRect();
        maska.setAttribute("x", String(r.left - m.left));
        maska.setAttribute("y", String(r.top - m.top));
        maska.setAttribute("width", String(r.width));
        maska.setAttribute("height", String(r.height));
      }
      gora = m.top + window.scrollY;
      if (ruszyl) probkuj();
    }

    function probkuj() {
      const m = main!.getBoundingClientRect();
      const lista: number[] = [];
      if (liniaHero) {
        const r = liniaHero.ownerSVGElement!.getBoundingClientRect();
        const skala = r.width / 960;
        const dl = liniaHero.getTotalLength();
        for (let l = 0; l < dl; l += KROK / skala) {
          const p = liniaHero.getPointAtLength(l);
          lista.push(
            r.left - m.left + p.x * skala,
            r.top - m.top + p.y * skala,
          );
        }
      }
      koniecHero = lista.length / 2;
      const dl = linia.getTotalLength();
      const y: number[] = [];
      for (let l = 0; l <= dl; l += KROK) {
        const p = linia.getPointAtLength(l);
        lista.push(p.x, p.y);
        y.push(Math.max(p.y, y.length ? y[y.length - 1] : -Infinity));
      }
      punkty = Float32Array.from(lista);
      yNici = Float32Array.from(y);
      gora = m.top + window.scrollY;
      celPrzewijania();
      if (!ruszyl) {
        ruszyl = true;
        poz = 0;
        koralik.classList.add("nic__koralik--jest");
      } else poz = Math.min(poz, punkty.length / 2 - 1);
      pokaz();
      jedz();
    }

    function celPrzewijania() {
      const yr = window.scrollY + window.innerHeight * 0.6 - gora;
      let lo = 0;
      let hi = yNici.length;
      while (lo < hi) {
        const s = (lo + hi) >> 1;
        if (yNici[s] <= yr) lo = s + 1;
        else hi = s;
      }
      cel = Math.max(koniecHero - 1, koniecHero + lo - 1);
    }

    function pokaz() {
      const i = Math.floor(poz);
      const t = poz - i;
      const j = Math.min(i + 1, punkty.length / 2 - 1);
      const x = punkty[i * 2] + (punkty[j * 2] - punkty[i * 2]) * t;
      const y = punkty[i * 2 + 1] + (punkty[j * 2 + 1] - punkty[i * 2 + 1]) * t;
      koralik.style.transform = `translate(${x}px,${y}px)`;
    }

    function krok(teraz: number) {
      const dt = Math.min(0.05, (teraz - czas) / 1000);
      czas = teraz;
      const reszta = cel - poz;
      const v = (Math.max(PREDKOSC, Math.abs(reszta) * KROK * 2) * dt) / KROK;
      poz = Math.abs(reszta) <= v ? cel : poz + Math.sign(reszta) * v;
      pokaz();
      ruch = poz === cel ? 0 : requestAnimationFrame(krok);
    }

    function jedz() {
      if (ruch || poz === cel) return;
      czas = performance.now();
      ruch = requestAnimationFrame(krok);
    }

    const przewijanie = () => {
      if (!ruszyl) return;
      celPrzewijania();
      jedz();
    };

    const zaplanuj = () => {
      if (!ramka) ramka = requestAnimationFrame(uloz);
    };
    const obserwator = new ResizeObserver(zaplanuj);
    obserwator.observe(main);
    uloz();
    const start = setTimeout(
      () =>
        "requestIdleCallback" in window
          ? requestIdleCallback(probkuj, { timeout: 500 })
          : probkuj(),
      Math.max(0, START - performance.now()),
    );
    window.addEventListener("scroll", przewijanie, { passive: true });
    return () => {
      clearTimeout(start);
      window.removeEventListener("scroll", przewijanie);
      cancelAnimationFrame(ruch);
      obserwator.disconnect();
      obserwatorWezlow?.disconnect();
      cancelAnimationFrame(ramka);
    };
  }, []);

  return (
    <>
      <svg
        ref={ref}
        aria-hidden="true"
        className="nic pointer-events-none absolute inset-x-0 top-0 z-20 w-full overflow-visible"
      >
        <defs>
          <clipPath id="nic-okno" className="nic__maska">
            <rect />
          </clipPath>
        </defs>
        <path className="nic__linia" fill="none" />
        <path className="nic__jasna" fill="none" clipPath="url(#nic-okno)" />
        <g className="nic__wezly" />
      </svg>
      <span aria-hidden="true" className="nic__koralik" />
    </>
  );
}
