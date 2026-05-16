"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Wartość docelowa, np. "30+", "500+", "60-90%". */
  value: string;
  className?: string;
};

/**
 * Animuje liczbę od 0 do wartości docelowej, gdy element wejdzie w viewport.
 * Parsuje prefix / liczbę / suffix — jeśli nie ma czystej liczby na początku,
 * renderuje wartość statycznie (np. "AI w treści").
 */
export default function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>(value);
  const startedRef = useRef(false);

  // Parsuje "30+" → { prefix:"", num:30, suffix:"+" }
  const match = value.match(/^(\D*)(\d+)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || startedRef.current) return;
          startedRef.current = true;

          const duration = 1400;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round(target * eased);
            setDisplay(`${prefix}${current}${suffix}`);
            if (t < 1) requestAnimationFrame(tick);
          }

          setDisplay(`${prefix}0${suffix}`);
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, match]);

  return (
    <span ref={ref} className={className}>
      {match ? display : value}
    </span>
  );
}
