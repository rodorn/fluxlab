"use client";

import { useEffect, useRef } from "react";

/** Jedna linia przez całą stronę główną. Zaczyna się na końcu rysunku w hero,
 *  przechodzi marginesami i przecina oś w każdym punkcie [data-nic], na zmianę
 *  z prawej i z lewej, jak ścieg. Nad sekcją [data-nic-jasne] (fioletowe tło)
 *  biegnie biała kopia linii. Linia jest statyczna; przy przewijaniu zapalają
 *  się tylko węzły, przez IntersectionObserver, bez pracy w każdej klatce. */
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
        d +=
          i === 0
            ? `C${a.x} ${a.y + r * 0.6} ${x} ${a.y + r * 0.3} ${x} ${a.y + r}`
            : `C${x} ${a.y} ${x} ${a.y} ${x} ${a.y + r}`;
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
    }

    const zaplanuj = () => {
      if (!ramka) ramka = requestAnimationFrame(uloz);
    };
    const obserwator = new ResizeObserver(zaplanuj);
    obserwator.observe(main);
    uloz();
    return () => {
      obserwator.disconnect();
      obserwatorWezlow?.disconnect();
      cancelAnimationFrame(ramka);
    };
  }, []);

  return (
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
  );
}
