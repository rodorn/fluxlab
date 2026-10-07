import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import DomenaCheck from "@/components/DomenaCheck";

export const metadata: Metadata = {
  title: "Kto jest właścicielem domeny, sprawdź za darmo | Fluxlab",
  description:
    "W rejestrze wpisany jest jeden podmiot i to on decyduje o adresie, stronie i poczcie. Sprawdź za darmo, czy to Twoja firma i kiedy wygasa rejestracja.",
  alternates: { canonical: "/wlasnosc-domeny" },
  openGraph: {
    title: "Kto jest właścicielem domeny, sprawdź za darmo | Fluxlab",
    description:
      "Abonent domeny decyduje o stronie i poczcie firmowej. Sprawdzenie w publicznym rejestrze, od ręki i bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, własność domeny firmowej",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="wlasnosc-domeny"
      tool={<DomenaCheck />}
      breadcrumb="Własność domeny"
      eyebrow="Kontrola nad adresem firmy"
      h1="Adres Twojej firmy może formalnie należeć do kogoś innego"
      lead="Każda zmiana domeny wymaga zgody podmiotu z rejestru. Jeśli stronę stawiał zewnętrzny wykonawca, często to on jest tam wpisany."
      ctaLabel="Sprawdź swoją domenę"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Kto figuruje jako abonent",
          desc: "Nazwa z publicznego rejestru. Jeśli to nie Twoja firma, zmiany wymagają cudzej zgody.",
        },
        {
          title: "Kiedy wygasa rejestracja",
          desc: "Po tej dacie znika strona i poczta. Przypomnienia idą do abonenta, nie do Ciebie.",
        },
        {
          title: "Przeniesienie na właściwą firmę",
          desc: "Zmiana abonenta i transfer na Twoje konto. Prowadzimy sprawę i pilnujemy terminów.",
        },
        {
          title: "Zabezpieczenie na przyszłość",
          desc: "Automatyczne odnawianie, blokada transferu, przypomnienia na czytany adres.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Od ręki, na tej stronie.",
          features: [
            "nazwa abonenta z rejestru",
            "data wygaśnięcia i ile dni zostało",
            "komentarz, czy to wygląda normalnie",
          ],
        },
        {
          name: "Przeniesienie domeny",
          price: "od 490 zł",
          desc: "Jedna domena, cała procedura.",
          features: [
            "pismo o wydanie kodu przeniesienia",
            "wniosek o zmianę abonenta",
            "transfer do Twojego konta",
            "odnawianie i blokada transferu",
          ],
          featured: true,
        },
        {
          name: "Pilnowanie",
          price: "49 zł/mc",
          desc: "Dla firm z kilkoma domenami.",
          features: [
            "codzienne sprawdzanie abonenta",
            "ostrzeżenie na 60 dni przed końcem",
            "sygnał, gdy ktoś zmieni dane",
          ],
        },
      ]}
      faq={[
        {
          q: "Rejestr nie pokazuje nazwy, co to znaczy?",
          a: "Abonentem jest osoba fizyczna z chronionymi danymi. Sprawdza się to u rejestratora, z dostępem do konta.",
        },
        {
          q: "Wykonawca nie chce oddać domeny, co wtedy?",
          a: "Zaczynamy od pisma, zwykle to wystarcza. Przy odmowie zostaje sąd polubowny do spraw domen: kilka tysięcy złotych i miesiące. Tu nasza rola się kończy.",
        },
        {
          q: "Jak przenieść domenę .pl do innego rejestratora?",
          a: "Potrzebny jest kod AuthInfo. Rejestrator wydaje go abonentowi bez zwłoki i bez opłat. Jeśli abonentem jest wykonawca, najpierw trzeba zmienić abonenta.",
        },
        {
          q: "Czy przeniesienie wyłączy stronę albo pocztę?",
          a: "Nie. Zmienia się właściciel i miejsce opłat, ustawienia ruchu przenosimy najpierw.",
        },
      ]}
      formId="order_wlasnosc_domeny"
      formHeading="Zamów przeniesienie domeny"
      formIntro="Podaj domenę i napisz, czy masz kontakt z firmą, która ją rejestrowała. Odeślemy plan i wycenę."
      submitLabel="Zamów przeniesienie"
      microCopy="Do sprawdzenia wystarczy adres. Dokumenty są potrzebne dopiero przy zmianie abonenta."
      serviceName="Przeniesienie domeny na właściwego właściciela"
      serviceDesc="Ustalenie abonenta domeny w rejestrze oraz przeprowadzenie zmiany abonenta i transferu do konta klienta, wraz z zabezpieczeniem odnawiania. Od 490 zł."
      serviceType="Obsługa zmiany abonenta i transferu domeny"
    />
  );
}
