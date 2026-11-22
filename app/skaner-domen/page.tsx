import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Wygasające domeny .pl i monitoring domeny od 9 zł/mies. | Fluxlab",
  description:
    "Sprawdzamy, które domeny wygasają i które są wolne pod frazy Twojej branży. Raport do 48 godzin za 29 zł netto, monitoring domeny (do 20 adresów) za 9 zł miesięcznie.",
  alternates: { canonical: "/skaner-domen" },
  openGraph: {
    title: "Wygasające domeny .pl i monitoring domeny od 9 zł/mies. | Fluxlab",
    description:
      "Wygasające i wolne domeny .pl pod Twoje frazy w jednym raporcie, a do tego codzienny monitoring wybranych domen.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, skaner domen",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="skaner-domen"
      breadcrumb="Skaner domen"
      eyebrow="Wygasające domeny i monitoring domeny"
      h1="Wygasające i wolne domeny pod Twoją branżę, zanim ktoś je przejmie"
      lead="Podajesz frazy, pod którymi szukają Cię klienci, albo nazwę firmy. My sprawdzamy, które domeny są wolne, kiedy wygasają te zajęte i co było na nich wcześniej. Wybrane adresy objęte monitoringiem domeny sprawdzamy codziennie."
      ctaLabel="Zamów wyszukiwanie"
      ctaNote="Raport do 48 godzin za 29 zł netto, pilnowanie od 9 zł miesięcznie"
      powiazane={[
        {
          przed: "Masz już domenę? Sprawdź,",
          kotwica: "kto jest jej właścicielem",
          href: "/wlasnosc-domeny",
          po: ".",
        },
        {
          przed:
            "Chcesz wiedzieć, co robi konkurencja na swoich stronach? Zobacz",
          kotwica: "benchmarking konkurencji",
          href: "/benchmarking-konkurencji",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Wolne domeny pod frazy",
          desc: "Adresy z frazami Twojej branży w końcówkach .pl, .com.pl i .com, które można zarejestrować od ręki.",
        },
        {
          title: "Domeny, które wygasają",
          desc: "Adresy z listy zwalnianych domen i z aukcji, z datą zwolnienia i ceną odkupu, jeśli jest.",
        },
        {
          title: "Historia adresu",
          desc: "Co było pod domeną wcześniej, od kiedy istnieje i czy nie ciągnie za sobą spamu.",
        },
      ]}
      pricing={[
        {
          name: "Raport o domenie",
          price: "29 zł",
          kup: "domeny-wyszukiwanie",
          desc: "Netto, jednorazowo. Raport mailem do 48 godzin.",
          features: [
            "frazy branży albo nazwa firmy",
            "wolne i wygasające domeny z historią",
            "nasza propozycja, który adres wybrać",
          ],
          featured: true,
        },
        {
          name: "Monitoring domen",
          price: "9 zł/mies.",
          kup: "domeny-pilnowanie",
          desc: "Netto. Do 20 domen, sprawdzanie codziennie.",
          features: [
            "mail w ciągu 24 godzin, gdy domena wygasa, zwalnia się albo zmienia status",
            "dłuższą listę domen doślesz mailem po płatności",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy rejestrujecie domeny za mnie?",
          a: "Nie. Wskazujemy adres, rejestratora i cenę, a domenę kupujesz na swoje konto, więc od początku należy do Ciebie.",
        },
        {
          q: "Skąd wiecie, że domena wygasa?",
          a: "Z publicznej listy domen zwalnianych przez rejestr .pl, z publicznych danych rejestru i z serwisów aukcyjnych. Każdy adres w raporcie ma link do źródła.",
        },
        {
          q: "Co, jeśli żadna dobra domena nie jest wolna?",
          a: "Dostajesz raport z najbliższymi wolnymi wariantami i listę adresów wartych pilnowania, gdy właściciel ich nie przedłuży.",
        },
        {
          q: "Jak podać więcej niż kilka domen do pilnowania?",
          a: "Wpisz je przy płatności po przecinku. Jeśli się nie zmieszczą, odpisz na mail z potwierdzeniem i dopiszemy resztę.",
        },
      ]}
      formId="order_skaner_domen"
      formHeading="Zapytaj o skaner domen"
      formIntro="Napisz, jakich adresów szukasz albo które domeny mamy pilnować. Odpiszemy z wyceną, jeśli potrzebujesz więcej niż pakiet."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Skaner domen"
      serviceDesc="Wyszukiwanie wolnych i wygasających domen pod frazy branży lub nazwę firmy za 29 zł netto oraz codzienne pilnowanie do 20 domen za 9 zł netto miesięcznie."
      serviceType="Wyszukiwanie domen"
    />
  );
}
