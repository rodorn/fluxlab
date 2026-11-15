"use client";

import { useEffect, useState } from "react";
import { WALUTY } from "@/lib/kursy-nbp";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Wynik = {
  waluta: string;
  dataFaktury: string;
  kurs: number;
  dataKursu: string;
  tabela: string;
};

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
const ETYKIETA = "block text-sm font-medium text-gray-900 dark:text-white";

const MIESIACE = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

function dataPl(iso: string): string {
  const [r, m, d] = iso.split("-").map(Number);
  return `${d} ${MIESIACE[m - 1]} ${r}`;
}

function Wzor({
  tytul,
  tresc,
  onKopiuj,
}: {
  tytul: string;
  tresc: string;
  onKopiuj: () => void;
}) {
  const [ok, setOk] = useState(false);
  async function kopiuj() {
    onKopiuj();
    try {
      await navigator.clipboard.writeText(tresc);
      setOk(true);
      setTimeout(() => setOk(false), 2500);
    } catch {
      setOk(false);
    }
  }
  return (
    <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {tytul}
        </p>
        <button
          type="button"
          onClick={kopiuj}
          className="btn-secondary !px-3 !py-1.5 text-xs"
        >
          {ok ? "Skopiowano" : "Kopiuj"}
        </button>
      </div>
      <code className="mt-2 block break-all text-xs leading-relaxed text-gray-800 dark:text-gray-200">
        {tresc}
      </code>
    </div>
  );
}

export default function KursyNbp() {
  const [waluta, setWaluta] = useState("EUR");
  const [data, setData] = useState("");
  const [host, setHost] = useState("fluxlab.pl");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [laduje, setLaduje] = useState(false);

  useEffect(() => {
    setData(new Date().toISOString().slice(0, 10));
    setHost(window.location.host);
  }, []);

  useEffect(() => {
    if (!data) return;
    let aktualne = true;
    setLaduje(true);
    setBlad("");
    fetch(`/api/kursy-nbp?waluta=${waluta}&data=${data}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((j: Wynik) => aktualne && setWynik(j))
      .catch((e: Error) => {
        if (!aktualne) return;
        setWynik(null);
        setBlad(e.message || "Nie udało się pobrać kursu.");
      })
      .finally(() => aktualne && setLaduje(false));
    return () => {
      aktualne = false;
    };
  }, [waluta, data]);

  const rok = data ? data.slice(0, 4) : String(new Date().getFullYear());
  const baza = `https://${host}/api/kursy-nbp`;
  const zakres = `${baza}?waluta=${waluta}&od=${rok}-01-01&do=${rok}-12-31&przecinek=1`;
  const sheets = `=IMPORTDATA("${zakres}";";")`;
  const szukaj = `=VLOOKUP(A2;Kursy!A:B;2;FALSE)`;
  const excel = zakres;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Kurs NBP do faktury walutowej
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wybierz walutę i dzień wystawienia faktury. Dostaniesz kurs średni NBP z
        ostatniego dnia roboczego przed tym dniem.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={ETYKIETA}>Waluta faktury</span>
          <select
            value={waluta}
            onChange={(e) => setWaluta(e.target.value)}
            className={`${POLE} mt-1.5`}
          >
            {WALUTY.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={ETYKIETA}>Dzień wystawienia faktury</span>
          <input
            type="date"
            value={data}
            min="2002-01-03"
            onChange={(e) => setData(e.target.value)}
            className={`${POLE} mt-1.5`}
          />
        </label>
      </div>

      <div
        className="mt-5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5"
        aria-live="polite"
      >
        {blad ? (
          <p className="text-sm text-red-700 dark:text-red-300">{blad}</p>
        ) : wynik ? (
          <>
            <p className="text-3xl font-bold tabular-nums text-gray-900 dark:text-white">
              {wynik.kurs.toFixed(4).replace(".", ",")}{" "}
              <span className="text-base font-semibold text-gray-500 dark:text-gray-400">
                zł za 1 {wynik.waluta}
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Kurs z {dataPl(wynik.dataKursu)}, tabela {wynik.tabela}. Faktura z{" "}
              {dataPl(wynik.dataFaktury)}.
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {laduje ? "Trwa pobieranie kursu z NBP…" : "Wybierz datę."}
          </p>
        )}
      </div>

      <h3 className="mt-8 text-base font-bold text-gray-900 dark:text-white">
        Kursy w arkuszu, same i bez przepisywania
      </h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        W Google Arkuszach wklej poniższy wzór do komórki A1 nowej karty o
        nazwie Kursy. Zapełni się tabelą: każdy dzień roku i kurs z dnia
        poprzedzającego, a nowe kursy dochodzą same. Przy każdej fakturze
        wystarczy drugi wzór.
      </p>
      <div className="mt-4 grid gap-3">
        <Wzor
          tytul="Karta Kursy, komórka A1"
          tresc={sheets}
          onKopiuj={() => zglosZdarzenie("kursy_nbp_wzor_arkusz")}
        />
        <Wzor
          tytul="Przy fakturze, gdy w A2 jest jej data"
          tresc={szukaj}
          onKopiuj={() => zglosZdarzenie("kursy_nbp_wzor_szukaj")}
        />
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        W Excelu: Dane, Pobierz dane, Z sieci Web, wklej adres{" "}
        <a
          href={excel}
          className="break-all underline underline-offset-2"
          onClick={() => zglosZdarzenie("kursy_nbp_plik")}
        >
          {excel}
        </a>
        . Bez rejestracji i bez maila.
      </p>
    </div>
  );
}
