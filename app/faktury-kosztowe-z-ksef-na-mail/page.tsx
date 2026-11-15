import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Faktury kosztowe z KSeF na maila, 29 zł/mies. | Fluxlab",
  description:
    "Codziennie rano mail z nowymi fakturami kosztowymi z KSeF: XML, PDF i zestawienie CSV. Bez logowania do KSeF i bez pilnowania terminu. 29 zł netto.",
  alternates: { canonical: "/faktury-kosztowe-z-ksef-na-mail" },
  openGraph: {
    title: "Faktury kosztowe z KSeF na maila, 29 zł/mies. | Fluxlab",
    description: "Nowa faktura kosztowa w KSeF trafia na Twojego maila następnego ranka, razem z plikiem XML i PDF.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, faktury kosztowe z KSeF na maila" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="faktury-kosztowe-z-ksef-na-mail"
      breadcrumb="Faktury kosztowe z KSeF na maila"
      eyebrow="KSeF dla firm"
      h1="Faktury kosztowe z KSeF same przychodzą na maila"
      lead="Od 2026 roku faktury od dostawców trafiają do KSeF, a nie do Twojej skrzynki. Podajesz NIP i token, a my codziennie rano wysyłamy Ci nowe faktury kosztowe jako XML i PDF z zestawieniem w CSV. Nie logujesz się do KSeF i nie pilnujesz, czy coś przyszło."
      ctaLabel="Włącz faktury na maila"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Księgowa woli raz w miesiącu komplet? Zobacz",
          kotwica: "paczkę miesięczną dla biura",
          href: "/paczka-miesieczna-dla-biura",
          po: ".",
        },
        {
          przed: "Nie wiesz, czy firma jest gotowa na KSeF? Zrób",
          kotwica: "test gotowości na KSeF 2027",
          href: "/ksef-2027",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Mail tylko wtedy, gdy jest co czytać",
          desc: "Rano dostajesz wiadomość, jeśli w ciągu poprzedniej doby w KSeF pojawiła się faktura kosztowa. Bez nowych faktur nie wysyłamy nic.",
        },
        {
          title: "Pliki gotowe do księgowania",
          desc: "W załączniku ZIP: XML z KSeF i PDF każdej faktury oraz zestawienie CSV z numerami, kontrahentami i kwotami, do otwarcia w Excelu.",
        },
        {
          title: "Token tylko do odczytu faktur, usuwany po rezygnacji",
          desc: "Token zapisujemy zaszyfrowany i używamy wyłącznie do pobrania faktur. Po anulowaniu subskrypcji usuwamy go przy najbliższym przebiegu.",
        },
      ]}
      pricing={[
        {
          name: "Faktury kosztowe codziennie",
          price: "29 zł/mies.",
          kup: "faktury-kosztowe",
          desc: "Netto. Jedna firma, jeden NIP, jeden adres e-mail i opcjonalnie drugi, na przykład księgowej.",
          features: [
            "nowe faktury kosztowe z KSeF co rano",
            "XML, PDF i zestawienie CSV",
            "pierwszy mail od razu, z fakturami z ostatnich 7 dni",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd wziąć token KSeF?",
          a: "W Aplikacji Podatnika KSeF, w zakładce Tokeny, wybierz Generuj token i zaznacz uprawnienie do przeglądania faktur. Po opłaceniu zamówienia na stronie z formularzem znajdziesz krótką instrukcję.",
        },
        {
          q: "O której przychodzą faktury?",
          a: "Rano, po siódmej. Wiadomość zawiera faktury, które pojawiły się w KSeF od poprzedniego maila.",
        },
        {
          q: "Co z fakturami, gdy token przestanie działać?",
          a: "Wyślemy Ci wiadomość z linkiem do formularza, w którym podasz nowy token. Faktury z czasu przerwy dojdą po jego podaniu.",
        },
        {
          q: "Co się dzieje z moimi danymi po rezygnacji?",
          a: "NIP i token usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Wysłane maile zostają w skrzynkach ich odbiorców.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail z fakturami. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_faktury_kosztowe"
      formHeading="Włącz faktury na maila"
      formIntro="Po opłaceniu zamówienia podasz NIP i token KSeF."
      submitLabel="Włącz faktury"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Faktury kosztowe z KSeF na maila"
      serviceDesc="Codziennie rano mail z nowymi fakturami kosztowymi z KSeF (XML, PDF, zestawienie CSV). 29 zł netto miesięcznie."
      serviceType="Automatyzacja księgowości"
    />
  );
}
