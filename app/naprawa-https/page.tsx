import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import HttpsCheck from "@/components/HttpsCheck";

export const metadata: Metadata = {
  title: "Naprawa HTTPS, koniec ostrzeżeń przeglądarki | Fluxlab",
  description:
    "Wygasły certyfikat oznacza pełnoekranowe ostrzeżenie dla każdego odwiedzającego. Diagnozujemy przyczynę i naprawiamy szyfrowanie razem z przekierowaniami.",
  alternates: { canonical: "/naprawa-https" },
  openGraph: {
    title: "Naprawa HTTPS, koniec ostrzeżeń przeglądarki | Fluxlab",
    description:
      "Diagnoza i naprawa warstwy szyfrowania: wygasły certyfikat, certyfikat hostingu, pętla przekierowań, mieszana treść.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, naprawa HTTPS",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="naprawa-https"
      tool={<HttpsCheck />}
      breadcrumb="Naprawa HTTPS"
      eyebrow="Ostrzeżenie przeglądarki"
      h1="Twoja strona działa, tylko nikt jej nie widzi"
      lead="Wpisz swój adres z https ręcznie, nie z zakładki. Jeśli widzisz ostrzeżenie przeglądarki, widzi je każdy klient z Google i prawie nikt nie klika dalej."
      ctaLabel="Sprawdź naszą stronę"
      ctaNote="Diagnoza tego samego dnia"
      powiazane={[
        {
          przed: "Strona przekierowuje na obce serwisy? To zwykle włamanie, zobacz",
          kotwica: "czyszczenie zhakowanej strony WordPress",
          href: "/strona-po-wlamaniu",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Certyfikat po terminie",
          desc: "Najczęstszy przypadek. Bywa przeterminowany od lat, a firma o tym nie wie.",
        },
        {
          title: "Certyfikat hostingu zamiast Twojego",
          desc: "Certyfikat na nazwę hostingu. Przeglądarka blokuje wejście.",
        },
        {
          title: "Przekierowanie prowadzące w pustkę",
          desc: "Adres http przenosi na https, który nie działa. Strona jest nieosiągalna.",
        },
        {
          title: "Zasoby ładowane bez szyfrowania",
          desc: "Kłódka przekreślona, bo zdjęcia albo skrypty ładują się po http.",
        },
      ]}
      pricing={[
        {
          name: "Diagnoza",
          price: "0 zł",
          desc: "Piszesz adres, odsyłamy konkretną przyczynę.",
          features: [
            "co dokładnie widzi odwiedzający",
            "na jaką nazwę wystawiony jest certyfikat",
            "czy strona jest całkiem nieosiągalna",
          ],
        },
        {
          name: "Naprawa",
          price: "od 190 zł",
          desc: "Certyfikat, przekierowania, warianty adresu.",
          features: [
            "poprawny certyfikat na Twoją domenę",
            "przekierowania, które nie prowadzą w pustkę",
            "wariant z www i bez www",
            "ponowne sprawdzenie po zmianach",
          ],
          featured: true,
        },
        {
          name: "Pilnowanie ważności",
          price: "39 zł/mc",
          desc: "Żeby to się nie powtórzyło.",
          features: [
            "sprawdzanie certyfikatu co dobę",
            "ostrzeżenie na trzy tygodnie przed końcem",
            "krótka informacja, co zrobić",
          ],
        },
      ]}
      faq={[
        {
          q: "Co znaczy „Połączenie nie jest prywatne”?",
          a: "Przyczynę podaje kod pod ostrzeżeniem. ERR_CERT_DATE_INVALID to certyfikat po terminie, ERR_CERT_COMMON_NAME_INVALID certyfikat na inną nazwę, ERR_CERT_AUTHORITY_INVALID certyfikat samopodpisany albo niepełny.",
        },
        {
          q: "Jak długo jest ważny certyfikat SSL w 2026 roku?",
          a: "Od 15 marca 2026 najwyżej 200 dni, od 15 marca 2027 już 100 dni. Ręczne odnawianie przestaje się sprawdzać, certyfikat musi odnawiać się sam.",
        },
        {
          q: "Dlaczego kłódka jest przekreślona, choć certyfikat jest ważny?",
          a: "Część plików ładuje się starym adresem http. Przeglądarka je blokuje, stąd znikające zdjęcia i niedziałające formularze.",
        },
        {
          q: "Czy certyfikat nie jest darmowy?",
          a: "Sam certyfikat tak. Płacisz za znalezienie przyczyny, poprawne wpięcie na serwerze i przekierowania.",
        },
      ]}
      formId="order_naprawa_https"
      formHeading="Sprawdź swoją stronę"
      formIntro="Podaj adres strony. Odeślemy przyczynę ostrzeżenia albo potwierdzimy, że wszystko jest w porządku."
      submitLabel="Poproś o diagnozę"
      microCopy="Diagnoza tylko na publicznych danych serwera, bez logowania."
      serviceName="Diagnoza i naprawa warstwy HTTPS strony firmowej"
      serviceDesc="Ustalenie przyczyny ostrzeżenia przeglądarki i naprawa: certyfikat wystawiony na właściwą domenę, przekierowania, warianty adresu, zasoby ładowane bez szyfrowania. Od 190 zł."
      serviceType="Naprawa konfiguracji szyfrowania strony internetowej"
    />
  );
}
