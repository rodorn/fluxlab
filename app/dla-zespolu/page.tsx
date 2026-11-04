import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import DlaZakupow from "@/components/DlaZakupow";
import ZapiszPdf from "@/components/ZapiszPdf";
import WyslijKoledze from "@/components/WyslijKoledze";
import UzasadnienieZakupu from "@/components/UzasadnienieZakupu";

export const metadata: Metadata = {
  title: "FluxLab w skrócie: do przesłania w firmie | Fluxlab",
  description:
    "Dla szefa, księgowości i działu zakupów: co robimy, ile kosztuje, jak wygląda współpraca, co gdy coś pójdzie nie tak, dane firmy. Do zapisania jako PDF.",
  alternates: { canonical: "/dla-zespolu" },
};

const OFERTA = [
  [
    "Automatyzacje",
    "Jeden proces od początku do końca: dokumenty, raporty, KSeF, połączenie CRM z ERP. Pierwszy krok 900 / 1 200 / 1 500 zł w 5 dni, cała ścieżka od 2 500 zł.",
  ],
  [
    "Strony internetowe",
    "Naprawa i poprawki 150 / 290 / 490 zł. Strona w tydzień do 5 podstron 2 900 zł, strona z CMS 5 900 zł, sklep od 9 900 zł.",
  ],
  [
    "Własny CRM",
    "Abonament 499 zł/mies. za 3 osoby, potem 99 zł za osobę, wdrożenie 1 zł. Rezygnacja w dowolnym dniu.",
  ],
];

const KROKI = [
  ["Zgłoszenie", "Formularz na fluxlab.pl albo mail na pawel@fluxlab.pl. Wystarczy opis problemu w kilku zdaniach."],
  ["Wycena", "Cenę i termin dostajesz w 1 dzień roboczy, na piśmie. Wycena jest bezpłatna."],
  ["Realizacja", "Termin z oferty, postęp co kilka dni. Cena się nie zmienia, nie rozliczamy godzin."],
  ["Odbiór i wsparcie", "Sprawdzasz efekt na swoich danych. Przez 30 dni po odbiorze poprawki są bezpłatne, potem opcjonalny serwis z reakcją w 24 h."],
];

const RYZYKA = [
  ["Coś działa inaczej, niż ustaliliśmy", "Poprawiamy bezpłatnie, także po 30 dniach, jeśli błąd jest po naszej stronie."],
  ["Zewnętrzny system zmieni API", "Mówimy, co się zmieniło, i podajemy koszt oraz termin naprawy przed pracą."],
  ["Zakres okaże się większy", "Przed startem dostajesz zakres na piśmie. Rozszerzenie to osobna wycena, nie dopłata po fakcie."],
  ["Automatyzacja nie ma sensu", "Mówimy to na etapie wyceny i nie bierzemy zlecenia."],
];

function Lista({ wiersze }: { wiersze: string[][] }) {
  return (
    <dl className="mt-4 grid gap-4 sm:grid-cols-2">
      {wiersze.map(([t, o]) => (
        <div key={t} className="nie-lam">
          <dt className="text-sm font-semibold text-gray-900 dark:text-white">{t}</dt>
          <dd className="text-sm text-gray-600 dark:text-gray-400">{o}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function DlaZespoluPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/dla-zespolu" items={[{ label: "FluxLab w skrócie" }]} />
        <section className="pt-6 pb-16">
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-3">Do przesłania w firmie</p>
            <h1 className="h1-strony">FluxLab w skrócie</h1>
            <p className="hero-lead">
              Automatyzacje, strony internetowe i CRM dla firm B2B. Stała cena podana z góry, termin w ofercie.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <ZapiszPdf />
              <WyslijKoledze />
            </div>

            <h2 className="mt-12 text-lg font-bold text-gray-900 dark:text-white">Co robimy i ile to kosztuje</h2>
            <Lista wiersze={OFERTA} />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Ceny netto, doliczamy 23% VAT. Pełny cennik: fluxlab.pl/produkty.</p>

            <UzasadnienieZakupu />

            <h2 className="mt-12 text-lg font-bold text-gray-900 dark:text-white">Jak wygląda współpraca</h2>
            <ol className="mt-4 grid gap-4 sm:grid-cols-2">
              {KROKI.map(([t, o], i) => (
                <li key={t} className="nie-lam">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {i + 1}. {t}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{o}</p>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 text-lg font-bold text-gray-900 dark:text-white">Co może pójść nie tak i co wtedy robimy</h2>
            <Lista wiersze={RYZYKA} />

            <DlaZakupow className="mt-12" />

            <h2 className="mt-12 text-lg font-bold text-gray-900 dark:text-white">Dane firmy</h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Usługi świadczy Paweł Iwanek, NIP 7123336008, REGON 366862577. Kontakt: pawel@fluxlab.pl, fluxlab.pl/kontakt.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
