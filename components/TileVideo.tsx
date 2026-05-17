"use client";

import { useEffect, useRef } from "react";

/**
 * TileVideo — tło wideo kafelka. Domyślnie zatrzymane (widać poster).
 * Po najechaniu myszką na kartę wideo gra w pętli; po zjechaniu — pauza.
 */
export default function TileVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const card = v.closest("a");
    if (!card) return;

    const enter = () => {
      void v.play().catch(() => {});
    };
    const leave = () => {
      v.pause();
    };

    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover opacity-60 saturate-[0.9] transition-all duration-700 ease-out group-hover:opacity-100 group-hover:saturate-150"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
