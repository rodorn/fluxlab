const KARTA =
  "rounded-2xl border border-gray-200/80 bg-white/60 p-6 dark:border-gray-800/80 dark:bg-gray-900/40";
const ZRODLO = "mt-3 text-xs text-gray-500 dark:text-gray-400";
const KOMORKA = "py-2.5 pr-3 align-top";

const GLOWNA: [string, string, string][] = [
  ["Wynik audytu FluxLab", "45/100", "97/100"],
  ["Waga na telefonie", "6,2 MB", "963 kB"],
  ["Pobranie na łączu komórkowym", "32,5 s", "4,9 s"],
  ["Największy pojedynczy plik", "4,5 MB", "169 kB"],
  ["Obrazy bez wersji mobilnej", "39", "2"],
  ["Ustalenia krytyczne / ważne / drobne", "1 / 2 / 5", "0 / 0 / 1"],
];

const PODSTRONY: [string, string, string, string][] = [
  ["Blog", "75 → 95", "11,4 → 2,9 s", "8,3 → 0,8 MB"],
  ["Kredyt konsolidacyjny", "84 → 97", "4,0 → 2,6 s", "1,8 → 0,7 MB"],
  ["Strona główna", "85 → 96", "4,4 → 2,7 s", "0,5 → 0,7 MB"],
  ["Zespół", "92 → 96", "3,4 → 2,7 s", "0,9 → 0,8 MB"],
];

const ZAKRES: {
  tytul: string;
  liczba: string;
  opis: string;
  punkty: string[];
}[] = [
  {
    tytul: "SEO",
    liczba: "27 → 147",
    opis: "adresów w mapie witryny",
    punkty: [
      "24 landingi ofertowe, w tym nowe: po odmowie w banku, dochód z zagranicy, zawody",
      "27 adresów z WordPressa przekierowanych na stałe, 7 starych podstron na najbliższy temat",
      "dane uporządkowane: FinancialService, FAQPage, Person, BlogPosting, BreadcrumbList",
      "0 linków prowadzących donikąd, mapa zgłoszona w Search Console w dniu startu",
    ],
  },
  {
    tytul: "Treści",
    liczba: "72",
    opis: "dokumenty przeniesione do CMS bez przestoju",
    punkty: [
      "strona główna, landingi, FAQ, kalkulator, doradcy i blog edytowane w panelu Sanity",
      "94 okładki bloga z nowym logo podmienione automatycznie",
      "zmiana treści nie wymaga zmian w kodzie",
    ],
  },
  {
    tytul: "Zgody i pomiar",
    liczba: "0",
    opis: "cookies analitycznych przed zgodą",
    punkty: [
      "własny baner zgód z projektu, Google Consent Mode v2",
      "kontener GTM przebudowany do 8 tagów, każdy z wymaganą zgodą",
      "źródło leada (UTM, gclid) w mailu i arkuszu, 1 konwersja w Ads bez dublowania",
      "lead zapisany w arkuszu przed wysłaniem maila, naprawiony rekord MX domeny",
    ],
  },
];

const PRZEBIEG: [string, string][] = [
  ["25.09", "Umowa i dostępy: repozytorium, Vercel, Sanity"],
  ["29.09", "Audyt strony, plan, wspólna rama i komponenty"],
  ["30.09", "Wszystkie widoki z Figmy na wersji testowej"],
  ["04.10", "Treści w CMS, nowe logo, okładki bloga"],
  ["06.10", "Zgody, GTM, Search Console, testy pomiaru"],
  ["07.10", "Start na www.finreal.pl i odbiór pracy przez klienta"],
];

export default function RealizacjaFinrealSzczegoly() {
  return (
    <section aria-labelledby="finreal-szczegoly" className="mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label mb-3">Case finreal.pl w liczbach</p>
        <h2 id="finreal-szczegoly" className="h2-sekcji">
          147 adresów, 12 dni, strona główna 6,4 raza lżejsza
        </h2>
        <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
          Redesign strony pośrednika kredytowego z projektu w Figmie. Zostaliśmy
          przy stosie klienta: Next.js, Sanity, Vercel.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
        <div className={KARTA}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Strona główna przed i po
          </h3>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className={KOMORKA + " font-medium"}>Wskaźnik</th>
                <th className={KOMORKA + " font-medium"}>Przed</th>
                <th className={KOMORKA + " font-medium"}>Po</th>
              </tr>
            </thead>
            <tbody>
              {GLOWNA.map(([n, p, o]) => (
                <tr
                  key={n}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-800/60"
                >
                  <td className={KOMORKA + " text-gray-700 dark:text-gray-300"}>
                    {n}
                  </td>
                  <td
                    className={
                      KOMORKA + " tabular-nums text-gray-500 dark:text-gray-400"
                    }
                  >
                    {p}
                  </td>
                  <td
                    className={
                      KOMORKA + " tabular-nums font-semibold text-accent"
                    }
                  >
                    {o}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={ZRODLO}>
            Audyt strony FluxLab na żywo: stara wersja 29.09.2026, nowa
            06.10.2026.
          </p>
        </div>

        <div className={KARTA}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Podstrony na telefonie
          </h3>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className={KOMORKA + " font-medium"}>Podstrona</th>
                <th className={KOMORKA + " font-medium"}>Wynik</th>
                <th className={KOMORKA + " font-medium"}>Treść widoczna</th>
                <th className={KOMORKA + " font-medium"}>Waga</th>
              </tr>
            </thead>
            <tbody>
              {PODSTRONY.map(([n, w, t, m]) => (
                <tr
                  key={n}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-800/60"
                >
                  <td className={KOMORKA + " text-gray-700 dark:text-gray-300"}>
                    {n}
                  </td>
                  <td className={KOMORKA + " tabular-nums"}>{w}</td>
                  <td className={KOMORKA + " tabular-nums"}>{t}</td>
                  <td className={KOMORKA + " tabular-nums"}>{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={ZRODLO}>
            Lighthouse 12.2, profil telefonu, 16.10.2026. Obie wersje zbudowane
            z repozytorium. Nowa strona główna zawiera widżet opinii Google.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-5 grid max-w-5xl gap-5 md:grid-cols-3">
        {ZAKRES.map((z) => (
          <div key={z.tytul} className={KARTA}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {z.tytul}
            </h3>
            <p className="mt-2 text-3xl font-bold tabular-nums text-accent">
              {z.liczba}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{z.opis}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {z.punkty.map((p) => (
                <li key={p} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={"mx-auto mt-5 max-w-5xl " + KARTA}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Przebieg: 12 dni od opłacenia do produkcji, przy terminie 5 tygodni
        </h3>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRZEBIEG.map(([d, c]) => (
            <li key={d} className="border-l-2 border-accent/40 pl-4">
              <p className="text-sm font-semibold tabular-nums text-accent">
                {d}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{c}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
          Etapy oddawane na wersji testowej, decyzje klienta zbierane mailem.
          Przełączenie na nową stronę: 0 minut niedostępności.
        </p>
        <p className={ZRODLO}>
          Źródło: repozytorium projektu i korespondencja, od 25.09 do 07.10.2026.
        </p>
      </div>
    </section>
  );
}
