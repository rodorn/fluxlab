import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Raport o firmie w internecie, PDF za 29 zł | Fluxlab",
  description:
    "Raport PDF mailem: domena, certyfikat, widoczność w wyszukiwarce, dostęp dla robotów AI i zabezpieczenie poczty. 29 zł netto, bez umowy.",
  alternates: { canonical: "/raport-o-firmie-w-internecie" },
  openGraph: {
    title: "Raport o firmie w internecie, PDF za 29 zł | Fluxlab",
    description:
      "Jeden PDF z kontrolą domeny, certyfikatu, widoczności strony i poczty firmy.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, raport o firmie w internecie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="raport-o-firmie-w-internecie"
      breadcrumb="Raport o firmie w internecie"
      eyebrow="Kontrola techniczna"
      typ="usluga"
      h1="Raport PDF o stronie i poczcie firmy: co działa, co poprawić"
      lead="Płacisz kartą, wpisujesz adres strony firmy i w kilka minut dostajesz mailem raport w PDF. Sprawdzamy domenę, certyfikat, widoczność w wyszukiwarce, dostęp dla robotów AI oraz zabezpieczenie poczty."
      ctaLabel="Zamów raport"
      ctaNote="29 zł netto, jednorazowo, bez umowy"
      checks={[
        {
          title: "Domena i certyfikat",
          desc: "Do kiedy ważna jest domena, na kogo jest zarejestrowana i czy przeglądarka otwiera stronę bez ostrzeżeń.",
        },
        {
          title: "Wyszukiwarka i roboty AI",
          desc: "Czy coś blokuje indeksowanie strony i czy asystenci AI mają do niej dostęp.",
        },
        {
          title: "Poczta firmowa",
          desc: "Czy domena ma wpisy SPF i DMARC, bez których maile firmy częściej trafiają do spamu.",
        },
      ]}
      pricing={[
        {
          name: "Raport o firmie w internecie",
          price: "29 zł",
          kup: "firma-raport",
          desc: "Netto, płatność jednorazowa. PDF mailem po płatności.",
          features: [
            "pięć kontroli w jednym PDF",
            "każdy wynik z krótkim wyjaśnieniem",
            "pełny zwrot, gdy strona nie odpowiada",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co wpisać przy zamówieniu?",
          a: "Sam adres strony firmy, na przykład twojafirma.pl. Raport przyjdzie na adres e-mail podany przy płatności.",
        },
        {
          q: "Co zawiera raport?",
          a: "Kontrolę domeny, certyfikatu szyfrowania, blokad indeksowania, dostępu robotów AI oraz wpisów SPF i DMARC poczty. Każdy wynik ma ocenę i opis.",
        },
        {
          q: "Czy raport sprawdza opinie i wizytówkę w Google?",
          a: "Nie. Sprawdzamy wyłącznie to, co da się zmierzyć publicznie bez logowania: domenę, stronę i zabezpieczenie poczty.",
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
      formId="order_firma_raport"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Płatność jednorazowa, pełny zwrot, gdy nie da się sprawdzić strony."
      serviceName="Raport o firmie w internecie"
      serviceDesc="Raport PDF mailem: domena, certyfikat, widoczność w wyszukiwarce, dostęp robotów AI i zabezpieczenie poczty. 29 zł netto."
      serviceType="Raport techniczny strony firmy"
    />
  );
}
