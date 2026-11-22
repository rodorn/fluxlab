import type { Metadata } from "next";

import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Regulamin sklepu i polityka prywatności, 99 zł",
  description:
    "Odpowiadasz na 15 pytań o sklep, a dostajesz regulamin i politykę prywatności gotowe do wklejenia na stronę. 99 zł netto jednorazowo.",
  alternates: { canonical: "/regulamin-sklepu-z-ankiety" },
  openGraph: {
    title: "Regulamin sklepu i polityka prywatności | Fluxlab",
    description: "Dwa dokumenty z Twoich odpowiedzi, w mailu i w plikach do wklejenia, po kilku minutach.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, regulamin sklepu i polityka prywatności" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="regulamin-sklepu-z-ankiety"
      breadcrumb="Regulamin sklepu i polityka prywatności"
      cena="99 zł netto"
      typ="narzedzie"
      h1="Regulamin sklepu i polityka prywatności z ankiety, bez szukania wzorów"
      lead="Płacisz, odpowiadasz na 15 pytań o firmę, dostawę, płatności, zwroty i narzędzia na stronie, a my przygotowujemy dwa dokumenty z Twoich danych. Po kilku minutach masz je na ekranie i w mailu jako pliki do wklejenia na stronę."
      ctaLabel="Kup za 99 zł"
      ctaNote="Bez konta, wynik po kilku minutach"
      checks={[
        {
          title: "Twoje dane w treści",
          desc: "Nazwa firmy, adres, metody dostawy i płatności, zasady zwrotów i reklamacji trafiają do dokumentów dokładnie tak, jak je podasz.",
        },
        {
          title: "Regulamin i polityka razem",
          desc: "Regulamin sklepu z odstąpieniem od umowy, reklamacjami i sporami oraz polityka prywatności z narzędziami i odbiorcami danych.",
        },
        {
          title: "Pliki do wklejenia",
          desc: "Dwa osobne pliki w załączniku i pełna treść w mailu. Miejsca, których nie dało się uzupełnić z ankiety, są w nawiasach kwadratowych.",
        },
      ]}
      pricing={[
        {
          name: "Regulamin i polityka prywatności",
          price: "99 zł",
          kup: "regulamin-ankieta",
          desc: "Netto, jednorazowo. Ankieta 15 pytań, dwa dokumenty po polsku.",
          features: [
            "regulamin sklepu internetowego",
            "polityka prywatności z narzędziami i odbiorcami danych",
            "pliki do wklejenia oraz treść w mailu",
            "gdy dokumentów nie uda się przygotować, zwrot całej płatności",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy to porada prawna?",
          a: "Nie. Dokumenty powstają automatycznie z Twoich odpowiedzi i nie zastępują prawnika. Przeczytaj je przed publikacją, a przy większej skali sprzedaży lub sprzedaży za granicę pokaż je prawnikowi.",
        },
        {
          q: "Co gdy brakuje jakiejś informacji?",
          a: "Pola są obowiązkowe poza telefonem. Gdy dokument wymaga informacji, której nie było w odpowiedziach, w tekście pojawi się miejsce do uzupełnienia w nawiasie kwadratowym.",
        },
        {
          q: "Czy dokumenty pasują do sprzedaży usług i produktów cyfrowych?",
          a: "Tak, przy odpowiedziach wybierasz, czy sprzedajesz towary, produkty cyfrowe, usługi, czy kilka naraz, i dokumenty to uwzględniają.",
        },
        {
          q: "Czy dokumenty są aktualizowane po zmianie przepisów?",
          a: "Nie, dokumenty są jednorazowe. Po zmianie sklepu lub przepisów możesz kupić je ponownie.",
        },
        {
          q: "Czy jest faktura?",
          a: "Tak, na dane podane przy płatności, w 1 dzień roboczy.",
        },
      ]}
      formId="regulamin_ankieta"
      formHeading="Potrzebujesz dokumentów dla większego sklepu?"
      formIntro="Napisz, co sprzedajesz i gdzie. Odpiszemy, jak przygotować dokumenty z udziałem prawnika."
      submitLabel="Napisz w sprawie większego sklepu"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Regulamin sklepu i polityka prywatności z ankiety"
      serviceDesc="Regulamin sklepu internetowego i polityka prywatności przygotowane z ankiety 15 pytań, gotowe do wklejenia na stronę. 99 zł netto."
      serviceType="Dokumenty"
    />
  );
}
