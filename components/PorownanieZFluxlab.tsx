"use client";

import { useState } from "react";
import { odmien } from "@/lib/odmiana";

type Skrot = { punkty: number | null; krytyczne: number; wazne: number };

const KLUCZ = "fluxlab_audyt_fluxlab_pl";

function kolor(p: number) {
  return p >= 75 ? "bg-emerald-500" : p >= 45 ? "bg-amber-500" : "bg-red-500";
}

function Slupek({ nazwa, s }: { nazwa: string; s: Skrot }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
        <span className="font-semibold text-gray-900 dark:text-white">
          {nazwa}
        </span>
        <span className="tabular-nums text-gray-600 dark:text-gray-400">
          {s.punkty === null
            ? "bez oceny"
            : `${s.punkty}/100 · ${s.krytyczne} ${odmien(s.krytyczne, "krytyczne", "krytyczne", "krytycznych")}, ${s.wazne} ${odmien(s.wazne, "ważne", "ważne", "ważnych")}`}
        </span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${s.punkty === null ? "" : kolor(s.punkty)}`}
          style={{ width: `${s.punkty ?? 0}%` }}
        />
      </div>
    </div>
  );
}

/** Po audycie: ten sam audyt uruchomiony na fluxlab.pl, jako punkt odniesienia.
 *  Mierzymy na żywo, nie wpisujemy liczby na stałe. */
export default function PorownanieZFluxlab({
  domena,
  wynik,
}: {
  domena: string;
  wynik: Skrot;
}) {
  const [stan, setStan] = useState<"idle" | "laduje" | "gotowe" | "blad">(
    "idle",
  );
  const [flux, setFlux] = useState<Skrot | null>(null);

  if (
    /(^|\.)fluxlab\.pl$/i.test(
      domena.replace(/^https?:\/\//, "").replace(/\/.*$/, ""),
    )
  )
    return null;

  async function porownaj() {
    setStan("laduje");
    try {
      const raw = sessionStorage.getItem(KLUCZ);
      if (raw) {
        setFlux(JSON.parse(raw));
        setStan("gotowe");
        return;
      }
    } catch {}
    try {
      const res = await fetch("/api/audyt-www", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: "fluxlab.pl" }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error();
      const ust = Array.isArray(d.ustalenia)
        ? (d.ustalenia as { waga: string }[])
        : [];
      const s: Skrot = {
        punkty: typeof d.punkty === "number" ? d.punkty : null,
        krytyczne: ust.filter((u) => u.waga === "krytyczne").length,
        wazne: ust.filter((u) => u.waga === "wazne").length,
      };
      try {
        sessionStorage.setItem(KLUCZ, JSON.stringify(s));
      } catch {}
      setFlux(s);
      setStan("gotowe");
    } catch {
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
      {stan === "gotowe" && flux ? (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Ten sam audyt, dwie strony
          </p>
          <Slupek nazwa={domena} s={wynik} />
          <Slupek nazwa="fluxlab.pl" s={flux} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <p className="flex-1 text-sm text-gray-600 dark:text-gray-400">
            Chcesz wiedzieć, jak wypada na tle naszej strony? Uruchomimy ten sam
            audyt na fluxlab.pl.
          </p>
          <button
            type="button"
            onClick={porownaj}
            disabled={stan === "laduje"}
            className="btn-secondary disabled:opacity-60"
          >
            {stan === "laduje"
              ? "Badamy fluxlab.pl..."
              : "Porównaj z fluxlab.pl"}
          </button>
        </div>
      )}
      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-700 dark:text-red-400">
          Nie udało się teraz zbadać fluxlab.pl. Spróbuj za chwilę.
        </p>
      )}
    </div>
  );
}
