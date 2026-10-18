"use client";

import { useEffect, useRef } from "react";

/** Lekkie konfetti raz, 1,5 s, w kolorze marki. Wyłączone przy reduced-motion. */
export default function Konfetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const kolory = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc"];
    const cz = Array.from({ length: 70 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * 120,
      y: h * 0.35,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 8 - 2,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      s: 4 + Math.random() * 5,
      c: kolory[Math.floor(Math.random() * kolory.length)],
    }));

    const start = performance.now();
    let raf = 0;
    function klatka(t: number) {
      const p = (t - start) / 1500;
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      if (p >= 1) return;
      ctx.globalAlpha = 1 - p * p;
      for (const c of cz) {
        c.vy += 0.28;
        c.vx *= 0.99;
        c.x += c.vx;
        c.y += c.vy;
        c.r += c.vr;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.r);
        ctx.fillStyle = c.c;
        ctx.fillRect(-c.s / 2, -c.s / 4, c.s, c.s / 2);
        ctx.restore();
      }
      raf = requestAnimationFrame(klatka);
    }
    raf = requestAnimationFrame(klatka);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none w-screen h-screen"
    />
  );
}
