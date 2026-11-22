import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Audyt strony co miesiąc od 19 zł | Fluxlab",
  description:
    "Co miesiąc audyt całej strony tym samym pomiarem co audyt jednorazowy, z porównaniem do poprzedniego i raportem w załączniku. 19 zł netto.",
  alternates: { canonical: "/audyt-strony-co-miesiac" },
  openGraph: {
    title: "Audyt strony co miesiąc od 19 zł | Fluxlab",
    description:
      "Co miesiąc audyt całej strony tym samym pomiarem co audyt jednorazowy, z porównaniem do poprzedniego i raportem w załączniku. 19 zł netto.",
    url: "/audyt-strony-co-miesiac",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, audyt strony co miesiąc" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="audyt-strony-co-miesiac"
      typ="usluga"
      breadcrumb="Audyt strony co miesiąc"
      h1="Strona psuje się po cichu. Co miesiąc dostaniesz listę, co naprawiono, a co doszło"
      lead="Raz na 30 dni badamy całą Twoją stronę tym samym pomiarem co audyt jednorazowy. W mailu widzisz, ile problemów naprawiono i jakie doszły, a pełny raport przychodzi w załączniku."
      ctaLabel="Włącz audyt co miesiąc"
      ctaNote="19 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Pierwszy audyt od razu",
          desc: "Zaraz po zamówieniu uruchamiamy audyt całej strony. Wynik przychodzi mailem po kilku minutach, z pełnym raportem w załączniku.",
        },
        {
          title: "Porównanie z poprzednim",
          desc: "Co 30 dni powtarzamy audyt i porównujemy z poprzednim. Widzisz liczbę naprawionych i nowych problemów oraz adresy nowych.",
        },
        {
          title: "Ten sam pomiar co audyt jednorazowy",
          desc: "Używamy tego samego badania całej strony, które sprzedajemy jako audyt jednorazowy. Jeśli strona nie odpowiada, zwracamy całą opłatę.",
        },
      ]}
      pricing={[
        {
          name: "Audyt strony co miesiąc",
          price: "19 zł/mies.",
          kup: "monitoring-audyt",
          desc: "Netto. Jedna strona, audyt co 30 dni.",
          features: [
            "pierwszy audyt całej strony od razu",
            "miesięczne porównanie: naprawione i nowe problemy",
            "pełny raport w załączniku",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jaki adres podać?",
          a: "Adres strony, którą mamy zbadać, na przykład twojafirma.pl. Strona musi być dostępna bez logowania.",
        },
        {
          q: "Ile trwa pierwszy audyt?",
          a: "Zwykle kilka minut. Wynik przychodzi mailem, nie musisz czekać na stronie.",
        },
        {
          q: "Co jest w mailu, a co w załączniku?",
          a: "W mailu podsumowanie i lista nowych problemów. W załączniku pełny raport HTML ze wszystkimi problemami.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Audyty wyłączamy automatycznie.",
        },
      ]}
      formId="order_audyt_strony_co_miesiac"
      formHeading="Zapytaj o więcej stron"
      formIntro="Chcesz badać kilka stron? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Audyt strony co miesiąc"
      serviceDesc="Miesięczny audyt całej strony z porównaniem do poprzedniego i pełnym raportem w załączniku, za 19 zł netto miesięcznie."
      serviceType="Audyt strony"
    />
  );
}
