"use client";

import { useEffect, useRef } from "react";
import { event as gaEvent } from "@/lib/gtag";

interface Props {
  /** Selektor sekcji do obserwacji (np. "#cennik"). */
  target: string;
  /** Nazwa eventu do wysłania (np. "pricing_view"). */
  eventName: string;
  /** Próg widoczności (0–1) — domyślnie 0.4 = 40% sekcji widoczne. */
  threshold?: number;
}

/**
 * Wysyła GA event przy pierwszym przewinięciu w okolice danej sekcji.
 * Strzela raz na mount.
 */
export default function SectionViewTracker({
  target,
  eventName,
  threshold = 0.4,
}: Props) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.querySelector(target);
    if (!el || firedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            gaEvent(eventName, { section: target });
            observer.disconnect();
          }
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, eventName, threshold]);

  return null;
}
