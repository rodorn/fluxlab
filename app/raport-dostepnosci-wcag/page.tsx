import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Raport dostępności strony WCAG, 49 zł | Fluxlab",
  description:
    "Automatyczny test dostępności strony głównej według WCAG 2.2 AA: kontrast, opisy obrazków, formularze, nagłówki. Raport mailem, 49 zł netto.",
  alternates: { canonical: "/raport-dostepnosci-wcag" },
  openGraph: {
    title: "Raport dostępności strony WCAG, 49 zł | Fluxlab",
    description:
      "Lista błędów dostępności strony z miejscem na stronie i wskazówką poprawki.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, raport dostępności WCAG",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="raport-dostepnosci-wcag"
      breadcrumb="Raport dostępności WCAG"
      eyebrow="Dostępność strony"
      typ="usluga"
      h1="Raport dostępności strony według WCAG: lista błędów do poprawy"
      lead="Płacisz kartą, wpisujesz adres strony i w kilka minut dostajesz mailem raport. Otwieramy stronę w przeglądarce i sprawdzamy ją narzędziem axe pod kątem WCAG 2.2 AA, czyli standardu, do którego odwołuje się europejska ustawa o dostępności."
      ctaLabel="Zamów raport"
      ctaNote="49 zł netto, jednorazowo, bez umowy"
      checks={[
        {
          title: "Błędy z miejscem na stronie",
          desc: "Każdy błąd dostaje opis po polsku, liczbę wystąpień i przykładowy element, w którym go znaleźliśmy.",
        },
        {
          title: "Kontrast, opisy, formularze",
          desc: "Kontrast tekstu, teksty alternatywne obrazków, etykiety pól formularza, nazwy przycisków i linków, nagłówki.",
        },
        {
          title: "Raport w kilka minut",
          desc: "Wynik przychodzi na adres z płatności. Gdy strona nie odpowiada pod podanym adresem, zwracamy całą kwotę.",
        },
      ]}
      pricing={[
        {
          name: "Raport dostępności jednej strony",
          price: "49 zł",
          kup: "wcag-raport",
          desc: "Netto, płatność jednorazowa. Raport mailem po płatności.",
          features: [
            "test strony głównej według WCAG 2.2 AA",
            "lista błędów z liczbą wystąpień i przykładem",
            "pełny zwrot, gdy strona nie odpowiada",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co wpisać przy zamówieniu?",
          a: "Sam adres strony, na przykład twojafirma.pl. Sprawdzamy stronę główną. Raport przyjdzie na adres e-mail podany przy płatności.",
        },
        {
          q: "Czy raport wystarczy do spełnienia wymogów?",
          a: "Nie. Narzędzia automatyczne wykrywają tylko część błędów dostępności, zwykle mniej niż połowę. Raport wskazuje to, co da się zmierzyć maszynowo, i nie jest opinią prawną ani certyfikatem.",
        },
        {
          q: "Czy sprawdzacie całą witrynę?",
          a: "Nie, tylko stronę główną. Błędy w szablonach powtarzają się zwykle na innych podstronach, więc lista jest dobrym punktem startu.",
        },
        {
          q: "Co jeśli strona nie odpowiada?",
          a: "Zwracamy całą kwotę i wysyłamy o tym wiadomość. Po sprawdzeniu adresu możesz zamówić ponownie.",
        },
        {
          q: "Kiedy przyjdzie faktura?",
          a: "W ciągu 1 dnia roboczego na adres e-mail podany przy płatności.",
        },
      ]}
      formId="order_wcag_raport"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Płatność jednorazowa, pełny zwrot, gdy nie da się sprawdzić strony."
      serviceName="Raport dostępności strony WCAG"
      serviceDesc="Raport mailem z automatycznego testu dostępności strony głównej według WCAG 2.2 AA. 49 zł netto."
      serviceType="Test dostępności strony"
    />
  );
}
