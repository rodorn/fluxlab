import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import DoplataCheck from "@/components/DoplataCheck";

export const metadata: Metadata = {
  title: "Audyt faktur kurierskich i dopłat, od 290 zł | Fluxlab",
  description:
    "Dopłata paliwowa sięga prawie połowy ceny bazowej i zmienia się co dwa tygodnie. Sprawdź jedną pozycję od ręki, a potem całą fakturę. Od 290 zł.",
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
      lead="Dopłata paliwowa dochodzi do 45% ceny bazowej i zmienia się co dwa tygodnie. Przy kilkuset paczkach nikt nie sprawdza każdej linii faktury, więc robimy to za Ciebie."
      ctaLabel="Zamów audyt faktur"
      ctaNote="Pierwsza faktura sprawdzona za darmo"
      powiazane={[
        {
          przed: "Ile zostaje na każdej sztuce po prowizji, zwrocie i dopłacie do wysyłki, pokazuje",
          kotwica: "audyt marży na produktach",
          href: "/audyt-marz",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Stawka z właściwego okresu",
          desc: "Stawka zmienia się co dwa tygodnie. Każdą linię sprawdzamy wobec stawki z daty przesyłki.",
        },
        {
          title: "Właściwy próg wagowy",
          desc: "Stawka z wyższego progu jest niewidoczna na jednej fakturze, a kosztowna w skali roku.",
        },
        {
          title: "Korekty wagowe do konfrontacji",
          desc: "Porównujemy doliczenia przewoźnika z wymiarami z Twojego systemu magazynowego.",
        },
        {
          title: "Usługi podwójne i niezrealizowane",
          desc: "Druga próba doręczenia, pobranie, zwrot: naliczone dwa razy albo za usługę, której nie było.",
        },
      ]}
      pricing={[
        {
          name: "Pierwsza faktura",
          price: "0 zł",
          desc: "Dowolny miesiąc, wynik w 48 godzin.",
          features: [
            "lista spornych pozycji z kwotami",
            "nic nie znajdziemy, nic nie płacisz",
          ],
        },
        {
          name: "Audyt roczny",
          price: "od 290 zł",
          desc: "Dwanaście miesięcy faktur, wszystkie linie.",
          features: [
            "każda pozycja wobec stawki z jej okresu",
            "zestawienie w arkuszu",
            "gotowa treść reklamacji",
          ],
          featured: true,
        },
        {
          name: "Prowizja od odzysku",
          price: "25 procent",
          desc: "Bez opłaty z góry.",
          features: [
            "płacisz tylko od odzyskanej kwoty",
            "rozliczenie po decyzji przewoźnika",
          ],
        },
      ]}
      faq={[
        {
          q: "Czego potrzebujecie, żeby sprawdzić nasze faktury?",
          a: "Faktury od przewoźnika, najlepiej w arkuszu albo CSV. Przyda się też eksport przesyłek z Twojego systemu, żeby porównać wagi.",
        },
        {
          q: "Czy składacie reklamacje za nas?",
          a: "Nie, stroną umowy jesteś Ty. Dostajesz wyliczenie i gotową treść do wysłania ze swojego konta.",
        },
        {
          q: "Ile zwykle udaje się znaleźć?",
          a: "Nie mamy jeszcze własnych statystyk i nie podajemy cudzych. Dlatego pierwszą fakturę sprawdzamy za darmo.",
        },
      ]}
      formId="order_audyt_kurierski"
      formHeading="Prześlij fakturę do sprawdzenia"
      formIntro="Napisz, z którym przewoźnikiem pracujesz i ile paczek nadajesz miesięcznie. Plik podeślesz mailem po naszej odpowiedzi."
      submitLabel="Zamów sprawdzenie"
      microCopy="Dane z faktur kasujemy po przekazaniu wyniku."
      serviceName="Audyt faktur kurierskich"
      serviceDesc="Weryfikacja faktur przewoźnika linia po linii: dopłata paliwowa, korekty wagowe, usługi naliczone podwójnie, z gotową treścią reklamacji. Od 290 zł."
      serviceType="Audyt kosztów przesyłek kurierskich"
    />
  );
}
