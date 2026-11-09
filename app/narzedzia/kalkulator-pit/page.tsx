import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";
import KalkulatorPit from "@/components/KalkulatorPit";

const HREF = "/narzedzia/kalkulator-pit";

export const metadata: Metadata = {
  title: "Kalkulator PIT 2026 i 2027: JDG i etat, na rękę | Fluxlab",
  description:
    "PIT na 2026 i 2027 dla JDG (skala, liniowy, ryczałt) i etatu: zaliczki, zeznanie roczne, wspólne rozliczenie, kwota na rękę. Stawki z linkiem do aktu.",
  alternates: { canonical: HREF },
  openGraph: {
    title: "Kalkulator PIT 2026 i 2027: JDG i etat, na rękę | Fluxlab",
    description:
      "PIT na 2026 i 2027 dla JDG (skala, liniowy, ryczałt) i etatu: zaliczki, zeznanie roczne, wspólne rozliczenie, kwota na rękę. Stawki z linkiem do aktu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kalkulator PIT" }],
  },
};

const faq = [
  {
    q: "Ile wynosi kwota wolna od podatku w 2026 roku?",
    a: "30 000 zł dochodu rocznie na skali. W praktyce działa jako kwota zmniejszająca podatek o 3 600 zł. Na podatku liniowym i ryczałcie kwoty wolnej nie ma.",
  },
  {
    q: "Jak liczy się zaliczki na skali w JDG?",
    a: "Narastająco od początku roku: od dochodu pomniejszonego o składki społeczne liczysz podatek według skali, odejmujesz kwotę zmniejszającą i zaliczki już zapłacone. Dlatego w pierwszych miesiącach zaliczka często wynosi zero.",
  },
  {
    q: "Ile składki zdrowotnej można odliczyć?",
    a: "Na liniowym zapłaconą zdrowotną odejmujesz od dochodu do rocznego limitu, na ryczałcie połowę od przychodu. Na skali zdrowotnej nie odliczasz.",
  },
  {
    q: "Kiedy opłaca się wspólne rozliczenie z małżonkiem?",
    a: "Gdy dochody małżonków mocno się różnią, zwłaszcza gdy jedno przekracza próg skali, a drugie zarabia mało albo wcale. Wspólnie rozliczają się tylko osoby na skali, w tym przedsiębiorcy na skali. W ciągu roku zaliczki płaci każdy osobno, różnica wraca w zeznaniu.",
  },
  {
    q: "Co zmienia uchwalona ustawa z druku nr 3293?",
    a: "Na 2027 rok podnosi próg skali ze 120 000 zł do 130 000 zł i dodaje trzeci próg: 24% od 130 000 zł do 150 000 zł oraz 32% powyżej. Zanim zacznie obowiązywać, musi ją podpisać Prezydent. W kalkulatorze możesz przełączyć, według których przepisów liczyć 2027 rok.",
  },
];

export default function KalkulatorPitPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href={HREF} items={[{ label: "Kalkulator PIT" }]} />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-3">Narzędzie</p>
            <h1 className="h1-strony">Kalkulator PIT 2026 i 2027</h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Ile podatku zapłacisz z działalności albo z etatu: zaliczki miesiąc po miesiącu, rozliczenie roczne i kwota, która zostaje na rękę.
            </p>
          </div>

          <div className="mt-10">
            <NazwaNarzedzia href="/narzedzia/kalkulator-pit" />
            <KalkulatorPit />
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="h2-sekcji">Jak liczymy</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Podatek liczymy tak jak w zeznaniu: od dochodu odejmujemy składki społeczne, na liniowym i ryczałcie także odliczalną część zdrowotnej, podstawę zaokrąglamy do pełnych złotych. Składki ZUS bierzemy z tego samego silnika co w kalkulatorze ZUS. Przy umowie o pracę liczymy zaliczki narastająco, więc po przekroczeniu progu netto w ostatnich miesiącach roku spada. Ulg prorodzinnych, IKZE i darowizn nie uwzględniamy.
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
            name: "Kalkulator PIT 2026 i 2027",
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
