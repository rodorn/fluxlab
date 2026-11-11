import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import KalkulatorIframe from "@/components/KalkulatorIframe";

const TYTUL = "Przykładowy kalkulator PV z magazynem energii";
const OPIS =
  "Działający przykład kalkulatora oszczędności PV z opcją magazynu energii. Firma OZE osadza go na swojej stronie jednym iframe, a zapytania trafiają do jej CRM.";

export const metadata: Metadata = {
  title: "Przykładowy kalkulator PV z magazynem dla OZE | Fluxlab",
  description:
    "Działający przykład kalkulatora oszczędności PV z opcją magazynu energii. Firma OZE osadza go na swojej stronie jednym iframe, a zapytania trafiają do jej CRM.",
  openGraph: {
    title: `${TYTUL} | Fluxlab`,
    description: OPIS,
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/kalkulator-oze-demo" },
};

const ZALOZENIA = [
  "Cena instalacji: 4200 zł brutto za 1 kWp",
  "Cena magazynu energii: 2500 zł brutto za 1 kWh pojemności",
  "Cena energii z sieci: 0,62 zł/kWh netto plus 0,38 zł/kWh dystrybucji, akcyza i VAT 23%",
  "Uzysk instalacji: 1000 kWh rocznie na 1 kWp, autokonsumpcja 30%",
  "Magazyn: 250 pełnych cykli w roku, sprawność 90%",
];

export default function KalkulatorOzeDemoPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          href="/kalkulator-oze-demo"
          items={[{ label: "Przykładowy kalkulator PV" }]}
        />

        <section className="pt-16 pb-6">
          <div className="container-wide max-w-3xl mx-auto">
            <p className="section-label mb-3">Przykład dla firm OZE</p>
            <h1 className="h1-strony">{TYTUL}</h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Tak wygląda kalkulator, który firma fotowoltaiczna ma na swojej
              stronie. Klient wpisuje zużycie i moc instalacji, zaznacza, czy
              chce magazyn energii, i widzi koszt oraz czas zwrotu obu wariantów.
              Wypróbuj poniżej.
            </p>
          </div>
        </section>

        <section className="pb-8">
          <div className="container-wide max-w-3xl mx-auto">
            <KalkulatorIframe
              src="/kalkulator-pv-demo/index.html"
              title="Przykładowy kalkulator oszczędności PV z magazynem energii"
            />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Przykład, dane i założenia demonstracyjne. Formularz w tej wersji
              niczego nie wysyła.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Założenia przykładu</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Wszystkie wartości są przykładowe, a nie danymi rynkowymi. Firma
              ustawia własny cennik, taryfę i parametry oferowanych magazynów w
              konfiguracji kalkulatora.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
              {ZALOZENIA.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Jak osadzić na swojej stronie</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Kalkulator to jeden iframe wklejany w dowolne miejsce strony, w
              WordPressie, Wix czy własnym kodzie:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-100 dark:bg-white/5 p-4 text-sm">
              <code>{`<iframe src="https://twoja-domena.pl/kalkulator-pv/"
  title="Kalkulator PV" width="100%" height="1180"
  style="border:0"></iframe>`}</code>
            </pre>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              W wersji dla firmy zapytanie klienta, razem z wyborem magazynu i
              jego pojemnością, trafia do CRM jako lead.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Film: kalkulator zamiast formularza</h2>
            <div className="mt-3 aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/JHoRn2us-TI"
                title="Kalkulator OZE: formularz, wycena czy kalkulator"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Więcej w artykule{" "}
              <Link
                href="/strefa-wiedzy/kalkulator-oze-formularz-wycena-czy-kalkulator"
                className="underline"
              >
                Kalkulator OZE: formularz, wycena, kalkulator
              </Link>
              .
            </p>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
