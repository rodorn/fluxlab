import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import MapaCheck from "@/components/MapaCheck";

export const metadata: Metadata = {
  title: "Czy Google ma listę podstron, sprawdź za darmo | Fluxlab",
  description:
    "Mapa strony to lista adresów, którą wyszukiwarka pobiera jednym zapytaniem. Sprawdź za darmo, czy Twoja ją ma i czy adresy działają. Naprawa od 240 zł.",
  alternates: { canonical: "/mapa-strony" },
  openGraph: {
    title: "Czy Google ma listę podstron, sprawdź za darmo | Fluxlab",
    description:
      "Sprawdzenie mapy strony, pliku robots.txt i adresów, które z tej mapy nie działają. Od ręki, bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, mapa strony i indeksowanie w wyszukiwarce",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="mapa-strony"
      tool={<MapaCheck />}
      breadcrumb="Mapa strony"
      eyebrow="Indeksowanie w wyszukiwarce"
      h1="Wyszukiwarka może nie wiedzieć o połowie Twoich podstron"
      lead="Robot wyszukiwarki nie zna Twojego serwisu. Albo dostaje gotową listę adresów, albo musi ją odtworzyć klikaniem w linki, a wtedy podstrona dostępna tylko z rozwijanego menu albo z wyszukiwarki wewnętrznej bywa odkrywana miesiącami. Druga strona tego samego problemu to lista, która obiecuje adresy prowadzące donikąd."
      ctaLabel="Sprawdź swoją mapę strony"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Czy mapa strony w ogóle istnieje",
          desc: "Szukamy jej tam, gdzie wskazuje plik robots.txt, a gdy nie wskazuje nigdzie, sprawdzamy standardowe lokalizacje.",
        },
        {
          title: "Czy adresy z mapy działają",
          desc: "Bierzemy próbkę adresów rozłożoną po całej liście i sprawdzamy każdy osobno. Adres, który zwraca błąd, zużywa limit odwiedzin robota i psuje zaufanie do całej listy.",
        },
        {
          title: "Czy robots.txt nie blokuje serwisu",
          desc: "Ustawienie z wersji roboczej potrafi pojechać na produkcję i poprosić wyszukiwarki, żeby nie odwiedzały strony w ogóle. Sprawdzamy to dokładnym porównaniem reguły, nie wyszukiwaniem fragmentu tekstu, bo inaczej każda normalna reguła wygląda jak blokada.",
        },
        {
          title: "Co zrobić z martwymi adresami",
          desc: "Przekierować na następcę czy usunąć z listy. To zależy od tego, czy pod danym adresem było coś, co ludzie linkowali, i to rozstrzygam osobno dla każdego przypadku.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Od ręki, na tej stronie.",
          features: [
            "obecność mapy strony i wskazanie w robots.txt",
            "próbka adresów z kodami odpowiedzi",
            "ostrzeżenie o blokadzie indeksowania",
          ],
        },
        {
          name: "Pełny przegląd i naprawa",
          price: "od 240 zł",
          desc: "Cała lista, nie próbka.",
          features: [
            "sprawdzenie wszystkich adresów z mapy",
            "mapa wygenerowana pod Wasz system",
            "decyzja dla każdego martwego adresu",
            "wskazanie mapy w robots.txt",
          ],
          featured: true,
        },
        {
          name: "Pilnowanie",
          price: "99 zł/mc",
          desc: "Dla serwisów, które rosną.",
          features: [
            "cykliczne sprawdzanie całej listy",
            "sygnał, gdy adresy zaczynają wypadać",
            "raport miesięczny",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy brak mapy strony oznacza, że nie ma nas w Google?",
          a: "Nie. Robot potrafi odkryć strony sam, chodzi o czas i o kompletność. Przy serwisie na kilkanaście podstron różnica bywa żadna. Przy katalogu ofert, bloga albo sklepie z setkami adresów zaczyna decydować o tym, ile z nich w ogóle trafi do wyników.",
        },
        {
          q: "Dlaczego sprawdzacie tylko kilkanaście adresów?",
          a: "Bo to cudzy serwer, a do werdyktu wystarczy próbka. Wysyłanie kilkuset zapytań pod obcą stronę bez pytania byłoby obciążaniem czyjejś infrastruktury. Pełny przegląd robimy dopiero na zlecenie właściciela.",
        },
        {
          q: "Mamy mapę i wszystko działa, co dalej?",
          a: "Wtedy tak napiszemy i na tym koniec. Ten punkt nie jest jedynym, który decyduje o widoczności, ale jest jednym z nielicznych, które można rozstrzygnąć jednoznacznie, bez spekulacji.",
        },
        {
          q: "Skąd wiadomo, że adres nie działa, a nie że serwer akurat kaszlnął?",
          a: "Rozróżniam kod błędu od braku odpowiedzi i pokazujemy jedno i drugie osobno. Przy pełnym przeglądzie każdy podejrzany adres sprawdzamy powtórnie, bo pojedynczy nieudany strzał to za mało, żeby komuś powiedzieć, że ma zepsutą stronę.",
        },
      ]}
      formId="order_mapa_strony"
      formHeading="Zamów pełny przegląd"
      formIntro="Napisz, na czym stoi strona, a odeślemy przegląd wszystkich adresów z mapy i propozycję, co zrobić z tymi, które nie działają."
      submitLabel="Zamów przegląd"
      microCopy="Do sprawdzenia nie potrzebujemy żadnych dostępów, bo mapa strony i robots.txt są publiczne. Dostęp jest potrzebny dopiero przy generowaniu nowej mapy."
      serviceName="Przegląd mapy strony i naprawa martwych adresów"
      serviceDesc="Sprawdzenie wszystkich adresów z mapy strony, wygenerowanie poprawnej mapy pod system klienta, wskazanie jej w robots.txt oraz rozstrzygnięcie przekierowań dla adresów, które przestały działać. Od 240 zł."
      serviceType="Przegląd indeksowania i mapy strony"
    />
  );
}
