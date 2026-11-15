import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Omnibus w sklepie: raport za 29 zł | Fluxlab",
  description:
    "Raport mailem: czy sklep pokazuje najniższą cenę z 30 dni przy obniżkach i czy kupujący znajdzie zasady zwrotów. 29 zł netto, bez umowy.",
  alternates: { canonical: "/omnibus-w-sklepie" },
  openGraph: {
    title: "Omnibus w sklepie: raport za 29 zł | Fluxlab",
    description:
      "Sprawdzenie najniższej ceny z 30 dni i zasad zwrotów w sklepie internetowym, raport mailem.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, raport Omnibus dla sklepu",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="omnibus-w-sklepie"
      breadcrumb="Omnibus w sklepie"
      eyebrow="Zgodność sklepu"
      typ="usluga"
      h1="Raport Omnibus dla sklepu: najniższa cena z 30 dni i zasady zwrotów"
      lead="Płacisz kartą, wpisujesz adres sklepu i w kilka minut dostajesz mailem raport. Sprawdzamy, czy przy obniżkach jest informacja o najniższej cenie z 30 dni i czy kupujący znajdzie zasady zwrotów oraz reklamacji."
      ctaLabel="Zamów raport"
      ctaNote="29 zł netto, jednorazowo, bez umowy"
      checks={[
        {
          title: "Obniżki z listą do poprawy",
          desc: "Dla przecenionych produktów pokazujemy, na których nie ma informacji o najniższej cenie z 30 dni, każdy z linkiem.",
        },
        {
          title: "Zasady zwrotów i reklamacji",
          desc: "Lista rzeczy, których kupujący nie znajdzie na stronie: termin odstąpienia, adres zwrotu, koszty, formularz.",
        },
        {
          title: "Raport w kilka minut",
          desc: "Wynik przychodzi na adres z płatności. Gdy sklep nie odpowiada pod podanym adresem, zwracamy całą kwotę.",
        },
      ]}
      pricing={[
        {
          name: "Raport Omnibus dla jednego sklepu",
          price: "29 zł",
          kup: "omnibus-sklep",
          desc: "Netto, płatność jednorazowa. Raport mailem po płatności.",
          features: [
            "sprawdzenie przecen w sklepie na WooCommerce lub Shopify",
            "sprawdzenie stron ze zwrotami i regulaminu",
            "pełny zwrot, gdy adres sklepu nie odpowiada",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co wpisać przy zamówieniu?",
          a: "Sam adres sklepu, na przykład twojsklep.pl. Raport przyjdzie na adres e-mail podany przy płatności.",
        },
        {
          q: "Jakie sklepy da się sprawdzić?",
          a: "Najlepiej działa to dla sklepów na WooCommerce i Shopify, które udostępniają listę przecen. Gdy sklep jej nie udostępnia, raport mówi o tym wprost i zawiera część o zwrotach.",
        },
        {
          q: "Czy to jest porada prawna?",
          a: "Nie. To automatyczne sprawdzenie publicznie widocznych stron sklepu. Wskazuje miejsca warte poprawy, ale nie zastępuje opinii prawnika.",
        },
        {
          q: "Co jeśli sklep nie ma teraz promocji?",
          a: "Obowiązek dotyczy momentu obniżki, więc raport napisze, że nie ma czego sprawdzać w części o cenach. Część o zwrotach i tak zostanie sprawdzona.",
        },
        {
          q: "Kiedy przyjdzie faktura?",
          a: "W ciągu 1 dnia roboczego na adres e-mail podany przy płatności.",
        },
      ]}
      formId="order_omnibus_sklep"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Płatność jednorazowa, pełny zwrot, gdy nie da się sprawdzić sklepu."
      serviceName="Raport Omnibus dla sklepu internetowego"
      serviceDesc="Raport mailem: najniższa cena z 30 dni przy obniżkach i zasady zwrotów w sklepie internetowym. 29 zł netto."
      serviceType="Raport zgodności sklepu"
    />
  );
}
