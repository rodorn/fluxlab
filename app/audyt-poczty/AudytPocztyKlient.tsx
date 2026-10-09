"use client";

import { useState } from "react";
import RelatedProducts from "@/components/RelatedProducts";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Problem = { tytul: string; opis: string; waga: number };
type Wynik = {
  domena: string;
  mx: string[];
  dostawca: string;
  spf: string | null;
  dmarc: string | null;
  dkim: boolean;
  punkty: number;
  problemy: Problem[];
};

export default function AudytPocztyKlient({
  nazwa,
  breadcrumbs,
  children,
}: {
  nazwa: React.ReactNode;
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
}) {
  const [domena, setDomena] = useState("");
  const [laduje, setLaduje] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "laduje" | "ok" | "blad">(
    "idle",
  );

  async function zamowRaport(e: React.FormEvent) {
    e.preventDefault();
    if (!wynik) return;
    setLeadStan("laduje");
    const podsumowanie = [
      `Audyt poczty z narzędzia na stronie.`,
      `Domena: ${wynik.domena} (ocena ${wynik.punkty}/100)`,
      `Problemy: ${wynik.problemy.map((p) => p.tytul).join("; ")}`,
      `SPF: ${wynik.spf || "brak"} | DMARC: ${wynik.dmarc || "brak"}`,
    ].join("\n");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: leadEmail,
          company: wynik.domena,
          problemType: "Audyt bezpieczeństwa poczty",
          problemScale: `${wynik.punkty}/100`,
          contactPref: "email",
          message: podsumowanie,
        }),
      });
      setLeadStan(r.ok ? "ok" : "blad");
    } catch {
      setLeadStan("blad");
    }
  }

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    await uruchom(domena);
  }

  // Jedno wejscie dla formularza i dla przyciskow z przykladami, zeby
  // wynik powstawal tak samo niezaleznie od tego, skad przyszedl adres.
  async function uruchom(cel: string) {
    if (!cel.trim()) return;
    setDomena(cel);
    zglosZdarzenie("uruchomiono_skan");
    setBlad(null);
    setWynik(null);
    setLaduje(true);
    try {
      const r = await fetch("/api/audyt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: cel }),
      });
      const d = await r.json();
      if (!r.ok) setBlad(d.error || "Coś poszło nie tak.");
      else setWynik(d);
    } catch {
      setBlad("Nie udało się połączyć. Spróbuj ponownie.");
    } finally {
      setLaduje(false);
    }
  }

  const kolorTekst =
    wynik && wynik.punkty >= 90
      ? "text-green-600 dark:text-green-400"
      : wynik && wynik.punkty >= 60
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";
  const kolorRamka =
    wynik && wynik.punkty >= 90
      ? "border-green-600 dark:border-green-400"
      : wynik && wynik.punkty >= 60
        ? "border-amber-600 dark:border-amber-400"
        : "border-red-600 dark:border-red-400";

  const poleClass =
    "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";

  return (
    <main>
      {breadcrumbs}
      <section className="pt-24 pb-8">
        <div className="container-wide max-w-3xl">
          <p className="section-label mb-5">Narzędzie</p>
          <h1 className="h1-strony">
            Sprawdź, czy ktoś może podszyć się pod Waszą firmową pocztę
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Wpisz domenę firmy. W kilka sekund sprawdzimy publiczne rekordy SPF,
            DKIM i DMARC i pokażemy, czy Wasze maile z ofertami i fakturami
            docierają do klientów oraz czy ktoś obcy może wysyłać wiadomości w
            Waszym imieniu. Sprawdzamy tylko jawne dane DNS, nie logujemy się
            nigdzie i nie wysyłamy żadnych wiadomości.
          </p>
        </div>
      </section>

      <div className="container-wide max-w-3xl pb-16">
        {nazwa}
        <Przyklady
          pozycje={[
            { wartosc: "fluxlab.pl" },
            { wartosc: "allegro.pl" },
            { wartosc: "x-kom.pl" },
          ]}
          onWybor={uruchom}
          zablokowane={laduje}
          wstep="Nie masz pod ręką swojej domeny? Zobacz na gotowym przykładzie:"
        />

        <form onSubmit={sprawdz} className="mt-6 mb-8 flex gap-2">
          <input
            value={domena}
            onChange={(e) => setDomena(e.target.value)}
            placeholder="np. twojafirma.pl"
            aria-label="Domena firmy"
            className={`${poleClass} min-w-0 flex-1 px-4 py-3`}
          />
          <button
            className="btn-primary px-6 py-3 disabled:opacity-60"
            disabled={laduje || !domena.trim()}
          >
            {laduje ? "Sprawdzamy..." : "Sprawdź"}
          </button>
        </form>

        {blad && <p className="text-red-600 dark:text-red-400">{blad}</p>}

        {wynik && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/60">
            <div className="mb-4 flex items-baseline justify-between">
              <strong className="text-lg text-gray-900 dark:text-white">
                {wynik.domena}
              </strong>
              <span className={`text-2xl font-bold ${kolorTekst}`}>
                {wynik.punkty}/100
              </span>
            </div>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Dostawca poczty: {wynik.dostawca}
            </p>

            {wynik.problemy.length === 0 ? (
              <p className="text-green-600 dark:text-green-400">
                Konfiguracja jest poprawna. Nie ma nic do poprawy.
              </p>
            ) : (
              <>
                <p className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Znaleźliśmy {wynik.problemy.length}{" "}
                  {wynik.problemy.length === 1 ? "problem" : "problemy"}:
                </p>
                <ul className="grid list-none gap-3 p-0">
                  {wynik.problemy.map((p, i) => (
                    <li key={i} className={`border-l-[3px] pl-3 ${kolorRamka}`}>
                      <strong className="text-gray-900 dark:text-white">
                        {p.tytul}
                      </strong>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {p.opis}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/60">
                  <p className="mb-3 font-semibold text-gray-900 dark:text-white">
                    Chcecie, żebyśmy to uporządkowali?
                  </p>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Pełny raport z audytu (co dokładnie jest źle i gotowe rekordy
                    do wklejenia) jest za darmo. Ekspresowa naprawa, czyli ustawienie
                    SPF, DKIM i DMARC w trybie, który realnie blokuje podszywanie,
                    to 299 zł. Zostaw adres, a wyślemy raport dla{" "}
                    <strong>{wynik.domena}</strong> i wycenę naprawy. Bez
                    zobowiązań.
                  </p>
                  {leadStan === "ok" ? (
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      Dziękujemy. Raport dla {wynik.domena} przygotujemy i odpiszemy na{" "}
                      {leadEmail}.
                    </p>
                  ) : (
                    <form onSubmit={zamowRaport} className="flex flex-wrap gap-2">
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="Twój adres e-mail"
                        aria-label="Twój adres e-mail"
                        className={`${poleClass} flex-[1_1_220px] px-3.5 py-2.5`}
                      />
                      <button
                        type="submit"
                        className="btn-primary px-5 py-2.5 disabled:opacity-60"
                        disabled={leadStan === "laduje"}
                      >
                        {leadStan === "laduje"
                          ? "Wysyłamy..."
                          : "Wyślij mi raport i wycenę"}
                      </button>
                      {leadStan === "blad" && (
                        <span className="basis-full text-sm text-red-600 dark:text-red-400">
                          Nie udało się wysłać. Spróbuj ponownie za chwilę.
                        </span>
                      )}
                    </form>
                  )}
                </div>
              </>
            )}

            <details className="mt-5">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                Pokaż surowe rekordy DNS
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-md bg-gray-50 p-3 text-xs text-gray-800 dark:bg-gray-900/60 dark:text-gray-200">
                {`MX:    ${wynik.mx.join(", ") || "brak"}
SPF:   ${wynik.spf || "brak"}
DMARC: ${wynik.dmarc || "brak"}
DKIM:  ${wynik.dkim ? "wykryto" : "nie wykryto"}`}
              </pre>
            </details>
          </div>
        )}
        {children}
        <RelatedProducts slug="audyt-poczty" />
      </div>
    </main>
  );
}
