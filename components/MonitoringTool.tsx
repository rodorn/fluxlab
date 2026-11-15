"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const POLE =
  "flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";

type Dni = { dni: number | null; do: string | null; blad?: string | null };
type Zapis = { ok: boolean; juz?: boolean; cert?: Dni; domena?: Dni; error?: string };

function kolor(n: number | null | undefined, blad?: string | null) {
  if (blad || (n != null && n <= 3)) return "text-red-700 dark:text-red-400";
  if (n != null && n <= 30) return "text-amber-700 dark:text-amber-400";
  return "text-emerald-700 dark:text-emerald-400";
}

function opis(d: Dni | undefined, brak: string) {
  if (!d) return brak;
  if (d.blad) return d.blad;
  if (d.dni == null) return brak;
  if (d.dni < 0) return `wygasło ${-d.dni} dni temu`;
  return `do ${d.do}, zostało ${d.dni} ${d.dni === 1 ? "dzień" : "dni"}`;
}

function Wiersz({ nazwa, wartosc, klasa }: { nazwa: string; wartosc: string; klasa: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-t border-gray-200 dark:border-gray-700 py-3 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-sm text-gray-600 dark:text-gray-400">{nazwa}</dt>
      <dd className={`text-sm font-semibold sm:text-right ${klasa}`}>{wartosc}</dd>
    </div>
  );
}

/** Darmowy zapis do pilnowania certyfikatu i domeny: pierwszy wynik pokazujemy od razu, a mail dochodzi po kilku sekundach. */
export function PilnowanieCertyfikatu() {
  const [cel, setCel] = useState("");
  const [email, setEmail] = useState("");
  const [stan, setStan] = useState<"cisza" | "laduje" | "ok" | "blad">("cisza");
  const [wynik, setWynik] = useState<Zapis | null>(null);
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    zglosZdarzenie("pilnowanie_certyfikatu_zapis");
    try {
      const r = await fetch("/api/monitoring/zapis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produkt: "certyfikat", email, cel }),
      });
      const d: Zapis = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || "Nie udało się włączyć pilnowania.");
      setWynik(d);
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-sm">
      {stan === "ok" && wynik ? (
        <div role="status">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {wynik.juz ? "Ta domena jest już na Twojej liście" : "Pilnujemy tej domeny"}
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Stan na dziś. Mail z tym samym zestawieniem wysłaliśmy na {email}. Odezwiemy się dopiero, gdy do końca zostanie
            30, 14 albo 3 dni.
          </p>
          {!wynik.juz && (
            <dl className="mt-4">
              <Wiersz
                nazwa="Certyfikat HTTPS"
                wartosc={opis(wynik.cert, "strona nie odpowiada na porcie 443")}
                klasa={kolor(wynik.cert?.dni, wynik.cert?.blad)}
              />
              <Wiersz
                nazwa="Domena"
                wartosc={opis(wynik.domena, "rejestr nie podaje daty, pilnujemy samego certyfikatu")}
                klasa={kolor(wynik.domena?.dni)}
              />
            </dl>
          )}
        </div>
      ) : (
        <form onSubmit={wyslij}>
          <label htmlFor="pc-cel" className="block text-sm font-medium text-gray-900 dark:text-white">
            Domena do pilnowania
          </label>
          <input
            id="pc-cel"
            type="text"
            inputMode="url"
            required
            value={cel}
            onChange={(e) => setCel(e.target.value)}
            placeholder="twojafirma.pl"
            className={`${POLE} mt-2 w-full`}
          />
          <label htmlFor="pc-email" className="mt-4 block text-sm font-medium text-gray-900 dark:text-white">
            Adres e-mail na alerty
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="pc-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              className={POLE}
            />
            <button type="submit" disabled={stan === "laduje"} className="btn-primary disabled:opacity-50">
              {stan === "laduje" ? "Sprawdzamy..." : "Włącz pilnowanie"}
            </button>
          </div>
          {stan === "blad" && (
            <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
              {blad}
            </p>
          )}
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Za darmo, do 3 domen na jeden adres e-mail. Wyłączysz jednym kliknięciem w każdym mailu.
          </p>
        </form>
      )}
    </div>
  );
}

