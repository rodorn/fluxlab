"use client";

import { useEffect } from "react";

const PROMIEN = 80;
const WSPOLCZYNNIK = 0.18;
const MAKS = 8;

export default function MagnesPrzyciskow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ruszone = new Set<HTMLElement>();
    let x = 0;
    let y = 0;
    let ramka = 0;

    // Własność CSS translate nie koliduje z transform przycisku (hover, wjazd),
    // więc każdy przycisk zachowuje się tak samo.
    const przesun = (el: HTMLElement, dx: number, dy: number) => {
      el.style.translate = dx === 0 && dy === 0 ? "" : `${dx}px ${dy}px`;
      if (dx === 0 && dy === 0) ruszone.delete(el);
      else ruszone.add(el);
    };

    const klatka = () => {
      ramka = 0;
      const wh = window.innerHeight;
      const ww = window.innerWidth;
      const widoczne = new Set<HTMLElement>();
      document.querySelectorAll<HTMLElement>(".btn-primary, .btn-secondary").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > wh || r.right < 0 || r.left > ww) return;
        widoczne.add(el);
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) > PROMIEN) {
          if (ruszone.has(el)) przesun(el, 0, 0);
          return;
        }
        const lim = (v: number) => Math.max(-MAKS, Math.min(MAKS, v * WSPOLCZYNNIK));
        przesun(el, lim(dx), lim(dy));
      });
      ruszone.forEach((el) => {
        if (!widoczne.has(el)) przesun(el, 0, 0);
      });
    };

    const naRuch = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!ramka) ramka = requestAnimationFrame(klatka);
    };

    window.addEventListener("pointermove", naRuch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", naRuch);
      if (ramka) cancelAnimationFrame(ramka);
      ruszone.forEach((el) => (el.style.translate = ""));
    };
  }, []);

  return null;
}
