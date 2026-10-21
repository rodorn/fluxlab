"use client";

import { useEffect, useState } from "react";

const DNI_30 = 30 * 24 * 60 * 60 * 1000;

type Audyt = { domena: string; ileProblemow: number };

export default function WitajPonownie() {
  const [audyt, setAudyt] = useState<Audyt | null>(null);
  const [widoczny, setWidoczny] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("fluxlab_witaj_ukryty")) return;
      const raw = localStorage.getItem("fluxlab_ostatni_audyt");
      if (!raw) return;
      const d = JSON.parse(raw) as {
        domena?: string;
        kiedy?: string;
        ileProblemow?: number;
      };
      const kiedy = d.kiedy ? Date.parse(d.kiedy) : NaN;
      if (!d.domena || Number.isNaN(kiedy) || Date.now() - kiedy > DNI_30) return;
      setAudyt({ domena: d.domena, ileProblemow: Number(d.ileProblemow) || 0 });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setWidoczny(true)),
      );
    } catch {}
  }, []);

  if (!audyt) return null;

  function zamknij() {
    setWidoczny(false);
    try {
      sessionStorage.setItem("fluxlab_witaj_ukryty", "1");
    } catch {}
    setTimeout(() => setAudyt(null), 300);
  }

  return (
    <div
      className={`hero-pigulka mb-8 inline-flex max-w-full items-center gap-3 rounded-full border border-accent/40 bg-accent/5 py-2 pl-5 pr-2 text-sm text-gray-700 transition-all duration-300 dark:text-gray-200 ${
        widoczny ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <span>
        Witaj ponownie. Twój audyt {audyt.domena}: {audyt.ileProblemow} rzeczy do
        poprawy.{" "}
        <a
          href={`/audyt-strony?domena=${encodeURIComponent(audyt.domena)}`}
          className="font-semibold text-accent hover:underline"
        >
          Zobacz wynik
        </a>
      </span>
      <button
        type="button"
        onClick={zamknij}
        aria-label="Zamknij"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg leading-none text-gray-500 transition-colors hover:bg-accent/10"
      >
        ×
      </button>
    </div>
  );
}
