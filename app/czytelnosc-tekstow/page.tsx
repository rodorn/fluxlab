import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import CzytelnoscPodglad from "@/components/CzytelnoscPodglad";

export const metadata: Metadata = {
  title: "Czytelność i poprawność tekstów strony za 19 zł | Fluxlab",
  description:
    "Raport literówek, długich zdań i urzędowych fraz na 12 podstronach Twojej strony, z poprawkami. Mail z PDF w kilka minut, 19 zł netto jednorazowo.",
  alternates: { canonical: "/czytelnosc-tekstow" },
  openGraph: {
    title: "Czytelność i poprawność tekstów strony za 19 zł | Fluxlab",
    description:
      "Literówki, długie zdania i frazy, które klient musi tłumaczyć. Z gotowymi poprawkami, mailem w kilka minut.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, czytelność i poprawność tekstów strony" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="czytelnosc-tekstow"
      breadcrumb="Czytelność tekstów"
      typ="usluga"
      h1="Czy teksty na Twojej stronie da się czytać bez potknięć?"
      lead="Pobieramy do 12 podstron Twojej strony, czytamy je słowo po słowie i wysyłamy raport: literówki z podpowiedziami, zdania, które trzeba skrócić, i frazy, które klient musi sobie przetłumaczyć. Mail z PDF dostajesz w kilka minut po płatności."
      ctaLabel="Zamów raport"
      ctaNote="19 zł netto, jednorazowo, bez umowy"
      tool={<CzytelnoscPodglad />}
      checks={[
        {
          title: "Literówki i błędy zapisu",
          desc: "Każde słowo sprawdzone słownikiem języka polskiego. Do tego podwójne słowa, brak spacji po przecinku, podwójne kropki i zdania zaczęte małą literą.",
        },
        {
          title: "Zdania do skrócenia",
          desc: "Zdania powyżej 28 słów, z zaznaczonym miejscem, w którym najłatwiej je podzielić na dwa.",
        },
        {
          title: "Frazy do przetłumaczenia",
          desc: "Urzędowe i puste zwroty, takie jak „w celu”, „dokonać” albo „kompleksowy”, z prostszym zamiennikiem obok.",
        },
        {
          title: "Adres każdej uwagi",
          desc: "Przy każdej pozycji podajemy podstronę i cytat, więc poprawka zajmuje minutę, a nie godzinę szukania.",
        },
      ]}
      pricing={[
        {
          name: "Raport tekstów strony",
          price: "19 zł",
          kup: "czytelnosc-tekstow",
          desc: "Netto, jednorazowo. Mail z raportem i PDF w kilka minut.",
          features: [
            "do 12 podstron jednej strony",
            "literówki z podpowiedziami",
            "zdania do skrócenia z miejscem podziału",
            "frazy z prostszym zamiennikiem",
            "pełna lista w załączonym PDF",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Które podstrony sprawdzacie?",
          a: "Stronę główną, potem podstrony z mapy witryny, a gdy jej nie ma, te, do których prowadzą linki ze strony głównej. Łącznie do 12.",
        },
        {
          q: "Czy raport oceni styl i treść?",
          a: "Nie. Sprawdzenie jest automatyczne i działa bez modeli AI, więc ten sam tekst zawsze dostaje tę samą ocenę. Wskazuje błędy zapisu, zbyt długie zdania i frazy z naszej listy, ale nie ocenia, czy tekst jest ciekawy ani prawdziwy.",
        },
        {
          q: "Skąd bierzecie wiedzę, które słowo jest literówką?",
          a: "Ze słownika języka polskiego. Nazwy własne i terminy branżowe, których słownik nie zna, mogą trafić na listę, więc sprawdź każdą pozycję przed poprawką. Słowa, które wracają na stronie co najmniej 4 razy, uznajemy za nazwy własne i pomijamy.",
        },
        {
          q: "Co, gdy strona jest po angielsku albo nie da się jej pobrać?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem. Zwrot dostajesz też, gdy po naszej stronie wystąpi błąd.",
        },
        {
          q: "Czy teksty z podglądu są gdzieś zapisywane?",
          a: "Nie. Podgląd działa w Twojej przeglądarce i nic nie wysyła na serwer.",
        },
      ]}
      formId="order_czytelnosc"
      formHeading="Zapytaj o teksty całej strony"
      formIntro="Masz sklep z setkami podstron albo teksty w kilku językach? Napisz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Czytelność i poprawność tekstów strony"
      serviceDesc="Jednorazowy raport literówek, zbyt długich zdań i urzędowych fraz na do 12 podstronach strony, z poprawkami, za 19 zł netto."
      serviceType="Korekta tekstów strony"
    />
  );
}
