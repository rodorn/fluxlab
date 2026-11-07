import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";

const TYTUL = "Demo FluxCRM dla pośrednika kredytowego | Fluxlab";
const OPIS =
  "Demo FluxCRM dla pośrednika kredytowego: sprawa od zapytania do uruchomienia, orientacyjna zdolność, dokumenty z brakami, wnioski do banków i prowizje.";

export const metadata: Metadata = {
  title: "Demo FluxCRM dla pośrednika kredytowego | Fluxlab",
  description:
    "Demo FluxCRM dla pośrednika kredytowego: sprawa od zapytania do uruchomienia, orientacyjna zdolność, dokumenty z brakami, wnioski do banków i prowizje.",
  openGraph: {
    title: TYTUL,
    description: OPIS,
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/crm-dla-posrednikow-kredytowych",
  },
};

const punkty = [
  {
    tytul: "Sprawa kredytowa od zapytania do uruchomienia",
    opis: "Każde zapytanie staje się sprawą z etapami: analiza, dokumenty, wnioski w bankach, decyzja, uruchomienie. Widzisz, co utknęło i u kogo.",
  },
  {
    tytul: "Dokumenty z listą braków",
    opis: "Klient dostaje listę dokumentów, a CRM pokazuje, czego jeszcze brakuje. Wnioski do kilku banków prowadzisz w jednej sprawie.",
  },
  {
    tytul: "Zgody RODO i rejestr czynności",
    opis: "Zgody klienta, rejestr czynności przetwarzania i umowa powierzenia są w systemie.",
  },
  {
    tytul: "Orientacyjna zdolność kredytowa",
    opis: "CRM liczy maksymalną ratę i kwotę kredytu z dochodu, zobowiązań i kosztów utrzymania (DSTI, bufor na wzrost stóp) i pokazuje, czy wnioskowana kwota się mieści. To szacunek dla doradcy, decyzję podejmuje bank.",
  },
  {
    tytul: "Szkice AI, aplikacja na telefon, prowizje",
    opis: "AI przygotowuje szkic wiadomości do klienta, a doradca zatwierdza go przed wysyłką. Doradca pracuje z telefonu, a prowizje liczą się same.",
  },
];

const przebieg = [
  "Wybierasz termin w formularzu niżej.",
  "Dostajesz zaproszenie na Google Meet.",
  "Przez 30 minut pokazujemy FluxCRM na przykładowej sprawie kredytowej.",
  "Mówisz, jak dziś prowadzisz sprawy, a my, co da się przenieść.",
];

const faq = [
  {
    question: "Ile trwa demo i czy coś kosztuje?",
    answer:
      "Demo trwa 30 minut na Google Meet i jest bezpłatne. Nie musisz niczego instalować.",
  },
  {
    question: "Czy dane klientów są bezpieczne?",
    answer:
      "Instancja działa na serwerze w Unii Europejskiej. Podpisujemy umowę powierzenia przetwarzania danych.",
  },
  {
    question: "Czy przeniesiecie sprawy z Excela albo innego CRM?",
    answer:
      "Tak. Import z arkusza albo eksportu z dotychczasowego systemu jest częścią wdrożenia, a szkolenie robimy na Twoich sprawach.",
  },
  {
    question: "Czy CRM liczy zdolność kredytową?",
    answer:
      "Tak, orientacyjnie. FluxCRM liczy maksymalną ratę i kwotę kredytu z dochodu, zobowiązań i kosztów utrzymania (DSTI, bufor na wzrost stóp) i pokazuje, czy wnioskowana kwota się mieści. To szacunek dla doradcy, ostateczną decyzję podejmuje bank.",
  },
];

export default function CrmPosrednicyPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          href="/crm-dla-posrednikow-kredytowych"
          items={[
            { label: "Własny CRM", href: "/wlasny-crm" },
            { label: "CRM dla pośredników kredytowych" },
          ]}
        />

        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <p className="section-label mb-3">FluxCRM dla pośredników</p>
            <h1 className="h1-strony mb-6">CRM dla pośredników kredytowych</h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Sprawa kredytowa od zapytania do uruchomienia w jednym miejscu.
              Zobacz to na 30 minutach demo.
            </p>
            <div className="mt-8">
              <a href="#demo" className="btn-primary">
                Umów demo
              </a>
            </div>
          </div>
        </section>

        <section className="container-wide pb-16">
          <div className="max-w-4xl mx-auto grid gap-5 sm:grid-cols-2">
            {punkty.map((p) => (
              <div
                key={p.tytul}
                className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/60 sm:odd:last:col-span-2"
              >
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {p.tytul}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{p.opis}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-wide pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-8">Jak wygląda demo</h2>
            <ol className="space-y-4">
              {przebieg.map((krok, i) => (
                <li
                  key={krok}
                  className="flex items-start gap-4 text-lg text-gray-700 dark:text-gray-300"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  {krok}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="demo" className="scroll-mt-20 py-10 lg:py-12">
          <div className="container-wide">
            <LandingForm
              formId="demo_crm_posrednik"
              heading="Umów demo FluxCRM"
              intro="Wybierz termin. Pokażemy CRM na przykładowej sprawie kredytowej i odpowiemy na pytania."
              submitLabel="Umów demo"
            />
          </div>
        </section>

        <section className="container-wide pb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-8">Częste pytania</h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group card-lift bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium list-none">
                    {item.question}
                    <svg
                      className="shrink-0 ml-4 w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-45"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-gray-500 dark:text-gray-400">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
            <p className="mt-8 text-gray-600 dark:text-gray-300">
              Szukasz CRM dla innej branży? Zobacz{" "}
              <Link href="/wlasny-crm" className="text-accent hover:underline">
                własny CRM od Fluxlab
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "FluxCRM dla pośredników kredytowych",
            description: OPIS,
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "CRM",
            url: "https://fluxlab.pl/crm-dla-posrednikow-kredytowych",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
