import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KalkulatorIframe from "@/components/KalkulatorIframe";

export const metadata: Metadata = {
  title: "Kalkulator PV z magazynem: demo NU-NRG | Fluxlab",
  description:
    "Wersja demonstracyjna kalkulatora fotowoltaiki z magazynem energii i wysyłką zapytania do CRM.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demo/nu-nrg" },
};

const KROKI = [
  "Klient wpisuje zużycie prądu, wybiera inwerter i magazyn, a kalkulator od razu pokazuje trzy warianty: samą instalację PV, PV z magazynem Meri Energy i PV z magazynem ION Breeze, każdy z oszczędnością roczną i okresem zwrotu.",
  "Pełne wyliczenie odsłania się po zostawieniu kontaktu. Klient zaznacza, czego dotyczy zapytanie: projekt PV, audyt i pomiary, magazyn energii albo smart home.",
  "Zapytanie trafia do CRM jako nowa szansa z wybranym sprzętem, usługami i wynikiem kalkulatora, więc handlowiec dzwoni z gotowymi danymi.",
];

const ZALOZENIA = [
  "Instalacja: 4200 zł brutto za 1 kWp razem z inwerterem i montażem",
  "Magazyn energii: 2500 zł brutto za 1 kWh pojemności",
  "Energia z sieci: 0,62 zł/kWh netto plus 0,38 zł/kWh dystrybucji, akcyza i VAT 23%",
  "Uzysk 1000 kWh rocznie na 1 kWp, autokonsumpcja 30%, magazyn 250 cykli w roku przy sprawności 90%",
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
              Wartości są przykładowe. Firma ustawia własny cennik sprzętu i
              montażu, taryfę oraz parametry magazynów.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
              {ZALOZENIA.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
