import type { Metadata } from "next";
import AdresyEDoreczenForm from "@/components/AdresyEDoreczenForm";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Adresy do e-Doręczeń z listy firm, za darmo | Fluxlab",
  description:
    "Wklej listę NIP, dostaniesz plik z adresami do e-Doręczeń wpisanymi do KRS. Do 50 firm na raz, za darmo, wynik od razu na stronie i mailem.",
  alternates: { canonical: "/adresy-do-edoreczen" },
  openGraph: {
    title: "Adresy do e-Doręczeń z listy firm, za darmo | Fluxlab",
    description:
      "Lista NIP na wejściu, plik z adresami do e-Doręczeń na wyjściu. Do 50 firm na raz.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, adresy do e-Doręczeń z listy firm",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="adresy-do-edoreczen"
      tool={<AdresyEDoreczenForm />}
      typ="narzedzie"
      breadcrumb="Adresy do e-Doręczeń"
      eyebrow="Kontrahenci i e-Doręczenia"
      h1="Adresy do e-Doręczeń Twoich kontrahentów, z jednej listy NIP"
      lead="Wklejasz numery NIP, a dostajesz plik z adresami do e-Doręczeń, które spółki mają wpisane w KRS, i listę firm bez adresu. Bez zakładania konta."
      ctaLabel="Wklej listę NIP"
      ctaNote="Za darmo, do 50 firm na raz"
      checks={[
        {
          title: "Skąd bierzemy adres",
          desc: "Z odpisu aktualnego KRS. Adres pojawia się tam dopiero wtedy, gdy spółka wpisała go do bazy adresów elektronicznych, więc to ten sam stan, który widzi urząd.",
        },
        {
          title: "Jak łączymy NIP z KRS",
          desc: "Numer KRS pobieramy z wykazu podatników VAT Ministerstwa Finansów. Błędny NIP albo firmę spoza wykazu oznaczamy osobno.",
        },
        {
          title: "Czego tu nie znajdziesz",
          desc: "Jednoosobowe działalności nie mają numeru KRS, więc ich adresów w tym rejestrze nie ma. Takie firmy oznaczamy w pliku.",
        },
        {
          title: "Co dostajesz",
          desc: "Tabelę na stronie oraz mail z plikiem CSV do Excela: NIP, nazwa, KRS, adres do e-Doręczeń i status.",
        },
      ]}
      pricing={[
        {
          name: "Adresy z listy NIP",
          price: "0 zł",
          desc: "Do 50 numerów NIP w jednej liście, trzy listy na dobę z jednego adresu e-mail.",
          features: [
            "wynik od razu na stronie",
            "plik CSV mailem",
            "oznaczone firmy bez KRS i błędne numery",
          ],
          href: "#narzedzie",
          cta: "Wklej listę",
        },
      ]}
      faq={[
        {
          q: "Czy adres z listy to adres do wysyłania pism?",
          a: "To adres do e-Doręczeń wpisany w KRS, na który urzędy i firmy mogą kierować pisma. Skrzynka musi być aktywna u dostawcy usługi, a my tego nie sprawdzamy.",
        },
        {
          q: "Dlaczego firma nie ma adresu?",
          a: "Albo nie złożyła wniosku, albo wniosek czeka na aktywację. Kary za brak adresu nie ma, ale urzędy doręczają wtedy pisma papierowo.",
        },
        {
          q: "Co dzieje się z listą i adresem e-mail?",
          a: "Lista służy tylko do przygotowania wyniku i nie jest zapisywana. Adres e-mail zapisujemy razem ze zgodą na wysłanie wyniku. Zgodę wycofasz jednym kliknięciem w mailu.",
        },
        {
          q: "Co z firmami, które mają status CEIDG?",
          a: "Jednoosobowe działalności nie mają wpisu w KRS, więc oznaczamy je jako firmy bez numeru KRS. Ich adresów do e-Doręczeń ten rejestr nie zawiera.",
        },
      ]}
      formId="order_adresy_edoreczen"
      formHeading="Masz większą listę albo pytanie"
      formIntro="Napisz, ile firm sprawdzasz i do czego potrzebujesz adresów. Odpowiemy, jak to zrobić."
      submitLabel="Wyślij"
      microCopy="Odpowiadamy w ciągu jednego dnia roboczego."
      serviceName="Adresy do e-Doręczeń z listy firm"
      serviceDesc="Darmowe narzędzie: z listy numerów NIP przygotowuje plik z adresami do e-Doręczeń wpisanymi do KRS."
      serviceType="Weryfikacja kontrahentów"
    />
  );
}
