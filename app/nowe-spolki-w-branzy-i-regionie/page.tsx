import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Nowe spółki z KRS co tydzień, 49 zł/mies. | Fluxlab",
  description:
    "Co poniedziałek lista nowo zarejestrowanych w KRS spółek z Twojej branży (PKD) i regionu: nazwa, NIP, adres, e-mail firmy. Dane z oficjalnego API KRS.",
  alternates: { canonical: "/nowe-spolki-w-branzy-i-regionie" },
  openGraph: {
    title: "Nowe spółki z KRS co tydzień, 49 zł/mies. | Fluxlab",
    description:
      "Lista nowo zarejestrowanych spółek z Twojej branży i województwa, co poniedziałek na maila.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, nowe spółki z KRS" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="nowe-spolki-w-branzy-i-regionie"
      breadcrumb="Nowe spółki w branży i regionie"
      eyebrow="Leady z rejestrów"
      h1="Nowe spółki z Twojej branży i regionu co tydzień na maila"
      lead="Nowa spółka kupuje księgowość, ubezpieczenie, wynajem biura, sprzęt i oprogramowanie, zanim ktokolwiek zdąży ją znaleźć. Wybierasz kody PKD i województwa, a my co poniedziałek wysyłamy listę spółek wpisanych do KRS w ostatnim tygodniu: nazwa, NIP, adres i e-mail firmy z rejestru."
      ctaLabel="Włącz listę nowych spółek"
      ctaNote="49 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Znasz już NIP firmy? Sprawdź",
          kotwica: "dane firmy z NIP",
          href: "/dane-firmy-z-nip",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Oficjalne dane z KRS",
          desc: "Lista powstaje z publicznego API Krajowego Rejestru Sądowego, rejestr przedsiębiorców. Każdą nową spółkę sprawdzamy po numerze KRS, więc nic nie pochodzi z baz kupionych od pośredników.",
        },
        {
          title: "Twoja branża i region",
          desc: "Podajesz do pięciu kodów PKD (całą dwucyfrową grupę albo dokładny kod) i wybierasz województwa albo całą Polskę. Domyślnie dostajesz spółki, u których to przeważająca działalność, bez szumu z długich list kodów.",
        },
        {
          title: "Poniedziałek rano na mail",
          desc: "Pierwszą listę dostajesz w ciągu godziny od wyboru, ze spółkami z ostatnich dwóch tygodni. Potem co poniedziałek: krótki podgląd w mailu i pełna lista w pliku do Excela. Pusty tydzień też dostaje maila, żebyś wiedział, że działa.",
        },
      ]}
      pricing={[
        {
          name: "Nowe spółki w branży i regionie",
          price: "49 zł/mies.",
          kup: "nowe-firmy",
          desc: "Netto. Jeden zestaw filtrów, do pięciu kodów PKD.",
          features: [
            "spółki z KRS wpisane w ostatnim tygodniu",
            "nazwa, NIP, REGON, adres, e-mail z KRS, kapitał, PKD",
            "podgląd w mailu i pełna lista do Excela",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jakie firmy obejmuje lista?",
          a: "Podmioty wpisane do rejestru przedsiębiorców KRS: spółki z o.o., akcyjne, jawne, komandytowe, a także fundacje i spółdzielnie zarejestrowane jako przedsiębiorcy. Jednoosobowych działalności gospodarczych z CEIDG lista nie obejmuje.",
        },
        {
          q: "Skąd e-mail firmy?",
          a: "Z KRS, z adresu poczty elektronicznej wpisanego przez spółkę. Nie każda spółka go podaje, wtedy pole jest puste. Dane osobowe członków zarządu pomijamy, lista nie zawiera ich imion ani numerów PESEL.",
        },
        {
          q: "Czy mogę pisać do tych firm?",
          a: "Adres z KRS jest adresem firmy, ale wysyłka ofert handlowych podlega prawu o łączności elektronicznej: wiadomość do firmy bez wcześniejszej zgody wymaga ostrożności i możliwości sprzeciwu. Zasady wysyłki ustalasz sam, my dostarczamy tylko dane z rejestru.",
        },
        {
          q: "Jak szybko spółka trafia na listę?",
          a: "Sprawdzamy rejestr co godzinę. Spółka pojawia się w liście z najbliższego poniedziałku po wpisie do KRS, a data rejestracji jest w pliku.",
        },
        {
          q: "Co się dzieje z danymi po rezygnacji?",
          a: "Twój wybór kodów PKD i województw oraz adres e-mail usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Listy, które już dostałeś, zostają u Ciebie.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail od nas. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_nowe_firmy"
      formHeading="Włącz listę nowych spółek"
      formIntro="Po opłaceniu zamówienia wybierzesz kody PKD i województwa."
      submitLabel="Włącz listę nowych spółek"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Nowe spółki w branży i regionie"
      serviceDesc="Cotygodniowa lista nowo zarejestrowanych w KRS spółek z wybranej branży (PKD) i województwa, z danymi firmy. 49 zł netto miesięcznie."
      serviceType="Dane o firmach"
    />
  );
}
