import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Wzmianki o firmie w sieci co tydzień, 39 zł/mies. | Fluxlab",
  description:
    "Co poniedziałek zestawienie publikacji o Twojej firmie z Google News, serwisów branżowych i Wykopu, ze streszczeniem i linkami. Bez logowania do czegokolwiek.",
  alternates: { canonical: "/wzmianki-o-firmie-w-sieci" },
  openGraph: {
    title: "Wzmianki o firmie w sieci co tydzień, 39 zł/mies. | Fluxlab",
    description:
      "Tygodniowe zestawienie publikacji o Twojej firmie ze streszczeniem, co poniedziałek na maila.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, wzmianki o firmie w sieci" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="wzmianki-o-firmie-w-sieci"
      breadcrumb="Wzmianki o firmie w sieci"
      eyebrow="Monitoring marki"
      h1="Co napisano o Twojej firmie w tym tygodniu, w jednym mailu"
      lead="Artykuł w portalu branżowym, wzmianka w wiadomościach albo wątek na Wykopie wychodzą bez Twojej wiedzy, a o krytyce dowiadujesz się od klienta. Podajesz nazwę firmy i do trzech fraz, a my co poniedziałek wysyłamy zestawienie nowych publikacji: krótkie streszczenie tygodnia i lista linków ze źródłem i datą."
      ctaLabel="Włącz zestawienie wzmianek"
      ctaNote="39 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Pilnujesz też opinii w Google? Zobacz",
          kotwica: "pilnowanie wizytówki Google",
          href: "/pilnowanie-wizytowki-google",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Publiczne źródła, bez logowania",
          desc: "Przeszukujemy Google News, bazę artykułów GDELT, kanały RSS serwisów gospodarczych (m.in. Bankier, Money.pl, Puls Biznesu, Rzeczpospolita, WNP) i popularne wpisy z Wykopu. Nie logujemy się na żadne konto i nie obchodzimy zabezpieczeń stron.",
        },
        {
          title: "Twoje frazy, bez szumu",
          desc: "Podajesz do trzech fraz, na przykład nazwę firmy, markę i domenę, oraz do trzech słów do pominięcia, gdy nazwa pokrywa się z innym pojęciem. Szukamy dokładnego zapisu frazy w tytule albo opisie publikacji.",
        },
        {
          title: "Streszczenie i linki co poniedziałek",
          desc: "Pierwsze zestawienie dostajesz w ciągu godziny od podania fraz, z ostatnich dni. Potem co poniedziałek rano: kilka zdań o tym, o czym się pisze, i lista publikacji pogrupowana według źródła. Pusty tydzień też dostaje maila.",
        },
      ]}
      pricing={[
        {
          name: "Wzmianki o firmie w sieci",
          price: "39 zł/mies.",
          kup: "wzmianki",
          desc: "Netto. Jedna firma, do trzech fraz.",
          features: [
            "Google News, GDELT, portale gospodarcze, Wykop",
            "streszczenie tygodnia i linki do publikacji",
            "wykluczanie niechcianych słów",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czego usługa nie obejmuje?",
          a: "Zamkniętych serwisów wymagających logowania: Facebooka, Instagrama, LinkedIna, X i grup dyskusyjnych. Nie obejmuje też Reddita, który blokuje automatyczne zapytania. Zakres to publikacje dostępne publicznie w wyszukiwarce wiadomości, w bazie GDELT, w kanałach RSS wymienionych portali i w popularnych wpisach Wykopu.",
        },
        {
          q: "Czy znajdziecie każdą wzmiankę?",
          a: "Nie. To zestawienie publicznie dostępnych publikacji, nie pełny monitoring mediów. Wyszukiwarka wiadomości i kanały RSS pokazują część tego, co powstaje, a serwisy lokalne bywają pominięte. Jeśli ważna publikacja się nie pojawiła, odpisz na mail, a sprawdzimy, czy da się ją łapać.",
        },
        {
          q: "Kto robi streszczenie?",
          a: "Model AI firmy OpenAI. Dostaje tylko tytuły publikacji i Twoje frazy, nic więcej. Streszczenie to krótki przegląd tematów, nie ocena sytuacji, a linki zawsze prowadzą do oryginału.",
        },
        {
          q: "Jak działa wykluczanie?",
          a: "Publikacje, w których tytule albo opisie jest jedno ze wskazanych słów, nie trafiają do zestawienia. Pomaga, gdy nazwa firmy to też zwykłe słowo.",
        },
        {
          q: "Co się dzieje z danymi po rezygnacji?",
          a: "Twoje frazy, adres e-mail i zebrane publikacje usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Zestawienia, które już dostałeś, zostają u Ciebie.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail od nas. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_wzmianki"
      formHeading="Włącz zestawienie wzmianek"
      formIntro="Po opłaceniu zamówienia podasz nazwę firmy i frazy do śledzenia."
      submitLabel="Włącz zestawienie wzmianek"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Wzmianki o firmie w sieci"
      serviceDesc="Cotygodniowe zestawienie publicznych publikacji o firmie z Google News, GDELT, portali gospodarczych i Wykopu, ze streszczeniem. 39 zł netto miesięcznie."
      serviceType="Monitoring marki"
    />
  );
}
