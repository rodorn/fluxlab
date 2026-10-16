"use client";

import { useEffect, useState } from "react";

/** Dni robocze od dziś, bez weekendów. Świąt nie liczymy, to orientacja. */
function zaDniRobocze(od: Date, dni: number): Date {
  const d = new Date(od);
  while (dni > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) dni--;
  }
  return d;
}

const ETAPY = [
  { dni: 1, co: "Odpisujemy z ceną i zakresem" },
  { dni: 5, co: "Widzicie projekt pierwszych podstron" },
  { dni: 15, co: "Strona działa pod Waszym adresem" },
];

/** Oś „jeśli napiszecie dziś”, z datami liczonymi w przeglądarce. */
export default function OsCzasuStrony() {
  const [dzis, setDzis] = useState<Date | null>(null);
  useEffect(() => setDzis(new Date()), []);
  const fmt = (d: Date) =>
    d.toLocaleDateString("pl-PL", { day: "numeric", month: "long" });

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 p-6">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        Jeśli napiszecie dziś
      </p>
      <ol className="mt-4 grid gap-4 sm:grid-cols-3">
        {ETAPY.map((e) => (
          <li key={e.co} className="border-l-2 border-accent pl-3">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {dzis ? fmt(zaDniRobocze(dzis, e.dni)) : `${e.dni} dni rob.`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{e.co}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Terminy dla landingu albo strony firmowej po akceptacji zakresu.
        Ostatnią stronę oddaliśmy 12 dni po opłaceniu.
      </p>
    </div>
  );
}
