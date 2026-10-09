import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import KalkulatorLeadow from "@/components/KalkulatorLeadow";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Kalkulator kosztu ręcznej obsługi leadów | Fluxlab",
  description:
    "Policz, ile miesięcznie kosztuje ręczne przepisywanie leadów, zgubione zapytania i ręczne raporty. Wynik w zł, bez logowania, z pełnym rachunkiem.",
  openGraph: {
    title: "Koszt ręcznej obsługi leadów, kalkulator | Fluxlab",
    description:
      "Rachunek kosztu ręcznej obsługi leadów w B2B: czas, zgubione zapytania, błędy, raporty. Kalkulator do policzenia własnego.",
    locale: "pl_PL",
    type: "website",
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
    canonical: "/koszt-recznej-obslugi-leadow",
  },
};

const costComponents = [
  {
    title: "Czas pracy",
    example: "300 leadów × 5 minut × 60 zł/h = 1 500 zł miesięcznie samego przepisywania.",
  },
  {
    title: "Zgubione leady",
    example: "Lead odebrany po 24 h kupuje rzadziej niż po 5 minutach. 30 opóźnionych leadów × 5 p.p. konwersji × 5 000 zł = 7 500 zł miesięcznie.",
  },
  {
    title: "Błędy w danych",
    example: "Zły telefon, duplikat, lead u złej osoby. 15 błędów × 15 minut naprawy = 225 zł plus leady bez kontaktu.",
  },
  {
    title: "Ręczne raporty",
    example: "4 h tygodniowo × 80 zł/h = 1 280 zł miesięcznie za raport gotowy z opóźnieniem.",
  },
  {
    title: "Decyzje na złych danych",
    example: "Bez pomiaru 30% budżetu reklamowego 10 000 zł idzie w najsłabsze źródło, czyli 3 000 zł miesięcznie.",
  },
];

const examples = [
  {
    size: "Mała firma B2B",
    leads: "30 leadów / mies",
    total: "~950 zł / mies · ~11 400 zł / rok",
  },
  {
    size: "Średnia firma B2B",
    leads: "300 leadów / mies",
    total: "~12 880 zł / mies · ~154 560 zł / rok",
  },
  {
    size: "Duża firma B2B",
    leads: "1 000+ leadów / mies",
    total: "~55 600 zł / mies · ~667 200 zł / rok",
  },
];

const firstStage = [
  {
    title: "Lead z formularza prosto do CRM",
    desc: "Osoba, firma i deal ze źródłem i kampanią. Koniec z przepisywaniem.",
  },
  {
    title: "Routing do handlowca i zadanie „kontakt w 5 minut”",
    desc: "Lead od razu trafia do właściwej osoby z terminem i powiadomieniem.",
  },
  {
    title: "Prosty raport: źródło, czas reakcji, status",
    desc: "Trzy liczby do pierwszych decyzji, bez ręcznego składania w piątek.",
  },
];

const faq = [
  {
    question: "Ile naprawdę kosztuje ręczna obsługa jednego leada?",
    answer:
      "W większości firm B2B 30 do 80 zł, jeśli policzyć czas, opóźnienia, błędy i raporty. Sam czas przepisywania to zwykle 10 do 20% tej kwoty.",
  },
  {
    question: "Czy automatyzacja zwraca się w kilka miesięcy?",
    answer:
      "To zależy od liczby leadów, wartości klienta i ceny wdrożenia. Czas zwrotu to cena wdrożenia podzielona przez wynik z kalkulatora.",
  },
  {
    question: "Skąd założenie, że 30% opóźnionych leadów jest utraconych?",
    answer:
      "To konserwatywny model. Szybka reakcja podnosi konwersję, a parametr możesz zmienić suwakiem na własny.",
  },
  {
    question: "Czy kalkulator uwzględnia koszt narzędzi i wdrożenia?",
    answer:
      "Nie. Pokazuje koszt obecnego stanu, do którego dopiero przykłada się koszt wdrożenia i abonamentów.",
  },
];

