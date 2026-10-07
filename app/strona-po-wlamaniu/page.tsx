import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Zhakowana strona WordPress, czyszczenie i raport | Fluxlab",
  description:
    "Strona przekierowuje na obce serwisy albo Google ją oznaczył. Porównujemy pliki z oryginałami, usuwamy backdoory i mówimy, którędy weszli. Od 49 zł.",
  alternates: { canonical: "/strona-po-wlamaniu" },
  openGraph: {
    title: "Zhakowana strona WordPress, czyszczenie i raport | Fluxlab",
    description:
      "Porównujemy pliki z oryginałami z repozytorium WordPressa, usuwamy backdoory i mówimy, którędy weszli. Diagnoza 49 zł, czyszczenie od 299 zł.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, ratunek po włamaniu na stronę",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="strona-po-wlamaniu"
      breadcrumb="Strona po włamaniu"
      eyebrow="Ratunek po włamaniu"
      h1="Zhakowana strona, posprzątana do końca"
      lead="Przywrócony backup zwykle przywraca też backdoora. Porównujemy każdy plik strony z oryginałem z repozytorium WordPressa, więc obce pliki znamy w minuty."
      ctaLabel="Zgłoś włamanie"
      ctaNote="Odpisujemy najszybciej, jak się da"
      checks={[
        {
          title: "Porównanie z oryginałem",
          desc: "Sumy kontrolne rdzenia, wtyczek i motywu w Twoich wersjach. Lista plików obcych i podmienionych.",
        },
        {
          title: "Skan bazy",
          desc: "Wstrzyknięte skrypty, przekierowania i podstawione konta administratora.",
        },
        {
          title: "Raport i zabezpieczenie",
          desc: "Którędy weszli, wymiana haseł, aktualizacje i zgłoszenie do ponownego sprawdzenia w Google.",
        },
      ]}
      pricing={[
        {
          name: "Diagnoza",
          price: "49 zł",
          desc: "Chcesz wiedzieć, jak głęboko sięga problem.",
          features: [
            "lista zainfekowanych i obcych plików",
            "przekierowania i podstawieni administratorzy",
            "wycena czyszczenia bez zobowiązania",
          ],
        },
        {
          name: "Czyszczenie",
          price: "od 299 zł",
          desc: "Strona ma wrócić do normalnego działania.",
          features: [
            "wszystko z diagnozy",
            "usunięcie infekcji i backdoorów",
            "raport wejścia i zabezpieczenie",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Nie wystarczy przywrócić kopię zapasową?",
          a: "Zwykle nie. Kopia najczęściej zawiera już backdoora.",
        },
        {
          q: "Hosting zawiesił mi konto, co teraz?",
          a: "Pracujemy na kopii od hostingu i przygotowujemy wykaz usuniętych zagrożeń, żeby konto odwiesili.",
        },
        {
          q: "Czy dajecie gwarancję, że to się nie powtórzy?",
          a: "Nikt uczciwy jej nie da. Jeśli infekcja wróci tą samą drogą w ciągu 14 dni, poprawiamy bez dopłaty.",
        },
      ]}
      formId="order_strona_po_wlamaniu"
      formHeading="Zgłoś zhakowaną stronę"
      formIntro="Podaj adres strony, hosting i napisz, co się dzieje."
      submitLabel="Zgłoś włamanie"
      microCopy="Dostępy przysyłasz po ustaleniu zakresu."
      serviceName="Czyszczenie strony po włamaniu"
      serviceDesc="Usuwanie infekcji z WordPressa i WooCommerce: porównanie plików z oryginałami, skan bazy, raport wejścia i zabezpieczenie. Diagnoza 49 zł, czyszczenie od 299 zł."
      serviceType="Usuwanie skutków włamania na stronę"
    />
  );
}
