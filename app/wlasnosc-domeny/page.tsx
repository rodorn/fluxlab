import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import DomenaCheck from "@/components/DomenaCheck";

export const metadata: Metadata = {
  title: "Kto jest właścicielem Twojej domeny, sprawdź za darmo | Fluxlab",
  description:
    "W rejestrze domen wpisany jest jeden podmiot i to on decyduje o adresie, stronie i poczcie firmowej. Sprawdź za darmo, czy to Twoja firma, i kiedy wygasa rejestracja. Przeniesienie od 890 zł.",
  alternates: { canonical: "/wlasnosc-domeny" },
  openGraph: {
    title: "Kto jest właścicielem Twojej domeny, sprawdź za darmo | Fluxlab",
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
      lead="W rejestrze domen figuruje jeden podmiot i to jego zgoda jest potrzebna do każdej zmiany. Jeśli stronę stawiał kiedyś zewnętrzny wykonawca, bardzo często to on został wpisany jako właściciel i tak zostało. Dopóki układa się dobrze, nikt tego nie zauważa."
      ctaLabel="Sprawdź swoją domenę"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Kto figuruje jako abonent",
          desc: "To nazwa z publicznego rejestru. Jeśli nie jest to nazwa Twojej firmy, każda zmiana wymaga zgody kogoś innego.",
        },
        {
          title: "Kiedy wygasa rejestracja",
          desc: "Po tej dacie przestaje działać strona i cała poczta firmowa. Przypomnienia idą na adres abonenta, więc jeśli to obca firma, Ty ich nie zobaczysz.",
        },
        {
          title: "Przeniesienie na właściwą firmę",
          desc: "Wniosek o zmianę abonenta, dokumenty rejestrowe, transfer do konta, do którego masz dostęp. Prowadzę sprawę i pilnuję terminów.",
        },
        {
          title: "Zabezpieczenie na przyszłość",
          desc: "Automatyczne odnawianie, blokada transferu i przypomnienia na adres, który ktoś w firmie faktycznie czyta.",
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
          price: "od 890 zł",
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
          q: "Skąd bierzesz te dane?",
          a: "Z publicznego rejestru domen, tego samego, do którego każdy ma dostęp. Nie wymaga to logowania ani niczyjej zgody, bo są to dane jawne.",
        },
        {
          q: "Rejestr nie pokazuje nazwy, co to znaczy?",
          a: "Że abonentem jest osoba fizyczna, a jej dane są chronione. Wtedy z zewnątrz nie da się ustalić, kto to, i trzeba to sprawdzić u rejestratora, mając dostęp do konta.",
        },
        {
          q: "Wykonawca nie chce oddać domeny, co wtedy?",
          a: "Zaczynamy od pisma i procedury, bo w większości przypadków to wystarcza, a sprawa bierze się z zaniedbania, nie ze złej woli. Jeśli jednak ktoś odmawia, pozostaje droga przed sądem polubownym do spraw domen i wtedy mówię wprost, że to koszt rzędu kilku tysięcy i miesiące, a moja rola się kończy.",
        },
        {
          q: "Czy przeniesienie wyłączy stronę albo pocztę?",
          a: "Prawidłowo przeprowadzone nie. Zmienia się właściciel i miejsce, w którym opłacasz domenę, a ustawienia kierujące ruch zostają nietknięte. Przenoszę je najpierw, zanim cokolwiek się przełączy.",
        },
      ]}
      formId="order_wlasnosc_domeny"
      formHeading="Zamów przeniesienie domeny"
      formIntro="Napisz, o którą domenę chodzi i czy masz kontakt z firmą, która ją zarejestrowała. Odeślę plan działania i wycenę."
      submitLabel="Zamów przeniesienie"
      microCopy="Do sprawdzenia nie potrzebuję niczego poza adresem. Dokumenty są potrzebne dopiero przy samej zmianie abonenta."
      serviceName="Przeniesienie domeny na właściwego właściciela"
      serviceDesc="Ustalenie abonenta domeny w rejestrze oraz przeprowadzenie zmiany abonenta i transferu do konta klienta, wraz z zabezpieczeniem odnawiania. Od 890 zł."
      serviceType="Obsługa zmiany abonenta i transferu domeny"
    />
  );
}
