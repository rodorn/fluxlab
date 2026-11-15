"use client";

import { useState } from "react";
import { zl, type Pozycja } from "@/lib/leady/wycena";

const POLE = "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900";

export default function KalkulatorWyceny({ token, firma, pozycje, demo = false }: { token?: string; firma: string; pozycje: Pozycja[]; demo?: boolean }) {
  const [wybrane, setWybrane] = useState<number[]>([]);
  const [stan, setStan] = useState<"" | "trwa" | "ok" | "blad">("");
  const [blad, setBlad] = useState("");
  const suma = wybrane.reduce((s, i) => s + pozycje[i].cena, 0);
  const opis = wybrane.map((i) => `${pozycje[i].nazwa} (${zl(pozycje[i].cena)})`).join(", ");

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (demo || !wybrane.length) return;
    setStan("trwa");
    const f = new FormData(e.currentTarget);
    const r = await fetch(`/api/lead/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imie: f.get("imie"),
        email: f.get("email"),
        telefon: f.get("telefon"),
        wiadomosc: `Wycena z kalkulatora: ${opis}. Razem ${zl(suma)} netto.`,
        wycena_suma: String(suma),
      }),
    }).catch(() => null);
    const d = await r?.json().catch(() => ({}));
    if (r?.ok) setStan("ok");
    else {
      setBlad(d?.error || "Nie udało się wysłać. Spróbuj za chwilę.");
      setStan("blad");
    }
  }

  if (stan === "ok")
    return (
      <p className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900" role="status">
        Dziękujemy. Wycena na {zl(suma)} netto trafiła do firmy {firma || "naszej firmy"}, odezwiemy się najszybciej, jak to możliwe.
      </p>
    );

  return (
    <form onSubmit={wyslij} className="grid gap-4 text-gray-900">
      <fieldset className="grid gap-2">
        <legend className="mb-1 text-base font-bold">Wybierz, czego potrzebujesz</legend>
        {pozycje.map((p, i) => (
          <label key={i} className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-300 p-3 text-sm has-[:checked]:border-gray-900 has-[:checked]:bg-gray-50">
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={wybrane.includes(i)}
                onChange={() => setWybrane(wybrane.includes(i) ? wybrane.filter((x) => x !== i) : [...wybrane, i])}
              />
              {p.nazwa}
            </span>
            <span className="whitespace-nowrap font-semibold">{zl(p.cena)}</span>
          </label>
        ))}
      </fieldset>
      <p className="text-lg font-bold" aria-live="polite">Razem: {zl(suma)} netto</p>
      {!demo && (
        <>
          <input name="imie" placeholder="Imię" aria-label="Imię" autoComplete="given-name" className={POLE} />
          <input name="email" type="email" placeholder="E-mail" aria-label="E-mail" autoComplete="email" className={POLE} />
          <input name="telefon" type="tel" placeholder="Telefon" aria-label="Telefon" autoComplete="tel" className={POLE} />
          <p className="text-xs text-gray-500">Podaj e-mail albo telefon. Dane posłużą wyłącznie do odpowiedzi na tę wycenę.</p>
          {stan === "blad" && <p className="text-sm text-red-700">{blad}</p>}
          <button type="submit" disabled={stan === "trwa" || !wybrane.length} className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
            {stan === "trwa" ? "Wysyłamy..." : "Poproś o wycenę"}
          </button>
        </>
      )}
    </form>
  );
}
