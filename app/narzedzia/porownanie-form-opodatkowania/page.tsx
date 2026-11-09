import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";
import PorownanieForm from "@/components/PorownanieForm";

const HREF = "/narzedzia/porownanie-form-opodatkowania";

export const metadata: Metadata = {
  title: "Skala, liniowy czy ryczałt? Porównanie 2026 i 2027 | Fluxlab",
  description:
    "Porównaj skalę, liniowy i ryczałt obok siebie, rok 2026 i 2027: ZUS, zdrowotna, podatek i kwota na rękę. Każda stawka z linkiem do aktu.",
  alternates: { canonical: HREF },
  openGraph: {
    title: "Skala, liniowy czy ryczałt? Porównanie 2026 i 2027 | Fluxlab",
    description:
      "Porównaj skalę, liniowy i ryczałt obok siebie, rok 2026 i 2027: ZUS, zdrowotna, podatek i kwota na rękę. Każda stawka z linkiem do aktu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, porównanie form opodatkowania" }],
  },
};

const faq = [
  {
    q: "Kiedy opłaca się podatek liniowy?",
    a: "Zwykle przy dochodzie wyraźnie powyżej progu skali. Poniżej progu skala z kwotą wolną daje niższy podatek, a liniowy traci kwotę wolną i wspólne rozliczenie z małżonkiem. Dokładną granicę pokazuje porównanie dla Twoich liczb.",
  },
  {
    q: "Kiedy opłaca się ryczałt?",
    a: "Gdy koszty są niskie, a stawka ryczałtu dla Twojej działalności niska. Ryczałt liczy się od przychodu, więc każda złotówka kosztów, która nie obniża podatku, działa na jego niekorzyść.",
  },
  {
    q: "Do kiedy można zmienić formę opodatkowania?",
    a: "Do 20 lutego roku, którego zmiana ma dotyczyć, albo do 20 dnia miesiąca po miesiącu pierwszego przychodu, a jeśli był w grudniu, do końca roku. Zmianę zgłaszasz wnioskiem w CEIDG.",
  },
  {
    q: "Dlaczego w 2027 roku wynik jest inny przy tych samych liczbach?",
    a: "Rosną minimalne i przeciętne wynagrodzenie, od których liczy się ZUS i zdrowotna na ryczałcie. Jeśli wybierzesz uchwaloną zmianę z druku nr 3293, zmienia się też skala podatkowa.",
  },
];

export default function PorownanieFormPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href={HREF} items={[{ label: "Porównanie form opodatkowania" }]} />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-3">Narzędzie</p>
            <h1 className="h1-strony">Skala, liniowy czy ryczałt</h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Trzy formy opodatkowania obok siebie, rok 2026 i 2027: ile zapłacisz ZUS i podatku i ile zostanie Ci na rękę.
            </p>
          </div>

          <div className="mt-10">
            <NazwaNarzedzia href="/narzedzia/porownanie-form-opodatkowania" />
            <PorownanieForm />
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="h2-sekcji">Jak liczymy</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Każdą formę liczymy tym samym silnikiem co kalkulatory PIT i ZUS, dla tych samych przychodów i kosztów w obu latach. Na rękę to przychód minus koszty, składki społeczne, składka zdrowotna i podatek. Ulg prorodzinnych, wspólnego rozliczenia i straty z lat ubiegłych nie uwzględniamy, bo dotyczą tylko skali; dla nich użyj kalkulatora PIT.
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
            name: "Porównanie form opodatkowania 2026 i 2027",
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
