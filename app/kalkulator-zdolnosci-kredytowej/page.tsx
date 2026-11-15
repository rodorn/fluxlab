import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kalkulator zdolności kredytowej, 49 zł/mies. | Fluxlab",
  description:
    "Kalkulator orientacyjnej zdolności kredytowej do wklejenia na stronę pośrednika. Twoja nazwa, kontakt i oprocentowanie, kod w mailu po zamówieniu. 49 zł netto.",
  alternates: { canonical: "/kalkulator-zdolnosci-kredytowej" },
  openGraph: {
    title: "Kalkulator zdolności kredytowej, 49 zł/mies. | Fluxlab",
    description: "Klient sam sprawdza orientacyjną zdolność kredytową na Twojej stronie i od razu może umówić rozmowę.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kalkulator zdolności kredytowej" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kalkulator-zdolnosci-kredytowej"
      breadcrumb="Kalkulator zdolności kredytowej"
      eyebrow="Dla pośredników kredytowych"
      h1="Klient sprawdzi zdolność na Twojej stronie, zanim do Ciebie zadzwoni"
      lead="Wklejasz jeden kod na swoją stronę. Odwiedzający podaje dochód, liczbę osób w gospodarstwie, spłacane raty i okres, a kalkulator pokazuje orientacyjną maksymalną kwotę kredytu. Przycisk „Umów rozmowę z doradcą” prowadzi na Twój telefon lub e-mail, z kwotą w wiadomości."
      ctaLabel="Zamów kalkulator"
      ctaNote="49 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Do rozmowy z klientem przyda się też",
          kotwica: "alert zmian stóp NBP i WIRON",
          href: "/alert-stop-procentowych",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Jawne założenia",
          desc: "Pod wynikiem klient widzi, co przyjęto: koszty życia na dorosłego i dziecko, limit raty jako część dochodu oraz bufor 2,5 pp na wzrost stóp.",
        },
        {
          title: "Twoja nazwa, kontakt i oprocentowanie",
          desc: "Podajesz je przy zamówieniu. Zmiany robimy na prośbę, odpisując na mail z kodem.",
        },
        {
          title: "Działa na telefonie",
          desc: "Suwaki i duże przyciski, jedna kolumna. Kalkulator ma stałą szerokość do 480 px i wtapia się w stronę.",
        },
      ]}
      pricing={[
        {
          name: "Kalkulator zdolności",
          price: "49 zł/mies.",
          kup: "zdolnosc",
          desc: "Netto. Kod do wklejenia w mailu, kalkulator działa do końca subskrypcji.",
          features: ["orientacyjna kwota kredytu", "Twoja nazwa, kontakt i oprocentowanie", "rezygnacja w dowolnym dniu"],
          featured: true,
        },
      ]}
      poCenniku={
        <div className="mt-8">
          <p className="mb-3 text-sm text-gray-600">Tak wygląda kalkulator (wersja demonstracyjna):</p>
          <iframe
            src="/embed/zdolnosc"
            title="Kalkulator zdolności kredytowej, podgląd"
            loading="lazy"
            className="w-full max-w-[480px] rounded-xl border border-black/10"
            style={{ height: 720 }}
          />
        </div>
      }
      faq={[
        {
          q: "Czy wynik jest decyzją kredytową?",
          a: "Nie. To wyliczenie orientacyjne na podstawie jawnych założeń. Banki liczą zdolność po swojemu i biorą pod uwagę historię kredytową oraz rodzaj umowy. Informacja o tym jest pod wynikiem.",
        },
        {
          q: "Jak liczona jest kwota?",
          a: "Rata to mniejsza z dwóch wartości: połowa dochodu minus spłacane zobowiązania albo dochód minus koszty życia i zobowiązania. Kwotę kredytu liczymy z równej raty, oprocentowania powiększonego o 2,5 pp i wybranego okresu.",
        },
        {
          q: "Co dzieje się po rezygnacji?",
          a: "Po anulowaniu subskrypcji kalkulator na Twojej stronie pokazuje komunikat, że jest wyłączony. Rezygnujesz w dowolnym dniu, odpisując na mail z kodem.",
        },
        {
          q: "Czy kalkulator zbiera dane klientów?",
          a: "Nie. Dane z suwaków zostają w przeglądarce odwiedzającego. Do Ciebie trafia tylko to, co klient sam napisze po kliknięciu przycisku kontaktu.",
        },
      ]}
      formId="order_zdolnosc"
      formHeading="Zamów kalkulator zdolności"
      formIntro="Podaj nazwę firmy i kontakt dla klientów. Kod do wklejenia dostaniesz mailem."
      submitLabel="Zamów kalkulator"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Kalkulator zdolności kredytowej dla pośrednika"
      serviceDesc="Kalkulator orientacyjnej zdolności kredytowej do osadzenia na stronie pośrednika. 49 zł netto miesięcznie."
      serviceType="Kalkulator na stronę"
    />
  );
}
