import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { KATEGORIE, pozycje, tokenPoArkuszu, zl } from "@/lib/paragony";

export const metadata: Metadata = {
  title: "Arkusz paragonów | Fluxlab",
  description: "Pozycje odczytane ze zdjęć paragonów.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/paragony-arkusz" },
};
export const dynamic = "force-dynamic";

const KARTA =
  "mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-10";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ k?: string; m?: string }>;
}) {
  const { k = "", m = "" } = await searchParams;
  const token = await tokenPoArkuszu(k);
  const wszystkie = token ? await pozycje(token) : [];
  const miesiace = [...new Set(wszystkie.map((x) => x.p.data.slice(0, 7)))];
  const wybrany = /^\d{4}-\d{2}$/.test(m) ? m : (miesiace[0] ?? "");
  const lista = wszystkie.filter((x) => x.p.data.startsWith(wybrany));
  const sumy = KATEGORIE.map((kat) => ({
    kat,
    suma: lista
      .filter((x) => x.p.kategoria === kat && x.p.waluta === "PLN")
      .reduce((a, x) => a + (x.p.brutto ?? 0), 0),
  })).filter((x) => x.suma > 0);
  const razem = sumy.reduce((a, x) => a + x.suma, 0);
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className={KARTA}>
            {!token ? (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Nie znaleziono arkusza. Użyj linku z maila od nas.
              </p>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Arkusz paragonów
                </h1>
                {!wszystkie.length ? (
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    Arkusz jest pusty. Wyślij zdjęcie paragonu na swój adres, a
                    pozycja pojawi się tutaj po chwili.
                  </p>
                ) : (
                  <>
                    <nav
                      aria-label="Miesiące"
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {miesiace.map((mm) => (
                        <a
                          key={mm}
                          href={`/paragony-arkusz?k=${k}&m=${mm}`}
                          className={`rounded-full border px-3 py-1 text-sm ${mm === wybrany ? "border-accent bg-accent/10 text-gray-900 dark:text-white" : "border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400"}`}
                        >
                          {mm}
                        </a>
                      ))}
                    </nav>
                    <p className="mt-5 text-sm text-gray-700 dark:text-gray-300">
                      Razem w {wybrany} (PLN):{" "}
                      <b className="text-gray-900 dark:text-white">
                        {zl(razem)} zł
                      </b>
                      , pozycji: {lista.length}.
                    </p>
                    {sumy.length > 0 && (
                      <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {sumy.map((x) => (
                          <li key={x.kat} className="flex justify-between gap-3 border-b border-gray-100 py-1 dark:border-gray-700">
                            <span>{x.kat}</span>
                            <span>{zl(x.suma)} zł</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <a
                      href={`/api/paragony/csv?k=${k}&m=${wybrany}`}
                      className="btn-secondary mt-5 inline-block"
                    >
                      Pobierz CSV
                    </a>
                    <ul className="mt-6 grid gap-3">
                      {lista.map(({ id, p }) => (
                        <li
                          key={id}
                          className="rounded-xl border border-gray-100 p-4 dark:border-gray-700"
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {p.sprzedawca || "bez nazwy"}
                            </span>
                            <span className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                              {zl(p.brutto)} {p.waluta}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {p.data} · {p.kategoria}
                            {p.vat !== null ? ` · VAT ${zl(p.vat)}` : ""}
                            {p.nip ? ` · NIP ${p.nip}` : ""}
                          </p>
                          {p.opis && (
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {p.opis}
                            </p>
                          )}
                          {p.uwaga && (
                            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                              {p.uwaga}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
