import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Pipedrive vs Salesforce, CRM dla MŚP w 2026 | Fluxlab",
  description:
    "Pipedrive vs Salesforce w 2026: ceny, funkcje, czas wdrożenia i dopasowanie do małej i średniej firmy B2B.",
  openGraph: {
    title: "Pipedrive vs Salesforce, CRM dla MŚP w 2026 | Fluxlab",
    description:
      "Pipedrive vs Salesforce w 2026: ceny, funkcje, czas wdrożenia i dopasowanie do małej i średniej firmy B2B. Porównanie bez marketingowego lukru.",
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
    canonical: "/strefa-wiedzy/pipedrive-vs-salesforce",
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

const faq = [
  {
    q: "Czy Salesforce jest po prostu lepszy niż Pipedrive?",
    a: "Nie. Daje więcej możliwości, ale w małej firmie to zwykle więcej kosztów i utrzymania bez realnej korzyści.",
  },
  {
    q: "Ile realnie kosztuje Salesforce dla 10 osób?",
    a: "Same licencje Sales Cloud Enterprise to ok. 1650 USD miesięcznie. Z wdrożeniem i utrzymaniem roczny koszt często przekracza 30 do 50 tys. USD.",
  },
  {
    q: "Czy Pipedrive nadaje się do większego zespołu?",
    a: "Tak, do kilkudziesięciu handlowców. Granicą jest złożoność procesu, a nie liczba użytkowników.",
  },
  {
    q: "Czy da się zacząć od Pipedrive i przejść na Salesforce?",
    a: "Tak, i często to ma sens. Najpierw uporządkuj proces i dane, a migruj, gdy naprawdę brakuje Ci możliwości platformy.",
  },
];

const h2 =
  "mt-12 mb-4 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white";
const p = "mb-4 text-gray-600 dark:text-gray-400 leading-relaxed";

export default function PipedriveVsSalesforceArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Pipedrive vs Salesforce, porównanie CRM dla MŚP 2026" },
          ]}
        />

        <section className="pt-24 pb-6">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Pipedrive vs Salesforce, porównanie CRM dla MŚP 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Pipedrive to narzędzie do sprzedaży B2B. Salesforce to platforma,
              na której da się zbudować prawie wszystko. Dla małej i średniej
              firmy ta różnica zwykle przesądza o wyborze.
            </p>
          </div>
        </section>

        <article className="container-wide max-w-3xl mx-auto px-6 lg:px-8 pb-20">
          <h2 className={h2}>Co właściwie kupujesz</h2>
          <p className={p}>
            Pipedrive jest zbudowany wokół lejka: handlowiec widzi, co ma
            zrobić dziś, a manager widzi cały pipeline. Konfiguracja zajmuje
            godziny.
          </p>
          <p className={p}>
            Salesforce to ekosystem modułów (Sales, Service, Marketing Cloud).
            Wszystko da się skonfigurować, ale nic nie działa od razu, a
            wdrożenie trwa tygodnie albo miesiące.
          </p>

          <h2 className={h2}>Cennik 2026, orientacyjnie</h2>
          <p className={p}>
            Ceny za użytkownika miesięcznie, przy płatności rocznej.
          </p>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <Check />
              Pipedrive: Essential ok. 14 USD, Advanced ok. 29 USD, Professional
              ok. 49 USD.
            </li>
            <li className="flex items-start gap-2">
              <Check />
              Salesforce: Starter od 25 USD, Pro Suite od ok. 80 USD,
              Enterprise od ok. 165 USD.
            </li>
          </ul>
          <p className={`mt-4 ${p}`}>
            W Salesforce dochodzą koszty wdrożenia, dodatkowych modułów i
            pakietów z AppExchange. Dla 10 osób to kilkukrotnie więcej niż
            Pipedrive Professional.
          </p>

          <h2 className={h2}>Funkcje i wdrożenie</h2>
          <p className={p}>
            Pipedrive dobrze obsługuje klasyczną sprzedaż B2B: leady, deale,
            etapy, zadania, e-mail i raporty. Sensowna konfiguracja zajmuje 1
            do 2 tygodni.
          </p>
          <p className={p}>
            Salesforce pozwala zbudować dowolny proces i model danych, od
            sprzedaży po serwis. Wdrożenie Enterprise to 3 do 6 miesięcy i
            ktoś musi to potem utrzymać.
          </p>
          <p className={p}>
            Sam zakup licencji niczego nie zmienia. Efekt daje dopiero{" "}
            <Link
              href="/automatyzacja-leadow-crm"
              className="text-accent hover:underline"
            >
              automatyzacja CRM
            </Link>{" "}
            osadzona w procesie firmy, np.{" "}
            <Link
              href="/automatyzacja-formularza-do-pipedrive"
              className="text-accent hover:underline"
            >
              deale tworzone z formularza w Pipedrive
            </Link>
            .
          </p>

          <h2 className={h2}>Dla kogo który</h2>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <Check />
              Pipedrive: zespół do 30 osób, klasyczny proces, bez
              administratora CRM, szybki start i niski koszt.
            </li>
            <li className="flex items-start gap-2">
              <Check />
              Salesforce: złożony model danych (regiony, marki, kanały), jeden
              system na sprzedaż, serwis i marketing, zespół lub partner do
              utrzymania platformy.
            </li>
          </ul>

          <h2 className={h2}>Częste pytania</h2>
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

          <div className="mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/pipedrive-vs-salesforce" />
          </div>

          <div className="mt-16 rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Wahasz się między Pipedrive a Salesforce?
            </p>
            <Link
              href="/automatyzacja-leadow-crm"
              className="btn-primary mt-6 inline-block"
            >
              Zobacz usługę Automatyzacja CRM
            </Link>
          </div>
        </article>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Pipedrive vs Salesforce, porównanie CRM dla MŚP 2026",
            description:
              "Pipedrive vs Salesforce w 2026: ceny, funkcje, czas wdrożenia i dopasowanie do małej i średniej firmy B2B.",
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
