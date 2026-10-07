import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Automatyzacja CRM, od czego zacząć | Fluxlab",
  description:
    "Jak zacząć automatyzację CRM w firmie: audyt procesu, leady, zadania, statusy, walidacja danych i pierwsze wdrożenia o największym zwrocie.",
  openGraph: {
    title: "Automatyzacja CRM, od czego zacząć | Fluxlab",
    description:
      "Jak zacząć automatyzację CRM w firmie: audyt procesu, leady, zadania, statusy, walidacja danych i pierwsze wdrożenia o największym zwrocie.",
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
    canonical: "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac",
  },
};

const steps = [
  {
    title: "Sprawdź, gdzie CRM dziś nie działa",
    text: "Wypisz, co handlowcy robią ręcznie każdego dnia: zadania, statusy, follow-upy, uzupełnianie pól, przepisywanie leadów. Tam leży najszybszy zwrot.",
  },
  {
    title: "Nie automatyzuj wszystkiego naraz",
    text: "Zacznij od dwóch, trzech scenariuszy: tworzenie leada, przypisanie do osoby, przypomnienie o follow-upie, kontrola obowiązkowych pól.",
  },
  {
    title: "Uporządkuj zasady procesu",
    text: "Automatyzacja bez zasad przyspiesza chaos. Ustal, kiedy lead zmienia etap, kto odpowiada za kolejny ruch i kiedy sprawa jest zamknięta.",
  },
  {
    title: "Dodaj walidację i wyjątki",
    text: "Dobra automatyzacja pilnuje jakości: wyłapuje duplikaty, braki w polach i sprawy, które trzeba oddać człowiekowi.",
  },
];

export default function AutomatyzacjaCrmOdCzegoZaczacArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Automatyzacja CRM, od czego zacząć" },
          ]}
        />

        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Automatyzacja CRM, od czego zacząć
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Wiele firm ma CRM, a zespół dalej robi większość pracy ręcznie.
              Oto cztery kroki, od których zaczynamy.
            </p>
          </div>
        </section>

        <section className="pb-8">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <ol className="space-y-8">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {i + 1}. {step.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-gray-600 dark:text-gray-400 leading-relaxed">
              Najszybszy zwrot daje zwykle{" "}
              <Link
                href="/automatyzacja-leadow-crm"
                className="text-accent hover:underline"
              >
                automatyzacja leadów
              </Link>
              , bo tam ręczna praca kosztuje najwięcej.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac" />
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Masz CRM, ale zespół dalej klika za dużo ręcznie?
              </p>
              <Link
                href="/automatyzacja-leadow-crm"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz usługę Automatyzacja CRM
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Automatyzacja CRM, od czego zacząć",
            description:
              "Jak zacząć automatyzację CRM w firmie: audyt procesu, leady, zadania, statusy, walidacja danych i pierwsze wdrożenia o największym zwrocie.",
            datePublished: "2026-03-30",
            author: {
              "@type": "Organization",
              name: "Fluxlab",
              url: "https://fluxlab.pl",
            },
            publisher: {
              "@type": "Organization",
              name: "Fluxlab",
              url: "https://fluxlab.pl",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Jak zacząć automatyzację CRM w firmie",
            step: steps.map((step, i) => ({
              "@type": "HowToStep",
              name: `Krok ${i + 1}: ${step.title}`,
              text: step.text,
            })),
          }),
        }}
      />
    </>
  );
}
