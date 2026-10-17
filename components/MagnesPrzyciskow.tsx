"use client";

import { useEffect } from "react";

const PROMIEN = 80;
const WSPOLCZYNNIK = 0.18;
const MAKS = 8;

export default function MagnesPrzyciskow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pominiete = new WeakSet<HTMLElement>();
    const ruszone = new Set<HTMLElement>();
    let x = 0;
    let y = 0;
    let ramka = 0;

    const przesun = (el: HTMLElement, dx: number, dy: number) => {
      if (pominiete.has(el)) return;
      if (!ruszone.has(el)) {
        const t = getComputedStyle(el).transform;
        if ((t && t !== "none" && !el.matches(":hover")) || el.style.transform) {
          pominiete.add(el);
          return;
        }
        el.style.transition = "transform 0.25s ease-out";
      }
      el.style.transform = dx === 0 && dy === 0 ? "" : `translate(${dx}px, ${dy}px)`;
      if (dx === 0 && dy === 0) ruszone.delete(el);
      else ruszone.add(el);
    };

    const klatka = () => {
      ramka = 0;
      const wh = window.innerHeight;
      const ww = window.innerWidth;
      const widoczne = new Set<HTMLElement>();
      document.querySelectorAll<HTMLElement>(".btn-primary").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > wh || r.right < 0 || r.left > ww) return;
        widoczne.add(el);
        if (pominiete.has(el)) return;
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
      ruszone.forEach((el) => (el.style.transform = ""));
    };
  }, []);

  return null;
}
