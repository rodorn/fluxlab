import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import CenyCheck from "@/components/CenyCheck";

export const metadata: Metadata = {
  title: "Najniższa cena z 30 dni i rejestr cen, od 49 zł | Fluxlab",
  description:
    "Przy każdej obniżce sklep ma podać najniższą cenę z 30 dni. Sprawdzamy każdą przecenioną pozycję z zewnątrz i pokazujemy te bez tej informacji. Od 49 zł.",
  alternates: { canonical: "/rejestr-cen" },
  openGraph: {
    title: "Najniższa cena z 30 dni i rejestr cen, od 49 zł | Fluxlab",
    description:
      "Skan wszystkich przecen w sklepie i lista tych bez wymaganej informacji o najniższej cenie z 30 dni. Bez dostępu do panelu.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, rejestr cen w sklepie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="rejestr-cen"
      tool={<CenyCheck />}
      breadcrumb="Rejestr cen"
      eyebrow="Obowiązek informowania o cenie"
      h1="Przecena bez informacji o cenie z 30 dni to ryzyko, którego nie widać z panelu"
      lead="Wtyczka pokazuje etykietę na karcie produktu i liczy ją z własnej bazy, która bywała czyszczona, migrowana albo nadpisana importem cennika. Nikt nie sprawdza, czy komunikat jest na wszystkich przecenionych pozycjach. Sprawdzamy to z zewnątrz, tak jak zobaczy to kontrola i Twój klient."
      ctaLabel="Sprawdź nasz sklep"
      ctaNote="Wynik tego samego dnia"
      checks={[
        {
          title: "Każda przeceniona pozycja, nie próbka",
          desc: "Bierzemy listę realnie przecenionych produktów wprost ze sklepu i sprawdzamy kartę po karcie. Ręcznie to jedno kliknięcie na jeden produkt, a sklep ma ich setki.",
        },
        {
          title: "Wyłapujemy pozorną zgodność",
          desc: "Samo „30 dni” na stronie nic nie znaczy, bo najczęściej dotyczy zwrotu towaru. Liczy się wyłącznie komunikat o najniższej cenie sprzed obniżki i tylko taki uznajemy.",
        },
        {
          title: "Dowód, który sprawdzisz sam",
          desc: "Każda niezgodna pozycja ma w raporcie cenę przed i po oraz link do własnej karty produktu. Nie musisz wierzyć nam na słowo.",
        },
        {
          title: "Rejestr cen, czyli materiał dowodowy",
          desc: "Osobno zapisujemy ceny Twojego sklepu codziennie. Po trzydziestu dniach masz niezależną historię, której wstecz nie da się odtworzyć, a która rozstrzyga spór o to, ile produkt kosztował naprawdę.",
        },
      ]}
      pricing={[
        {
          name: "Skan sklepu",
          price: "49 zł",
          desc: "Jednorazowe sprawdzenie wszystkich przecen.",
          features: [
            "lista pozycji bez wymaganej informacji",
            "ceny przed i po oraz link do każdej karty",
            "raport PDF do przekazania obsłudze sklepu",
          ],
          featured: true,
        },
        {
          name: "Skan i naprawa",
          price: "od 590 zł",
          desc: "Poprawiamy wyliczanie i wyświetlanie ceny minimalnej.",
          features: [
            "wszystko ze skanu",
            "poprawne liczenie ceny z trzydziestu dni",
            "obsługa wariantów i zestawów",
            "ponowny skan po zmianach",
          ],
        },
        {
          name: "Rejestr cen",
          price: "99 zł/mc",
          desc: "Codzienny zapis cen jako dowód na przyszłość.",
          features: [
            "dzienny snapshot całego asortymentu",
            "historia ceny każdego produktu",
            "sygnał, gdy przecena rusza bez komunikatu",
          ],
        },
      ]}
      faq={[
        {
          q: "Od jakiej ceny liczy się najniższą cenę z 30 dni przed obniżką?",
          a: "Od wszystkich cen, które obowiązywały w ciągu 30 dni przed dniem wprowadzenia obniżki, i podaje się najniższą z nich obok ceny obniżonej (art. 4 ust. 2 ustawy z 9 maja 2014 o informowaniu o cenach towarów i usług, obowiązuje od 1 stycznia 2023). Gdy produkt jest w ofercie krócej niż 30 dni, liczy się najniższą cenę od pierwszego dnia sprzedaży do dnia obniżki (art. 4 ust. 3). Przy towarach, które szybko się psują, wystarczy cena sprzed pierwszej obniżki (art. 4 ust. 4). Obowiązek dotyczy każdej informacji o obniżce: przekreślonej ceny, procentu, hasła promocyjnego.",
        },
        {
          q: "Czy procent rabatu liczymy od ceny katalogowej, czy od najniższej z 30 dni?",
          a: "Od najniższej z 30 dni. Trybunał Sprawiedliwości UE orzekł 26 września 2024 w sprawie C-330/23 (Aldi Süd), że obniżka ogłoszona procentem albo hasłem podkreślającym korzystną cenę ma być liczona od tej najniższej ceny, a nie od ceny sprzed dnia promocji. Przykład: produkt kosztował 80 zł przez tydzień, potem 100 zł, teraz 80 zł. Napis „-20%” jest wtedy mylący, bo wobec najniższej ceny z 30 dni obniżki nie ma wcale.",
        },
        {
          q: "Jaka jest kara za brak informacji o najniższej cenie z 30 dni?",
          a: "Do 20 000 zł, nakłada ją wojewódzki inspektor Inspekcji Handlowej (art. 6 ust. 1 ustawy o informowaniu o cenach). Gdy przedsiębiorca co najmniej trzy razy w ciągu 12 miesięcy od pierwszego stwierdzenia naruszenia nie wykona obowiązku, kara może wynieść do 40 000 zł (art. 6 ust. 2). Kara dotyczy sklepu, a nie dostawcy wtyczki, która liczyła cenę źle.",
        },
        {
          q: "Czego potrzebujecie od nas, żeby zrobić skan?",
          a: "Tylko adresu sklepu. Skan opiera się wyłącznie na danych, które sklep i tak pokazuje publicznie, więc nie potrzebujemy loginu, hasła ani wtyczki.",
        },
        {
          q: "Na jakich sklepach to działa?",
          a: "Najpewniej na WooCommerce, bo udostępnia listę przecenionych produktów wprost. Przy innych silnikach robimy to samo, tylko listę promocji budujemy z kategorii promocyjnych. Napisz, na jakim silniku działa sklep, powiemy od razu, czy się da.",
        },
        {
          q: "Czy sprawdzacie, czy podana cena minimalna jest prawdziwa?",
          a: "Nie i mówimy to wprost. Z zewnątrz da się stwierdzić, czy komunikat istnieje, ale nie czy kwota się zgadza, bo nikt nie ma historii cen Twojego sklepu. Właśnie po to jest rejestr cen: od dnia uruchomienia zbiera dowód na przyszłość.",
        },
        {
          q: "Czy to jest porada prawna?",
          a: "Nie. Dostajesz ocenę techniczną, która mówi, gdzie komunikatu nie ma, i tak jest to opisane w samym raporcie. Kwalifikację prawną konkretnej promocji powinien potwierdzić prawnik.",
        },
        {
          q: "A jeśli nic nie znajdziecie?",
          a: "Wtedy nie płacisz za skan. Przy sklepach, które sprawdzaliśmy, komplet zgodnych przecen zdarza się, ale rzadziej niż braki.",
        },
      ]}
      formId="order_rejestr_cen"
      formHeading="Sprawdź swój sklep"
      formIntro="Podaj adres sklepu i napisz, na jakim silniku działa. Odeślemy wynik skanu, a jeśli nie znajdziemy ani jednej niezgodności, nie płacisz."
      submitLabel="Zamów skan sklepu"
      microCopy="Skan robimy wyłącznie na publicznie dostępnych stronach Twojego sklepu. Nie potrzebujemy żadnych dostępów."
      serviceName="Skan obowiązku informowania o najniższej cenie z 30 dni"
      serviceDesc="Sprawdzenie wszystkich przecenionych pozycji w sklepie pod kątem obowiązkowej informacji o najniższej cenie z 30 dni przed obniżką, wraz z raportem PDF. Od 49 zł."
      serviceType="Audyt zgodności prezentacji cen w sklepie internetowym"
    />
  );
}
