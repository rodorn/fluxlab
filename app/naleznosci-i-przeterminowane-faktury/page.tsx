import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Należności i przeterminowane faktury, 29 zł | Fluxlab",
  description:
    "Co poniedziałek mail z fakturami sprzedażowymi z KSeF: ile klienci jeszcze Ci wiszą i które są po terminie. Plik CSV w załączniku. 29 zł netto.",
  alternates: { canonical: "/naleznosci-i-przeterminowane-faktury" },
  openGraph: {
    title: "Należności i przeterminowane faktury, 29 zł | Fluxlab",
    description: "Co tydzień wiesz, kto Ci nie zapłacił i od ilu dni, bez zaglądania do KSeF i programu księgowego.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, należności i przeterminowane faktury z KSeF" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="naleznosci-i-przeterminowane-faktury"
      breadcrumb="Należności i przeterminowane faktury"
      eyebrow="KSeF dla firm"
      h1="Co tydzień wiesz, kto Ci jeszcze nie zapłacił"
      lead="Podajesz NIP i token KSeF, a my co poniedziałek rano wysyłamy zestawienie faktur sprzedażowych z ostatnich 90 dni: ile wystawiłeś w tygodniu, ile jest niezapłacone i które faktury są po terminie, od najstarszej. Pełna lista idzie w załączniku CSV, do otwarcia w Excelu."
      ctaLabel="Włącz zestawienie należności"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Zależy Ci na kontroli kosztów? Zobacz",
          kotwica: "kontrolę faktur kosztowych przed zapłatą",
          href: "/kontrola-faktur-kosztowych",
          po: ".",
        },
        {
          przed: "Chcesz same faktury kosztowe na skrzynkę? Zobacz",
          kotwica: "faktury kosztowe z KSeF na maila",
          href: "/faktury-kosztowe-z-ksef-na-mail",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Jedno zestawienie tygodniowo",
          desc: "W poniedziałek rano dostajesz podsumowanie: wystawione w ostatnim tygodniu, niezapłacone razem i po terminie z kwotami. Bez codziennych maili.",
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
          name: "Należności co tydzień",
          price: "29 zł/mies.",
          kup: "naleznosci",
          desc: "Netto. Jedna firma, jeden NIP, jeden adres e-mail i opcjonalnie drugi, na przykład księgowej.",
          features: [
            "zestawienie w każdy poniedziałek rano",
            "lista faktur po terminie, od najstarszej",
            "plik CSV z niezapłaconymi fakturami",
            "pierwsze zestawienie od razu, z ostatnich 90 dni",
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
          q: "Skąd wiecie, że faktura jest zapłacona?",
          a: "Z samej faktury: znacznik zapłaty i termin płatności. Nie mamy dostępu do Twojego banku, więc przelew bez znacznika w fakturze zobaczysz w zestawieniu jako niezapłacony.",
        },
        {
          q: "Za jaki okres jest zestawienie?",
          a: "Obejmuje faktury sprzedażowe z ostatnich 90 dni. Starsze niezapłacone faktury nie wchodzą do zestawienia.",
        },
        {
          q: "Czy wysyłacie coś moim klientom?",
          a: "Nie. Zestawienie dostajesz tylko Ty i opcjonalnie drugi adres, który podasz.",
        },
        {
          q: "Co się dzieje z moimi danymi po rezygnacji?",
          a: "NIP i token usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Wysłane maile zostają w skrzynkach ich odbiorców.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail z zestawieniem. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_naleznosci"
      formHeading="Włącz zestawienie należności"
      formIntro="Po opłaceniu zamówienia podasz NIP i token KSeF."
      submitLabel="Włącz zestawienie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Należności i przeterminowane faktury z KSeF"
      serviceDesc="Co poniedziałek mail z niezapłaconymi i przeterminowanymi fakturami sprzedażowymi z KSeF oraz CSV. 29 zł netto miesięcznie."
      serviceType="Automatyzacja księgowości"
    />
  );
}
