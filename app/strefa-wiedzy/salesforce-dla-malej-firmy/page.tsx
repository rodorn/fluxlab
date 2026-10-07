import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Salesforce dla małej firmy, czy warto | Fluxlab",
  description:
    "Czy Salesforce ma sens w małej firmie. Realne koszty, czas wdrożenia, alternatywy jak Pipedrive i HubSpot oraz scenariusze, w których się zwraca.",
  openGraph: {
    title: "Salesforce dla małej firmy, czy warto | Fluxlab",
    description:
      "Czy Salesforce ma sens w małej firmie. Realne koszty, czas wdrożenia, alternatywy jak Pipedrive i HubSpot oraz scenariusze, w których się zwraca.",
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
    canonical: "/strefa-wiedzy/salesforce-dla-malej-firmy",
  },
};

const Check = () => (
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

export default function SalesforceDlaMalejFirmyArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Salesforce dla małej firmy, czy warto" },
          ]}
        />

        <section className="pt-16 pb-6">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Salesforce dla małej firmy, czy warto
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Salesforce ma plany dla mniejszych firm, ale „mniejsze” nie znaczy
              „lekkie”. To, czy warto, zależy od procesu i danych, nie od marki.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Rozdziały artykułu Salesforce dla małej firmy"
            tabs={[
              {
                label: "Koszty i wdrożenie",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-16">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Realny koszt Salesforce 2026
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                          Salesforce to platforma, a małą firmę zwykle interesuje
                          tylko Sales Cloud. Sama licencja to jednak mała część
                          kosztu.
                        </p>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <Check />
                            Starter Suite, od 25 USD / user / mies.
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            Pro Suite, od ok. 80 USD / user / mies.
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            Enterprise, od ok. 165 USD / user / mies.
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            Wdrożenie partnera i utrzymanie przez admina, często kilkadziesiąt tysięcy USD.
                          </li>
                        </ul>
                        <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                          Dla 10-osobowej firmy Enterprise z wdrożeniem często
                          kosztuje 30 do 50 tys. USD w pierwszym roku. To
                          wielokrotnie więcej niż Pipedrive.
                        </p>
                      </div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Czas wdrożenia
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          Starter skonfigurujesz w 1 do 2 tygodni, ale nie ma
                          custom obiektów ani Sandboxa. Enterprise z
                          automatyzacjami i integracjami to 3 do 6 miesięcy.
                          Sens nadaje mu dopiero{" "}
                          <Link
                            href="/automatyzacja-salesforce"
                            className="text-accent hover:underline"
                          >
                            automatyzacja Salesforce
                          </Link>{" "}
                          osadzona w realnym procesie.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kiedy warto, kiedy nie",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-16">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Kiedy Salesforce ma sens
                        </h2>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <Check />
                            złożony model danych (wiele marek, regionów, kanałów, partnerów),
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            jeden system pod sprzedaż, serwis i marketing,
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            sprzedaż enterprise z długim cyklem i prognozą dla zarządu,
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            branża regulowana, wymagająca uprawnień i audytu.
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Kiedy nie ma sensu
                        </h2>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <Check />
                            zespół sprzedaży to 1 do 10 osób,
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            proces jest klasyczny: lead, kwalifikacja, oferta, umowa,
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            nie ma osoby ani budżetu na utrzymanie platformy,
                          </li>
                          <li className="flex items-start gap-2">
                            <Check />
                            jedyny argument to „bo wszyscy go mają”.
                          </li>
                        </ul>
                        <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                          Wtedy lepiej sprawdzi się Pipedrive lub HubSpot. Zobacz
                          porównania{" "}
                          <Link
                            href="/strefa-wiedzy/pipedrive-vs-salesforce"
                            className="text-accent hover:underline"
                          >
                            Pipedrive vs Salesforce
                          </Link>{" "}
                          oraz{" "}
                          <Link
                            href="/strefa-wiedzy/hubspot-vs-pipedrive"
                            className="text-accent hover:underline"
                          >
                            HubSpot vs Pipedrive
                          </Link>
                          . Niezależnie od narzędzia zacznij od{" "}
                          <Link
                            href="/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm"
                            className="text-accent hover:underline"
                          >
                            uporządkowania procesu sprzedaży
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        FAQ
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Czy Salesforce Starter Suite to dobry wybór dla małej firmy?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Bywa sensowny, ale w tej klasie zwykle wygrywa Pipedrive albo HubSpot. Starter ma sens, gdy planujesz przejście na wyższy plan Salesforce w ciągu roku lub dwóch.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Czy możemy wdrożyć Salesforce sami, bez partnera?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Starter tak. Pro i Enterprise niemal nigdy, bo bez admina szybko rośnie dług techniczny.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Czy Salesforce zwraca się szybciej niż Pipedrive?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            W małej firmie bardzo rzadko. W prostym B2B Pipedrive zwraca się szybciej i taniej.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Czy da się przejść z Salesforce do Pipedrive lub HubSpot?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Tak. Kontakty, deale i podstawową historię przenosimy przez API. Trudniej odtworzyć custom obiekty, Flow i raporty.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kontakt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <PrevNextArticle currentHref="/strefa-wiedzy/salesforce-dla-malej-firmy" />

                      <div className="mt-16 rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          Zastanawiasz się, czy Salesforce to dla Ciebie nie za
                          dużo?
                        </p>
                        <Link
                          href="/automatyzacja-salesforce"
                          className="btn-primary mt-6 inline-block"
                        >
                          Zobacz usługę Automatyzacja Salesforce
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Salesforce dla małej firmy, czy warto",
            description:
              "Czy Salesforce ma sens w małej firmie. Realne koszty, czas wdrożenia, alternatywy jak Pipedrive i HubSpot oraz scenariusze, w których się zwraca.",
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
            mainEntity: [
              {
                "@type": "Question",
                name: "Czy Salesforce Starter Suite to dobry wybór dla małej firmy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bywa sensowny, ale w tej klasie zwykle wygrywa Pipedrive albo HubSpot. Starter ma sens, gdy planujesz przejście na wyższy plan Salesforce w ciągu roku lub dwóch.",
                },
              },
              {
                "@type": "Question",
                name: "Czy możemy wdrożyć Salesforce sami, bez partnera?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Starter tak. Pro i Enterprise niemal nigdy, bo bez admina szybko rośnie dług techniczny.",
                },
              },
              {
                "@type": "Question",
                name: "Czy Salesforce zwraca się szybciej niż Pipedrive?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "W małej firmie bardzo rzadko. W prostym B2B Pipedrive zwraca się szybciej i taniej.",
                },
              },
              {
                "@type": "Question",
                name: "Czy da się przejść z Salesforce do Pipedrive lub HubSpot?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tak. Kontakty, deale i podstawową historię przenosimy przez API. Trudniej odtworzyć custom obiekty, Flow i raporty.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
