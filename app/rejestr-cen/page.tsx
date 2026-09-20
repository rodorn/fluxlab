import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import CenyCheck from "@/components/CenyCheck";

export const metadata: Metadata = {
  title:
    "Najniższa cena z 30 dni, skan sklepu i rejestr cen, od 49 zł | Fluxlab",
  description:
    "Przy każdej obniżce sklep ma obowiązek podać najniższą cenę z 30 dni przed promocją. Sprawdzam każdą przecenioną pozycję z zewnątrz, bez dostępu do panelu, i pokazuję te bez wymaganej informacji. Od 49 zł.",
  alternates: { canonical: "/rejestr-cen" },
  openGraph: {
    title:
      "Najniższa cena z 30 dni, skan sklepu i rejestr cen, od 49 zł | Fluxlab",
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
      lead="Wtyczka pokazuje etykietę na karcie produktu i liczy ją z własnej bazy, która bywała czyszczona, migrowana albo nadpisana importem cennika. Nikt nie sprawdza, czy komunikat jest na wszystkich przecenionych pozycjach. Sprawdzam to z zewnątrz, tak jak zobaczy to kontrola i Twój klient."
      ctaLabel="Sprawdź mój sklep"
      ctaNote="Wynik tego samego dnia"
      checks={[
        {
          title: "Każda przeceniona pozycja, nie próbka",
          desc: "Biorę listę realnie przecenionych produktów wprost ze sklepu i sprawdzam kartę po karcie. Ręcznie to jedno kliknięcie na jeden produkt, a sklep ma ich setki.",
        },
        {
          title: "Wyłapuję pozorną zgodność",
          desc: "Samo „30 dni” na stronie nic nie znaczy, bo najczęściej dotyczy zwrotu towaru. Liczy się wyłącznie komunikat o najniższej cenie sprzed obniżki i tylko taki uznaję.",
        },
        {
          title: "Dowód, który sprawdzisz sam",
          desc: "Każda niezgodna pozycja ma w raporcie cenę przed i po oraz link do własnej karty produktu. Nie musisz mi wierzyć na słowo.",
        },
        {
          title: "Rejestr cen, czyli materiał dowodowy",
          desc: "Osobno zapisuję ceny Twojego sklepu codziennie. Po trzydziestu dniach masz niezależną historię, której wstecz nie da się odtworzyć, a która rozstrzyga spór o to, ile produkt kosztował naprawdę.",
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
          desc: "Poprawiam wyliczanie i wyświetlanie ceny minimalnej.",
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
          q: "Czego potrzebujesz ode mnie, żeby zrobić skan?",
          a: "Tylko adresu sklepu. Skan opiera się wyłącznie na danych, które sklep i tak pokazuje publicznie, więc nie potrzebuję loginu, hasła ani wtyczki.",
        },
        {
          q: "Na jakich sklepach to działa?",
          a: "Najpewniej na WooCommerce, bo udostępnia listę przecenionych produktów wprost. Przy innych silnikach robię to samo, tylko listę promocji buduję z kategorii promocyjnych. Napisz, na czym stoisz, powiem od razu, czy się da.",
        },
        {
          q: "Czy sprawdzasz, czy podana cena minimalna jest prawdziwa?",
          a: "Nie i mówię to wprost. Z zewnątrz da się stwierdzić, czy komunikat istnieje, ale nie czy kwota się zgadza, bo nikt nie ma historii cen Twojego sklepu. Właśnie po to jest rejestr cen: od dnia uruchomienia zbiera dowód na przyszłość.",
        },
        {
          q: "Czy to jest porada prawna?",
          a: "Nie. Dostajesz ocenę techniczną, która mówi, gdzie komunikatu nie ma, i tak jest to opisane w samym raporcie. Kwalifikację prawną konkretnej promocji powinien potwierdzić prawnik.",
        },
        {
          q: "A jeśli nic nie znajdziesz?",
          a: "Wtedy nie płacisz za skan. Przy sklepach, które sprawdzałem, komplet zgodnych przecen zdarza się, ale rzadziej niż braki.",
        },
      ]}
      formId="order_rejestr_cen"
      formHeading="Sprawdź swój sklep"
      formIntro="Podaj adres sklepu i napisz, na jakim silniku stoi. Odeślę wynik skanu, a jeśli nie znajdę ani jednej niezgodności, nie płacisz."
      submitLabel="Zamów skan sklepu"
      microCopy="Skan robię wyłącznie na publicznie dostępnych stronach Twojego sklepu. Nie potrzebuję żadnych dostępów."
      serviceName="Skan obowiązku informowania o najniższej cenie z 30 dni"
      serviceDesc="Sprawdzenie wszystkich przecenionych pozycji w sklepie pod kątem obowiązkowej informacji o najniższej cenie z 30 dni przed obniżką, wraz z raportem PDF. Od 49 zł."
      serviceType="Audyt zgodności prezentacji cen w sklepie internetowym"
    />
  );
}
