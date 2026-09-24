import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Zhakowana strona WordPress, czyszczenie i raport | Fluxlab",
  description:
    "Strona przekierowuje na obce serwisy albo Google ją oznaczył. Porównujemy pliki z oryginałami, usuwamy backdoory i mówimy, którędy weszli. Od 49 zł.",
  alternates: { canonical: "/strona-po-wlamaniu" },
  openGraph: {
    title: "Zhakowana strona WordPress, czyszczenie i raport | Fluxlab",
    description:
      "Porównujemy pliki z oryginałami z repozytorium WordPressa, usuwamy backdoory i mówimy, którędy weszli. Diagnoza 49 zł, czyszczenie od 299 zł.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, ratunek po włamaniu na stronę",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="strona-po-wlamaniu"
      breadcrumb="Strona po włamaniu"
      eyebrow="Ratunek po włamaniu"
      h1="Zhakowana strona, posprzątana do końca"
      lead="Przywrócenie backupu zwykle przywraca też backdoora i po dwóch dniach jesteś w tym samym miejscu. Ja porównujemy każdy plik Twojej strony z oryginałem prosto z repozytorium WordPressa, więc listę podmienionych i obcych plików mamy w minuty, a nie po godzinach zgadywania."
      ctaLabel="Zgłoś włamanie"
      ctaNote="Piszesz o każdej porze, odpisujemy najszybciej jak się da"
      checks={[
        {
          title: "Porównanie z oryginałem, nie zgadywanie",
          desc: "Pobieramy czyste wersje rdzenia, wtyczek i motywu w dokładnie tych numerach, których używasz, i liczymy sumy kontrolne. Dostajesz listę plików obcych, podmienionych i brakujących.",
        },
        {
          title: "Baza, nie tylko pliki",
          desc: "Skan wpisów i opcji pod kątem wstrzykniętych skryptów, przekierowań i podstawionych kont administratora, bo tam najczęściej zostaje wejście na później.",
        },
        {
          title: "Raport, którędy weszli",
          desc: "Nieaktualna wtyczka, wykradzione hasło, wgrany plik. Bez tego czyszczenie jest tylko odkładaniem kolejnego włamania.",
        },
        {
          title: "Zabezpieczenie po sprzątaniu",
          desc: "Wymiana haseł i kluczy sesji, ograniczenie uprawnień, aktualizacje i prośba o ponowne sprawdzenie strony przez Google.",
        },
      ]}
      pricing={[
        {
          name: "Diagnoza",
          price: "49 zł",
          desc: "Chcesz wiedzieć, jak głęboko sięga problem.",
          features: [
            "lista zainfekowanych i obcych plików",
            "wykryte przekierowania i podstawieni administratorzy",
            "ocena, czy dane klientów mogły wyciec",
            "wycena czyszczenia bez zobowiązania",
          ],
        },
        {
          name: "Czyszczenie",
          price: "od 299 zł",
          desc: "Strona ma wrócić do normalnego działania.",
          features: [
            "wszystko z diagnozy",
            "usunięcie infekcji i backdoorów",
            "raport, którędy weszli",
            "zabezpieczenie i zgłoszenie do ponownego sprawdzenia",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Nie wystarczy przywrócić kopię zapasową?",
          a: "Zwykle nie. Kopia pochodzi najczęściej z okresu, gdy backdoor już tam był, więc przywracasz również jego. Dlatego zaczynamy od ustalenia, które pliki są obce, a nie od cofania czasu.",
        },
        {
          q: "Hosting zawiesił mi konto, co teraz?",
          a: "Napisz to w zgłoszeniu. Pracujemy wtedy na kopii plików i bazy, które hosting zwykle udostępnia, i przygotowujemy wykaz usuniętych zagrożeń, żeby konto odwiesili.",
        },
        {
          q: "Czy stracimy treści albo zamówienia?",
          a: "Nie ruszamy treści ani zamówień. Przed jakąkolwiek zmianą robimy kopię dowodową, żeby dało się wrócić do stanu wyjściowego.",
        },
        {
          q: "Czy dajecie gwarancję, że to się nie powtórzy?",
          a: "Nie i nikt uczciwy jej nie da. Możemy zagwarantować, że usuniemy to, co znajdziemy, pokażemy drogę wejścia i ją zamkniemy. Jeśli infekcja wróci z tego samego powodu w ciągu 14 dni, poprawiamy bez dopłaty.",
        },
      ]}
      formId="order_strona_po_wlamaniu"
      formHeading="Zgłoś zhakowaną stronę"
      formIntro="Podaj adres strony, hosting i napisz, kiedy zauważyłeś problem oraz co konkretnie się dzieje: przekierowania, ostrzeżenie Google, dziwne wpisy, utrata dostępu do panelu."
      submitLabel="Zgłoś włamanie"
      microCopy="Dostępy przysyłasz dopiero po ustaleniu zakresu. Diagnoza płatna z góry, czyszczenie wyceniane po niej."
      serviceName="Czyszczenie strony po włamaniu"
      serviceDesc="Usuwanie infekcji z WordPressa i WooCommerce: porównanie plików z oryginałami, skan bazy, raport wejścia i zabezpieczenie. Diagnoza 49 zł, czyszczenie od 299 zł."
      serviceType="Usuwanie skutków włamania na stronę"
    />
  );
}
