import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "HubSpot vs Pipedrive, który CRM dla małej firmy | Fluxlab",
  description:
    "HubSpot vs Pipedrive w 2026 roku: ceny, funkcje, marketing, lock-in i koszt skalowania. Konkretne wskazówki dla małej firmy B2B wybierającej CRM.",
  openGraph: {
    title: "HubSpot vs Pipedrive, który CRM dla małej firmy | Fluxlab",
    description:
      "HubSpot vs Pipedrive w 2026 roku: ceny, funkcje, marketing, lock-in i koszt skalowania. Konkretne wskazówki dla małej firmy B2B wybierającej CRM.",
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
    canonical: "/strefa-wiedzy/hubspot-vs-pipedrive",
  },
};

const faqItems = [
  {
    question: "Czy darmowy HubSpot wystarczy małej firmie?",
    answer:
      "Na start często tak. Workflow, raporty i marketing automation wymagają płatnych planów, których koszt rośnie szybko.",
  },
  {
    question: "Co kosztuje więcej długoterminowo?",
    answer:
      "Zwykle HubSpot, gdy korzystasz z Marketing Hub i Sales Hub Professional. Pipedrive rośnie liniowo z liczbą użytkowników.",
  },
  {
    question: "Czy łatwo zmigrować z HubSpota do Pipedrive?",
    answer:
      "Kontakty i deale tak, przez CSV albo API. Historię maili, scoring i workflow często trzeba budować od nowa.",
  },
  {
    question: "Co wybrać, jeśli nie mamy jeszcze procesu sprzedaży?",
    answer:
      "Najpierw uporządkuj proces, potem wybieraj narzędzie. Bez procesu każdy CRM będzie tylko ładniejszą bazą kontaktów.",
  },
];

const h2 = "mt-12 mb-4 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white";
const p = "mb-4 text-gray-600 dark:text-gray-400 leading-relaxed";
const ul = "mb-4 ml-5 list-disc space-y-2 text-gray-600 dark:text-gray-400";

export default function HubspotVsPipedriveArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs kolumna="waska"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "HubSpot vs Pipedrive, który CRM dla małej firmy" },
          ]}
        />

        <section className="pt-16 pb-6">
          <div className="container-wide max-w-3xl mx-auto">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              HubSpot vs Pipedrive, który CRM dla małej firmy
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              HubSpot to platforma marketingowa, w której CRM jest jedną z
              części. Pipedrive to czysty pipeline sprzedażowy. O wyborze
              decyduje sposób, w jaki firma pozyskuje klientów.
            </p>

            <h2 className={h2}>Cennik 2026, orientacyjnie</h2>
            <ul className={ul}>
              <li>HubSpot: darmowy CRM z limitami, Sales Hub Starter od ok. 20 USD za stanowisko, Professional kilkaset USD miesięcznie.</li>
              <li>Pipedrive: Essential ok. 14 USD, Advanced ok. 29 USD, Professional ok. 49 USD za użytkownika.</li>
            </ul>
            <p className={p}>
              HubSpot jest tańszy na starcie i droższy przy rozwoju. Wyższe
              plany oraz płatne pakiety kontaktów marketingowych potrafią
              kosztować więcej niż roczna licencja Pipedrive dla zespołu.
              Pipedrive liczy tylko użytkowników.
            </p>

            <h2 className={h2}>Funkcje i marketing</h2>
            <p className={p}>
              Pipedrive jest szybszy w codziennej pracy handlowca. HubSpot daje
              głębszą personalizację i wyraźnie wygrywa w marketingu: landing
              page, automatyzacja e-mail, scoring i atrybucja w jednym miejscu.
              W Pipedrive marketing dokładasz integracją z Brevo,
              ActiveCampaign albo Mailchimpem.
            </p>

            <h2 className={h2}>Dla kogo który</h2>
            <ul className={ul}>
              <li>
                <strong className="text-gray-900 dark:text-white">HubSpot</strong>, gdy sprzedaż napędzają treści, SEO i webinary, a marketing automation ma być w CRM.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Pipedrive</strong>, gdy liczy się outbound i pipeline, przewidywalny koszt i swoboda wyboru narzędzia do marketingu.
              </li>
            </ul>
            <p className={p}>
              W obu przypadkach o efekcie decyduje{" "}
              <Link href="/automatyzacja-leadow-crm" className="text-accent hover:underline">
                automatyzacja leadów i CRM
              </Link>
              . Dla Pipedrive najczęściej zaczynamy od{" "}
              <Link href="/automatyzacja-formularza-do-pipedrive" className="text-accent hover:underline">
                połączenia formularza z Pipedrive
              </Link>
              .
            </p>

            <h2 className={h2}>Pytania</h2>
            <dl className="space-y-5">
              {faqItems.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {f.question}
                  </dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-400">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/hubspot-vs-pipedrive" />
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Nie wiesz, który CRM pasuje do Twojej firmy?
              </p>
              <Link
                href="/automatyzacja-leadow-crm"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz automatyzację CRM
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
            headline: "HubSpot vs Pipedrive, który CRM dla małej firmy",
            description:
              "HubSpot vs Pipedrive w 2026 roku: ceny, funkcje, marketing, lock-in i koszt skalowania. Konkretne wskazówki dla małej firmy B2B wybierającej CRM.",
            datePublished: "2026-04-19",
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
            "@type": "FAQPage",
            mainEntity: faqItems.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
    </>
  );
}
