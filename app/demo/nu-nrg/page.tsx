import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import KalkulatorIframe from "@/components/KalkulatorIframe";

export const metadata: Metadata = {
  title: "Kalkulator PV z magazynem: demo NU-NRG | Fluxlab",
  description:
    "Wersja demonstracyjna kalkulatora fotowoltaiki z magazynem energii i wysyłką zapytania do CRM.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demo/nu-nrg" },
};

const KROKI = [
  "Klient wpisuje zużycie prądu, wybiera inwerter i magazyn, a kalkulator od razu pokazuje trzy warianty: samą instalację PV, PV z magazynem Meri Energy i PV z magazynem ION Breeze, każdy z kosztem, oszczędnością roczną, autokonsumpcją, okresem zwrotu i wykresem rachunku.",
  "Pełne wyliczenie odsłania się po zostawieniu kontaktu. Klient zaznacza, czego dotyczy zapytanie: projekt PV, audyt i pomiary, magazyn energii albo smart home.",
  "Zapytanie trafia do CRM jako nowa szansa z wybranym sprzętem, usługami i wynikiem kalkulatora, więc handlowiec dzwoni z gotowymi danymi. W tej wersji demonstracyjnej trafia do testowego CRM FluxLab, nie do NU-NRG.",
];

const ZALOZENIA = [
  "Produkcja 1039,7 kWh rocznie z 1 kWp: PVGIS v5.2 (JRC), Gorzów Wielkopolski, nachylenie 35°, południe, straty 14%",
  "Cena prądu 0,98 zł/kWh brutto z dystrybucją (taryfa G11 Enea według serwisów porównawczych), energia czynna 0,6187 zł/kWh brutto",
  "Energia oddana do sieci 0,346 zł/kWh: RCEm za wrzesień 2026 (PSE); depozyt pokrywa tylko energię czynną",
  "Przykładowe założenia do ustawienia przez firmę: 4200 zł brutto za 1 kWp z inwerterem i montażem, 2500 zł brutto za 1 kWh magazynu, autokonsumpcja 30%, 250 cykli magazynu w roku, sprawność 90%, dotacja 0 zł",
];

export default function DemoNuNrgPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-24 pb-6">
          <div className="container-wide max-w-3xl mx-auto">
            <p className="section-label mb-3">Wersja demonstracyjna</p>
            <h1 className="h1-strony">
              Kalkulator fotowoltaiki z magazynem energii dla NU-NRG
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Tak mógłby wyglądać kalkulator na stronie nu-nrg.pl, ze sprzętem z
              oferty firmy. Na stronie firmy osadza się go jednym iframe.
            </p>
          </div>
        </section>

        <section className="pb-8">
          <div className="container-wide max-w-3xl mx-auto">
            <KalkulatorIframe
              src="/demo/nu-nrg/widget.html"
              title="Kalkulator fotowoltaiki z magazynem energii NU-NRG"
            />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              <strong className="font-semibold">
                Ceny sprzętu to przykładowe założenia do ustawienia przez firmę,
                nie oferta.
              </strong>
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Jak to działa</h2>
            <ol className="mt-3 space-y-2 text-gray-600 dark:text-gray-400 list-decimal pl-5">
              {KROKI.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Założenia przykładu</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Wszystkie założenia można zmienić w kalkulatorze, w sekcji
              „Założenia obliczeń”. Źródła są w przypisach pod wynikiem.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
              {ZALOZENIA.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-100 dark:border-gray-800 py-6">
        <div className="container-wide max-w-3xl mx-auto flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          <span>Wersja demonstracyjna FluxLab</span>
          <Link href="/" className="underline">
            fluxlab.pl
          </Link>
          <Link href="/polityka-prywatnosci" className="underline">
            Polityka prywatności
          </Link>
        </div>
      </footer>
    </>
  );
}
