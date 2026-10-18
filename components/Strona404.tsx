"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FILARY } from "@/lib/filary";
import GraZlapLeada from "@/components/GraZlapLeada";

const STRONY = [
  ...FILARY.map((f) => ({ t: f.nazwa, h: f.href })),
  { t: "Własny CRM", h: "/wlasny-crm" },
  { t: "Darmowy audyt strony", h: "/audyt-strony" },
  { t: "Produkty", h: "/produkty" },
  { t: "Narzędzia", h: "/narzedzia" },
  { t: "Strefa wiedzy", h: "/strefa-wiedzy" },
  { t: "Kontakt", h: "/kontakt" },
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export default function Strona404() {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const wyniki = STRONY.filter((s) => norm(s.t + " " + s.h).includes(norm(q.trim())));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty("--mx", String(x));
      el.style.setProperty("--my", String(y));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const cyfra = (c: string, i: number) => (
    <span
      key={i}
      className="inline-block text-gradient-flow transition-transform duration-200 ease-out"
      style={{
        transform: `translate(calc(var(--mx, 0) * ${(i + 1) * 7}px), calc(var(--my, 0) * ${(i + 1) * 5}px)) rotate(calc(var(--mx, 0) * ${(i - 1) * 4}deg))`,
        animation: `k404-float 4s ease-in-out ${i * 0.4}s infinite`,
      }}
    >
      {c}
    </span>
  );

  return (
    <div className="text-center max-w-2xl mx-auto">
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes k404-float{0%,100%{margin-top:0}50%{margin-top:-10px}}@media (prefers-reduced-motion:reduce){.k404 span{animation:none!important;transition:none!important}}`,
        }}
      />
      <div
        ref={ref}
        className="k404 font-bold leading-none text-[7rem] sm:text-[9rem] tracking-tight mb-2 select-none"
        aria-hidden="true"
      >
        {["4", "0", "4"].map(cyfra)}
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Tej strony nie ma, ale mamy coś lepszego
      </h1>

      <label htmlFor="szukaj404" className="sr-only">
        Szukaj podstrony
      </label>
      <input
        id="szukaj404"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Szukaj podstrony, np. CRM"
        autoComplete="off"
        className="w-full rounded-xl px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <ul className="mt-3 text-left space-y-1.5 min-h-[10rem]">
        {wyniki.map((s) => (
          <li key={s.h}>
            <Link
              href={s.h}
              className="flex items-center justify-between rounded-xl px-4 py-2 bg-white/70 dark:bg-white/5 ring-1 ring-gray-200/60 dark:ring-white/10 hover:ring-accent/40 text-gray-900 dark:text-white hover:text-accent transition-colors"
            >
              <span className="font-medium">{s.t}</span>
              <code className="font-sans text-xs text-gray-500 dark:text-gray-400">{s.h}</code>
            </Link>
          </li>
        ))}
        {wyniki.length === 0 && (
          <li className="px-4 py-3 text-gray-600 dark:text-gray-400">
            Nic nie pasuje. Spróbuj innego słowa albo wróć na stronę główną.
          </li>
        )}
      </ul>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Link href="/" className="btn-primary">
          Strona główna
        </Link>
        <Link href="/audyt-strony" className="btn-secondary">
          Zrób darmowy audyt
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
        <GraZlapLeada />
      </div>
    </div>
  );
}
