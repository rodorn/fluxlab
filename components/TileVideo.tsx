"use client";

import { useEffect, useRef } from "react";

/**
 * TileVideo — tło wideo kafelka, osobne dla trybu jasnego i ciemnego.
 * Renderuje dwa <video>; CSS (dark:) pokazuje właściwe. Domyślnie
 * zatrzymane (widać poster/pierwszą klatkę); po najechaniu na kartę grają.
 */
export default function TileVideo({
  srcDark,
  srcLight,
  poster,
}: {
  srcDark: string;
  srcLight: string;
  poster: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (typeof window === "undefined") return;
    const videos = Array.from(wrap.querySelectorAll("video"));

    // Brak myszki (mobile/touch) — wideo gra ciągle, bo nie ma hovera
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) {
      videos.forEach((v) => void v.play().catch(() => {}));
      return;
    }

    // Desktop — wideo gra po najechaniu na kartę
    const card = wrap.closest("a");
    if (!card) return;
    const enter = () => {
      videos.forEach((v) => void v.play().catch(() => {}));
    };
    const leave = () => {
      videos.forEach((v) => v.pause());
    };
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
    };
  }, []);

  const cls =
    "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out";

  return (
    <div ref={wrapRef} aria-hidden="true">
      {/* Tryb ciemny */}
      <video
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className={`${cls} hidden dark:block opacity-60 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-150`}
      >
        <source src={srcDark} type="video/mp4" />
      </video>
      {/* Tryb jasny */}
      <video
        muted
        loop
        playsInline
        preload="metadata"
        className={`${cls} block dark:hidden opacity-90 group-hover:opacity-100`}
      >
        <source src={srcLight} type="video/mp4" />
      </video>
    </div>
  );
}