export default function KosztRecznejObslugiLeadow() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/koszt-recznej-obslugi-leadow" kolumna="srodek" items={[{ label: "Koszt ręcznej obsługi leadów" }]} />

        <section className="pt-16 pb-10 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl">
              <span className="section-label">Narzędzie</span>
              <h1 className="h1-strony mt-4 mb-6">
                Ile kosztuje ręczna obsługa leadów w firmie B2B?
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Kalkulator liczy koszt Twojego procesu w zł na miesiąc i rok,
                bez logowania. Czas pracy to tylko część rachunku.
              </p>
              <div className="mt-8 flex">
                <TrackedCTA
                  href="#kalkulator"
                  location="article_koszt_hero"
                  label="kalkulator"
                  eventName="cta_click_calculator"
                  className="btn-primary"
                >
                  Policz koszt naszego procesu
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        <div className="container-wide py-16 space-y-16">
          <section id="kalkulator" className="scroll-mt-20">
            <NazwaNarzedzia href="/koszt-recznej-obslugi-leadow" />
            <KalkulatorLeadow />
            <div className="max-w-3xl mx-auto mt-10 text-gray-600 dark:text-gray-400 leading-relaxed">
              <h2 className="h2-sekcji mb-4">
                Jak kalkulator liczy koszt
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Praca / mies.</strong> ={" "}
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                    leady_mies × (czas_min / 60) × koszt_h
                  </code>
                </li>
                <li>
                  <strong>Zgubione leady / mies.</strong> ={" "}
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                    leady_mies × opoznione% × konwersja% × 0,3 × wartosc_klienta
                  </code>
                </li>
                <li>
                  <strong>Rocznie</strong> ={" "}
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                    (koszt_pracy + koszt_zgubionych) × 12
                  </code>
                </li>
              </ul>
            </div>
          </section>

          <section className="max-w-4xl mx-auto">
            <h2 className="h2-sekcji mb-4">
              Pięć składników kosztu
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Większość firm liczy tylko pierwszy i uznaje, że „da się przeżyć”.
            </p>
            <div className="space-y-4">
              {costComponents.map((c, i) => (
                <div
                  key={c.title}
                  className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex items-start gap-4"
                >
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {c.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto">
            <h2 className="h2-sekcji mb-4 text-center">
              Mała, średnia, duża firma
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-center">
              Założenia: 60 zł/h za obsługę, 80 zł/h za raporty, klient wart
              5 000 zł, 5 minut na leada.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {examples.map((e) => (
                <div
                  key={e.size}
                  className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {e.size}
                  </h3>
                  <p className="text-sm text-accent font-medium mb-4">
                    {e.leads}
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {e.total}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-4">
              Co zautomatyzować najpierw
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Nie cały proces, tylko fragment, który usuwa największą pozycję z
              rachunku. U większości firm B2B to trzy rzeczy:
            </p>
            <div className="space-y-4">
              {firstStage.map((s, i) => (
                <div
                  key={s.title}
                  className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex items-start gap-4"
                >
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedCTA
                href="/kontakt"
                location="article_koszt_cta_block"
                label="Bezpłatna diagnoza"
                eventName="cta_click_article_audit"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Bezpłatna diagnoza
              </TrackedCTA>
              <TrackedCTA
                href="/automatyzacja-leadow-crm"
                location="article_koszt_cta_block"
                label="oferta"
                eventName="cta_click_article_audit"
                className="btn-secondary px-8 py-3.5 text-base"
              >
                Automatyzacja leadów i CRM
              </TrackedCTA>
            </div>
          </section>

          <section className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-6">
              Najczęstsze pytania
            </h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                >
                  <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.question}
                    </span>
                    <svg
                      className="flex-shrink-0 transition-transform group-open:rotate-180"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 7l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-10 text-gray-600 dark:text-gray-400 text-sm">
              Powiązane:{" "}
              <Link
                href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                className="text-accent hover:underline"
              >
                Jak policzyć ROI z automatyzacji
              </Link>
              {" · "}
              <Link
                href="/strefa-wiedzy/automatyzacja-vs-zatrudnienie"
                className="text-accent hover:underline"
              >
                Automatyzacja vs zatrudnienie
              </Link>
              {" · "}
              <Link
                href="/automatyzacja-formularza-do-pipedrive"
                className="text-accent hover:underline"
              >
                Automatyzacja Pipedrive
              </Link>
            </div>
          </section>
        </div>
        <CTA />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Kalkulator kosztu ręcznej obsługi leadów",
            url: "https://fluxlab.pl/koszt-recznej-obslugi-leadow",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Kalkulator miesięcznego i rocznego kosztu ręcznej obsługi leadów: czas pracy + zgubione zapytania.",
          }),
        }}
      />
    </>
  );
}
