import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Jak uporządkować proces sprzedaży w CRM | Fluxlab",
  description:
    "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
  openGraph: {
    title: "Jak uporządkować proces sprzedaży w CRM | Fluxlab",
    description:
      "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
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
    canonical: "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm",
  },
};

const faq = [
  {
    question: "Ile etapów powinien mieć proces sprzedaży w CRM?",
    answer:
      "Lepiej mniej etapów, ale każdy z jasnym warunkiem wejścia, obowiązkowymi danymi, kolejnym ruchem i osobą odpowiedzialną. Jeśli nie wiadomo, po czym poznać przejście z etapu A do B, proces jest uznaniowy i raporty z niego nic nie mówią.",
  },
  {
    question: "Co zrobić najpierw: uporządkować dane w CRM czy automatyzować?",
    answer:
      "Najpierw pola obowiązkowe i proste reguły, bo dopiero wtedy raportowanie ma sens. Automatyzacja wchodzi później: tworzy zadania, przypomina o follow-upie i pilnuje braków w danych.",
  },
  {
    question: "Jak uporządkowany proces w CRM pomaga w follow-upie?",
    answer:
      "Zmiana etapu, np. „wysłana oferta”, uruchamia sekwencję. Po 2, 5 i 10 dniach handlowiec dostaje zadanie z szablonem i kontekstem rozmowy. Mail lub telefon klienta pauzuje automat, a po 20 dniach bez reakcji transakcja trafia do dalszej opieki marketingowej albo zamyka się jako „brak kontaktu”.",
  },
  {
    question: "Jak sprawdzić, czy proces sprzedaży w CRM działa?",
    answer:
      "Po raportach: liczba follow-upów i odpowiedzi, miejsca, gdzie sekwencja się zacina, oraz transakcje z brakującymi danymi. Jeśli te liczby nie są dostępne jednym kliknięciem, proces albo dane wymagają poprawy.",
  },
];

export default function JakUporzadkowacProcesSprzedazyArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs href="/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Jak uporządkować proces sprzedaży w CRM" },
          ]}
        />
        {/* Kompaktowy nagłówek */}
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Jak uporządkować proces sprzedaży w CRM
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Problemy z CRM rzadko wynikają z narzędzia. Częściej z procesu,
              którego nikt nie opisał.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">
                Etapy z kryteriami przejścia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Lepiej mniej etapów, ale z jasnym warunkiem wejścia, obowiązkowymi
                danymi, kolejnym ruchem i osobą odpowiedzialną. Jeśli nie wiesz, po
                czym poznać przejście z etapu A do B, proces jest uznaniowy.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">
                Jakość danych, potem automatyzacja
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Pola obowiązkowe i proste reguły sprawiają, że{" "}
                <Link href="/automatyzacja-raportowania" className="text-accent hover:underline">
                  raportowanie
                </Link>{" "}
                ma sens. Dopiero wtedy{" "}
                <Link href="/automatyzacja-leadow-crm" className="text-accent hover:underline">
                  automatyzacja CRM
                </Link>{" "}
                tworzy zadania, przypomina o follow-upie i pilnuje braków.
              </p>
            </section>
            <section>
              <h2 className="mb-6 h2-sekcji">Najczęstsze pytania</h2>
              <div className="space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.question}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                  >
                    <summary className="cursor-pointer px-6 py-5 font-semibold text-gray-900 dark:text-white list-none">
                      {item.question}
                    </summary>
                    <p className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                Gdy etapy są opisane, kolejnym krokiem jest zwykle{" "}
                <Link href="/automatyzacja-follow-up" className="text-accent hover:underline">
                  automatyzacja follow-upu
                </Link>
                , czyli sekwencja zadań po wysłaniu oferty.
              </p>
            </section>
          </div>

          {/* Prev / Next */}
          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm" />
          </div>
        </div>
        <CTA naglowek="Chcesz uporządkować proces przed automatyzacją?" />
      </main>
      <Footer />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((q) => ({
              "@type": "Question",
              name: q.question,
              acceptedAnswer: { "@type": "Answer", text: q.answer },
            })),
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Jak uporządkować proces sprzedaży w CRM",
            description:
              "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
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
    </>
  );
}
