import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Alert stóp NBP i WIRON, 19 zł/mies. | Fluxlab",
  description:
    "Mail, gdy NBP zmieni stopy procentowe albo WIRON 3M ruszy o co najmniej 0,05 pp. Pierwszy mail ze stanem na dziś zaraz po zamówieniu. 19 zł netto.",
  alternates: { canonical: "/alert-stop-procentowych" },
  openGraph: {
    title: "Alert stóp NBP i WIRON, 19 zł/mies. | Fluxlab",
    description: "Mail po zmianie stóp NBP albo po ruchu WIRON 3M, z aktualnym stanem i przykładem wpływu na ratę.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, alert stóp NBP i WIRON" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="alert-stop-procentowych"
      breadcrumb="Alert stóp NBP i WIRON"
      eyebrow="Alert o stopach procentowych"
      h1="Rata kredytu zależy od stóp, a stopy zmieniają się bez zapowiedzi"
      lead="Codziennie sprawdzamy tabelę stóp NBP oraz stawki WIRON z serwisu GPW Benchmark. Gdy NBP zmieni stopę referencyjną, lombardową, depozytową, redyskontową albo dyskontową, dostajesz mail ze starą i nową wartością. To samo, gdy WIRON 3M ruszy o co najmniej 0,05 pp od ostatniego alertu."
      ctaLabel="Włącz alert"
      ctaNote="19 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Sprawdź też bieżące",
          kotwica: "kursy walut NBP",
          href: "/kursy-nbp",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Stopy NBP, WIRON albo oba",
          desc: "Przy zamówieniu wybierasz, co obserwować. Dostajesz maile tylko o tym, co wybrałeś.",
        },
        {
          title: "Stan na dziś od razu",
          desc: "Zaraz po zamówieniu wysyłamy aktualne stopy NBP i stawki WIRON O/N, 1M, 3M i 6M z datami.",
        },
        {
          title: "Przykład wpływu na ratę",
          desc: "W mailu o zmianie jest przykład: ile zmienia się rata kredytu 300 000 zł na 25 lat przy zmianie oprocentowania o 0,25 pp. To przykład, nie wyliczenie Twojego kredytu.",
        },
      ]}
      pricing={[
        {
          name: "Alert o stopach",
          price: "19 zł/mies.",
          kup: "alert-stop",
          desc: "Netto. Mail tylko wtedy, gdy stopy NBP się zmienią albo WIRON 3M ruszy o co najmniej 0,05 pp.",
          features: ["tabela stóp NBP i WIRON z GPW Benchmark", "sprawdzanie w dni robocze", "rezygnacja w dowolnym dniu"],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co znaczy ruch o 0,05 pp?",
          a: "Punkt procentowy (pp) to różnica między stopami, np. z 3,14% na 3,19%. Porównujemy WIRON 3M z wartością z ostatniego alertu, więc wolne zmiany nie giną w drobnych codziennych wahaniach.",
        },
        {
          q: "Czy to alert o WIBOR?",
          a: "Nie. Obserwujemy WIRON, który zastępuje WIBOR w kredytach. Jeśli Twój kredyt nadal jest oparty o WIBOR, sprawdź w umowie, kiedy bank przejdzie na nowy wskaźnik.",
        },
        {
          q: "Czy mail mówi, ile wyniesie moja rata?",
          a: "Nie. Podajemy zmianę stóp i przykład dla kredytu 300 000 zł na 25 lat. Rata Twojego kredytu zależy od marży banku, salda i terminu spłaty, a oprocentowanie ustala bank.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na maila z alertem. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_alert_stop"
      formHeading="Włącz alert o stopach"
      formIntro="Napisz, co obserwować: stopy NBP, WIRON albo oba. Pierwszy mail wyślemy zaraz po zamówieniu."
      submitLabel="Włącz alert"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Alert stóp NBP i WIRON"
      serviceDesc="Alert e-mail o zmianach stóp procentowych NBP i stawki WIRON 3M. 19 zł netto miesięcznie."
      serviceType="Alert o stopach procentowych"
    />
  );
}
