import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Alert MSiG o upadłości kontrahenta od 39 zł | Fluxlab",
  description:
    "Podajesz do 20 firm, a my raz na dobę sprawdzamy Monitor Sądowy i Gospodarczy i piszemy o upadłości, restrukturyzacji lub likwidacji. 39 zł netto miesięcznie.",
  alternates: { canonical: "/alert-msig" },
  openGraph: {
    title: "Alert MSiG o upadłości kontrahenta od 39 zł | Fluxlab",
    description:
      "Podajesz do 20 firm, a my raz na dobę sprawdzamy Monitor Sądowy i Gospodarczy i piszemy o upadłości, restrukturyzacji lub likwidacji. 39 zł netto miesięcznie.",
    url: "/alert-msig",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, alert MSiG" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="alert-msig"
      typ="usluga"
      breadcrumb="Alert MSiG"
      h1="Upadłość albo likwidacja kontrahenta jest w Monitorze Sądowym i Gospodarczym. Dowiesz się pierwszy"
      lead="Podajesz NIP albo numer KRS do 20 firm. Raz na dobę pytamy wyszukiwarkę MSiG i piszemy o każdym nowym obwieszczeniu, z działem i rodzajem: upadłość, restrukturyzacja, likwidacja, połączenie."
      ctaLabel="Włącz alert MSiG"
      ctaNote="39 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Obwieszczenia z 90 dni od razu",
          desc: "Zaraz po zamówieniu dostajesz mail z obwieszczeniami o Twoich firmach z ostatnich 90 dni. Od tego momentu piszemy tylko o nowych.",
        },
        {
          title: "Co zgłaszamy",
          desc: "Każde nowe obwieszczenie o firmie, z oznaczeniem rodzaju. Upadłość, restrukturyzację i likwidację oznaczamy jako pilne, resztę (np. połączenie, wezwanie wierzycieli) jako informację.",
        },
        {
          title: "Czego nie widzimy",
          desc: "Sprawdzamy Monitor Sądowy i Gospodarczy. Ogłoszenia z Krajowego Rejestru Zadłużonych, gdzie od 2021 roku trafia część spraw upadłościowych, nie są w tym źródle. Gdy nie rozpoznamy żadnego numeru, zwracamy całą opłatę.",
        },
      ]}
      pricing={[
        {
          name: "Alert MSiG",
          price: "39 zł/mies.",
          kup: "monitoring-msig",
          desc: "Netto. Do 20 firm, sprawdzanie raz na dobę.",
          features: [
            "obwieszczenia z ostatnich 90 dni na starcie",
            "mail tylko przy nowym obwieszczeniu",
            "dane z oficjalnej wyszukiwarki MSiG, bez scrapingu",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co podać?",
          a: "NIP albo numer KRS, do 20 firm, oddzielone spacją. NIP zamieniamy na numer KRS przez wykaz podatników MF.",
        },
        {
          q: "Czy to zastępuje Krajowy Rejestr Zadłużonych?",
          a: "Nie. Sprawdzamy MSiG. Część spraw upadłościowych jest dziś ogłaszana w KRZ, którego nie przeszukujemy, i mówimy o tym otwarcie.",
        },
        {
          q: "Czy przyjdzie mail, gdy nic się nie dzieje?",
          a: "Nie. Mail wychodzi na starcie i przy każdym nowym obwieszczeniu.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Pilnowanie wyłączamy automatycznie.",
        },
      ]}
      formId="order_alert_msig"
      formHeading="Zapytaj o więcej firm"
      formIntro="Chcesz pilnować więcej niż 20 firm? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Alert MSiG"
      serviceDesc="Codzienne sprawdzanie MSiG dla do 20 firm i mail o nowych obwieszczeniach: upadłość, restrukturyzacja, likwidacja, za 39 zł netto miesięcznie."
      serviceType="Monitoring MSiG"
    />
  );
}
