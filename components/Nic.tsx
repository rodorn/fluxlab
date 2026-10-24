"use client";

import { useEffect, useRef } from "react";

/** Jedna linia przez całą stronę główną. Zaczyna się na końcu rysunku w hero,
 *  przechodzi marginesami i przecina oś w każdym punkcie [data-nic], na zmianę
 *  z prawej i z lewej, jak ścieg. Rysuje się przy przewijaniu. Nad sekcją
 *  [data-nic-jasne] (fioletowe tło) biegnie biała kopia linii. Linia jest
 *  rysowana raz, a odsłania ją okno przesuwane samymi transformacjami, więc
 *  przewijanie nie przemalowuje strony. */
export default function Nic() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nic = ref.current;
    const main = nic?.parentElement;
    if (!nic || !main) return;
    const [svg, svgWezlow] = nic.querySelectorAll<SVGSVGElement>("svg");
    const okno = nic.querySelector<HTMLElement>(".nic__okno")!;
    const wnetrze = nic.querySelector<HTMLElement>(".nic__wnetrze")!;
    const linia = svg.querySelector<SVGPathElement>(".nic__linia")!;
    const jasna = svg.querySelector<SVGPathElement>(".nic__jasna")!;
    const przyciecie = svg.querySelector<SVGRectElement>(".nic__przyciecie rect")!;
    const czubek = nic.querySelector<HTMLElement>(".nic__czubek")!;
    const spokojny = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dlugosc = 0;
    let wysokosc = 0;
    let gora = 0;
    let probki: number[] = [];
    let wezly: { y: number; el: SVGCircleElement }[] = [];
    let teraz = 0;
    let cel = 0;
    let ramkaRuchu = 0;
    let ramkaUkladu = 0;
    const KROK = 6;

    function uloz() {
      ramkaUkladu = 0;
      const m = main!.getBoundingClientRect();
      gora = m.top + window.scrollY;
      const W = main!.clientWidth;
      const H = main!.scrollHeight;
      wysokosc = H;
      for (const s of [svg, svgWezlow]) s.setAttribute("viewBox", `0 0 ${W} ${H}`);
      nic!.style.height = `${H}px`;

      const kotwice = [
        ...main!.querySelectorAll<HTMLElement>("[data-nic]"),
      ].map((k) => {
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
      dlugosc = linia.getTotalLength();

      // Najniższy dotąd punkt linii dla każdej próbki: z nich czubek znajduje
      // miejsce na linii dla danej wysokości okna.
      probki = [];
      let max = -Infinity;
      for (let s = 0; s <= dlugosc; s += KROK) {
        max = Math.max(max, linia.getPointAtLength(s).y);
        probki.push(max);
      }

      svgWezlow.replaceChildren();
      wezly = kotwice.slice(1).map((k, i, lista) => {
        const c = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        c.setAttribute("cx", String(k.x));
        c.setAttribute("cy", String(k.y));
        c.setAttribute("r", i === lista.length - 1 ? "7" : "5");
        c.setAttribute("class", "nic__wezel");
        svgWezlow.appendChild(c);
        return { y: k.y, el: c };
      });

      const jasne = main!.querySelector<HTMLElement>("[data-nic-jasne]");
      if (jasne) {
        const r = jasne.getBoundingClientRect();
        przyciecie.setAttribute("x", String(r.left - m.left));
        przyciecie.setAttribute("y", String(r.top - m.top));
        przyciecie.setAttribute("width", String(r.width));
        przyciecie.setAttribute("height", String(r.height));
      }

      if (spokojny) {
        teraz = cel = H;
        rysuj();
      } else {
        przewin();
        teraz = Math.min(teraz, cel);
        rysuj();
      }
    }

    function zasieg(y: number) {
      let lo = 0;
      let hi = probki.length;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (probki[mid] <= y) lo = mid + 1;
        else hi = mid;
      }
      return Math.min(lo * KROK, dlugosc);
    }

    function rysuj() {
      const ukryte = wysokosc - teraz;
      okno.style.transform = `translate3d(0,${-ukryte}px,0)`;
      wnetrze.style.transform = `translate3d(0,${ukryte}px,0)`;
      for (const w of wezly)
        w.el.classList.toggle("nic__wezel--jest", teraz >= w.y - 1);
      const s = zasieg(teraz);
      if (spokojny || teraz <= 0 || s >= dlugosc) {
        czubek.style.opacity = "0";
        return;
      }
      const p = linia.getPointAtLength(s);
      czubek.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
      czubek.style.opacity = "1";
    }

    function krok() {
      ramkaRuchu = 0;
      const roznica = cel - teraz;
      teraz = Math.abs(roznica) < 1 ? cel : teraz + roznica * 0.14;
      rysuj();
      if (teraz !== cel) ramkaRuchu = requestAnimationFrame(krok);
    }

    function przewin() {
      const naDole =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      cel = naDole
        ? wysokosc
        : Math.min(wysokosc, Math.max(0, window.scrollY + window.innerHeight * 0.72 - gora));
      if (!ramkaRuchu && !spokojny) ramkaRuchu = requestAnimationFrame(krok);
    }

    const zaplanuj = () => {
      if (!ramkaUkladu) ramkaUkladu = requestAnimationFrame(uloz);
    };
    const obserwator = new ResizeObserver(zaplanuj);
    obserwator.observe(main);
    uloz();
    if (!spokojny)
      window.addEventListener("scroll", przewin, { passive: true });
    window.addEventListener("resize", zaplanuj);
    return () => {
      obserwator.disconnect();
      window.removeEventListener("scroll", przewin);
      window.removeEventListener("resize", zaplanuj);
      cancelAnimationFrame(ramkaRuchu);
      cancelAnimationFrame(ramkaUkladu);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="nic pointer-events-none absolute inset-x-0 top-0 z-20"
    >
      <div className="nic__okno">
        <div className="nic__wnetrze">
          <svg className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <clipPath id="nic-okno" className="nic__przyciecie">
                <rect />
              </clipPath>
            </defs>
            <path className="nic__linia" fill="none" />
            <path className="nic__jasna" fill="none" clipPath="url(#nic-okno)" />
          </svg>
        </div>
      </div>
      <svg className="absolute inset-0 h-full w-full overflow-visible" />
      <span className="nic__czubek" />
    </div>
  );
}
