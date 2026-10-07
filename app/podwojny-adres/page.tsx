import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import AdresCheck from "@/components/AdresCheck";

export const metadata: Metadata = {
  title: "Czy Google widzi stronę podwójnie, za darmo | Fluxlab",
  description:
    "Adres z www i bez www to dla wyszukiwarki dwie strony. Jeśli obie dają tę samą treść, siła linków dzieli się na pół. Sprawdź za darmo cztery wersje.",
  alternates: { canonical: "/podwojny-adres" },
  openGraph: {
    title: "Czy Google widzi stronę podwójnie, za darmo | Fluxlab",
    description:
      "Sprawdzenie czterech wersji adresu firmy, od ręki i bez rejestracji. Pokazujemy, czy wyszukiwarka liczy Twoją stronę raz, czy dwa razy.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, jeden adres główny strony firmowej",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="podwojny-adres"
      tool={<AdresCheck />}
      breadcrumb="Podwójny adres"
      eyebrow="Pozycje w wyszukiwarce"
      h1="Twoja strona może odpowiadać pod dwoma adresami naraz"
      lead="Dla wyszukiwarki firma.pl i www.firma.pl to dwa adresy. Jeśli oba dają tę samą treść, linki i widoczność dzielą się na dwie strony zamiast budować jedną."
      ctaLabel="Sprawdź swój adres"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Cztery wersje adresu",
          desc: "Z www i bez, po http i https. Pokazujemy, co odpowiada serwer.",
        },
        {
          title: "Czy treść jest ta sama",
          desc: "Porównujemy odpowiedzi obu wersji adresu.",
        },
        {
          title: "Czy wskazana jest wersja główna",
          desc: "Sprawdzamy, czy jest znacznik kanoniczny i na co wskazuje.",
        },
        {
          title: "Reguła pod Twój serwer",
          desc: "Przekierowanie dla nginx, Apache albo WordPressa, zależnie od tego, co masz.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Od ręki, na tej stronie.",
          features: [
            "cztery wersje adresu z kodami odpowiedzi",
            "porównanie treści obu wersji",
            "informacja o wersji głównej",
          ],
        },
        {
          name: "Naprawa jednej domeny",
          price: "od 190 zł",
          desc: "Diagnoza z gotową regułą.",
          features: [
            "wybór wersji głównej wraz z uzasadnieniem",
            "reguła przekierowania pod Twój serwer",
            "wskazanie wersji głównej w kodzie strony",
            "kontrolne sprawdzenie po wdrożeniu",
          ],
          featured: true,
        },
        {
          name: "Kilka domen naraz",
          price: "od 900 zł",
          desc: "Dla firm z wieloma markami.",
          features: [
            "wszystkie domeny jednego właściciela",
            "spójna zasada dla całego zestawu",
            "raport przed i po wdrożeniu",
          ],
        },
      ]}
      faq={[
        {
          q: "Skąd wiadomo, że to naprawdę szkodzi?",
          a: "Mierzymy, czy treść pod dwoma adresami jest identyczna. Ile pozycji tracisz, pokaże dopiero Twoja Search Console.",
        },
        {
          q: "Mamy znacznik kanoniczny, czy to wystarczy?",
          a: "Zwykle tak, ale to podpowiedź, nie reguła. Przekierowanie na serwerze działa zawsze i dla każdego adresu.",
        },
        {
          q: "Czy wdrożenie może popsuć stronę?",
          a: "Zła reguła może zapętlić przekierowanie. Dlatego zaczynamy od kopii konfiguracji, a przy WordPressie sprawdzamy też adres w ustawieniach.",
        },
        {
          q: "Sprawdzenie nic nie wykryło, a mimo to mamy słabe pozycje.",
          a: "To znaczy, że ten problem odpada. Widoczność ma wiele przyczyn, a my nie sprzedajemy audytów na zapas.",
        },
      ]}
      formId="order_podwojny_adres"
      formIntro="Napisz, na jakim serwerze albo systemie działa strona. Odeślemy gotową regułę."
      formHeading="Zamów naprawę adresu"
      submitLabel="Zamów naprawę"
      microCopy="Do sprawdzenia nie potrzebujemy dostępów. Regułę możemy przekazać Waszemu informatykowi."
      serviceName="Ujednolicenie adresu strony firmowej"
      serviceDesc="Wskazanie wersji kanonicznej adresu, przygotowanie i wdrożenie przekierowania oraz znacznika wersji głównej, wraz z kontrolnym sprawdzeniem po wdrożeniu. Od 190 zł."
      serviceType="Konfiguracja przekierowań i adresu kanonicznego strony"
    />
  );
}
