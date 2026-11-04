import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import KatalogProduktow from "@/components/KatalogProduktow";
import ZaZlotowke from "@/components/ZaZlotowke";
import WycenaAI from "@/components/WycenaAI";
import Abonamenty from "@/components/Abonamenty";
import DlaZakupow from "@/components/DlaZakupow";
import FaqSekcja from "@/components/FaqSekcja";
import { CENNIK as PRODUCTS, PRODUCTS as PRODUCTS_ALL, cenaWejscia } from "@/lib/products";

// Kolejność z licznika ruchu (sesje na stronie produktu, 20.09–24.10.2026).
const NAJCZESCIEJ = ["/audyt-strony", "/e-doreczenia-integracja", "/strony-www", "/audyt-kurierski"]
  .map((h) => PRODUCTS_ALL.find((p) => p.href === h))
  .filter((p) => p !== undefined);

const ZASADY = [
  ["Stała cena", "Nie liczymy godzin. Przed startem dostajesz jedną kwotę za całość."],
  ["Useme, potem faktura", "Pierwsze zlecenie przez Useme, pieniądze dostajemy po Twoim odbiorze. Kolejne fakturą przed startem."],
  ["Bez ukrytych kosztów", "Licencje, serwery i abonamenty ustalamy przed startem."],
  ["30 dni poprawek", "Błędy po naszej stronie poprawiamy po wdrożeniu bez opłat."],
  ["Co jest w cenie", "Testy na Twoich danych, dokumentacja, krótkie szkolenie zespołu i instrukcja na wypadek awarii."],
];

const POZA_CENA = [
  ["Licencje narzędzi", "Pipedrive, Make, n8n w chmurze czy Microsoft 365 opłacasz u dostawcy, na swoje konto. Kwotę podajemy w ofercie."],
  ["Koszty API i serwera", "Zapytania do modeli AI, hosting, wysyłka SMS. Rozliczasz je z dostawcą, szacunek miesięczny jest w ofercie."],
  ["Zmiany zakresu", "Nowe funkcje dodane po akceptacji oferty wyceniamy osobno, zanim zaczniemy pracę. Podstawa wyceny: 200 zł netto za godzinę."],
  ["Opieka po 30 dniach", "Późniejsze zmiany robimy jednorazowo albo w abonamencie, np. opieka nad stroną od 300 zł/mies."],
];

const ZASADY_AUDYTU = [
  ["Audyt strony 0 zł", "Raport od ręki, bez konta: telefon i komputer, wyszukiwarka, AI, poczta."],
  ["Cała strona 10 zł", "Do 200 podstron, raport mailem, płacisz po otrzymaniu."],
  ["Cena naprawy w raporcie", "Przy każdym problemie koszt usunięcia. Wycena wiąże 30 dni."],
  ["Audyt procesu odliczamy", "Koszt audytu procesu odejmujemy od wdrożenia, jeśli idziemy dalej."],
  ["Czasem to nie narzędzie", "Jeśli problem leży w procesie, a nie w systemie, piszemy to w raporcie zamiast proponować wdrożenie."],
];

const GWARANCJA = [
  ["Poprawki na nasz koszt", "Przez 30 dni po odbiorze poprawiamy bez opłat wszystko, co nie działa tak, jak opisaliśmy w ofercie."],
  ["Założenia na piśmie", "W ofercie wypisujemy, od czego zależy wynik, np. dostęp do API Twojego systemu. Jeśli założenie się nie sprawdzi, mówimy o tym, zanim pójdziemy dalej."],
  ["Płacisz po odbiorze", "Pierwsze zlecenie idzie przez Useme: pieniądze trafiają do nas dopiero, gdy zaakceptujesz pracę. Osobna umowa nie jest potrzebna."],
  ["Rezygnacja z dnia na dzień", "Abonament kończysz w dowolnym dniu. Za niewykorzystane dni oddajemy pieniądze w ciągu 7 dni."],
];

const DO_KALKULATORA = PRODUCTS.flatMap((p) => {
  const cena = cenaWejscia(p.price);
  return cena && !/\/mies\./.test(p.price) ? [{ nazwa: p.name, href: p.href, cena }] : [];
});

export const metadata: Metadata = {
  title: "Cennik: usługi ze stałą ceną | Fluxlab",
  description:
    "Cennik Fluxlab: usługi ze stałą ceną w działach automatyzacja, integracje i dane, systemy i strony oraz dla osób prywatnych.",
  alternates: { canonical: "/produkty" },
  openGraph: {
    title: "Cennik: usługi ze stałą ceną | Fluxlab",
    description:
      "Cennik Fluxlab: usługi ze stałą ceną w działach automatyzacja, integracje i dane, systemy i strony oraz dla osób prywatnych.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, cennik usług ze stałą ceną",
      },
    ],
  },
};

