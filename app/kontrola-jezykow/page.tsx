import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import JezykCheck from "@/components/JezykCheck";

export const metadata: Metadata = {
  title: "Audyt tłumaczeń strony i hreflang, od 99 zł | Fluxlab",
  description:
    "Wersja angielska ma polskie przyciski, a wyszukiwarka nie wie, że wersje językowe istnieją. Sprawdzamy fragment po fragmencie. Od 99 zł.",
  alternates: { canonical: "/kontrola-jezykow" },
  openGraph: {
    title: "Audyt tłumaczeń strony i hreflang, od 99 zł | Fluxlab",
    description:
      "Polskie fragmenty w wersji obcojęzycznej i brakujące znaczniki hreflang. Lista miejsc do podmiany, gotowa dla programisty.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, kontrola wersji językowych",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kontrola-jezykow"
      tool={<JezykCheck />}
      breadcrumb="Kontrola wersji językowej"
      eyebrow="Eksport i wersje obcojęzyczne"
      h1="Wasza angielska strona mówi po polsku i nikt tego nie zauważył"
      lead="Po tłumaczeniu prawie zawsze zostają polskie przyciski, nagłówki, czasem całe akapity. Wy ich nie zauważacie, a zagraniczny klient widzi stronę porzuconą w połowie."
      ctaLabel="Zamów pełny audyt"
      ctaNote="Wynik w 48 godzin"
      checks={[
        {
          title: "Fragment po fragmencie, nie strona po stronie",
          desc: "Popularne narzędzia oceniają całą stronę naraz i przepuszczają pojedyncze polskie fragmenty. My sprawdzamy każdy fragment osobno.",
        },
        {
          title: "Deklaracja języka kontra rzeczywistość",
          desc: "Strona deklaruje angielski, a ma polskie napisy. Ta sprzeczność najbardziej szkodzi w wyszukiwarce.",
        },
        {
          title: "Znaczniki wersji językowych",
          desc: "Bez nich wersje językowe konkurują ze sobą w wyszukiwarce zamiast się wspierać.",
        },
        {
          title: "Lista gotowa dla programisty",
          desc: "Każdy wpis ma adres, miejsce i tekst do podmiany. Przekazujesz plik dalej.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Kilka pierwszych stron, wynik od razu na tej stronie.",
          features: [
            "liczba polskich fragmentów",
            "brakujące znaczniki językowe",
            "przykładowe cytaty z Waszej strony",
          ],
        },
        {
          name: "Pełny audyt",
          price: "od 99 zł",
          desc: "Cały serwis, wszystkie wersje językowe.",
          features: [
            "każdy polski fragment z adresem i cytatem",
            "tytuły i opisy dla wyszukiwarki",
            "znaczniki językowe i duplikaty adresów",
            "lista w pliku gotowym do przekazania",
          ],
          featured: true,
        },
        {
          name: "Monitoring",
          price: "99 zł/mc",
          desc: "Nowe podstrony wracają do polskiego same z siebie.",
          features: [
            "cykliczne sprawdzanie całego serwisu",
            "sygnał, gdy pojawi się nowy polski tekst",
            "krótkie zestawienie zmian",
          ],
        },
      ]}
      faq={[
        {
          q: "Czego potrzebujecie, żeby to sprawdzić?",
          a: "Tylko adresu strony. Nie potrzebujemy żadnych dostępów.",
        },
        {
          q: "Czy sprawdzacie też jakość samego tłumaczenia?",
          a: "Nie. Wykrywamy tekst nieprzetłumaczony i błędy w znacznikach. Styl przekładu ocenia tłumacz.",
        },
        {
          q: "Mamy stronę na WordPressie z wtyczką do tłumaczeń, czy to zadziała?",
          a: "Tak. Sprawdzamy stronę taką, jaką widzi odwiedzający. Wtyczki to zresztą najczęstsze źródło braków.",
        },
        {
          q: "Co jeśli nic nie znajdziecie?",
          a: "Wtedy nie płacisz za audyt.",
        },
      ]}
      formId="order_kontrola_jezykow"
      formHeading="Zamów pełny audyt wersji językowych"
      formIntro="Podaj adres strony i wersje językowe. Jeśli nic nie znajdziemy, nie płacisz."
      submitLabel="Zamów audyt"
      microCopy="Analizujemy tylko publiczne strony."
      serviceName="Audyt wersji językowych strony internetowej"
      serviceDesc="Wykrycie nieprzetłumaczonych fragmentów w obcojęzycznych wersjach serwisu oraz błędów w znacznikach hreflang, z listą miejsc do podmiany. Od 99 zł."
      serviceType="Audyt jakości wersji językowych serwisu"
    />
  );
}
