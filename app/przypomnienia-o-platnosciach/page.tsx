import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Przypomnienia o płatnościach faktur, 39 zł | Fluxlab",
  description:
    "Co rano mail z fakturami z KSeF, którym wypada przypomnieć o płatności, z gotowym tekstem dla nabywcy. Do Twoich klientów nic od nas nie wychodzi. 39 zł netto.",
  alternates: { canonical: "/przypomnienia-o-platnosciach" },
  openGraph: {
    title: "Przypomnienia o płatnościach faktur, 39 zł | Fluxlab",
    description: "Wiesz, komu i kiedy przypomnieć o fakturze, a tekst masz gotowy do wysłania.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, przypomnienia o płatnościach faktur z KSeF" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="przypomnienia-o-platnosciach"
      breadcrumb="Przypomnienia o płatnościach"
      eyebrow="KSeF dla firm"
      h1="Wiesz, komu przypomnieć o fakturze, a tekst masz gotowy"
      lead="Podajesz NIP i token KSeF, a my każdego ranka sprawdzamy Twoje faktury sprzedażowe z ostatnich 90 dni. Gdy któraś niezapłacona dojdzie do etapu przypomnienia (3 dni przed terminem oraz 1, 7 i 14 dni po nim), dostajesz mail z gotowym tekstem dla nabywcy, z numerem faktury, kwotą, terminem i rachunkiem z faktury. Wysyłasz go sam, ze swojej poczty."
      ctaLabel="Włącz przypomnienia o płatnościach"
      ctaNote="39 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Wolisz zestawienie raz w tygodniu? Zobacz",
          kotwica: "należności i przeterminowane faktury",
          href: "/naleznosci-i-przeterminowane-faktury",
          po: ".",
        },
        {
          przed: "Płacisz faktury dostawców? Zobacz",
          kotwica: "kontrolę faktur kosztowych przed zapłatą",
          href: "/kontrola-faktur-kosztowych",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Do Twoich klientów nic od nas nie wychodzi",
          desc: "Maile z przypomnieniem dostajesz tylko Ty (i opcjonalnie drugi adres, na przykład księgowej). Tekst do nabywcy wysyłasz sam, więc to Ty decydujesz, komu i kiedy.",
        },
        {
          title: "Cztery etapy, ton rośnie stopniowo",
          desc: "Uprzejme przypomnienie przed terminem, prośba dzień po, stanowcza prośba po tygodniu i pilna po dwóch tygodniach. Każdy etap dla danej faktury przychodzi jeden raz.",
        },
        {
          title: "Stan płatności z faktury",
          desc: "Bierzemy go ze znacznika zapłaty i terminu płatności w fakturze, nie z konta bankowego. Faktura opłacona przelewem, ale bez znacznika w KSeF, nadal figuruje jako niezapłacona.",
        },
        {
          title: "Token tylko do odczytu faktur, usuwany po rezygnacji",
          desc: "Token zapisujemy zaszyfrowany i używamy wyłącznie do pobrania faktur. Po anulowaniu subskrypcji usuwamy go przy najbliższym przebiegu.",
        },
      ]}
      pricing={[
        {
          name: "Przypomnienia o płatnościach",
          price: "39 zł/mies.",
          kup: "przypomnienia",
          desc: "Netto. Jedna firma, jeden NIP, jeden adres e-mail i opcjonalnie drugi, na przykład księgowej.",
          features: [
            "mail rano, gdy faktura dojdzie do etapu przypomnienia",
            "gotowy tekst dla nabywcy i odnośnik otwierający go w poczcie",
            "numer rachunku z faktury w treści, gdy faktura go podaje",
            "mail startowy od razu, z fakturami, które już czekają",
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
          q: "Czy wysyłacie coś moim klientom?",
          a: "Nie. Wiadomości z przypomnieniami dostajesz tylko Ty i opcjonalnie drugi adres, który podasz. Do nabywców tekst wysyłasz sam.",
        },
        {
          q: "Skąd znacie adres e-mail nabywcy?",
          a: "Nie znamy go, w KSeF nie ma adresów nabywców. W odnośniku wpisujesz adres sam.",
        },
        {
          q: "Co jeśli faktura jest już zapłacona?",
          a: "Stan płatności bierzemy z faktury. Jeśli zapłata przyszła przelewem, ale faktura nie ma znacznika zapłaty, przypomnienie przyjdzie mimo to. Wtedy po prostu go nie wysyłaj.",
        },
        {
          q: "Co się dzieje z moimi danymi po rezygnacji?",
          a: "NIP i token usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Wysłane maile zostają w skrzynkach ich odbiorców.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail z przypomnieniem. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_przypomnienia"
      formHeading="Włącz przypomnienia o płatnościach"
      formIntro="Po opłaceniu zamówienia podasz NIP i token KSeF."
      submitLabel="Włącz przypomnienia"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Przypomnienia o płatnościach faktur z KSeF"
      serviceDesc="Co rano mail z fakturami, którym wypada przypomnieć o płatności, z gotowym tekstem dla nabywcy. 39 zł netto miesięcznie."
      serviceType="Automatyzacja księgowości"
    />
  );
}
