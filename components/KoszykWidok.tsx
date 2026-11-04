"use client";

import Link from "next/link";
import { useState } from "react";
import { usun, useKoszyk, type PozycjaKoszyka } from "@/lib/koszyk";
import { OFERTA } from "@/lib/sprzedaz";
import { zl } from "@/lib/wycena";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const RODZAJE: { klucz: PozycjaKoszyka["rodzaj"]; nazwa: string }[] = [
  { klucz: "abonament", nazwa: "Abonamenty" },
  { klucz: "dodatek", nazwa: "Dodatki co miesiąc" },
  { klucz: "usluga", nazwa: "Usługi" },
];

export default function KoszykWidok() {
  const koszyk = useKoszyk();
  const [email, setEmail] = useState("");
  const [firma, setFirma] = useState("");
  const [uwagi, setUwagi] = useState("");
  const [pulapka, setPulapka] = useState("");
  const [stan, setStan] = useState<"" | "wysylamy" | "wyslane">("");
  const [blad, setBlad] = useState("");
  const [wyslane, setWyslane] = useState<PozycjaKoszyka[]>([]);
  const [regulamin, setRegulamin] = useState(false);
  const [placi, setPlaci] = useState(false);
  const [bladPlatnosci, setBladPlatnosci] = useState("");
  const platna = (p: PozycjaKoszyka) => !!p.oferta && !!OFERTA[p.oferta];
  const platne = koszyk.filter(platna);
  const reszta = koszyk.filter((p) => !platna(p));
  const suma = (mies: boolean) =>
    platne.reduce((s, p) => (OFERTA[p.oferta!].miesiecznie === mies ? s + OFERTA[p.oferta!].netto : s), 0);

  async function zaplac(e: React.FormEvent) {
    e.preventDefault();
    zglosZdarzenie("koszyk_platnosc");
    setPlaci(true);
    setBladPlatnosci("");
    try {
      const r = await fetch("/api/zakup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: platne.map((p) => p.oferta), regulamin }),
      });
      const d = await r.json();
      if (!d.url) throw new Error(d.error);
      window.location.href = d.url;
    } catch (err) {
      setBladPlatnosci((err as Error).message || "Płatność chwilowo niedostępna. Napisz na pawel@fluxlab.pl.");
      setPlaci(false);
    }
  }

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setStan("wysylamy");
    setBlad("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: firma,
          website: pulapka,
          problemType: "Koszyk usług",
          problemScale: `Pozycji do wyceny: ${reszta.length}`,
          message: [
            ...reszta.map((p, i) => `${i + 1}. ${p.nazwa} (${p.cena}) https://fluxlab.pl${p.href}`),
            uwagi ? `\nUwagi: ${uwagi}` : "",
          ].join("\n"),
          landing_page: "/koszyk",
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Nie udało się wysłać. Napisz na pawel@fluxlab.pl.");
      zglosZdarzenie("koszyk_wyslany");
      setWyslane(reszta);
      reszta.forEach((p) => usun(p.id));
      setStan("wyslane");
    } catch (err) {
      setBlad((err as Error).message);
      setStan("");
    }
  }

  const potwierdzenie = stan === "wyslane" && (
    <div className="mt-10 max-w-2xl rounded-2xl border border-accent/30 bg-accent/5 p-6">
      <p className="text-lg font-semibold text-gray-900 dark:text-white">Zapytanie wysłane</p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        Wycenę {wyslane.length === 1 ? "wybranej pozycji" : `${wyslane.length} wybranych pozycji`} wyślemy na {email}.
        Cenę i termin potwierdzamy tego samego dnia roboczego.
      </p>
    </div>
  );

  if (!koszyk.length)
    return (
      potwierdzenie || (
        <div className="mt-10 max-w-2xl rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-white/15">
          <p className="font-semibold text-gray-900 dark:text-white">Koszyk jest pusty</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            W cenniku przy każdej usłudze, abonamencie i dodatku jest przycisk dodania do koszyka.
          </p>
          <Link href="/produkty" className="btn-primary mt-5 inline-flex">
            Przejdź do cennika
          </Link>
        </div>
      )
    );

  return (
    <>
      {potwierdzenie}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem]">
        <div>
          {RODZAJE.map(({ klucz, nazwa }) => {
            const lista = koszyk.filter((p) => p.rodzaj === klucz);
            if (!lista.length) return null;
            return (
              <section key={klucz} className="mb-8">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {nazwa}
                </h2>
                <ul className="mt-3 divide-y divide-gray-100 rounded-2xl border border-gray-200 dark:divide-white/5 dark:border-white/10">
                  {lista.map((p) => (
                    <li key={p.id} className="flex items-center gap-4 px-5 py-4">
                      <Link
                        href={p.href}
                        className="min-w-0 flex-1 font-medium text-gray-900 hover:text-accent dark:text-white"
                      >
                        {p.nazwa}
                        <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
                          {platna(p) ? "płatność online" : "cena po wycenie"}
                        </span>
                      </Link>
                      <span className="shrink-0 text-sm font-semibold text-gray-700 dark:text-gray-300">{p.cena}</span>
                      <button
                        type="button"
                        onClick={() => usun(p.id)}
                        aria-label={`Usuń z koszyka: ${p.nazwa}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-400 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {reszta.length > 0 &&
              "Przy pozycjach do wyceny podajemy najniższe pakiety netto z cennika, ostateczną kwotę po przejrzeniu zestawu. "}
            <Link href="/produkty" className="font-medium text-accent hover:underline">
              Dodaj kolejne pozycje
            </Link>
          </p>
        </div>
        <div className="flex h-fit flex-col gap-6 lg:sticky lg:top-24">
          {platne.length > 0 && (
            <form onSubmit={zaplac} className="rounded-2xl border border-accent/40 p-6">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Zapłać online</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {platne.length === 1 ? "1 pozycja" : `${platne.length} pozycje`} ze stałą ceną, jedna płatność.
              </p>
              <dl className="mt-4 space-y-1 text-sm">
                {suma(false) > 0 && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-gray-600 dark:text-gray-400">Jednorazowo</dt>
                    <dd className="font-semibold text-gray-900 dark:text-white">{zl(suma(false))}</dd>
                  </div>
                )}
                {suma(true) > 0 && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-gray-600 dark:text-gray-400">Co miesiąc</dt>
                    <dd className="font-semibold text-gray-900 dark:text-white">{zl(suma(true))}/mies.</dd>
                  </div>
                )}
              </dl>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Kwoty netto, do zapłaty doliczamy 23% VAT. Fakturę VAT wysyłamy w ciągu 1 dnia roboczego.
                {suma(true) > 0 && " Abonament wypowiadasz w dowolnym momencie, działa do końca opłaconego miesiąca."}
              </p>
              <label className="mt-4 flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  required
                  checked={regulamin}
                  onChange={(e) => setRegulamin(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--accent-solid))]"
                />
                <span>
                  Akceptuję{" "} {/* // głos klienta */}
                  <Link href="/regulamin" target="_blank" className="font-medium text-accent hover:underline">
                    regulamin
                  </Link>{" "}
                  i{" "}
                  <Link
                    href="/polityka-prywatnosci"
                    target="_blank"
                    className="font-medium text-accent hover:underline"
                  >
                    politykę prywatności
                  </Link>
                </span>
              </label>
              <button type="submit" disabled={placi} className="btn-primary mt-5 w-full disabled:opacity-60">
                {placi ? "Przechodzimy do płatności…" : "Przejdź do płatności"}
              </button>
              <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">Płatność obsługuje Stripe.</p>
              {bladPlatnosci && (
                <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
                  {bladPlatnosci}
                </p>
              )}
            </form>
          )}
          {reszta.length > 0 && (
            <form onSubmit={wyslij} className="rounded-2xl border border-gray-200 p-6 dark:border-white/10">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Zapytanie o wycenę</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {reszta.length === 1 ? "1 pozycja" : `${reszta.length} pozycji`} do wyceny, bez zobowiązań.
              </p>
              <label className="mt-5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-mail
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-accent focus:outline-none dark:border-white/15 dark:bg-gray-900 dark:text-white"
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Firma lub strona
                <input
                  type="text"
                  autoComplete="organization"
                  value={firma}
                  onChange={(e) => setFirma(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-accent focus:outline-none dark:border-white/15 dark:bg-gray-900 dark:text-white"
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Uwagi
                <textarea
                  rows={3}
                  value={uwagi}
                  onChange={(e) => setUwagi(e.target.value)}
                  placeholder="Na przykład: CRM to Pipedrive, start od przyszłego miesiąca"
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-accent focus:outline-none dark:border-white/15 dark:bg-gray-900 dark:text-white"
                />
              </label>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={pulapka}
                onChange={(e) => setPulapka(e.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <button
                type="submit"
                disabled={stan === "wysylamy"}
                className="btn-primary mt-5 w-full disabled:opacity-60"
              >
                {stan === "wysylamy" ? "Wysyłamy…" : "Wyślij zapytanie"}
              </button>
              {blad && (
                <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
                  {blad}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
}
