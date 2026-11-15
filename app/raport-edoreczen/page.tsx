import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import RaportEDoreczen from "@/components/RaportEDoreczen";

export const metadata: Metadata = {
  title: "Raport obowiązku e-Doręczeń dla firmy za darmo | Fluxlab",
  description:
    "Wpisz NIP albo KRS i sprawdź, czy firma musi mieć adres do e-Doręczeń, od kiedy i czy spółka już go ma. Dane z KRS i wykazu VAT, bez rejestracji.",
  alternates: { canonical: "/raport-edoreczen" },
  openGraph: {
    title: "Raport obowiązku e-Doręczeń dla firmy za darmo | Fluxlab",
    description:
    "Wpisz NIP albo KRS i sprawdź, czy firma musi mieć adres do e-Doręczeń, od kiedy i czy spółka już go ma. Dane z KRS i wykazu VAT, bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, raport obowiązku e-Doręczeń",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="raport-edoreczen"
      tool={<RaportEDoreczen />}
      breadcrumb="Raport e-Doręczeń"
      eyebrow="e-Doręczenia"
      h1="Czy Twoja firma musi mieć adres do e-Doręczeń, i czy już go ma"
      lead="Wpisujesz NIP albo numer KRS. Dostajesz jednostronicowy raport: jaki to rodzaj firmy, od kiedy obowiązuje ją adres do doręczeń elektronicznych, czy termin już minął i, dla spółek, czy adres jest wpisany w odpisie KRS. Raport zapiszesz jako PDF."
      ctaLabel="Sprawdź swoją firmę"
      ctaNote="Za darmo, bez rejestracji i bez maila"
      checks={[
        {
          title: "Termin dla Twojego rodzaju firmy",
          desc: "Spółki z KRS mają obowiązek od 1 kwietnia 2025, firmy z CEIDG wpisane przed 2025 rokiem od 1 października 2026, a nowe firmy od dnia wpisu. Raport wybiera właściwy termin za Ciebie.",
        },
        {
          title: "Stan z urzędowego rejestru",
          desc: "Dla spółek czytamy odpis aktualny z KRS i pokazujemy adres do doręczeń, jeśli jest wpisany. To ten sam dokument, na który powołują się urzędy.",
        },
        {
          title: "Uczciwie o tym, czego nie widać",
          desc: "Dla firm z CEIDG nie ma publicznego rejestru, który pokazałby adres po samym NIP. Raport mówi to wprost i wskazuje, gdzie sprawdzić.",
        },
        {
          title: "Konkretne kroki",
          desc: "Zamiast ogólnika dostajesz trzy kroki dopasowane do wyniku: założenie adresu, wskazanie administratora skrzynki i powiadomienia, bo pismo uznaje się za doręczone po 14 dniach.",
        },
      ]}
      powiazane={[
        {
          przed: "Gdy pism przybywa, warto zobaczyć, ",
          kotwica: "jak podpiąć e-Doręczenia pod własny system",
          href: "/e-doreczenia-integracja",
          po: ".",
        },
      ]}
      pricing={[
        {
          name: "Raport e-Doręczeń",
          price: "0 zł",
          desc: "Dla dowolnej firmy, bez limitu.",
          features: [
            "rodzaj firmy i właściwy termin obowiązku",
            "adres do doręczeń z odpisu KRS dla spółek",
            "kroki dopasowane do wyniku",
            "zapis raportu jako PDF",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd są dane w raporcie?",
          a: "Dla spółek z odpisu aktualnego Krajowego Rejestru Sądowego (api-krs.ms.gov.pl), dla firm z CEIDG z wykazu podatników VAT Ministerstwa Finansów. Terminy pochodzą z ustawy o doręczeniach elektronicznych.",
        },
        {
          q: "Dlaczego dla mojej jednoosobowej firmy nie widać adresu?",
          a: "Adresy firm z CEIDG nie są dostępne publicznie po numerze NIP. Sprawdzisz go w swoim wpisie w CEIDG albo w Koncie Przedsiębiorcy na Biznes.gov.pl.",
        },
        {
          q: "Czy za brak adresu grozi kara?",
          a: "Ustawa nie przewiduje kary pieniężnej za samo niezałożenie adresu. Urzędy doręczają wtedy pisma papierowo albo usługą hybrydową, a termin na odpowiedź biegnie od doręczenia.",
        },
        {
          q: "Co z adwokatami, radcami, doradcami podatkowymi i podmiotami publicznymi?",
          a: "Zawody zaufania publicznego mają obowiązek od 1 stycznia 2025, niezależnie od formy działalności, a podmioty publiczne także. Raport pokazuje terminy dla firm i spółek, więc takie osoby powinny to uwzględnić.",
        },
        {
          q: "Czy muszę podawać maila?",
          a: "Nie. Zapytanie leci wprost do rejestrów i wraca na stronę. Nie zapisujemy numerów, które wpisujesz.",
        },
      ]}
      formId="order_raport_edoreczen"
      formHeading="Pisma z e-Doręczeń mają trafiać na maila?"
      formIntro="Napisz, ile pism w miesiącu przychodzi do firmy i kto je odbiera. Zaproponujemy, jak je przekazywać na maila albo do systemu, w którym pracujesz."
      submitLabel="Wyślij zapytanie"
      microCopy="Raport zostaje darmowy niezależnie od tego, czy odpiszesz."
      serviceName="Raport obowiązku e-Doręczeń dla firmy"
      serviceDesc="Darmowy raport po NIP albo KRS: rodzaj firmy, termin obowiązku adresu do e-Doręczeń i stan adresu z odpisu KRS."
      serviceType="Raport obowiązku e-Doręczeń"
    />
  );
}
