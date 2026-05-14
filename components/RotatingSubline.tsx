"use client";

import { useEffect, useState } from "react";

const SUFFIXES = [
  "dla firm leasingowych",
  "dla agencji marketingowych",
  "dla biur rachunkowych",
  "dla e-commerce",
  "dla software house'ów",
  "dla brokerów i dealerów",
  "dla zespołów sprzedaży B2B",
];

const ROTATE_MS = 2800;

export default function RotatingSubline() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % SUFFIXES.length);
        setFading(false);
      }, 220);
    }, ROTATE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block text-accent font-semibold transition-opacity duration-200 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
    >
      {SUFFIXES[idx]}
    </span>
  );
}
