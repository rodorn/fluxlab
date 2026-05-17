"use client";

import { useEffect, useRef } from "react";

/**
 * TileVideo — tło wideo kafelka z płynną pętlą ping-pong (bez przeskoków)
 * i spowolnieniem. Sterujemy currentTime ręcznie przez requestAnimationFrame:
 * wideo gra w przód, na końcu "odbija się" i gra wstecz — koniec zawsze
 * równa się początkowi, brak skoku. Domyślnie 10× wolniej; na hover karty
 * pełna prędkość.
 */
export default function TileVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const speed = useRef(0.1); // 10× wolniej domyślnie

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (typeof window === "undefined") return;

    v.muted = true;
    v.pause();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let dir = 1;
    let prev = performance.now();
    let dur = 0;

    const onMeta = () => {
      dur = v.duration && isFinite(v.duration) ? v.duration : 8;
    };
    v.addEventListener("loadedmetadata", onMeta);
    if (v.readyState >= 1) onMeta();

    function frame(now: number) {
      const dt = Math.min(64, now - prev);
      prev = now;
      if (dur > 0 && !reduced) {
        let t = v!.currentTime + dir * speed.current * (dt / 1000);
        if (t >= dur) {
          t = dur;
          dir = -1;
        } else if (t <= 0) {
          t = 0;
          dir = 1;
        }
        try {
          v!.currentTime = t;
        } catch {
          /* seek przed gotowością — pomiń klatkę */
        }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    // Hover karty (rodzic <a>) → pełna prędkość
    const card = v.closest("a");
    const enter = () => {
      speed.current = 1;
    };
    const leave = () => {
      speed.current = 0.1;
    };
    card?.addEventListener("pointerenter", enter);
    card?.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", onMeta);
      card?.removeEventListener("pointerenter", enter);
      card?.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover opacity-60 saturate-[0.9] transition-all duration-700 ease-out group-hover:opacity-100 group-hover:saturate-150"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
