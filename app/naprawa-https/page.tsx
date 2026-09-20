import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import HttpsCheck from "@/components/HttpsCheck";

export const metadata: Metadata = {
  title:
    "Przeglądarka ostrzega przed Twoją stroną, naprawa HTTPS od 390 zł | Fluxlab",
  description:
    "Wygasły certyfikat albo certyfikat hostingu zamiast Twojego oznacza pełnoekranowe ostrzeżenie dla każdego odwiedzającego. Diagnozuję przyczynę i naprawiam szyfrowanie razem z przekierowaniami, zwykle w jeden dzień roboczy.",
  alternates: { canonical: "/naprawa-https" },
  openGraph: {
    title:
      "Przeglądarka ostrzega przed Twoją stroną, naprawa HTTPS od 390 zł | Fluxlab",
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
      lead="Wklej swój adres zaczynający się od https, nie z zakładki i nie z wyszukiwarki. Jeśli zobaczysz czerwony ekran z ostrzeżeniem, to samo widzi każdy, kto trafia do Ciebie z Google. Strona jest na serwerze i działa, ale odwiedzający musi kliknąć zgodę na ryzyko, czego prawie nikt nie robi."
      ctaLabel="Sprawdź moją stronę"
      ctaNote="Diagnoza tego samego dnia"
      checks={[
        {
          title: "Certyfikat po terminie",
          desc: "Najczęstszy i najprostszy przypadek. Zdarza się, że certyfikat jest przeterminowany od lat, a firma o tym nie wie, bo sama wchodzi na stronę z zakładki.",
        },
        {
          title: "Certyfikat hostingu zamiast Twojego",
          desc: "Serwer podaje certyfikat wystawiony na nazwę firmy hostingowej. Przeglądarka traktuje to jak próbę podszycia się pod cudzą stronę i blokuje wejście.",
        },
        {
          title: "Przekierowanie prowadzące w pustkę",
          desc: "Najcięższy przypadek: adres bez szyfrowania automatycznie przenosi na adres szyfrowany, który nie działa. Wtedy do strony nie da się dotrzeć żadną drogą.",
        },
        {
          title: "Zasoby ładowane bez szyfrowania",
          desc: "Strona otwiera się, ale kłódka jest przekreślona, bo zdjęcia albo skrypty ładują się starym adresem. To psuje zaufanie i bywa blokowane przez przeglądarkę.",
        },
      ]}
      pricing={[
        {
          name: "Diagnoza",
          price: "0 zł",
          desc: "Piszesz adres, odsyłam konkretną przyczynę.",
          features: [
            "co dokładnie widzi odwiedzający",
            "na jaką nazwę wystawiony jest certyfikat",
            "czy strona jest całkiem nieosiągalna",
          ],
        },
        {
          name: "Naprawa",
          price: "od 390 zł",
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
          q: "Czego potrzebujesz, żeby postawić diagnozę?",
          a: "Tylko adresu strony. Diagnoza opiera się na tym, co Twój serwer i tak pokazuje publicznie każdemu odwiedzającemu. Dostępy są potrzebne dopiero do samej naprawy.",
        },
        {
          q: "Czy muszę zmieniać hosting?",
          a: "Prawie nigdy. W większości przypadków wystarczy poprawnie wystawić i wpiąć certyfikat na obecnym hostingu, a u popularnych dostawców to kwestia ustawień, nie przeprowadzki.",
        },
        {
          q: "Czy certyfikat nie jest darmowy?",
          a: "Sam certyfikat tak i nie ukrywam tego. Płacisz za ustalenie, co konkretnie jest zepsute, poprawne wpięcie po stronie serwera oraz za przekierowania i odwołania w treści, bo to one najczęściej są prawdziwym problemem.",
        },
        {
          q: "Skąd mam wiedzieć, że problem naprawdę istnieje?",
          a: "Sprawdzisz to sam w pięć sekund. Wklej swój adres z https do paska przeglądarki, koniecznie nie z zakładki, bo wejście z zakładki potrafi ominąć problem.",
        },
        {
          q: "Czy to jest audyt bezpieczeństwa strony?",
          a: "Nie. Zajmuję się warstwą szyfrowania połączenia i mówię to wprost. Nie badam podatności aplikacji ani zawartości serwera.",
        },
      ]}
      formId="order_naprawa_https"
      formHeading="Sprawdź swoją stronę"
      formIntro="Podaj adres strony. Odeślę konkretną przyczynę ostrzeżenia, a jeśli wszystko jest w porządku, napiszę to wprost i na tym koniec."
      submitLabel="Poproś o diagnozę"
      microCopy="Diagnoza opiera się wyłącznie na publicznie dostępnych danych Twojego serwera. Nie loguję się nigdzie i niczego nie testuję obciążeniowo."
      serviceName="Diagnoza i naprawa warstwy HTTPS strony firmowej"
      serviceDesc="Ustalenie przyczyny ostrzeżenia przeglądarki i naprawa: certyfikat wystawiony na właściwą domenę, przekierowania, warianty adresu, zasoby ładowane bez szyfrowania. Od 390 zł."
      serviceType="Naprawa konfiguracji szyfrowania strony internetowej"
    />
  );
}
