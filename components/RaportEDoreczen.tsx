"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Raport = {
  rodzaj: "KRS" | "CEIDG";
  nazwa: string;
  nip: string | null;
  krs: string | null;
  forma: string;
  siedziba: string;
  obowiazekOd: string;
  obowiazekOpis: string;
  obowiazekMinal: boolean;
  dniDoTerminu: number | null;
  adres: "JEST" | "BRAK" | "NIEZNANY";
  adresWartosc: string | null;
  stanZDnia: string;
  wniosek: string;
  kroki: string[];
};

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

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";

const KOLOR = {
  JEST: "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30",
  BRAK: "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30",
  NIEZNANY:
    "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60",
} as const;

const NAGLOWEK = {
  JEST: "Adres do e-Doręczeń jest wpisany",
  BRAK: "Brak adresu do e-Doręczeń w odpisie KRS",
  NIEZNANY: "Adresu nie da się sprawdzić po numerze NIP",
} as const;

function Wiersz({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-4">
      <dt className="w-44 shrink-0 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {k}
      </dt>
      <dd className="min-w-0 text-sm text-gray-900 dark:text-white">{v}</dd>
    </div>
  );
}

export default function RaportEDoreczen() {
  const [id, setId] = useState("");
  const [laduje, setLaduje] = useState(false);
  const [blad, setBlad] = useState("");
  const [raport, setRaport] = useState<Raport | null>(null);

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    setRaport(null);
    if (!id.replace(/\D/g, "")) {
      setBlad("Wpisz NIP albo numer KRS.");
      return;
    }
    setLaduje(true);
    zglosZdarzenie("raport_edoreczen_start");
    try {
      const r = await fetch("/api/raport-edoreczen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const j = await r.json();
      if (!r.ok) {
        setBlad(j?.error ?? "Nie udało się sprawdzić. Spróbuj za chwilę.");
      } else {
        setRaport(j as Raport);
        zglosZdarzenie("raport_edoreczen_wynik");
      }
    } catch {
      setBlad("Nie udało się połączyć. Spróbuj za chwilę.");
    } finally {
      setLaduje(false);
    }
  }

  function drukuj() {
    zglosZdarzenie("raport_edoreczen_druk");
    window.print();
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Raport dla Twojej firmy
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz NIP albo numer KRS. Dostaniesz odpowiedź, czy firma musi mieć
        adres do e-Doręczeń, od kiedy i, dla spółek, czy już go ma.
      </p>

      <form onSubmit={sprawdz} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="sr-only">NIP albo numer KRS</span>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            inputMode="numeric"
            autoComplete="off"
            placeholder="NIP albo KRS, na przykład 7740001454"
            className={POLE}
          />
        </label>
        <button
          type="submit"
          disabled={laduje}
          className="btn-primary whitespace-nowrap disabled:opacity-60"
        >
          {laduje ? "Trwa pobieranie danych…" : "Pokaż raport"}
        </button>
      </form>

      {blad && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-800 dark:text-red-300"
        >
          {blad}
        </p>
      )}

      {raport && (
        <div className="mt-6" aria-live="polite">
          <div className={`rounded-xl border p-5 ${KOLOR[raport.adres]}`}>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {NAGLOWEK[raport.adres]}
            </p>
            <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300">
              {raport.wniosek}
            </p>
          </div>

          <dl className="mt-5 divide-y divide-gray-200 dark:divide-gray-800">
            <Wiersz k="Firma" v={raport.nazwa} />
            {raport.nip && <Wiersz k="NIP" v={raport.nip} />}
            {raport.krs && <Wiersz k="KRS" v={raport.krs} />}
            <Wiersz k="Forma" v={raport.forma} />
            {raport.siedziba && <Wiersz k="Siedziba" v={raport.siedziba} />}
            <Wiersz
              k="Obowiązek od"
              v={`${dataPl(raport.obowiazekOd)}${
                raport.obowiazekMinal
                  ? " (termin minął)"
                  : raport.dniDoTerminu !== null
                    ? ` (za ${raport.dniDoTerminu} dni)`
                    : ""
              }`}
            />
            <Wiersz k="Dlaczego" v={raport.obowiazekOpis} />
            {raport.adresWartosc && (
              <Wiersz k="Adres do doręczeń" v={raport.adresWartosc} />
            )}
            <Wiersz
              k="Stan na dzień"
              v={
                raport.rodzaj === "KRS"
                  ? `${raport.stanZDnia} (odpis aktualny KRS)`
                  : `${dataPl(raport.stanZDnia)} (wykaz podatników VAT)`
              }
            />
          </dl>

          <div className="mt-5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Co zrobić
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-800 dark:text-gray-200">
              {raport.kroki.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ol>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 print:hidden">
            <button type="button" onClick={drukuj} className="btn-secondary">
              Zapisz jako PDF
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              W oknie drukowania wybierz „Zapisz jako PDF”.
            </p>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs text-gray-500 dark:text-gray-400">
        Źródła: odpis aktualny z api-krs.ms.gov.pl i wykaz podatników VAT
        Ministerstwa Finansów. Nic nie zapisujemy i nie prosimy o maila.
      </p>
    </div>
  );
}
