import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Załączniki z maila do folderów na Dysku, 19 zł | Fluxlab",
  description: "Pliki od wybranych nadawców same trafiają do folderów na Dysku Google. 19 zł netto miesięcznie, bez instalowania czegokolwiek.",
  alternates: { canonical: "/zalaczniki-z-maila-do-folderow" },
  openGraph: {
    title: "Załączniki z maila do folderów na Dysku, 19 zł | Fluxlab",
    description: "Pliki od wybranych nadawców same trafiają do folderów na Dysku Google. 19 zł netto miesięcznie, bez instalowania czegokolwiek.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Załączniki z maila do folderów",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="zalaczniki-z-maila"
      breadcrumb="Załączniki z maila do folderów na Dysku"
      eyebrow="Załączniki z poczty"
      typ="usluga"
      h1="Załączniki z maila same lądują w folderach na Dysku"
      lead="Podajesz adresy nadawców, łączysz konto Google jednym kliknięciem, a każdy załącznik od nich trafia do folderu na Dysku, osobnego dla każdego nadawcy. Bez ręcznego zapisywania i szukania w skrzynce."
      ctaLabel="Zamów i połącz konto Google"
      ctaNote="19 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Folder na nadawcę",
          desc: "Każdy nadawca ma własny folder w katalogu Fluxlab na Twoim Dysku. Nazwy plików zaczynają się od daty maila.",
        },
        {
          title: "Tylko wskazani nadawcy",
          desc: "Zapisujemy załączniki wyłącznie od adresów lub domen z zamówienia. Pozostałe maile nie są otwierane.",
        },
        {
          title: "Poczta tylko do odczytu",
          desc: "Nic nie usuwamy, nie wysyłamy i nie przenosimy. Dostęp odwołasz w ustawieniach konta Google.",
        },
      ]}
      pricing={[
        {
          name: "Załączniki z maila do folderów na Dysku",
          price: "19 zł/mies.",
          kup: "zalaczniki-z-maila",
          desc: "Netto. Uruchamia się sam po płatności i zgodzie na dostęp do konta Google.",
          features: [
            "zapis załączników od wskazanych nadawców",
            "osobny folder dla każdego nadawcy",
            "sprawdzanie skrzynki co kilkanaście minut",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jak ruszyć z usługą?",
          a: "Po płatności wchodzisz na stronę połączenia i logujesz się na konto Google. Usługa zapisuje załączniki z maili, które przyjdą po tym momencie.",
        },
        {
          q: "Jakie uprawnienia daje konto Google?",
          a: "Odczyt poczty oraz dostęp do plików i folderów, które sami utworzymy na Dysku. Nie widzimy innych plików z Dysku.",
        },
        {
          q: "Dlaczego Google pokazuje ostrzeżenie?",
          a: "Aplikacja nie przeszła jeszcze pełnej weryfikacji Google, więc pojawia się ekran „Aplikacja nie jest zweryfikowana”. Klikasz „Zaawansowane” i „Przejdź do fluxlab.pl”.",
        },
        {
          q: "Jak odwołać dostęp?",
          a: "W ustawieniach konta Google, w uprawnieniach aplikacji, usuwasz Fluxlab Automaty. Usługa przestaje działać i wysyła mail z informacją.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Odpisz na dowolny mail od nas albo użyj panelu płatności w Stripe. Po anulowaniu pliki przestają być zapisywane.",
        },
      ]}
      formId="order_zalaczniki_z_maila"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Załączniki z maila do folderów na Dysku"
      serviceDesc="Pliki od wybranych nadawców same trafiają do folderów na Dysku Google. 19 zł netto miesięcznie, bez instalowania czegokolwiek."
      serviceType="Załączniki z maila do folderów"
    />
  );
}