const PYTANIA_PRODUKTY = [
  { q: "Ile kosztują usługi?", a: "Ceny netto są przy każdej pozycji: naprawa strony od 150 zł, strona do 5 podstron 2 900 zł, pierwszy krok automatyzacji od 900 zł, własny CRM od 499 zł miesięcznie. Cena nie zmienia się po starcie." },
  { q: "Jak zamówić kilka usług naraz?", a: "Dodaj je do koszyka i wyślij jedno zapytanie. Cenę i termin potwierdzamy tego samego dnia roboczego." },
  { q: "Ile trwa realizacja?", a: "Strona do 5 podstron powstaje w tydzień, pierwszy krok automatyzacji w 5 dni, większość wdrożeń kończy się w 2–3 tygodnie. Termin jest w ofercie." },
  { q: "Jak wygląda płatność?", a: "Pierwsze zlecenie przez Useme. Kolejne na fakturę VAT płatną przed startem, usługi miesięczne na początku miesiąca. Bez zaliczek." },
  { q: "Czy mogę zrezygnować z CRM?", a: "Tak, w dowolnym dniu. Płacisz za dni korzystania." },
];

export default function ProduktyPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href="/produkty"
          items={[{ label: "Cennik" }]}
        />
        <section className="pt-6 pb-10 lg:pb-12">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">Cennik</p>
              <h1 className="h1-strony">
                Usługi ze stałą ceną
              </h1>
              <p className="hero-lead">
                Na górze usługi w abonamencie, niżej prace jednorazowe.
                Każda pozycja ma podaną kwotę wejścia i konkretny efekt.
              </p>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Darmowe sprawdzenia i kalkulatory są w dziale{" "}
                <Link
                  href="/narzedzia"
                  className="font-semibold text-accent hover:underline"
                >
                  Narzędzia
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide pb-10" aria-labelledby="jeden-proces">
          <div className="mx-auto max-w-4xl rounded-2xl border border-accent/40 bg-gray-50 p-6 dark:bg-white/5 md:p-8">
            <p className="section-label mb-2">Najlepszy start</p>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="jeden-proces" className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
                Jeden proces, który boli najbardziej
              </h2>
              <p className="text-lg font-bold text-accent">900 / 1 200 / 1 500 zł netto, 5 dni</p>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Wybierasz jeden etap, który dziś zjada najwięcej czasu: przepisywanie leadów, przypomnienia
              albo raport. Diagnoza przed wyceną kosztuje 0 zł, cena jest stała, a po 5 dniach roboczych
              etap działa sam.
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Co potem:</span> kolejne etapy
              tego samego procesu dokładamy osobno, każdy z ceną podaną z góry. Nic nie musisz zamawiać
              od razu.
            </p>
            <Link
              href="/automatyzacja-leadow-crm#cennik"
              className="btn-primary mt-5 inline-flex"
            >
              Zobacz, co wchodzi w każdy wariant
            </Link>
          </div>
        </section>

        <Abonamenty />

        <section className="container-wide pb-10" aria-label="Wycena przez AI">
          <WycenaAI />
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Wolisz porozmawiać?{" "}
            <Link href="/kontakt?forma=meet&utm_source=produkty" className="font-semibold text-accent hover:underline">
              Umów 30 minut w Google Meet
            </Link>{" "}
            albo napisz na{" "}
            <a href="mailto:pawel@fluxlab.pl" className="font-semibold text-accent hover:underline">
              pawel@fluxlab.pl
            </a>
            , co chcesz zrobić.
          </p>
        </section>

        <section className="container-wide pb-12" aria-labelledby="najczesciej">
          <h2 id="najczesciej" className="h2-sekcji mb-6 text-center">
            Jednorazowo: najczęściej wybierane
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {NAJCZESCIEJ.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  data-vt-karta
                  className="flex h-full flex-col rounded-2xl border border-gray-200 p-5 transition-colors hover:border-accent dark:border-white/10"
                >
                  <span data-vt-tytul className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</span>
                  <span className="mt-1 flex-1 text-sm text-gray-600 dark:text-gray-400">{p.tagline}</span>
                  <span className="mt-4 text-lg font-bold text-accent">{p.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="container-wide pb-12" aria-label="Zasady">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["Zasady wyceny", ZASADY],
              ["Zasady audytu", ZASADY_AUDYTU],
              ["Czego nie ma w cenie", POZA_CENA],
              ["Gdy coś pójdzie nie tak", GWARANCJA],
            ].map(([tytul, lista]) => (
              <div key={tytul as string} className="rounded-2xl bg-gray-50 p-6 dark:bg-white/5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{tytul as string}</h2>
                <dl className="mt-4 space-y-3">
                  {(lista as string[][]).map(([t, o]) => (
                    <div key={t}>
                      <dt className="text-sm font-semibold text-gray-900 dark:text-white">{t}</dt>
                      <dd className="text-sm text-gray-600 dark:text-gray-400">{o}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            Ceny netto. Cennik aktualny na 5 listopada 2026.
          </p>
        </section>

        <section className="container-wide pb-14 md:pb-20">
          <ZaZlotowke pozycje={DO_KALKULATORA} />
          <div className="mt-8 lg:mt-12">
            <KatalogProduktow />
          </div>

        </section>
        <DlaZakupow className="container-wide pb-12" />
        <FaqSekcja pytania={PYTANIA_PRODUKTY} sciezka="/produkty" className="container-wide pb-14" />
        <CTA
          naglowek="Potrzebujesz czegoś szytego pod Twój proces?"
          opis={
            <>
              Zaczynamy od diagnozy,{" "}
              <Link href="/jak-pracuje" className="text-accent hover:underline">
                tak pracujemy
              </Link>
              .
            </>
          }
        />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Cennik Fluxlab",
            itemListElement: PRODUCTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `https://fluxlab.pl${p.href}`,
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
