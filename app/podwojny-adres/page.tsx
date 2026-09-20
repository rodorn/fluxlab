import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import AdresCheck from "@/components/AdresCheck";

export const metadata: Metadata = {
  title: "Czy Google widzi Twoją stronę podwójnie, sprawdź za darmo | Fluxlab",
  description:
    "Adres z www i bez www to dla wyszukiwarki dwie różne strony. Jeśli obie zwracają tę samą treść, siła linków dzieli się na pół. Sprawdź cztery wersje swojego adresu za darmo. Naprawa od 400 zł.",
  alternates: { canonical: "/podwojny-adres" },
  openGraph: {
    title: "Czy Google widzi Twoją stronę podwójnie, sprawdź za darmo | Fluxlab",
    description:
      "Sprawdzenie czterech wersji adresu firmy, od ręki i bez rejestracji. Pokazuję, czy wyszukiwarka liczy Twoją stronę raz, czy dwa razy.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, jeden adres główny strony firmowej",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="podwojny-adres"
      tool={<AdresCheck />}
      breadcrumb="Podwójny adres"
      eyebrow="Pozycje w wyszukiwarce"
      h1="Twoja strona może odpowiadać pod dwoma adresami naraz"
      lead="Dla Ciebie firma.pl i www.firma.pl to jedno i to samo. Dla wyszukiwarki to dwa osobne adresy, a jeśli oba zwracają tę samą treść, dostaje dwie identyczne strony i sama decyduje, którą pokazać. Efekt jest cichy: linki, opinie i lata pracy nad widocznością rozkładają się na dwa adresy zamiast budować jeden."
      ctaLabel="Sprawdź swój adres"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Cztery wersje adresu",
          desc: "Z www i bez, po http i po https. Sprawdzam każdą osobno i pokazuję, co dokładnie odpowiada serwer, bez podążania za przekierowaniem.",
        },
        {
          title: "Czy treść jest ta sama",
          desc: "Porównuję wielkość odpowiedzi. Identyczna treść pod dwoma adresami to sytuacja, w której wyszukiwarka musi wybierać za Ciebie.",
        },
        {
          title: "Czy wskazana jest wersja główna",
          desc: "Znacznik kanoniczny potrafi uratować sytuację, jeśli jest ustawiony poprawnie. Sprawdzam, czy w ogóle istnieje i na co wskazuje.",
        },
        {
          title: "Reguła pod Twój serwer",
          desc: "Przekierowanie wygląda inaczej na nginx, inaczej na Apache, a jeszcze inaczej przy WordPressie, który trzyma adres główny we własnych ustawieniach. Dostajesz wersję pod to, co faktycznie masz.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Od ręki, na tej stronie.",
          features: [
            "cztery wersje adresu z kodami odpowiedzi",
            "porównanie treści obu wersji",
            "informacja o wersji głównej",
          ],
        },
        {
          name: "Naprawa jednej domeny",
          price: "od 400 zł",
          desc: "Diagnoza z gotową regułą.",
          features: [
            "wybór wersji głównej wraz z uzasadnieniem",
            "reguła przekierowania pod Twój serwer",
            "wskazanie wersji głównej w kodzie strony",
            "kontrolne sprawdzenie po wdrożeniu",
          ],
          featured: true,
        },
        {
          name: "Kilka domen naraz",
          price: "od 900 zł",
          desc: "Dla firm z wieloma markami.",
          features: [
            "wszystkie domeny jednego właściciela",
            "spójna zasada dla całego zestawu",
            "raport przed i po wdrożeniu",
          ],
        },
      ]}
      faq={[
        {
          q: "Skąd wiadomo, że to naprawdę szkodzi?",
          a: "Warunkiem jest identyczna treść pod dwoma adresami i to mierzę wprost. Nie twierdzę natomiast, ile dokładnie pozycji przez to tracisz, bo tego z zewnątrz nikt uczciwie nie policzy. Rozstrzyga to dopiero Twoja Search Console, w której widać, ile podstron jest zaindeksowanych pod każdą wersją.",
        },
        {
          q: "Mam znacznik kanoniczny, czy to wystarczy?",
          a: "Zwykle tak, bo wyszukiwarka go respektuje. Ale to jest podpowiedź, a nie reguła, i przestaje działać wszędzie tam, gdzie znacznika zabraknie albo gdzie wskaże zły adres. Przekierowanie po stronie serwera działa zawsze i dotyczy każdego adresu w serwisie.",
        },
        {
          q: "Czy wdrożenie może popsuć stronę?",
          a: "Źle napisana reguła potrafi zapętlić przekierowanie i strona przestaje się otwierać. Dlatego zaczynam od kopii pliku konfiguracyjnego, a przy WordPressie sprawdzam najpierw adres zapisany w ustawieniach, bo zmiana tylko w serwerze bez zmiany w ustawieniach daje dokładnie takie zapętlenie.",
        },
        {
          q: "Sprawdzenie nic nie wykryło, a mimo to mam słabe pozycje.",
          a: "To znaczy tylko tyle, że ten konkretny problem odpada, i tak to napiszę. Widoczność ma wiele przyczyn, a ja wolę wykluczyć jedną rzecz uczciwie, niż sprzedać Ci audyt na zapas.",
        },
      ]}
      formId="order_podwojny_adres"
      formIntro="Napisz, jaki masz serwer albo na czym stoi strona, a odeślę gotową regułę i kolejność wdrożenia."
      formHeading="Zamów naprawę adresu"
      submitLabel="Zamów naprawę"
      microCopy="Do sprawdzenia nie potrzebuję żadnych dostępów. Dostęp do serwera jest potrzebny dopiero przy samym wdrożeniu, a regułę mogę też przekazać Waszemu informatykowi."
      serviceName="Ujednolicenie adresu strony firmowej"
      serviceDesc="Wskazanie wersji kanonicznej adresu, przygotowanie i wdrożenie przekierowania oraz znacznika wersji głównej, wraz z kontrolnym sprawdzeniem po wdrożeniu. Od 400 zł."
      serviceType="Konfiguracja przekierowań i adresu kanonicznego strony"
    />
  );
}
