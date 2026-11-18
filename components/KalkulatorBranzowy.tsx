import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import KalkulatorIframe from "@/components/KalkulatorIframe";
import ZamowienieProba from "@/components/ZamowienieProba";
import { OFERTA } from "@/lib/sprzedaz";
import { zl } from "@/lib/wycena";

const PRODUKT = "lead-kalkulator";
const WAZNOSC_DNI = 7;

/** Strona przykładowego kalkulatora wyceny dla branży, na wzorze
 *  /kalkulator-oze-demo: kalkulator w ramce, cena z cennika, zamówienie. */
export default function KalkulatorBranzowy({
  sciezka,
  okruszek,
  etykieta,
  tytul,
  wstep,
  src,
  tytulRamki,
  zalozenia,
  lead,
  pole,
}: {
  sciezka: string;
  okruszek: string;
  etykieta: string;
  tytul: string;
  wstep: string;
  src: string;
  tytulRamki: string;
  zalozenia: string[];
  lead: string;
  pole: string;
}) {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href={sciezka} items={[{ label: okruszek }]} />

        <section className="pt-8 pb-6 sm:pt-16">
          <div className="container-wide max-w-3xl mx-auto">
            <p className="section-label mb-3">{etykieta}</p>
            <h1 className="h1-strony">{tytul}</h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              {wstep}
            </p>
          </div>
        </section>

        <section className="pb-8">
          <div className="container-wide max-w-3xl mx-auto">
            <KalkulatorIframe src={src} title={tytulRamki} />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              <strong className="font-semibold">
                Przykładowe ceny, nie oferta.
              </strong>{" "}
              Formularz w tej wersji niczego nie wysyła.
            </p>
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Taki kalkulator na Twojej stronie
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {zl(OFERTA[PRODUKT].netto)}/mies.
                  </span>{" "}
                  netto, pierwsze 10 dni gratis, bez karty. Oferta ważna{" "}
                  {WAZNOSC_DNI} dni.
                </p>
              </div>
              <a
                href="#zamow"
                className="btn-primary btn-lg shrink-0 text-center"
              >
                Zamów, 10 dni gratis
              </a>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Założenia przykładu</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Ceny są przykładowe, a nie danymi rynkowymi. W kalkulatorze dla
              firmy wpisujemy jej cennik, warianty i kontakt.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
              {zalozenia.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">
              Jak osadzić na swojej stronie
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Kalkulator to jeden kod wklejany w dowolne miejsce strony, w
              WordPressie, Wix czy własnym kodzie. {lead}
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container-wide max-w-3xl mx-auto">
            <ZamowienieProba
              id={PRODUKT}
              waznoscDni={WAZNOSC_DNI}
              pole="Nazwa firmy i kontakt dla klientów (telefon lub e-mail)"
              pole2={pole}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
