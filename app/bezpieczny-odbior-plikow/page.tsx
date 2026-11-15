import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Bezpieczny odbiór plików od klientów za 19 zł | Fluxlab",
  description:
    "Link, pod którym klienci wysyłają firmie pliki do 100 MB bez maila i bez konta. Mail przy nowych plikach, usuwanie po 30 dniach. 19 zł netto miesięcznie.",
  alternates: { canonical: "/bezpieczny-odbior-plikow" },
  openGraph: {
    title: "Bezpieczny odbiór plików od klientów za 19 zł | Fluxlab",
    description:
      "Klient wysyła plik przez Twój link, a Ty dostajesz mail i stronę do pobrania. Bez limitu załączników poczty.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, bezpieczny odbiór plików",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="bezpieczny-odbior-plikow"
      breadcrumb="Bezpieczny odbiór plików"
      typ="usluga"
      h1="Klienci przesyłają dokumenty mailem? Daj im link do wysyłki"
      lead="Po płatności dostajesz adres, pod którym każdy może wysłać firmie pliki do 100 MB, bez konta i bez limitu załączników poczty. Ty dostajesz mail z listą nowych plików i stronę do ich pobrania. Pliki znikają po 30 dniach."
      ctaLabel="Uruchom odbiór plików"
      ctaNote="19 zł netto miesięcznie, rezygnacja w każdej chwili"
      checks={[
        {
          title: "Dwa osobne linki",
          desc: "Link dla nadawców tylko przyjmuje pliki, a odbiór jest pod drugim, tajnym adresem znanym wyłącznie Tobie.",
        },
        {
          title: "Szyfrowane połączenie",
          desc: "Plik jedzie przez HTTPS. Blokujemy typy wykonywalne, takie jak exe, js czy bat, a pobranie zawsze wymusza zapis pliku.",
        },
        {
          title: "Porządek po 30 dniach",
          desc: "Pliki są usuwane automatycznie, a po anulowaniu abonamentu znika cała skrzynka. Nic nie zostaje na serwerze.",
        },
      ]}
      pricing={[
        {
          name: "Skrzynka na pliki dla firmy",
          price: "19 zł",
          kup: "bezpieczny-odbior",
          desc: "Netto, miesięcznie. Linki w mailu w kilka minut po płatności.",
          features: [
            "link do wysyłania dla klientów, bez konta",
            "pliki do 100 MB, łącznie do 1 GB w skrzynce",
            "mail z podsumowaniem nowych plików",
            "automatyczne usuwanie po 30 dniach",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy pliki są sprawdzane antywirusem?",
          a: "Nie. Blokujemy typy wykonywalne, ale zawartość archiwów i dokumentów nie jest skanowana, więc otwieraj tylko pliki od osób, które znasz.",
        },
        {
          q: "Kto może wysłać plik?",
          a: "Każdy, kto zna link dla nadawców. Nie podawaj go publicznie, jeśli nie chcesz przyjmować plików od przypadkowych osób. Liczba wysyłek z jednego adresu jest ograniczona.",
        },
        {
          q: "Co dzieje się po anulowaniu?",
          a: "Skrzynka i wszystkie pliki są usuwane przy najbliższym porządkowaniu, następnego dnia rano. Pobierz je wcześniej.",
        },
        {
          q: "Co, jeśli nazwa firmy będzie pusta?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem, więc nic nie tracisz.",
        },
      ]}
      formId="order_bezpieczny_odbior"
      formHeading="Zapytaj o większe limity"
      formIntro="Potrzebujesz plików powyżej 100 MB, dłuższego przechowywania albo własnej domeny? Napisz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Bezpieczny odbiór plików od klientów"
      serviceDesc="Link do wysyłania plików do 100 MB bez konta, mail przy nowych plikach i automatyczne usuwanie po 30 dniach za 19 zł netto miesięcznie."
      serviceType="Odbiór plików od klientów"
    />
  );
}
