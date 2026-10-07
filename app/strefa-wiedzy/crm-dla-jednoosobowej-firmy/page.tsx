import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "CRM dla jednoosobowej firmy, co wybrać | Fluxlab",
  description:
    "Porównanie CRM dla jednoosobowych firm: Pipedrive, HubSpot Free, Folk, Attio, Notion, Monday CRM i Arkusze Google. Co wybrać, a czego unikać.",
  openGraph: {
    title: "CRM dla jednoosobowej firmy, co wybrać | Fluxlab",
    description:
      "Porównanie CRM dla jednoosobowych firm: Pipedrive, HubSpot Free, Folk, Attio, Notion, Monday CRM i Arkusze Google. Co wybrać, a czego unikać.",
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
    canonical: "/strefa-wiedzy/crm-dla-jednoosobowej-firmy",
  },
};

const checkIcon = (
  <svg
    className="w-5 h-5 text-accent shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const faq = [
  {
    q: "Czy solo consultant w ogóle potrzebuje CRM?",
    a: "Przy kilkunastu aktywnych rozmowach naraz tak. Bez systemu leady giną, bo nie wracasz do nich na czas.",
  },
  {
    q: "Czy darmowy HubSpot wystarczy na lata?",
    a: "Często tak. Granica pojawia się, gdy potrzebujesz workflow, scoringu i raportów spoza prostych dashboardów.",
  },
  {
    q: "Co z arkuszem Google jako CRM?",
    a: "Działa dobrze przy dyscyplinie i prostych automatyzacjach (Make, n8n, Apps Script). Dla wielu solo to optymalne narzędzie do czasu zatrudnienia drugiej osoby.",
  },
  {
    q: "Kiedy warto zmienić CRM?",
    a: "Gdy regularnie tracisz dane, a obejścia zajmują więcej czasu, niż oszczędzają. Najpierw jednak uporządkuj pola i dołóż automaty.",
  },
];

export default function CrmDlaJednoosobowejFirmyArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "CRM dla jednoosobowej firmy, co wybrać" },
          ]}
        />

        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              CRM dla jednoosobowej firmy, co wybrać
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              W jednoosobowej firmie CRM ma przypominać, do kogo wrócić, i
              pokazywać, gdzie utknęły rozmowy. Wszystko poza tym to
              overengineering.
            </p>
          </div>
        </section>

        <div className="container-wide pb-8">
          <Tabs
            ariaLabel="Rozdziały artykułu"
            tabs={[
              {
                label: "Narzędzia",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Pipedrive i HubSpot Free
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Pipedrive Essential kosztuje ok. 14 USD miesięcznie:
                        pipeline, zadania, integracja ze skrzynką i kalendarzem.
                        Szybki start, ale bez darmowego planu. Najwięcej daje z{" "}
                        <Link
                          href="/automatyzacja-pipedrive"
                          className="text-accent hover:underline"
                        >
                          automatyzacją Pipedrive
                        </Link>
                        .
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        HubSpot Free często wystarcza jednej osobie: kontakty,
                        deale, zadania, integracja z Gmailem. Przy poważniejszej
                        automatyzacji szybko trafisz na płatne plany. Więcej w
                        porównaniu{" "}
                        <Link
                          href="/strefa-wiedzy/hubspot-vs-pipedrive"
                          className="text-accent hover:underline"
                        >
                          HubSpot vs Pipedrive
                        </Link>
                        .
                      </p>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Folk, Attio, Notion i Arkusze Google
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Folk i Attio to nowsze CRM-y pod pracę na relacjach, od
                        ok. 20 do 30 USD miesięcznie. Folk jest prostszy dla
                        konsultanta, Attio bardziej elastyczny. Monday CRM ma
                        sens tylko, gdy i tak pracujesz w Monday, bo zwykle
                        wymaga minimum 3 licencji.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Notion albo arkusz Google z prostą automatyzacją (Make,
                        n8n, Apps Script) kosztują prawie nic. Sprawdzają się
                        przy kilkudziesięciu aktywnych rozmowach i dobrej
                        dyscyplinie.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Jak wybrać",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Jak wybrać w praktyce
                      </h2>
                      <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          Sprzedaż projektowa B2B: Pipedrive lub Folk.
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          Inbound i content: HubSpot Free na start.
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          Mało deali, praca na relacjach: Notion albo Folk.
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          Prosty proces i dyscyplina: Sheets z Make lub n8n.
                        </li>
                      </ul>

                      <h2 className="mt-10 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Czego unikać
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Salesforce i HubSpot Professional „na przyszłość" to
                        dla jednej osoby drogi i ciężki overengineering.
                        Szczegóły w artykule, czy{" "}
                        <Link
                          href="/strefa-wiedzy/salesforce-dla-malej-firmy"
                          className="text-accent hover:underline"
                        >
                          Salesforce ma sens dla małej firmy
                        </Link>
                        .
                      </p>

                      <h2 className="mt-10 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Minimalny zestaw automatów
                      </h2>
                      <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          Lead z formularza od razu w CRM lub arkuszu.
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          Przypomnienie o follow-upie po 3 i 10 dniach ciszy.
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          Tygodniowy raport aktywnych deali na maila.
                        </li>
                      </ul>
                      <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                        Bez{" "}
                        <Link
                          href="/automatyzacja-leadow-crm"
                          className="text-accent hover:underline"
                        >
                          automatyzacji leadów
                        </Link>{" "}
                        nawet najlepszy CRM zostaje notatnikiem. Od czego
                        zacząć, opisujemy w artykule{" "}
                        <Link
                          href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                          className="text-accent hover:underline"
                        >
                          automatyzacja CRM, od czego zacząć
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        FAQ
                      </h2>
                      <div className="space-y-6">
                        {faq.map((f) => (
                          <div key={f.q}>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {f.q}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {f.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Prev / Next */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/crm-dla-jednoosobowej-firmy" />
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Chcesz dobrać CRM i automaty pod swoją jednoosobową firmę?
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

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "CRM dla jednoosobowej firmy, co wybrać",
            description:
              "Porównanie CRM dla jednoosobowych firm: Pipedrive, HubSpot Free, Folk, Attio, Notion, Monday CRM i Arkusze Google. Co wybrać, a czego unikać.",
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

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
