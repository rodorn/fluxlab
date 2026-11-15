import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Faktury z maila na Dysk i do arkusza, 29 zł | Fluxlab",
  description: "Faktury w PDF z poczty same trafiają do folderów miesięcznych na Dysku Google i do arkusza z listą. 29 zł netto miesięcznie.",
  alternates: { canonical: "/faktury-z-maila-na-dysk" },
  openGraph: {
    title: "Faktury z maila na Dysk i do arkusza, 29 zł | Fluxlab",
    description: "Faktury w PDF z poczty same trafiają do folderów miesięcznych na Dysku Google i do arkusza z listą. 29 zł netto miesięcznie.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Faktury z maila na Dysk",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="faktury-z-maila"
      breadcrumb="Faktury z maila na Dysk i do arkusza"
      eyebrow="Faktury kosztowe"
      typ="usluga"
      h1="Faktury z maila na Dysk i do arkusza bez przepisywania"
      lead="Łączysz konto Google jednym kliknięciem, a każda faktura w PDF z poczty trafia do folderu miesiąca na Dysku i jako wiersz do arkusza: data, nadawca, temat, plik i link. Księgowa ma wszystko w jednym miejscu."
      ctaLabel="Zamów i połącz konto Google"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Foldery miesięczne",
          desc: "Faktury lądują w folderach RRRR-MM w katalogu Fluxlab. Nazwa pliku zaczyna się od daty maila.",
        },
        {
          title: "Arkusz z listą",
          desc: "Arkusz „Faktury z maila” dostaje nowy wiersz przy każdym pliku, z linkiem do niego.",
        },
        {
          title: "Poczta tylko do odczytu",
          desc: "Nic nie usuwamy, nie wysyłamy i nie przenosimy. Dostęp odwołasz w ustawieniach konta Google.",
        },
      ]}
      pricing={[
        {
          name: "Faktury z maila na Dysk i do arkusza",
          price: "29 zł/mies.",
          kup: "faktury-z-maila",
          desc: "Netto. Uruchamia się sam po płatności i zgodzie na dostęp do konta Google.",
          features: [
            "zapis faktur w PDF do folderów miesięcznych",
            "arkusz z listą faktur i linkami",
            "sprawdzanie skrzynki co kilkanaście minut",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jak usługa rozpoznaje faktury?",
          a: "Bierze załączniki PDF, gdy temat maila albo nazwa pliku zawiera słowo faktura, rachunek lub proforma (także po angielsku). Możesz zawęzić nadawców do wskazanych adresów.",
        },
        {
          q: "Od kiedy zapisywane są faktury?",
          a: "Od chwili połączenia konta. Starsze maile nie są pobierane.",
        },
        {
          q: "Jakie uprawnienia daje konto Google?",
          a: "Odczyt poczty oraz dostęp do plików, folderów i arkusza, które sami utworzymy. Nie widzimy innych plików z Dysku.",
        },
        {
          q: "Dlaczego Google pokazuje ostrzeżenie?",
          a: "Aplikacja nie przeszła jeszcze pełnej weryfikacji Google, więc pojawia się ekran „Aplikacja nie jest zweryfikowana”. Klikasz „Zaawansowane” i „Przejdź do fluxlab.pl”.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Odpisz na dowolny mail od nas albo użyj panelu płatności w Stripe. Po anulowaniu faktury przestają być zapisywane.",
        },
      ]}
      formId="order_faktury_z_maila"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Faktury z maila na Dysk i do arkusza"
      serviceDesc="Faktury w PDF z poczty same trafiają do folderów miesięcznych na Dysku Google i do arkusza z listą. 29 zł netto miesięcznie."
      serviceType="Faktury z maila na Dysk"
    />
  );
}
