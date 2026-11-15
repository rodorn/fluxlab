import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "SPF, DKIM i DMARC z instrukcją za 19 zł | Fluxlab",
  description:
    "Podajesz domenę firmowej poczty, a dostajesz gotowe rekordy do wklejenia w DNS i instrukcję DKIM dla Twojego dostawcy. 19 zł netto, wynik mailem w kilka minut.",
  alternates: { canonical: "/spf-dkim-dmarc" },
  openGraph: {
    title: "SPF, DKIM i DMARC z instrukcją za 19 zł | Fluxlab",
    description:
      "Gotowe rekordy do DNS i kroki dla Google Workspace, Microsoft 365, Zoho i innych. Wynik mailem.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, SPF, DKIM i DMARC" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="spf-dkim-dmarc"
      breadcrumb="SPF, DKIM i DMARC"
      typ="usluga"
      h1="Maile firmy trafiają do spamu? Dostaniesz gotowe wpisy do DNS"
      lead="Po płatności sprawdzamy rekordy Twojej domeny, rozpoznajemy dostawcę poczty i wysyłamy mailem wynik, rekordy do wklejenia oraz instrukcję DKIM krok po kroku. Wpisy dodajesz sam u firmy, która obsługuje domenę."
      ctaLabel="Zamów instrukcję"
      ctaNote="19 zł netto, jednorazowo. Wynik mailem w kilka minut"
      powiazane={[
        {
          przed: "Chcesz najpierw zobaczyć, co jest nie tak? Zrób",
          kotwica: "bezpłatny audyt poczty",
          href: "/audyt-poczty",
          po: ".",
        },
        {
          przed: "Poczta jest poprawnie ustawiona, a maile giną? Sprawdź",
          kotwica: "czarne listy spamowe",
          href: "/czarne-listy",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "SPF: kto może pisać w imieniu domeny",
          desc: "Czytamy Twój rekord, liczymy zapytania DNS (limit to 10) i wskazujemy brakujące albo zdublowane wpisy.",
        },
        {
          title: "DKIM: podpis wiadomości",
          desc: "Szukamy klucza pod typowymi nazwami i dajemy kroki dla Google Workspace, Microsoft 365, Zoho albo innego dostawcy.",
        },
        {
          title: "DMARC: plan dojścia do ochrony",
          desc: "Rekord na start, który niczego nie blokuje, oraz harmonogram przejścia na quarantine i reject.",
        },
      ]}
      pricing={[
        {
          name: "Instrukcja dla domeny",
          price: "19 zł",
          kup: "spf-dkim-dmarc",
          desc: "Netto, jednorazowo. Wynik mailem w kilka minut, z plikiem PDF.",
          features: [
            "sprawdzenie SPF, DKIM i DMARC jednej domeny",
            "rekordy gotowe do wklejenia w DNS",
            "kroki DKIM dla Twojego dostawcy poczty",
            "plan dojścia do p=reject",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy sami zmieniacie coś w moim DNS?",
          a: "Nie. Dostajesz gotowe wpisy i instrukcję, a dodajesz je u rejestratora albo hostingu. Dzięki temu nikt poza Tobą nie ma dostępu do domeny.",
        },
        {
          q: "Co, jeśli dostawca poczty nie zostanie rozpoznany?",
          a: "Rekordy SPF i DMARC dostajesz w każdym przypadku. Kroki DKIM są wtedy ogólne, bo klucz generuje panel dostawcy.",
        },
        {
          q: "Co, jeśli wpiszę domenę, która nie istnieje?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem, więc nic nie tracisz.",
        },
        {
          q: "Czy wpisy mogą zepsuć mi pocztę?",
          a: "Rekord DMARC na start tylko obserwuje i niczego nie blokuje. Zaostrzenie dopiero po okresie obserwacji, który opisujemy w instrukcji.",
        },
      ]}
      formId="order_spf_dkim_dmarc"
      formHeading="Zapytaj o uwierzytelnianie poczty"
      formIntro="Masz kilka domen albo własny serwer poczty? Napisz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="SPF, DKIM i DMARC z instrukcją"
      serviceDesc="Sprawdzenie SPF, DKIM i DMARC domeny firmowej poczty, gotowe rekordy do DNS i instrukcja dla dostawcy poczty za 19 zł netto."
      serviceType="Konfiguracja uwierzytelniania poczty"
    />
  );
}
