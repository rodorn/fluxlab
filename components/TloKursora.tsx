"use client";

import { useEffect, useRef } from "react";

const R = 170;
const KROK = 46;
const ZWLOKA = 450;
const WZROST = 2000;

type Odcinek = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  t0: number;
  t1: number;
  g: number;
};

function los(i: number, j: number, k: number) {
  const s = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function krysztal(sx: number, sy: number): Odcinek[] {
  const wynik: Odcinek[] = [];
  let n = 0;
  const galaz = (
    x: number,
    y: number,
    kat: number,
    dl: number,
    g: number,
    t0: number,
  ) => {
    n++;
    const x2 = x + Math.cos(kat) * dl;
    const y2 = y + Math.sin(kat) * dl;
    const t1 = t0 + 0.12 + dl / 420;
    wynik.push({ x1: x, y1: y, x2, y2, t0, t1, g });
    if (g >= 4) return;
    const roz = 0.38 + los(sx, sy, n) * 0.32;
    const sk = 0.62 + los(sy, sx, n * 2) * 0.12;
    galaz(x2, y2, kat - roz, dl * sk, g + 1, t1);
    galaz(x2, y2, kat + roz, dl * sk, g + 1, t1);
    if (g < 2 && los(sx, n, sy) > 0.55)
      galaz(x2, y2, kat, dl * sk * 0.8, g + 1, t1);
  };
  const ramion = 5 + Math.floor(los(sx, sy, 7) * 3);
  const obrot = los(sx, sy, 9) * Math.PI * 2;
  for (let r = 0; r < ramion; r++) {
    galaz(
      0,
      0,
      obrot + (r / ramion) * Math.PI * 2,
      40 + los(sx, sy, r + 20) * 12,
      0,
      0,
    );
  }
  const koniec = Math.max(...wynik.map((o) => o.t1));
  for (const o of wynik) {
    o.t0 /= koniec;
    o.t1 /= koniec;
  }
  return wynik;
}

/**
 * Tło każdej podstrony: pod kursorem rozjaśnia się konstelacja punktów połączonych światłem,
 * a gdy kursor stanie, z jego miejsca wyrasta delikatny fraktalny kryształ.
 */
export default function TloKursora() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const spokojny = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dotyk = window.matchMedia("(hover: none), (pointer: coarse)");
    if (spokojny.matches || dotyk.matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = R * 2;
    cv.width = W * dpr;
    cv.height = W * dpr;

    const mysz = { x: -1e4, y: -1e4, cx: -1e4, cy: -1e4 };
    let kolor = "79 70 229";
    let sila = 0.55;
    let ostatni = 0;
    let klatka = 0;
    let fraktal: { x: number; y: number; o: Odcinek[]; znika: boolean } | null =
      null;
    let zanik = 0;

    const czytajKolory = () => {
      const st = getComputedStyle(document.documentElement);
      kolor = st.getPropertyValue("--accent").trim() || kolor;
      sila = parseFloat(st.getPropertyValue("--siatka-swiatlo")) || sila;
    };

    const rysujFraktal = (
      ox: number,
      oy: number,
      postep: number,
      jasnosc: number,
      czas: number,
    ) => {
      if (!fraktal || jasnosc <= 0.01) return;
      const fx = fraktal.x - ox;
      const fy = fraktal.y - oy;
      ctx.lineCap = "round";
      for (const o of fraktal.o) {
        if (postep <= o.t0) continue;
        const u = Math.min(1, (postep - o.t0) / (o.t1 - o.t0));
        const x2 = o.x1 + (o.x2 - o.x1) * u;
        const y2 = o.y1 + (o.y2 - o.y1) * u;
        const migot =
          0.8 + 0.2 * Math.sin(czas * 1.7 + o.x1 * 0.09 + o.y1 * 0.07);
        ctx.strokeStyle = `rgb(${kolor} / ${(0.75 - o.g * 0.12) * sila * jasnosc * migot})`;
        ctx.lineWidth = Math.max(0.45, 1.2 - o.g * 0.18);
        ctx.beginPath();
        ctx.moveTo(fx + o.x1, fy + o.y1);
        ctx.lineTo(fx + x2, fy + y2);
        ctx.stroke();
        if (o.g === 4 && u >= 1) {
          ctx.fillStyle = `rgb(${kolor} / ${0.7 * sila * jasnosc * migot})`;
          ctx.beginPath();
          ctx.arc(fx + o.x2, fy + o.y2, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const rysuj = (t: number) => {
      klatka = 0;
      mysz.cx += (mysz.x - mysz.cx) * 0.22;
      mysz.cy += (mysz.y - mysz.cy) * 0.22;
      const ox = Math.round(mysz.cx - R);
      const oy = Math.round(mysz.cy - R);
      cv.style.transform = `translate3d(${ox}px,${oy}px,0)`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);
      const czas = t / 1000;
      const bezruch = t - ostatni;

      if (bezruch > ZWLOKA && !fraktal) {
        fraktal = {
          x: mysz.x,
          y: mysz.y,
          o: krysztal(Math.round(mysz.x), Math.round(mysz.y)),
          znika: false,
        };
      }
      if (fraktal && (bezruch <= ZWLOKA || fraktal.znika)) {
        fraktal.znika = true;
        zanik = Math.max(0, zanik - 0.08);
        if (zanik === 0) fraktal = null;
      } else if (fraktal) {
        zanik = Math.min(1, zanik + 0.06);
      }
      const postep = Math.min(1, Math.max(0, (bezruch - ZWLOKA) / WZROST));
      const zostaje = fraktal ? (fraktal.znika ? 1 : postep) : 0;
      const przygas =
        fraktal && !fraktal.znika ? 0.55 + 0.45 * (1 - postep) : 1;

      const pkt: { x: number; y: number; w: number }[] = [];
      const i0 = Math.floor((mysz.cx - R) / KROK) - 1;
      const i1 = Math.ceil((mysz.cx + R) / KROK) + 1;
      const j0 = Math.floor((mysz.cy - R) / KROK) - 1;
      const j1 = Math.ceil((mysz.cy + R) / KROK) + 1;
      for (let i = i0; i <= i1; i++) {
        for (let j = j0; j <= j1; j++) {
          const a = los(i, j, 1) * Math.PI * 2;
          const f = 0.35 + los(i, j, 2) * 0.5;
          const x =
            (i + 0.15 + los(i, j, 3) * 0.7) * KROK + Math.cos(czas * f + a) * 6;
          const y =
            (j + 0.15 + los(i, j, 4) * 0.7) * KROK +
            Math.sin(czas * f * 0.8 + a) * 6;
          const d = Math.hypot(x - mysz.cx, y - mysz.cy);
          if (d > R) continue;
          const blask = 0.75 + 0.25 * Math.sin(czas * (1.3 + f * 2) + a * 3);
          pkt.push({
            x: x - ox,
            y: y - oy,
            w: (1 - d / R) ** 1.6 * blask * przygas,
          });
        }
      }

      const mx = mysz.cx - ox;
      const my = mysz.cy - oy;
      ctx.lineWidth = 0.8;
      for (let a = 0; a < pkt.length; a++) {
        const p = pkt[a];
        for (let b = a + 1; b < pkt.length; b++) {
          const q = pkt[b];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d > KROK * 1.55) continue;
          const al = Math.min(p.w, q.w) * (1 - d / (KROK * 1.55)) * sila * 1.3;
          if (al < 0.02) continue;
          ctx.strokeStyle = `rgb(${kolor} / ${al})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      if (!fraktal) {
        const blisko = pkt
          .map((p) => ({ p, d: Math.hypot(p.x - mx, p.y - my) }))
          .sort((u, v) => u.d - v.d)
          .slice(0, 3);
        for (const { p } of blisko) {
          const g = ctx.createLinearGradient(mx, my, p.x, p.y);
          g.addColorStop(0, `rgb(${kolor} / ${0.55 * sila})`);
          g.addColorStop(1, `rgb(${kolor} / ${p.w * sila})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      for (const p of pkt) {
        const r = 1 + p.w * 1.6;
        ctx.fillStyle = `rgb(${kolor} / ${Math.min(1, p.w * sila * 2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (p.w > 0.45) {
          ctx.fillStyle = `rgb(${kolor} / ${(p.w - 0.45) * sila * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rysujFraktal(ox, oy, zostaje, zanik, czas);

      if (bezruch < ZWLOKA + WZROST + 6000 || zanik > 0.01)
        klatka = requestAnimationFrame(rysuj);
    };

    const onMove = (e: PointerEvent) => {
      const start = mysz.x < -1e3;
      mysz.x = e.clientX;
      mysz.y = e.clientY;
      if (start) {
        mysz.cx = mysz.x;
        mysz.cy = mysz.y;
      }
      ostatni = performance.now();
      if (!klatka) {
        czytajKolory();
        klatka = requestAnimationFrame(rysuj);
      }
      cv.style.opacity = "1";
    };
    const onLeave = () => {
      cv.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(klatka);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="tlo-kursora" />;
}
