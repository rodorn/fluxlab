import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";
import KalkulatorZus from "@/components/KalkulatorZus";

const HREF = "/narzedzia/kalkulator-zus";

export const metadata: Metadata = {
  title: "Kalkulator ZUS 2026 i 2027: składki i zdrowotna | Fluxlab",
  description:
    "Składki ZUS na 2026 i 2027: duży, preferencyjny, Mały ZUS Plus, ulga na start i zdrowotna dla skali, liniowego, ryczałtu. Stawki z linkiem do aktu.",
  alternates: { canonical: HREF },
  openGraph: {
    title: "Kalkulator ZUS 2026 i 2027: składki i zdrowotna | Fluxlab",
    description:
      "Składki ZUS na 2026 i 2027: duży, preferencyjny, Mały ZUS Plus, ulga na start i zdrowotna dla skali, liniowego, ryczałtu. Stawki z linkiem do aktu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kalkulator ZUS" }],
  },
};

const faq = [
  {
    q: "Ile wynosi duży ZUS w 2026 roku?",
    a: "Bez chorobowej 1 788,29 zł składek społecznych miesięcznie, z chorobową 1 926,76 zł. Do tego dochodzi składka zdrowotna, która zależy od formy opodatkowania i dochodu.",
  },
  {
    q: "Jak liczy się składkę zdrowotną na skali i liniowym?",
    a: "Na skali 9%, na liniowym 4,9% dochodu pomniejszonego o zapłacone składki społeczne. Składka w 2026 roku nie może być niższa niż 9% minimalnego wynagrodzenia, czyli 432,54 zł.",
  },
  {
    q: "Ile płaci się zdrowotnej na ryczałcie?",
    a: "Kwota jest stała w trzech progach przychodu rocznego: do 60 000 zł, do 300 000 zł i powyżej. Podstawą jest 60%, 100% albo 180% przeciętnego wynagrodzenia z IV kwartału poprzedniego roku.",
  },
  {
    q: "Kto może skorzystać z Małego ZUS Plus?",
    a: "Firma, której przychód z poprzedniego roku nie przekroczył 120 000 zł i która prowadziła działalność co najmniej 60 dni. Podstawa to połowa średniego miesięcznego dochodu, nie mniej niż 30% minimalnego wynagrodzenia. Z ulgi można korzystać 36 miesięcy w ciągu 60.",
  },
  {
    q: "Czy w uldze na start płaci się coś do ZUS?",
    a: "Tak, składkę zdrowotną. Społecznych nie płacisz przez pierwsze 6 pełnych miesięcy działalności.",
  },
];

export default function KalkulatorZusPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href={HREF} items={[{ label: "Kalkulator ZUS" }]} />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-3">Narzędzie</p>
            <h1 className="h1-strony">Kalkulator ZUS 2026 i 2027</h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Ile zapłacisz ZUS w tym i przyszłym roku: składki społeczne, zdrowotna według formy opodatkowania, miesięcznie i rocznie.
            </p>
          </div>

          <div className="mt-10">
            <NazwaNarzedzia href="/narzedzia/kalkulator-zus" />
            <KalkulatorZus />
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="h2-sekcji">Jak liczymy</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Podstawa dużego ZUS to 60% prognozowanego przeciętnego wynagrodzenia, preferencyjnego 30% minimalnego. Fundusz Pracy doliczamy tylko, gdy podstawa jest co najmniej równa minimalnemu wynagrodzeniu, więc nie płaci się go w ZUS preferencyjnym i zwykle w Małym ZUS Plus. Stawki na 2027 rok bierzemy z opublikowanych rozporządzeń i obwieszczeń; tam, gdzie GUS jeszcze nie podał danych, wynik jest oznaczony jako szacunek.
            </p>
          </div>

          <div className="mt-14 max-w-3xl mx-auto">
            <h2 className="h2-sekcji">Częste pytania</h2>
            <dl className="mt-6 space-y-5">
              {faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-gray-900 dark:text-white">{f.q}</dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-300">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <CTA naglowek="Sprawdź, które rozliczenia w Twojej firmie mogą liczyć się same" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Kalkulator ZUS 2026 i 2027",
            url: `https://fluxlab.pl${HREF}`,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Dowolna przeglądarka",
            offers: { "@type": "Offer", price: "0", priceCurrency: "PLN" },
            provider: { "@type": "Organization", name: "Fluxlab" },
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
      <Footer />
    </>
  );
}
