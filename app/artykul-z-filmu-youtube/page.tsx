import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Artykuł z filmu YouTube za 99 zł miesięcznie | Fluxlab",
  description:
    "Nowy film na Twoim kanale zamienia się w artykuł na blog, z tytułem i opisem do wyszukiwarki. Od razu artykuł z najnowszego filmu. 99 zł netto miesięcznie.",
  alternates: { canonical: "/artykul-z-filmu-youtube" },
  openGraph: {
    title: "Artykuł z filmu YouTube za 99 zł miesięcznie | Fluxlab",
    description:
      "Każdy nowy film z kanału trafia mailem jako gotowy artykuł do wklejenia na bloga.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, artykuł z filmu YouTube",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="artykul-z-filmu-youtube"
      breadcrumb="Artykuł z filmu YouTube"
      typ="usluga"
      h1="Film już masz. Artykuł na blog zrobimy z niego sami."
      lead="Podajesz link do kanału albo do dowolnego filmu na YouTube. W kilka minut po płatności dostajesz mailem artykuł z najnowszego filmu. Potem co dobę sprawdzamy kanał i z każdego nowego filmu robimy kolejny artykuł z tytułem i opisem do wyszukiwarki. Wklejasz go na bloga, zamiast pisać od zera."
      ctaLabel="Włącz artykuły z filmów"
      ctaNote="99 zł netto miesięcznie, rezygnacja w każdej chwili"
      checks={[
        {
          title: "Artykuł z najnowszego filmu od razu",
          desc: "Zaraz po płatności bierzemy ostatni film z kanału i wysyłamy artykuł. Widzisz, jak to wygląda, zanim pojawi się następny film.",
        },
        {
          title: "Każdy nowy film automatycznie",
          desc: "Kanał sprawdzamy co dobę. Gdy pojawi się film, YouTube potrzebuje czasem kilku godzin na napisy, więc próbujemy do trzech razy w kolejnych dniach.",
        },
        {
          title: "Tytuł i opis do wyszukiwarki",
          desc: "Do artykułu dostajesz propozycję tytułu i opisu w wyszukiwarce oraz plik z gotowym tekstem. Wklejasz go do edytora bloga.",
        },
        {
          title: "Tekst oparty na filmie",
          desc: "Artykuł powstaje z napisów filmu i trzyma się tego, co w nim padło. Nie dopisujemy faktów ani liczb, których nie było w nagraniu.",
        },
      ]}
      pricing={[
        {
          name: "Artykuły z filmów na jednym kanale",
          price: "99 zł",
          kup: "artykul-z-filmu",
          desc: "Netto, miesięcznie. Pierwszy artykuł w kilka minut.",
          features: [
            "kanał podany linkiem do kanału albo do filmu",
            "artykuł z najnowszego filmu od razu",
            "kolejne filmy z kanału automatycznie, do 3 naraz",
            "tytuł i opis do wyszukiwarki w każdym mailu",
            "tekst także jako plik do wklejenia na bloga",
            "rezygnacja w każdej chwili",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy film musi mieć napisy?",
          a: "Tak. Pracujemy na napisach z YouTube, także tych tworzonych automatycznie, po polsku albo po angielsku. Gdy najnowszy film nie ma napisów, bierzemy jeden z dwóch poprzednich. Jeśli żaden nie ma, zwracamy całą kwotę.",
        },
        {
          q: "Czy mogę podać kanał, którego nie prowadzę?",
          a: "Artykuł powstaje z cudzego nagrania, więc publikuj tylko teksty z filmów, do których masz prawa, czyli ze swojego kanału.",
        },
        {
          q: "Czy artykuł nadaje się do publikacji bez czytania?",
          a: "Przejrzyj go przed publikacją. Tekst robi AI z napisów filmu, a napisy automatyczne bywają błędne przy nazwach własnych i liczbach.",
        },
        {
          q: "Co, gdy nie rozpoznacie kanału?",
          a: "Jeśli z podanego linku nie da się ustalić kanału, zwracamy całą kwotę.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Anulujesz subskrypcję. Artykuły kończą się wtedy same, a zapisaną listę filmów usuwamy.",
        },
      ]}
      formId="order_artykul_wideo"
      formHeading="Więcej niż jeden kanał?"
      formIntro="Napisz, ile kanałów chcesz obsłużyć i w jakim języku są filmy, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Artykuł z filmu YouTube"
      serviceDesc="Każdy nowy film z kanału klienta zamieniony na artykuł na blog z tytułem i opisem do wyszukiwarki, mailem, 99 zł netto miesięcznie."
      serviceType="Treści blogowe z filmów"
    />
  );
}
