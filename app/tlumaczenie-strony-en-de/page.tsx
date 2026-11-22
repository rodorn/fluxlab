import type { Metadata } from "next";

import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Tłumaczenie strony na angielski i niemiecki, 199 zł",
  description:
    "Podajesz adres strony, a dostajesz teksty przetłumaczone na angielski i niemiecki: arkusz Excel i pliki do wklejenia. Do 6 podstron, 199 zł netto.",
  alternates: { canonical: "/tlumaczenie-strony-en-de" },
  openGraph: {
    title: "Tłumaczenie strony na angielski i niemiecki | Fluxlab",
    description: "Teksty Twojej strony po angielsku i niemiecku, w arkuszu i w plikach do wklejenia, po kilku minutach.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, tłumaczenie strony EN i DE" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="tlumaczenie-strony-en-de"
      breadcrumb="Tłumaczenie strony EN i DE"
      cena="199 zł netto"
      typ="narzedzie"
      h1="Teksty Twojej strony po angielsku i niemiecku, bez zlecania agencji"
      lead="Płacisz, podajesz adres strony, a my pobieramy ją razem z pięcioma podstronami z jej linków i tłumaczymy teksty. Po kilku minutach w mailu masz arkusz z polskim obok angielskiego i niemieckiego oraz dwa pliki z tekstami w kolejności ze strony, gotowe do wklejenia."
      ctaLabel="Kup za 199 zł"
      ctaNote="Bez konta, wynik po kilku minutach"
      checks={[
        {
          title: "Arkusz do przejrzenia",
          desc: "Jeden wiersz na tekst: adres podstrony, polski, angielski i niemiecki. Łatwo przekazać komuś, kto zna język, żeby poprawił wybrane zdania.",
        },
        {
          title: "Pliki do wklejenia",
          desc: "Osobny plik angielski i niemiecki z tekstami w kolejności ze strony, bez menu i skryptów, więc można je od razu wstawić do edytora.",
        },
        {
          title: "Nazwy i liczby bez zmian",
          desc: "Nazwy marek, adresy, liczby i ceny zostają takie, jakie są. Zmienia się tylko język tekstu.",
        },
      ]}
      pricing={[
        {
          name: "Tłumaczenie strony",
          price: "199 zł",
          kup: "tlumaczenie-strony",
          desc: "Netto. Jedna strona główna i do 5 podstron z jej linków, po 80 tekstów na każdą.",
          features: [
            "angielski i niemiecki w jednym zamówieniu",
            "arkusz Excel oraz osobne pliki EN i DE",
            "wynik w mailu po kilku minutach",
            "gdy tłumaczenie się nie uda, zwrot całej płatności",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy tłumaczenie jest ręczne?",
          a: "Nie. To tłumaczenie automatyczne, bardzo dobre przy tekstach firmowych, ale nie zastępuje korekty native speakera. Przed publikacją przeczytaj je, zwłaszcza nazwy produktów i zwroty branżowe.",
        },
        {
          q: "Czy dodacie wersję językową do mojej strony?",
          a: "Nie, dostajesz same teksty. Wdrożenie wersji językowej na Twojej stronie to osobna usługa, o którą możesz zapytać w formularzu niżej.",
        },
        {
          q: "Co jeśli moja strona ładuje treść skryptem?",
          a: "Pobieramy tekst widoczny w kodzie strony. Treści doładowywane skryptem po otwarciu mogą wypaść. Gdy nie znajdziemy tekstu, powiemy o tym przy podawaniu adresu i płatność nie zostanie wykorzystana.",
        },
        {
          q: "Które podstrony zostaną przetłumaczone?",
          a: "Strona główna i pierwsze pięć podstron, na które prowadzą jej linki, bez plików i zewnętrznych adresów.",
        },
        {
          q: "Czy jest faktura?",
          a: "Tak, na dane podane przy płatności, w 1 dzień roboczy.",
        },
      ]}
      formId="tlumaczenie_strony"
      formHeading="Potrzebujesz więcej podstron albo wersji na stronie?"
      formIntro="Napisz, jak duża jest Twoja strona i na jakim jest silniku. Odpiszemy, jak dodać wersje językowe."
      submitLabel="Napisz w sprawie większej strony"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Tłumaczenie strony na angielski i niemiecki"
      serviceDesc="Teksty strony przetłumaczone na angielski i niemiecki: arkusz Excel i pliki do wklejenia. Do 6 podstron, 199 zł netto."
      serviceType="Tłumaczenie"
    />
  );
}
