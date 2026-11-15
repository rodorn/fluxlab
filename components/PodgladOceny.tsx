"use client";

import { useState } from "react";
import Przyklady from "@/components/Przyklady";
import SzkieletWyniku from "@/components/SzkieletWyniku";

interface Ocena {
  kategoria: "gorący" | "ciepły" | "zimny";
  punkty: number;
  streszczenie: string;
  nastepny_krok: string;
}

const KOLOR: Record<Ocena["kategoria"], string> = {
  gorący: "text-red-700 dark:text-red-400",
  ciepły: "text-amber-700 dark:text-amber-400",
  zimny: "text-sky-700 dark:text-sky-400",
};

export default function PodgladOceny() {
  const [tekst, setTekst] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [ocena, setOcena] = useState<Ocena | null>(null);
  const [blad, setBlad] = useState("");

  async function uruchom(cel: string) {
    if (cel.trim().length < 10) return;
    setTekst(cel);
    setStan("ladowanie");
    setBlad("");
    setOcena(null);
    try {
      const res = await fetch("/api/ocena-leada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wiadomosc: cel }),
      });
      const d = await res.json();
      if (!res.ok) {
        setBlad(d?.error || "Nie udało się ocenić zgłoszenia.");
        setStan("blad");
        return;
      }
      setOcena(d);
      setStan("gotowe");
    } catch {
      setBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zobacz, jak oceniamy zgłoszenie</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wklej treść zgłoszenia od klienta. Pokażemy ocenę, którą dostałbyś w mailu. Nic nie zapisujemy.
      </p>
      <Przyklady
        pozycje={[
          { wartosc: "Dzień dobry, potrzebujemy wyceny strony dla sieci 5 salonów, chcemy ruszyć w grudniu. Proszę o kontakt w tym tygodniu, tel. 600 100 200.", etykieta: "Konkretne zapytanie" },
          { wartosc: "Ogólne pytanie o strony internetowe, bez terminu i bez budżetu, może kiedyś.", etykieta: "Ogólnik" },
        ]}
        onWybor={uruchom}
        zablokowane={stan === "ladowanie"}
        wstep="Nie masz pod ręką zgłoszenia? Zobacz na gotowym przykładzie:"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uruchom(tekst);
        }}
        className="mt-5 flex flex-col gap-3"
      >
        <textarea
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          rows={4}
          maxLength={1500}
          placeholder="Treść zgłoszenia od klienta"
          aria-label="Treść zgłoszenia"
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
        />
        <button type="submit" disabled={stan === "ladowanie" || tekst.trim().length < 10} className="btn-primary disabled:opacity-50 sm:self-start">
          {stan === "ladowanie" ? "Oceniamy..." : "Oceń zgłoszenie"}
        </button>
      </form>
      {stan === "ladowanie" && <SzkieletWyniku />}
      {stan === "blad" && <p className="mt-4 text-sm text-red-700 dark:text-red-400">{blad}</p>}
      {ocena && (
        <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Ocena leada</p>
          <p className={`mt-2 text-lg font-bold ${KOLOR[ocena.kategoria]}`}>
            {ocena.kategoria}, {ocena.punkty}/10
          </p>
          <dl className="mt-3 grid gap-y-2 text-sm">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Czego chce</dt>
              <dd className="font-medium text-gray-900 dark:text-white">{ocena.streszczenie}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Następny krok</dt>
              <dd className="font-medium text-gray-900 dark:text-white">{ocena.nastepny_krok}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
