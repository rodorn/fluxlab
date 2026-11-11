import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Kalkulator PV z magazynem na stronie firmy OZE | Fluxlab",
  description:
    "Klient liczy instalację z magazynem energii na stronie firmy OZE, a firma dostaje gotowe zapytanie. Wypróbuj przykład i umów rozmowę.",
  openGraph: {
    title: "Kalkulator PV z magazynem na stronie firmy OZE | Fluxlab",
    description:
      "Klient liczy instalację z magazynem energii na stronie firmy OZE, a firma dostaje gotowe zapytanie.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/oze" },
};

const DLA_KOGO = [
  "Firmy fotowoltaiczne",
  "Firmy montujące pompy ciepła",
  "Firmy sprzedające magazyny energii",
];

const CO_DOSTAJE = [
  "Kalkulator oszczędności i okresu zwrotu w barwach firmy, osadzany jednym iframe",
  "Wariant z magazynem energii: koszt instalacji i czas zwrotu obok samej instalacji PV",
  "Zapytanie klienta z wyborem magazynu i jego pojemnością, wysyłane do CRM firmy webhookiem",
  "Ceny, taryfa i parametry magazynów ustawiane przez firmę w konfiguracji",
];

export default function OzePage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/oze" items={[{ label: "Dla firm OZE" }]} />

        <section className="pt-16 pb-6">
          <div className="container-wide max-w-3xl mx-auto">
            <p className="section-label mb-3">Dla firm OZE</p>
            <h1 className="h1-strony">
              Kalkulator na stronie firmy OZE: klient liczy instalację z
              magazynem, Ty dostajesz gotowe zapytanie
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Klient wpisuje zużycie prądu i moc instalacji, zaznacza magazyn
              energii i od razu widzi koszt oraz czas zwrotu. Do firmy trafia
              zapytanie z jego wyborem, więc pierwsza rozmowa zaczyna się od
              konkretów. Wypróbuj poniżej.
            </p>
            <a
              href="#kontakt"
              className="mt-5 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white"
            >
              Umów rozmowę
            </a>
          </div>
        </section>

        <section className="pb-8">
          <div className="container-wide max-w-3xl mx-auto">
            <iframe
              src="/kalkulator-pv-demo/index.html"
              title="Przykładowy kalkulator oszczędności PV z magazynem energii"
              className="w-full h-[1500px] md:h-[1050px] rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100"
              loading="lazy"
            />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Przykład, dane i założenia demonstracyjne. W tej wersji formularz
              niczego nie wysyła.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Dla kogo</h2>
            <ul className="mt-3 space-y-1.5 text-gray-600 dark:text-gray-400 list-disc pl-5">
              {DLA_KOGO.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h2 className="mt-8 text-xl font-semibold">Co dostaje firma</h2>
            <ul className="mt-3 space-y-1.5 text-gray-600 dark:text-gray-400 list-disc pl-5">
              {CO_DOSTAJE.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Wszystkie liczby w przykładzie są demonstracyjne. Opis założeń i
              sposób osadzenia są na stronie{" "}
              <Link href="/kalkulator-oze-demo" className="underline">
                przykładowego kalkulatora
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Przeczytaj więcej</h2>
            <ul className="mt-3 space-y-1.5 list-disc pl-5">
              <li>
                <Link
                  href="/strefa-wiedzy/kalkulator-oze-formularz-wycena-czy-kalkulator"
                  className="underline"
                >
                  Kalkulator OZE: formularz, wycena, kalkulator
                </Link>
              </li>
              <li>
                <Link
                  href="/strefa-wiedzy/crm-dla-firmy-fotowoltaicznej-zeszyt-arkusz-czy-crm"
                  className="underline"
                >
                  CRM dla firmy OZE: zeszyt, arkusz, CRM
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-20 container-wide pb-20">
          <LandingForm
            formId="diagnosis_oze"
            heading="Chcę taki kalkulator na stronie mojej firmy"
            intro="Napisz kilka słów o firmie, umówimy rozmowę o wersji dla Ciebie."
            submitLabel="Umów rozmowę"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