type Probka = { adres: string; ok: boolean; kod: number; ms: number; error?: string };

/** Jednorazowe sprawdzenie strony tak, jak robi to płatny monitoring: kod odpowiedzi i czas. */
export function PodgladDostepnosci() {
  const [adres, setAdres] = useState("");
  const [stan, setStan] = useState<"cisza" | "laduje" | "ok" | "blad">("cisza");
  const [p, setP] = useState<Probka | null>(null);
  const [blad, setBlad] = useState("");

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    zglosZdarzenie("monitoring_dostepnosci_probka");
    try {
      const r = await fetch(`/api/monitoring/sprawdz?adres=${encodeURIComponent(adres)}`);
      const d: Probka = await r.json();
      if (!r.ok) throw new Error(d.error || "Nie udało się sprawdzić strony.");
      setP(d);
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-sm">
      <form onSubmit={sprawdz} className="flex flex-col gap-3 sm:flex-row">
        <input
          aria-label="Adres strony"
          type="text"
          inputMode="url"
          required
          value={adres}
          onChange={(e) => setAdres(e.target.value)}
          placeholder="twojafirma.pl"
          className={POLE}
        />
        <button type="submit" disabled={stan === "laduje"} className="btn-primary disabled:opacity-50">
          {stan === "laduje" ? "Sprawdzamy..." : "Sprawdź teraz"}
        </button>
      </form>
      {stan === "blad" && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}
      {stan === "ok" && p && (
        <div role="status" className="mt-4">
          <p className={`text-base font-semibold ${p.ok ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
            {p.ok ? `${p.adres} odpowiada` : `${p.adres} nie odpowiada poprawnie`}
          </p>
          <dl className="mt-2">
            <Wiersz nazwa="Kod odpowiedzi" wartosc={p.kod ? String(p.kod) : "brak odpowiedzi"} klasa="text-gray-900 dark:text-white" />
            <Wiersz nazwa="Czas odpowiedzi" wartosc={`${p.ms} ms`} klasa="text-gray-900 dark:text-white" />
          </dl>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            To jednorazowa próba. Płatny monitoring robi ją co 5 minut przez całą dobę.
          </p>
        </div>
      )}
    </div>
  );
}

type Analiza = { ok: boolean; opis: string; error?: string };

/** Sprawdza bez wysyłki zgłoszenia, czy Strażnik formularza obsłuży formularz pod podanym adresem. */
export function PodgladFormularza() {
  const [adres, setAdres] = useState("");
  const [stan, setStan] = useState<"cisza" | "laduje" | "ok" | "blad">("cisza");
  const [a, setA] = useState<Analiza | null>(null);
  const [blad, setBlad] = useState("");

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    zglosZdarzenie("straznik_formularza_analiza");
    try {
      const r = await fetch(`/api/monitoring/formularz?adres=${encodeURIComponent(adres)}`);
      const d: Analiza = await r.json();
      if (!r.ok) throw new Error(d.error || "Nie udało się sprawdzić strony.");
      setA(d);
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-sm">
      <form onSubmit={sprawdz} className="flex flex-col gap-3 sm:flex-row">
        <input
          aria-label="Adres strony z formularzem kontaktowym"
          type="text"
          inputMode="url"
          required
          value={adres}
          onChange={(e) => setAdres(e.target.value)}
          placeholder="twojafirma.pl/kontakt"
          className={POLE}
        />
        <button type="submit" disabled={stan === "laduje"} className="btn-primary disabled:opacity-50">
          {stan === "laduje" ? "Sprawdzamy..." : "Sprawdź mój formularz"}
        </button>
      </form>
      {stan === "blad" && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}
      {stan === "ok" && a && (
        <div role="status" className="mt-4">
          <p className={`text-base font-semibold ${a.ok ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>
            {a.ok ? "Możemy pilnować tego formularza" : "Tego formularza nie obsłużymy"}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{a.opis}</p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            To tylko sprawdzenie strony, nie wysyłamy żadnego zgłoszenia. Zgłoszenie testowe idzie dopiero po włączeniu usługi.
          </p>
        </div>
      )}
    </div>
  );
}
