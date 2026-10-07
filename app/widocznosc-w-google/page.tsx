import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import WidocznoscCheck from "@/components/WidocznoscCheck";

export const metadata: Metadata = {
  title: "Strona nie pokazuje się w Google, od 190 zł | Fluxlab",
  description:
    "Jedno polecenie zostawione po wersji roboczej potrafi wyłączyć całą stronę z wyników. Sprawdź za darmo trzy miejsca, w których siedzi taka blokada.",
  alternates: { canonical: "/widocznosc-w-google" },
  openGraph: {
    title: "Strona nie pokazuje się w Google, od 190 zł | Fluxlab",
    description:
      "Znacznik noindex, nagłówek serwera albo plik robots potrafią wyłączyć stronę z wyszukiwarki. Sprawdzenie za darmo.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, widoczność strony w wyszukiwarce",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="widocznosc-w-google"
      tool={<WidocznoscCheck />}
      breadcrumb="Widoczność w Google"
      eyebrow="Blokada indeksowania"
      h1="Twoja strona może mieć w kodzie polecenie, żeby jej nie pokazywać"
      lead="Wersja robocza powstaje z blokadą dla wyszukiwarek, a potem trafia na serwer razem z nią. Właściciel wchodzi z zakładki i nic nie widzi, a klienci nie znajdują firmy."
      ctaLabel="Sprawdź swoją stronę"
      ctaNote="Sprawdzenie za darmo, od ręki"
      powiazane={[
        {
          przed: "Szukasz miejsca pod lokal? Zobacz",
          kotwica: "analizę lokalizacji",
          href: "/analiza-lokalizacji",
          po: ".",
        },
        {
          przed: "Strona ma wersję angielską? Sprawdza ją",
          kotwica: "kontrola wersji obcojęzycznej strony",
          href: "/kontrola-jezykow",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Znacznik w kodzie strony",
          desc: "Najczęstszy przypadek. Widać go dopiero w źródle strony.",
        },
        {
          title: "Nagłówek wysyłany przez serwer",
          desc: "Ten sam zakaz ustawiony na serwerze. Szukany najdłużej.",
        },
        {
          title: "Plik sterujący ruchem wyszukiwarek",
          desc: "Wpis zabraniający odwiedzania całej witryny, zwykle po pracach lub migracji.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Od ręki, na tej stronie.",
          features: [
            "trzy miejsca, w których może być blokada",
            "dokładna treść znalezionego wpisu",
            "ile treści zostaje niewidocznej",
          ],
        },
        {
          name: "Naprawa",
          price: "od 190 zł",
          desc: "Zdjęcie blokady i zgłoszenie strony.",
          features: [
            "usunięcie blokady we wszystkich trzech miejscach",
            "zgłoszenie strony do Google",
          ],
          featured: true,
        },
        {
          name: "Monitoring",
          price: "39 zł/mc",
          desc: "Żeby nie wróciła niezauważona.",
          features: [
            "codzienne sprawdzanie trzech miejsc",
            "wiadomość tego samego dnia, gdy coś się zmieni",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy to znaczy, że na pewno wypadłem z wyników?",
          a: "Część podstron może jeszcze być w wynikach, ale zniknie przy kolejnym odwiedzeniu robota. Im dłużej trwa blokada, tym dłużej trwa powrót.",
        },
        {
          q: "Sami widzimy swoją stronę w Google, więc chyba wszystko jest w porządku?",
          a: "Niekoniecznie. Wyszukanie własnej nazwy to co innego niż wyszukanie usługi, a wyniki bywają zapamiętane w przeglądarce.",
        },
        {
          q: "Czy naprawa wymaga zmian w wyglądzie strony?",
          a: "Nie. To zmiana jednego ustawienia albo jednej linii. Wygląd i treść zostają.",
        },
        {
          q: "Co jeśli nic nie znajdziecie, a mimo to nie widać mnie w wynikach?",
          a: "Wtedy nie płacisz i powiemy wprost, od czego zacząć szukać przyczyny.",
        },
      ]}
      formId="order_widocznosc"
      formHeading="Zamów naprawę widoczności"
      formIntro="Podaj adres strony. Odeślemy, co trzeba zmienić, i wycenę."
      submitLabel="Zamów naprawę"
      microCopy="Dostępy są potrzebne dopiero do naprawy."
      serviceName="Usunięcie blokady indeksowania strony"
      serviceDesc="Wykrycie i usunięcie poleceń blokujących indeksowanie strony w wyszukiwarce, w kodzie strony, nagłówkach serwera i pliku robots, wraz ze zgłoszeniem do ponownego odwiedzenia. Od 190 zł."
      serviceType="Naprawa widoczności strony w wyszukiwarce"
    />
  );
}
