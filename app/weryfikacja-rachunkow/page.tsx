import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import { PodgladRachunkow } from "@/components/WeryfikacjaRachunkow";

export const metadata: Metadata = {
  title: "Weryfikacja rachunku przed przelewem, 29 zł/mies. | Fluxlab",
  description:
    "Wgrywasz paczkę przelewów z banku w CSV, a w kilkanaście sekund dostajesz listę rachunków spoza białej listy VAT. 29 zł netto miesięcznie.",
  alternates: { canonical: "/weryfikacja-rachunkow" },
  openGraph: {
    title: "Weryfikacja rachunku przed przelewem, 29 zł/mies. | Fluxlab",
    description: "Paczka przelewów w CSV i lista rachunków spoza białej listy VAT, zanim wyślesz pieniądze.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, weryfikacja rachunku przed przelewem" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="weryfikacja-rachunkow"
      tool={<PodgladRachunkow />}
      typ="usluga"
      breadcrumb="Weryfikacja rachunków"
      h1="Sprawdź rachunki z paczki przelewów, zanim wyślesz pieniądze"
      lead="Wgrywasz plik CSV z banku, a my porównujemy każdy rachunek z wykazem podatników VAT Ministerstwa Finansów. Dostajesz listę rachunków, których tam nie ma albo które należą do innej firmy niż kontrahent z paczki."
      ctaLabel="Włącz weryfikację"
      ctaNote="29 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Cała paczka naraz",
          desc: "Do 500 przelewów w jednym pliku. Rachunki odbiorców znajdujemy w CSV z dowolnego banku i w formacie Elixir-0.",
        },
        {
          title: "Rachunek i kontrahent muszą się zgadzać",
          desc: "Gdy w wierszu jest NIP, sprawdzamy, czy rachunek należy właśnie do niego. Podmiana numeru na fakturze wychodzi od razu.",
        },
        {
          title: "Wynik na stronie i mailem",
          desc: "Najpierw rachunki do sprawdzenia z powodem, na końcu pełna lista w pliku CSV. Dla kwot powyżej 15 000 zł zaznaczamy skutek podatkowy.",
        },
      ]}
      pricing={[
        {
          name: "Weryfikacja rachunków",
          price: "29 zł/mies.",
          kup: "weryfikacja-rachunkow",
          desc: "Netto. Dowolna liczba paczek, do 500 przelewów każda.",
          features: [
            "sprawdzenie w wykazie podatników VAT z dnia przelewu",
            "wynik na stronie i mailem z plikiem CSV",
            "ten sam link do kolejnych paczek",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co się dzieje po zapłacie?",
          a: "Po płatności trafiasz na stronę z wgraniem pliku, a ten sam link dostajesz mailem. Wynik pierwszej paczki widzisz od razu.",
        },
        {
          q: "Jaki plik mogę wgrać?",
          a: "CSV albo tekst z dowolnego banku, z nagłówkiem lub bez, oraz plik Elixir-0. Szukamy w wierszu 26-cyfrowego rachunku, z prefiksem PL lub bez. Gdy w wierszu są dwa rachunki, bierzemy ostatni, czyli odbiorcy.",
        },
        {
          q: "Skąd wiadomo, że rachunek jest bezpieczny?",
          a: "Porównujemy go z wykazem podatników VAT Ministerstwa Finansów, czyli białą listą. Rachunek, który tam jest, daje Ci pewność co do skutków podatkowych przelewu. Nie sprawdzamy uczciwości kontrahenta.",
        },
        {
          q: "Co z kontrahentami bez VAT?",
          a: "Rachunki podmiotów niebędących podatnikami VAT, na przykład osób prywatnych, nie są na białej liście i oznaczymy je jako spoza listy. Przepisy dotyczą przelewów między firmami powyżej 15 000 zł.",
        },
        {
          q: "Czy zapisujecie wgrane pliki?",
          a: "Nie. Plik jest przetwarzany w pamięci, a po wysłaniu wyniku nie zostaje nigdzie zapisany.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe. Po anulowaniu link do wgrywania przestaje działać.",
        },
      ]}
      formId="order_weryfikacja_rachunkow"
      formHeading="Masz więcej niż jedną firmę albo wielki plik?"
      formIntro="Napisz, ile przelewów wysyłasz miesięcznie. Odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Weryfikacja rachunku przed przelewem"
      serviceDesc="Sprawdzanie rachunków z paczki przelewów w wykazie podatników VAT, z wynikiem na stronie i mailem, za 29 zł netto miesięcznie."
      serviceType="Weryfikacja rachunków bankowych"
    />
  );
}
