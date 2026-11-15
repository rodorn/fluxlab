"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
const ETYKIETA = "block text-sm font-medium text-gray-900 dark:text-white";
const POMOC = "mt-1 block text-xs text-gray-500 dark:text-gray-400";

function naBase64(plik: File): Promise<string> {
  return new Promise((ok, nie) => {
    const r = new FileReader();
    r.onload = () => ok(String(r.result).split(",")[1] ?? "");
    r.onerror = () => nie(new Error("odczyt"));
    r.readAsDataURL(plik);
  });
}

export default function WystawianieKsef({
  sesja,
  maDane,
  odnowa = false,
}: {
  sesja: string;
  maDane: boolean;
  odnowa?: boolean;
}) {
  const [nip, setNip] = useState("");
  const [token, setToken] = useState("");
  const [nazwa, setNazwa] = useState("");
  const [adres1, setAdres1] = useState("");
  const [adres2, setAdres2] = useState("");
  const [konto, setKonto] = useState("");
  const [plik, setPlik] = useState<File | null>(null);
  const [zgoda, setZgoda] = useState(false);
  const [blad, setBlad] = useState("");
  const [laduje, setLaduje] = useState(false);
  const [gotowe, setGotowe] = useState(false);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    if (!plik && !odnowa) {
      setBlad("Dołącz plik .xlsx albo .csv z fakturami.");
      return;
    }
    setLaduje(true);
    zglosZdarzenie("ksef_wystawianie_start");
    try {
      const base64 = plik ? await naBase64(plik) : "";
      const r = await fetch("/api/ksef-wystawianie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesja,
          ...(odnowa
            ? { odnowa: true, token }
            : {
                plik: { nazwa: plik?.name, base64 },
                ...(maDane
                  ? {}
                  : { nip, token, nazwa, adres1, adres2, konto, zgoda }),
              }),
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok)
        setBlad(j?.error ?? "Nie udało się zapisać pliku. Spróbuj za chwilę.");
      else {
        setGotowe(true);
        zglosZdarzenie("ksef_wystawianie_zapisano");
      }
    } catch {
      setBlad("Nie udało się połączyć. Spróbuj za chwilę.");
    } finally {
      setLaduje(false);
    }
  }

  if (!sesja)
    return (
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Ten adres działa tylko z linku po opłaceniu zamówienia. Jeśli go nie
        masz, odpisz na mail od nas.
      </p>
    );

  if (gotowe)
    return (
      <div aria-live="polite">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {odnowa ? "Token zapisany" : "Plik przyjęty"}
        </h1>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          {odnowa
            ? "W ciągu godziny wystawimy faktury z wgranych wcześniej plików i wyślemy Ci na maila zestawienie z numerami KSeF."
            : "W ciągu godziny wystawimy faktury w KSeF i wyślemy Ci na maila zestawienie z numerami KSeF. Jeśli w pliku będzie błąd, żadna faktura nie zostanie wystawiona, a w mailu dostaniesz listę wierszy do poprawy."}
        </p>
        {!odnowa && (
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => {
            setGotowe(false);
            setPlik(null);
          }}
        >
          Dodaj kolejny plik
        </button>
        )}
      </div>
    );

  if (odnowa)
    return (
      <form onSubmit={wyslij} className="grid gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nowy token KSeF
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Poprzedni token przestał działać. Wygeneruj nowy w Aplikacji
          Podatnika KSeF z uprawnieniami do wystawiania i przeglądania
          faktur. Wgrane wcześniej pliki zostaną wystawione zaraz po zapisaniu.
        </p>
        <label className="block">
          <span className={ETYKIETA}>Token KSeF</span>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            className={`${POLE} mt-1.5`}
          />
        </label>
        {blad && (
          <p
            role="alert"
            className="rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-800 dark:text-red-300"
          >
            {blad}
          </p>
        )}
        <button type="submit" disabled={laduje} className="btn-primary disabled:opacity-60">
          {laduje ? "Zapisywanie…" : "Zapisz nowy token"}
        </button>
      </form>
    );

  return (
    <form onSubmit={wyslij} className="grid gap-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {maDane ? "Dodaj plik z fakturami" : "Dane firmy i pierwszy plik"}
      </h1>
      {!maDane && (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Token generujesz w Aplikacji Podatnika KSeF: zakładka Tokeny,
            Generuj token, uprawnienia do wystawiania i przeglądania faktur.
            Token zapisujemy zaszyfrowany, używamy go tylko do wystawienia
            faktur z Twoich plików i usuwamy po anulowaniu subskrypcji.
          </p>
          <label className="block">
            <span className={ETYKIETA}>NIP firmy</span>
            <input
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              inputMode="numeric"
              autoComplete="off"
              className={`${POLE} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className={ETYKIETA}>Token KSeF</span>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className={`${POLE} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className={ETYKIETA}>Nazwa firmy na fakturach</span>
            <input
              value={nazwa}
              onChange={(e) => setNazwa(e.target.value)}
              autoComplete="off"
              className={`${POLE} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className={ETYKIETA}>Ulica i numer</span>
            <input
              value={adres1}
              onChange={(e) => setAdres1(e.target.value)}
              autoComplete="off"
              className={`${POLE} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className={ETYKIETA}>Kod pocztowy i miejscowość</span>
            <input
              value={adres2}
              onChange={(e) => setAdres2(e.target.value)}
              autoComplete="off"
              className={`${POLE} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className={ETYKIETA}>
              Numer konta do przelewów (opcjonalnie)
            </span>
            <input
              value={konto}
              onChange={(e) => setKonto(e.target.value)}
              inputMode="numeric"
              autoComplete="off"
              className={`${POLE} mt-1.5`}
            />
            <span className={POMOC}>
              26 cyfr. Jeśli podasz, trafi na faktury z terminem płatności.
            </span>
          </label>
        </>
      )}
      <label className="block">
        <span className={ETYKIETA}>Plik z fakturami (.xlsx albo .csv)</span>
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={(e) => setPlik(e.target.files?.[0] ?? null)}
          className={`${POLE} mt-1.5 file:mr-3 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-1 dark:file:bg-gray-800`}
        />
        <span className={POMOC}>
          Wzór kolumn:{" "}
          <a href="/pobierz/szablon-faktur-ksef.csv" className="underline">
            szablon-faktur-ksef.csv
          </a>
          . Jeden wiersz to jedna pozycja faktury, wiersze o tym samym numerze
          tworzą jedną fakturę.
        </span>
      </label>
      {!maDane && (
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={zgoda}
            onChange={(e) => setZgoda(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Fluxlab może wystawiać w KSeF faktury w imieniu mojej firmy, na
            podstawie plików wgranych na tej stronie, tym tokenem.
          </span>
        </label>
      )}
      {blad && (
        <p
          role="alert"
          className="rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-800 dark:text-red-300"
        >
          {blad}
        </p>
      )}
      <button
        type="submit"
        disabled={laduje || (!maDane && !zgoda)}
        className="btn-primary disabled:opacity-60"
      >
        {laduje ? "Wysyłanie…" : "Wystaw faktury w KSeF"}
      </button>
    </form>
  );
}
