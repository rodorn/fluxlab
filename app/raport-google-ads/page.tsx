import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Raport Google Ads z alertem przepalania, 49 zł | Fluxlab",
  description:
    "Co poniedziałek raport z konta Google Ads i mail od razu, gdy fraza wyda budżet bez żadnej konwersji. Wklejasz skrypt raz, 49 zł netto miesięcznie.",
  alternates: { canonical: "/raport-google-ads" },
  openGraph: {
    title: "Raport Google Ads z alertem przepalania, 49 zł | Fluxlab",
    description:
      "Tygodniowy raport kampanii i alert, gdy fraza przekroczy próg wydatków bez konwersji. Skrypt wklejasz raz, nic nie zmienia w kampaniach.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, raport Google Ads z alertem przepalania" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="raport-google-ads"
      breadcrumb="Raport Google Ads"
      typ="usluga"
      h1="Czy któraś fraza w Google Ads przepala budżet?"
      lead="Po płatności dostajesz mail ze skryptem, który wklejasz raz w Google Ads. Skrypt tylko czyta liczby z konta i wysyła je do nas. Co poniedziałek odsyłamy raport kampanii z porównaniem do tygodnia wcześniej, a gdy któraś fraza przekroczy próg wydatków bez konwersji, mail przychodzi tego samego dnia."
      ctaLabel="Włącz raport"
      ctaNote="49 zł netto miesięcznie, rezygnacja w każdej chwili"
      checks={[
        {
          title: "Tygodniowy raport kampanii",
          desc: "Koszt, kliknięcia, wyświetlenia, konwersje i koszt jednej konwersji dla każdej kampanii, z porównaniem do poprzednich 7 dni.",
        },
        {
          title: "Alert przepalania",
          desc: "Gdy fraza wyda w ciągu 30 dni co najmniej 50 zł bez żadnej konwersji, dostajesz mail w dniu, w którym próg został przekroczony. Próg zmienisz jedną liczbą w kodzie.",
        },
        {
          title: "Lista fraz bez konwersji",
          desc: "W raporcie poniedziałkowym osobno frazy, które nadal biorą budżet bez konwersji, od najdroższej. Gotowa lista do wykluczenia albo wstrzymania.",
        },
        {
          title: "Skrypt tylko czyta",
          desc: "Skrypt nie zmienia ani kampanii, ani budżetów, ani fraz. Pełny kod widzisz w mailu, zanim go wkleisz.",
        },
      ]}
      pricing={[
        {
          name: "Raport Google Ads z alertem",
          price: "49 zł",
          kup: "ads-raport",
          desc: "Netto, miesięcznie. Skrypt i instrukcja przychodzą mailem po płatności.",
          features: [
            "skrypt do wklejenia w Google Ads, raz",
            "raport kampanii w każdy poniedziałek",
            "alert, gdy fraza przepala budżet",
            "frazy bez konwersji od najdroższej",
            "bez zmian w kampaniach",
            "rezygnacja w każdej chwili",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jak zainstalować skrypt?",
          a: "W Google Ads wejdź w Narzędzia, potem Skrypty, utwórz nowy skrypt, wklej kod z maila i zatwierdź uprawnienia. Ustaw uruchamianie codziennie. Instrukcja krok po kroku jest w mailu.",
        },
        {
          q: "Jakie dane wysyła skrypt?",
          a: "Nazwę konta i walutę, a dla ostatnich 7 i 14 dni sumy kosztu, kliknięć, wyświetleń i konwersji kampanii oraz tekst, koszt, kliknięcia i konwersje fraz z ostatnich 30 dni. Nie wysyła haseł, danych kart ani list odbiorców. Nie zapisujemy tych liczb, raport powstaje z nich od razu i trafia na adres z zamówienia.",
        },
        {
          q: "Czy skrypt może coś zmienić w koncie?",
          a: "Nie. Używa wyłącznie odczytu raportów i jednego wywołania, które wysyła liczby do nas. Kod jest otwarty w mailu, możesz go przejrzeć albo pokazać agencji.",
        },
        {
          q: "Co, gdy konto nie liczy konwersji?",
          a: "Wtedy nie da się ocenić, czy fraza przepala budżet, więc alertów nie wysyłamy. Raport napisze, że konwersje nie są zapisywane, i pokaże same koszty i kliknięcia.",
        },
        {
          q: "Czy działa z kontem menedżera (MCC)?",
          a: "Skrypt wklejasz w pojedynczym koncie reklamowym. Dla kilku kont wklej go w każdym z nich, a raporty przyjdą osobno.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Anulujesz subskrypcję. Skrypt przestaje wtedy dostawać odpowiedź od nas, a Ty możesz go usunąć albo wyłączyć w Google Ads.",
        },
      ]}
      formId="order_ads"
      formHeading="Kilka kont albo prowadzisz Ads dla klientów?"
      formIntro="Napisz, ile kont reklamowych masz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Raport Google Ads z alertem przepalania"
      serviceDesc="Tygodniowy raport kampanii Google Ads i alert, gdy fraza wyda budżet bez konwersji. Skrypt tylko czyta dane konta, 49 zł netto miesięcznie."
      serviceType="Raportowanie Google Ads"
    />
  );
}
