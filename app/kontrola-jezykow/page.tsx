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
      lead="Tłumaczenie serwisu prawie nigdy nie kończy się w stu procentach. Zostają przyciski, nagłówki sekcji, czasem całe akapity. Ich nie widać, bo kto zna polski, ten przeczyta i nie zwróci uwagi, a zagraniczny klient widzi stronę, która wygląda na porzuconą w połowie."
      ctaLabel="Zamów pełny audyt"
      ctaNote="Wynik w 48 godzin"
      checks={[
        {
          title: "Fragment po fragmencie, nie strona po stronie",
          desc: "Popularne narzędzia oceniają całą stronę jako jeden byt. Strona z czterystoma fragmentami, z których trzynaście jest po polsku, wygląda dla nich na bezbłędną. Ja rozbijamy ją na pojedyncze kawałki tekstu.",
        },
        {
          title: "Deklaracja języka kontra rzeczywistość",
          desc: "Strona potrafi deklarować, że jest angielska, i jednocześnie mieć polskie napisy. Pokazujemy tę sprzeczność wprost, bo to ona najbardziej szkodzi w wyszukiwarce.",
        },
        {
          title: "Znaczniki wersji językowych",
          desc: "Bez nich wyszukiwarka nie wie, że polska i angielska strona to ta sama treść w dwóch językach, więc wersje zaczynają konkurować ze sobą zamiast się wspierać.",
        },
        {
          title: "Lista gotowa dla programisty",
          desc: "Każdy wpis ma adres strony, miejsce i tekst, który trzeba podmienić. Przekazujesz plik dalej i sprawa jest zamknięta, bez tłumaczenia komukolwiek, o co chodzi.",
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
          a: "Tylko adresu strony. Wszystko, co analizujemy, jest publicznie dostępne, więc nie potrzebujemy dostępu do panelu ani do systemu zarządzania treścią.",
        },
        {
          q: "Czy sprawdzacie też jakość samego tłumaczenia?",
          a: "Nie i mówimy to wprost. Wykrywamy tekst, który w ogóle nie został przetłumaczony, oraz błędy w oznaczeniach dla wyszukiwarki. Ocena stylu przekładu to praca dla tłumacza, nie dla narzędzia.",
        },
        {
          q: "Mamy stronę na WordPressie z wtyczką do tłumaczeń, czy to zadziała?",
          a: "Tak, bo sprawdzamy gotową stronę taką, jaką widzi odwiedzający, niezależnie od tego, co ją generuje. Wtyczki do tłumaczeń są zresztą najczęstszym źródłem takich braków, bo nowa podstrona domyślnie pokazuje treść oryginalną.",
        },
        {
          q: "Co jeśli nic nie znajdziecie?",
          a: "Wtedy nie płacisz za audyt. Przy serwisach, które sprawdzałem, komplet bez zastrzeżeń zdarza się, ale rzadziej niż braki.",
        },
      ]}
      formId="order_kontrola_jezykow"
      formHeading="Zamów pełny audyt wersji językowych"
      formIntro="Podaj adres strony i napisz, które wersje językowe Was interesują. Odeślemy listę miejsc do poprawy, a jeśli nie znajdziemy ani jednego, nie płacisz."
      submitLabel="Zamów audyt"
      microCopy="Analizujemy wyłącznie publicznie dostępne strony. Nie potrzebujemy żadnych dostępów."
      serviceName="Audyt wersji językowych strony internetowej"
      serviceDesc="Wykrycie nieprzetłumaczonych fragmentów w obcojęzycznych wersjach serwisu oraz błędów w znacznikach hreflang, z listą miejsc do podmiany. Od 99 zł."
      serviceType="Audyt jakości wersji językowych serwisu"
    />
  );
}
