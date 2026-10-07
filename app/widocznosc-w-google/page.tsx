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
      lead="To nie jest rzadki przypadek. Wersję roboczą buduje się z blokadą, żeby nie trafiła do wyników przed premierą, a potem wgrywa się ją na serwer razem z tą blokadą. Właściciel niczego nie zauważa, bo wchodzi na swoją stronę z zakładki, a firma przestaje istnieć dla wszystkich, którzy jej szukają."
      ctaLabel="Sprawdź swoją stronę"
      ctaNote="Sprawdzenie za darmo, od ręki"
      powiazane={[
        {
          przed: "Strona ma wersję angielską? Nieprzetłumaczone przyciski i brak znaczników wersji językowych to druga rzecz, której właściciel nie widzi. Sprawdza ją",
          kotwica: "kontrola wersji obcojęzycznej strony",
          href: "/kontrola-jezykow",
          po: ".",
        },
        {
          przed: "Klient z okolicy wybiera spośród firm, które widzi w wynikach. Ilu takich konkurentów macie w zasięgu kilku kilometrów i ilu mieszkańców przypada na jeden punkt, pokaże",
          kotwica: "analiza lokalizacji i konkurencji",
          href: "/analiza-lokalizacji",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Znacznik w kodzie strony",
          desc: "Najczęstszy przypadek i najłatwiejszy do przeoczenia, bo widać go dopiero w źródle strony, a nie w tym, co pokazuje przeglądarka.",
        },
        {
          title: "Nagłówek wysyłany przez serwer",
          desc: "Ten sam zakaz można ustawić po stronie serwera. Wtedy nie ma go w kodzie strony i bywa szukany najdłużej.",
        },
        {
          title: "Plik sterujący ruchem wyszukiwarek",
          desc: "Wpis zabraniający odwiedzania całej witryny. Zwykle pozostałość po pracach, czasem po migracji na nowy hosting.",
        },
        {
          title: "Powrót po aktualizacji",
          desc: "Blokada potrafi wrócić przy aktualizacji systemu albo przywróceniu kopii. Dlatego sensowne jest sprawdzanie tego cyklicznie, a nie raz.",
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
            "usunięcie wpisu w systemie strony",
            "sprawdzenie wszystkich trzech miejsc",
            "zgłoszenie do ponownego odwiedzenia",
            "potwierdzenie, że blokady już nie ma",
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
            "krótka informacja, co zrobić",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy to znaczy, że na pewno wypadłem z wyników?",
          a: "Sprawdzamy, co Twoja strona mówi wyszukiwarce dzisiaj. Jeśli blokada pojawiła się niedawno, część podstron może być jeszcze w wynikach, ale zniknie przy kolejnym odwiedzeniu. Im dłużej to trwa, tym dłużej potem trwa powrót.",
        },
        {
          q: "Sami widzimy swoją stronę w Google, więc chyba wszystko jest w porządku?",
          a: "Niekoniecznie. Wpisanie własnej nazwy firmy to co innego niż wyszukiwanie usługi, której ktoś szuka. Poza tym wyniki bywają zapamiętane w przeglądarce. Sprawdzenie wyżej patrzy na kod, a nie na to, co widzisz.",
        },
        {
          q: "Czy naprawa wymaga zmian w wyglądzie strony?",
          a: "Nie. To jest zmiana jednego ustawienia albo jednej linii, w zależności od tego, gdzie jest blokada. Wygląd i treść zostają nietknięte.",
        },
        {
          q: "Co jeśli nic nie znajdziecie, a mimo to nie widać mnie w wynikach?",
          a: "Wtedy nie płacisz, bo nie ma czego naprawiać w tym zakresie. Przyczyna leży gdzie indziej i powiemy Ci wprost, od czego zacząć szukać, zamiast sprzedawać Ci usługę, która nie pomoże.",
        },
        {
          q: "Jak sprawdzić, czy strona ma noindex, i jak wrócić do Google po jego zdjęciu?",
          a: "Zakaz noindex może stać w dwóch miejscach: w kodzie strony jako znacznik meta robots albo w nagłówku X-Robots-Tag wysyłanym przez serwer. Oba działają tak samo, a według dokumentacji Google wpis noindex w pliku robots.txt nie jest obsługiwany. Uwaga na pułapkę: jeśli strona jest jednocześnie zablokowana w robots.txt, robot nie wejdzie na nią, nie zobaczy noindex i adres może dalej wisieć w wynikach bez opisu. Po zdjęciu blokady w Google Search Console wpisujecie adres w polu sprawdzania adresu URL i klikacie Poproś o zindeksowanie, a w raporcie Strony grupa Wykluczona przez tag noindex powinna z czasem maleć. Źródło: developers.google.com/search/docs/crawling-indexing/block-indexing.",
        },
      ]}
      formId="order_widocznosc"
      formHeading="Zamów naprawę widoczności"
      formIntro="Podaj adres strony i napisz, na czym jest zbudowana, jeśli wiesz. Odeślemy dokładnie, co i gdzie trzeba zmienić, oraz wycenę."
      submitLabel="Zamów naprawę"
      microCopy="Do sprawdzenia nie potrzebujemy żadnych dostępów. Dostępy są potrzebne dopiero do samej naprawy."
      serviceName="Usunięcie blokady indeksowania strony"
      serviceDesc="Wykrycie i usunięcie poleceń blokujących indeksowanie strony w wyszukiwarce, w kodzie strony, nagłówkach serwera i pliku robots, wraz ze zgłoszeniem do ponownego odwiedzenia. Od 190 zł."
      serviceType="Naprawa widoczności strony w wyszukiwarce"
    />
  );
}
