import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import DoplataCheck from "@/components/DoplataCheck";

export const metadata: Metadata = {
  title: "Audyt faktur kurierskich, dopłata paliwowa i korekty, od 290 zł | Fluxlab",
  description:
    "Dopłata paliwowa sięga prawie połowy ceny bazowej, zmienia się co dwa tygodnie i zależy od progu wagowego. Sprawdź jedną pozycję od ręki, a potem całą fakturę. Od 290 zł albo prowizja od odzyskanej kwoty.",
  alternates: { canonical: "/audyt-kurierski" },
  openGraph: {
    title:
      "Audyt faktur kurierskich, dopłata paliwowa i korekty, od 290 zł | Fluxlab",
    description:
      "Weryfikacja faktur kurierskich linia po linii: stawka paliwowa dla właściwego progu, korekty wagowe, usługi naliczone podwójnie.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, audyt faktur kurierskich",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="audyt-kurierski"
      tool={<DoplataCheck />}
      breadcrumb="Audyt kurierski"
      eyebrow="Koszty wysyłki"
      h1="Prawie połowa ceny bazowej to dopłata, której nikt nie sprawdza"
      lead="Dopłata paliwowa dochodzi do czterdziestu pięciu procent ceny bazowej, jej stawka zmienia się co dwa tygodnie i zależy od progu wagowego przesyłki. Nikt w małym sklepie nie porównuje każdej linii faktury ze stawką z właściwego okresu, bo przy kilkuset paczkach to kilka godzin pracy miesięcznie."
      ctaLabel="Zamów audyt faktur"
      ctaNote="Pierwsza faktura sprawdzona za darmo"
      checks={[
        {
          title: "Stawka z właściwego okresu",
          desc: "Stawka obowiązuje przez dwa tygodnie, więc przesyłka z końca miesiąca rozlicza się inaczej niż ta z początku. Sprawdzam każdą linię wobec stawki z daty tej konkretnej przesyłki.",
        },
        {
          title: "Właściwy próg wagowy",
          desc: "Trzy progi, trzy różne stawki. Naliczenie stawki z wyższego progu jest niewidoczne na jednej fakturze i kosztowne w skali roku.",
        },
        {
          title: "Korekty wagowe do konfrontacji",
          desc: "Przewoźnik mierzy paczkę u siebie i dolicza różnicę. Ty masz własne wymiary w systemie magazynowym, więc da się sprawdzić, które korekty są zasadne, a które nie.",
        },
        {
          title: "Usługi podwójne i niezrealizowane",
          desc: "Druga próba doręczenia, pobranie, zwrot. Te pozycje potrafią pojawić się dwa razy albo dotyczyć usługi, która się nie odbyła.",
        },
      ]}
      pricing={[
        {
          name: "Pierwsza faktura",
          price: "0 zł",
          desc: "Dowolny miesiąc, sprawdzony w 48 godzin.",
          features: [
            "lista spornych pozycji z kwotami",
            "wyliczenie różnicy",
            "jeśli nic nie znajdę, nic nie płacisz",
          ],
        },
        {
          name: "Audyt roczny",
          price: "od 290 zł",
          desc: "Dwanaście miesięcy faktur, wszystkie linie.",
          features: [
            "każda pozycja wobec stawki z jej okresu",
            "korekty wagowe do konfrontacji",
            "zestawienie w arkuszu i podsumowanie",
            "gotowa treść reklamacji",
          ],
          featured: true,
        },
        {
          name: "Prowizja od odzysku",
          price: "25 procent",
          desc: "Dla tych, którzy wolą nie płacić z góry.",
          features: [
            "płacisz tylko od kwoty, którą odzyskasz",
            "brak opłaty, gdy nie ma czego odzyskać",
            "rozliczenie po decyzji przewoźnika",
          ],
        },
      ]}
      faq={[
        {
          q: "Czego potrzebujesz, żeby sprawdzić moje faktury?",
          a: "Pliku faktury w formacie, w którym pobierasz ją od przewoźnika, najlepiej arkusza albo pliku CSV. Przydaje się też eksport przesyłek z Twojego systemu, bo pozwala skonfrontować wagi i wymiary.",
        },
        {
          q: "Czy sam składasz reklamacje?",
          a: "Nie, bo stroną umowy z przewoźnikiem jesteś Ty. Dostajesz ode mnie wyliczenie i gotową treść, którą wysyłasz ze swojego konta. To też chroni Cię przed sytuacją, w której ktoś obcy występuje w Twoim imieniu.",
        },
        {
          q: "A jeśli mój przewoźnik ma inny cennik niż ten na stronie?",
          a: "Prawie na pewno ma, bo stawki bazowe są indywidualne. Dlatego liczę wobec Twojej umowy, a nie wobec cennika publicznego. Publiczne są tylko stawki dopłaty paliwowej i te są wspólne dla wszystkich klientów danego przewoźnika.",
        },
        {
          q: "Ile zwykle udaje się znaleźć?",
          a: "Nie podam Ci procentu, bo nie mam jeszcze własnych statystyk i nie zamierzam powoływać się na cudze. Dlatego pierwsza faktura jest sprawdzana za darmo: albo znajdę coś konkretnego, albo nie i wtedy nic nie płacisz.",
        },
      ]}
      formId="order_audyt_kurierski"
      formHeading="Prześlij fakturę do sprawdzenia"
      formIntro="Napisz, z którym przewoźnikiem współpracujesz i ile mniej więcej paczek nadajesz miesięcznie. Pierwszą fakturę sprawdzam za darmo, plik podeślesz mailem po mojej odpowiedzi."
      submitLabel="Zamów sprawdzenie"
      microCopy="Dane z faktur przetwarzam wyłącznie na potrzeby audytu i kasuję po przekazaniu wyniku."
      serviceName="Audyt faktur kurierskich"
      serviceDesc="Weryfikacja faktur przewoźnika linia po linii: dopłata paliwowa wobec stawki z właściwego okresu i progu wagowego, korekty wagowe, usługi naliczone podwójnie, wraz z gotową treścią reklamacji. Od 290 zł."
      serviceType="Audyt kosztów przesyłek kurierskich"
    />
  );
}
