"use client";

import { useEffect, useRef } from "react";

/** Jedna linia przez całą stronę główną. Zaczyna się na końcu rysunku w hero,
 *  przechodzi marginesami i przecina oś w każdym punkcie [data-nic], na zmianę
 *  z prawej i z lewej, jak ścieg. Nad sekcją [data-nic-jasne] (fioletowe tło)
 *  biegnie biała kopia linii. Koralik jedzie ze stałą prędkością przez rysunek
 *  w hero i dalej po nici, za miejscem czytania. Nić jest narysowana tylko
 *  tam, gdzie koralik już był, i tam zapalają się węzły. */
const KROK = 4;
const PREDKOSC = 420;
// Koralik rusza, gdy linia w hero jest już narysowana (0,5 s + 2,4 s).
const START = 2900;

type Punkt = [number, number];

// Punkty co KROK wzdłuż odcinków Béziera, liczone w JS: getPointAtLength
// na całej nici blokował stronę na pół sekundy przy każdej zmianie układu.
function rozloz(odcinki: Punkt[][]) {
  const wynik: number[] = [];
  if (!odcinki.length) return wynik;
  let [px, py] = odcinki[0][0];
  wynik.push(px, py);
  let droga = 0;
  let nastepny = KROK;
  for (const o of odcinki) {
    let dl = 0;
    for (let i = 1; i < o.length; i++)
      dl += Math.hypot(o[i][0] - o[i - 1][0], o[i][1] - o[i - 1][1]);
    const n = Math.max(1, Math.ceil(dl));
    for (let k = 1; k <= n; k++) {
      const t = k / n;
      let q = o.map((p) => [...p]);
      while (q.length > 1)
        q = q.slice(1).map((p, i) => [
          q[i][0] + (p[0] - q[i][0]) * t,
          q[i][1] + (p[1] - q[i][1]) * t,
        ]);
      const [x, y] = q[0];
      const d = Math.hypot(x - px, y - py);
      while (d && droga + d >= nastepny) {
        const u = (nastepny - droga) / d;
        wynik.push(px + (x - px) * u, py + (y - py) * u);
        nastepny += KROK;
      }
      droga += d;
      px = x;
      py = y;
    }
  }
  return wynik;
}

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
    const meta = svg.querySelector<SVGGElement>(".nic__meta")!;
    const koralik = main.querySelector<HTMLElement>(".nic__koralik")!;
    const liniaHero = main.querySelector<SVGPathElement>(".hero-nic__linia");
    let punkty = new Float32Array(0);
    let wezly: { x: number; y: number; kolo: SVGCircleElement }[] = [];
    let odcinki: Punkt[][] = [];
    let hero: number[] = [];
    let skalaHero = 0;
    let indeksyWezlow: number[] = [];
    let zasieg = 0;
    let narysowane = -1;
    let yNici = new Float32Array(0);
    let koniecHero = 0;
    let gora = 0;
    let poz = 0;
    let cel = 0;
    let ruch = 0;
    let czas = 0;
    let ruszyl = false;
    let uklad = "";
    let ramka = 0;
    let wWezle = -1;
    let koniec = false;

    function uloz() {
      ramka = 0;
      const W = main!.clientWidth;
      const H = main!.scrollHeight;
      const m = main!.getBoundingClientRect();
      const elementy = [...main!.querySelectorAll<HTMLElement>("[data-nic]")];
      const kotwice = elementy.map((k) => {
        const r = k.getBoundingClientRect();
        return {
          x: r.left - m.left + r.width / 2,
          y: r.top - m.top + r.height / 2,
        };
      });
      const jasne = main!.querySelector<HTMLElement>("[data-nic-jasne]");
      const rj = jasne?.getBoundingClientRect();
      // Treść nad węzłem może się przesunąć bez zmiany wysokości strony,
      // więc układ porównujemy po położeniu węzłów i jasnej sekcji.
      const nowy = [W, H, rj && rj.top - m.top, ...kotwice.map((k) => k.y)]
        .map((v) => Math.round(v ?? 0))
        .join();
      if (nowy === uklad) return;
      uklad = nowy;
      svg!.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg!.style.height = `${H}px`;
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
      odcinki = [];
      for (let i = 0; i < kotwice.length - 1; i++) {
        const a = kotwice[i];
        const b = kotwice[i + 1];
        const x = strony[i % 2];
        const r = Math.min(140, (b.y - a.y) / 3);
        if (i === 0) {
          const kat = Math.min(r, Math.abs(a.x - b.x));
          const zwrot = Math.sign(b.x - a.x);
          d += `L${a.x} ${b.y - kat}Q${a.x} ${b.y} ${a.x + zwrot * kat} ${b.y}L${b.x} ${b.y}`;
          odcinki.push(
            [[a.x, a.y], [a.x, b.y - kat]],
            [[a.x, b.y - kat], [a.x, b.y], [a.x + zwrot * kat, b.y]],
            [[a.x + zwrot * kat, b.y], [b.x, b.y]],
          );
          continue;
        }
        d += `C${x} ${a.y} ${x} ${a.y} ${x} ${a.y + r}`;
        d += `L${x} ${b.y - r}C${x} ${b.y} ${x} ${b.y} ${b.x} ${b.y}`;
        odcinki.push(
          [[a.x, a.y], [x, a.y], [x, a.y], [x, a.y + r]],
          [[x, a.y + r], [x, b.y - r]],
          [[x, b.y - r], [x, b.y], [x, b.y], [b.x, b.y]],
        );
      }
      linia.setAttribute("d", d);
      jasna.setAttribute("d", d);

      // Kółka zostają między przeliczeniami, inaczej zapalone węzły
      // gasłyby i zapalały się od nowa przy każdej zmianie układu.
      const nowe = kotwice.slice(1);
      while (grupaWezlow.childElementCount > nowe.length)
        grupaWezlow.lastElementChild!.remove();
      wezly = nowe.map((k, i, lista) => {
        let c = grupaWezlow.children[i] as SVGCircleElement | undefined;
        if (!c) {
          c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          c.setAttribute("class", "nic__wezel");
          grupaWezlow.appendChild(c);
        }
        c.setAttribute("cx", String(k.x));
        c.setAttribute("cy", String(k.y));
        c.setAttribute("r", i === lista.length - 1 ? "7" : "5");
        return { ...k, kolo: c };
      });
      const ostatni = wezly[wezly.length - 1];
      meta.setAttribute("transform", `translate(${ostatni.x} ${ostatni.y})`);
      narysowane = -1;

      if (rj) {
        maska.setAttribute("x", String(rj.left - m.left));
        maska.setAttribute("y", String(rj.top - m.top));
        maska.setAttribute("width", String(rj.width));
        maska.setAttribute("height", String(rj.height));
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
        if (skala !== skalaHero) {
          skalaHero = skala;
          hero = [];
          const dl = liniaHero.getTotalLength();
          for (let l = 0; l < dl; l += KROK / skala) {
            const p = liniaHero.getPointAtLength(l);
            hero.push(p.x, p.y);
          }
        }
        for (let i = 0; i < hero.length; i += 2)
          lista.push(
            r.left - m.left + hero[i] * skala,
            r.top - m.top + hero[i + 1] * skala,
          );
      }
      koniecHero = lista.length / 2;
      const nic = rozloz(odcinki);
      const y: number[] = [];
      indeksyWezlow = [];
      for (let i = 0; i < nic.length; i += 2) {
        const px = nic[i];
        const py = nic[i + 1];
        const w = wezly[indeksyWezlow.length];
        if (w && Math.hypot(px - w.x, py - w.y) <= KROK)
          indeksyWezlow.push(koniecHero + y.length);
        lista.push(px, py);
        y.push(Math.max(py, y.length ? y[y.length - 1] : -Infinity));
      }
      punkty = Float32Array.from(lista);
      yNici = Float32Array.from(y);
      gora = m.top + window.scrollY;
      celPrzewijania();
      if (!ruszyl) {
        ruszyl = true;
        poz = 0;
        koralik.classList.add("nic__koralik--jest");
      } else {
        poz = Math.min(poz, punkty.length / 2 - 1);
        zasieg = Math.min(zasieg, punkty.length / 2 - 1);
        narysowane = -1;
      }
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
      // Nad węzłem koralik traci obwódkę i zlewa się z kółkiem, zamiast
      // przykrywać je białym pierścieniem.
      const blisko = wezly.findIndex((w) => Math.hypot(w.x - x, w.y - y) < 7);
      if (blisko !== wWezle) {
        wWezle = blisko;
        koralik.classList.toggle("nic__koralik--w-wezle", blisko >= 0);
        koralik.classList.toggle(
          "nic__koralik--na-koncu",
          blisko >= 0 && blisko === wezly.length - 1,
        );
      }
      if (poz > zasieg) zasieg = poz;
      rysuj();
    }

    function rysuj() {
      const dl = Math.max(0, Math.round((zasieg - koniecHero) * KROK));
      if (dl === narysowane) return;
      narysowane = dl;
      const kreska = dl ? `${dl} 1000000` : "";
      linia.style.strokeDasharray = kreska;
      jasna.style.strokeDasharray = kreska;
      svg!.classList.toggle("nic--rysuje", dl > 0);
      wezly.forEach((w, i) =>
        w.kolo.classList.toggle(
          "nic__wezel--jest",
          indeksyWezlow[i] !== undefined && zasieg >= indeksyWezlow[i],
        ),
      );
      const ostatni = indeksyWezlow[wezly.length - 1];
      const nowyKoniec = ostatni !== undefined && zasieg >= ostatni;
      if (nowyKoniec !== koniec) {
        koniec = nowyKoniec;
        svg!.classList.toggle("nic--koniec", koniec);
      }
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
      zaplanuj();
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
        <g className="nic__meta">
          <circle className="nic__fala" r="9" />
          <circle className="nic__fala" r="9" />
          <path className="nic__ptaszek" d="M-4.5 0.5L-1.5 3.5L4.5 -3" pathLength={1} />
        </g>
      </svg>
      <span aria-hidden="true" className="nic__koralik" />
    </>
  );
}
