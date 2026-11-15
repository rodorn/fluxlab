import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Paragon ze zdjęcia do arkusza, 29 zł/mies. | Fluxlab",
  description:
    "Zdjęcie paragonu wysyłasz mailem, a pozycja z kwotą, VAT i kategorią trafia do arkusza. Odczyt robi model AI.",
  alternates: { canonical: "/paragon-do-arkusza" },
  openGraph: {
    title: "Paragon ze zdjęcia do arkusza, 29 zł/mies. | Fluxlab",
    description:
      "Zdjęcie paragonu na mail, pozycja z kwotą i kategorią w arkuszu.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, paragon do arkusza" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="paragon-do-arkusza"
      breadcrumb="Paragon do arkusza"
      eyebrow="Koszty firmy"
      h1="Zdjęcie paragonu na mail i pozycja w arkuszu"
      lead="Paragony z delegacji, stacji paliw i sklepów lądują w szufladzie, a pod koniec miesiąca ktoś je przepisuje. Robisz zdjęcie, wysyłasz je mailem na swój adres, a my odczytujemy sprzedawcę, datę, kwotę brutto, VAT i kategorię kosztu i dopisujemy pozycję do arkusza."
      ctaLabel="Włącz odczyt paragonów"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Masz też faktury w PDF? Zobacz",
          kotwica: "faktury PDF do Excela",
          href: "/faktury-pdf-do-excela",
          po: ".",
        },
        {
          przed: "Faktury kosztowe z KSeF przychodzą same, zobacz",
          kotwica: "faktury kosztowe na maila",
          href: "/faktury-kosztowe-z-ksef-na-mail",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Wystarczy wysłać maila",
          desc: "Po opłaceniu dostajesz własny, tajny adres mailowy. Zdjęcie paragonu dołączasz do wiadomości z telefonu, w jednym mailu może być kilka zdjęć. Żadnej aplikacji do instalowania.",
        },
        {
          title: "Pozycja z kwotą i kategorią",
          desc: "Do arkusza trafia data, sprzedawca, NIP, kwota brutto, VAT, waluta, kategoria (np. paliwo, jedzenie, delegacje, biuro) i krótki opis. Gdy daty nie widać, wpisujemy dzień wpłynięcia i zaznaczamy to w uwadze.",
        },
        {
          title: "Potwierdzenie i sumy po miesiącach",
          desc: "Po każdym mailu dostajesz potwierdzenie z odczytanymi danymi. Arkusz działa na telefonie, pokazuje sumy per kategoria i pozwala pobrać miesiąc jako CSV do Excela albo dla księgowej.",
        },
      ]}
      pricing={[
        {
          name: "Paragon do arkusza",
          price: "29 zł/mies.",
          kup: "paragon-do-arkusza",
          desc: "Netto. Jedna firma, do 300 zdjęć w miesiącu.",
          features: [
            "własny adres mailowy do paragonów",
            "odczyt kwoty, VAT, daty i kategorii",
            "arkusz z sumami i pobieranie CSV",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Kto odczytuje zdjęcia?",
          a: "Odczyt robi model AI firmy OpenAI. Zdjęcie jest do niego wysyłane tylko po to, żeby odczytać dane z paragonu. Zdjęcia nie zapisujemy u siebie, w arkuszu zostają tylko pola z paragonu. Pozycje warto raz na jakiś czas przejrzeć, bo model może się pomylić przy słabym zdjęciu.",
        },
        {
          q: "Jakie zdjęcia są obsługiwane?",
          a: "JPEG, PNG, WebP, GIF i PDF, od 8 KB do 12 MB, do 8 załączników w jednym mailu. Zdjęcia z iPhone'a w formacie HEIC wyślij w rozmiarze Rzeczywisty albo Duży, wtedy telefon zamieni je na JPEG. Jeśli zdjęcia nie da się odczytać, dostajesz o tym maila.",
        },
        {
          q: "Czy to zastępuje księgowość albo ewidencję VAT?",
          a: "Nie. To porządek w kosztach: lista paragonów z kwotą, VAT i kategorią. Paragon bez NIP nabywcy nie daje prawa do odliczenia VAT, a decyzje księgowe zostają po stronie Twojej księgowej.",
        },
        {
          q: "Jaki jest limit?",
          a: "30 zdjęć w ciągu godziny i 300 w miesiącu. Po przekroczeniu miesięcznego limitu dostajesz maila, a od pierwszego dnia kolejnego miesiąca limit wraca do zera.",
        },
        {
          q: "Co się dzieje z danymi po rezygnacji?",
          a: "Konto, adres i wszystkie pozycje z arkusza usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Wcześniej pobierz CSV.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail od nas. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_paragon_do_arkusza"
      formHeading="Włącz odczyt paragonów"
      formIntro="Po opłaceniu zamówienia dostaniesz swój adres mailowy i link do arkusza."
      submitLabel="Włącz odczyt paragonów"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Paragon do arkusza"
      serviceDesc="Zdjęcie paragonu wysłane mailem odczytywane przez AI i dopisywane do arkusza z kwotą, VAT i kategorią. 29 zł netto miesięcznie."
      serviceType="Automatyzacja księgowości"
    />
  );
}
