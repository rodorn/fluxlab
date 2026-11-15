"use client";

import { useState } from "react";
import Przyklady from "@/components/Przyklady";
import SzkieletWyniku from "@/components/SzkieletWyniku";

interface Firma {
  nip: string;
  nazwa?: string;
  adres?: string;
  krs?: string;
  regon?: string;
  vat?: string;
  branza?: string;
  pkd?: string;
}

export default function PodgladDanychFirmy() {
  const [nip, setNip] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [firma, setFirma] = useState<Firma | null>(null);
  const [blad, setBlad] = useState("");

  async function uruchom(cel: string) {
    if (!cel.trim()) return;
    setNip(cel);
    setStan("ladowanie");
    setBlad("");
    setFirma(null);
    try {
      const res = await fetch("/api/dane-firmy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nip: cel }),
      });
      const d = await res.json();
      if (!res.ok) {
        setBlad(d?.error || "Nie udało się pobrać danych.");
        setStan("blad");
        return;
      }
      setFirma(d);
      setStan("gotowe");
    } catch {
      setBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setStan("blad");
    }
  }

  const wiersze: [string, string | undefined][] = firma
    ? [
        ["Nazwa", firma.nazwa],
        ["Adres", firma.adres],
        ["NIP", firma.nip],
        ["KRS", firma.krs || "brak wpisu w KRS"],
        ["REGON", firma.regon],
        ["Status VAT", firma.vat],
        ["Branża", firma.branza ? `${firma.branza} (PKD ${firma.pkd})` : firma.krs ? "brak w KRS" : "firma bez wpisu w KRS, branży z rejestru nie podajemy"],
      ]
    : [];

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zobacz, co dopiszemy do zgłoszenia</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz NIP z dowolnego zgłoszenia. Pokażemy dokładnie te dane, które trafią do maila z leadem.
      </p>
      <Przyklady
        pozycje={[
          { wartosc: "5252674798", etykieta: "NIP Allegro" },
          { wartosc: "7342867148", etykieta: "NIP CD Projekt" },
        ]}
        onWybor={uruchom}
        zablokowane={stan === "ladowanie"}
        wstep="Nie masz pod ręką numeru? Zobacz na gotowym przykładzie:"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uruchom(nip);
        }}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={nip}
          onChange={(e) => setNip(e.target.value)}
          inputMode="numeric"
          placeholder="NIP, na przykład 5260250274"
          aria-label="Numer NIP leada"
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
        />
        <button type="submit" disabled={stan === "ladowanie" || nip.replace(/\D/g, "").length < 10} className="btn-primary disabled:opacity-50">
          {stan === "ladowanie" ? "Pobieramy..." : "Pokaż dane firmy"}
        </button>
      </form>
      {stan === "ladowanie" && <SzkieletWyniku />}
      {stan === "blad" && <p className="mt-4 text-sm text-red-700 dark:text-red-400">{blad}</p>}
      {firma && (
        <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Dane firmy z rejestrów</p>
          <dl className="mt-3 grid gap-y-2 text-sm">
            {wiersze.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="w-28 shrink-0 text-gray-500 dark:text-gray-400">{k}</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{v || "brak danych"}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
