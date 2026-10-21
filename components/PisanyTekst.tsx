"use client";

import { useEffect, useRef, useState } from "react";

/** Tekst pisany znak po znaku, gdy sekcja wejdzie w widok, tylko raz na sesję. Układ stoi
 *  od początku, bo cały tekst jest w drzewie, a nieujawniona część ma przezroczystość 0. */
export default function PisanyTekst({ tekst, id }: { tekst: string; id: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(tekst.length);

  useEffect(() => {
    const klucz = `pisany:${id}`;
    try {
      if (sessionStorage.getItem(klucz)) return;
    } catch {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    setN(0);
    let timer = 0;
    const obs = new IntersectionObserver(
      (wpisy) => {
        if (!wpisy.some((w) => w.isIntersecting)) return;
        obs.disconnect();
        try {
          sessionStorage.setItem(klucz, "1");
        } catch {}
        let i = 0;
        timer = window.setInterval(() => {
          i += 1;
          setN(i);
          if (i >= tekst.length) window.clearInterval(timer);
        }, 32);
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearInterval(timer);
    };
  }, [tekst, id]);

  return (
    <span ref={ref}>
      {tekst.slice(0, n)}
      <span className={n < tekst.length ? "opacity-0" : ""}>{tekst.slice(n)}</span>
    </span>
  );
}
