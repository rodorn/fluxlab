import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kontrola banera cookies i Consent Mode v2 za 19 zł | Fluxlab",
  description:
    "Raport, czy tagi Google, Meta i inne czekają na zgodę oraz czy Consent Mode v2 jest ustawiony poprawnie. Mail z PDF w kilka minut, 19 zł netto jednorazowo.",
  alternates: { canonical: "/kontrola-banera-cookies" },
  openGraph: {
    title: "Kontrola banera cookies i Consent Mode v2 za 19 zł | Fluxlab",
    description:
      "Czy tagi śledzące czekają na zgodę i czy Consent Mode v2 ma cztery sygnały? Raport z listą poprawek w kilka minut.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kontrola banera cookies i Consent Mode v2" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kontrola-banera-cookies"
      breadcrumb="Kontrola banera cookies"
      typ="usluga"
      h1="Czy Twój baner cookies naprawdę blokuje śledzenie do zgody?"
      lead="Czytamy kod Twojej strony i sprawdzamy, które tagi śledzące uruchamiają się od razu, a które czekają na zgodę, oraz czy Consent Mode v2 ma domyślne odmowy ustawione przed tagami Google. Raport z listą rzeczy do poprawy dostajesz mailem z PDF w kilka minut po płatności."
      ctaLabel="Zamów kontrolę"
      ctaNote="19 zł netto, jednorazowo, bez umowy"
      checks={[
        {
          title: "Tagi czekające na zgodę",
          desc: "Google Analytics, Google Ads, Meta Pixel, TikTok, LinkedIn, Clarity, Hotjar i Pinterest. Dla każdego widzisz, czy skrypt jest zablokowany do zgody, czy startuje od razu.",
        },
        {
          title: "Consent Mode v2",
          desc: "Czy w kodzie jest ustawienie domyślne, czy ma cztery sygnały (ad_storage, analytics_storage, ad_user_data, ad_personalization), czy wszystkie to „denied” i czy stoi przed tagami Google.",
        },
        {
          title: "Narzędzie zgód",
          desc: "Rozpoznajemy popularne narzędzia, takie jak Cookiebot, OneTrust, CookieYes, Complianz czy Iubenda, oraz własne banery, które przekazują wybór do Google.",
        },
        {
          title: "Ciasteczka od pierwszej odpowiedzi",
          desc: "Lista ciasteczek, które serwer ustawia przy wejściu, z zaznaczonymi śledzącymi, takimi jak _fbp.",
        },
      ]}
      pricing={[
        {
          name: "Kontrola banera cookies",
          price: "19 zł",
          kup: "baner-cookies",
          desc: "Netto, jednorazowo. Mail z raportem i PDF w kilka minut.",
          features: [
            "strona główna i do 3 podstron",
            "tagi śledzące: czekają na zgodę czy nie",
            "Consent Mode v2: cztery sygnały i kolejność",
            "ciasteczka ustawiane przez serwer",
            "lista poprawek w mailu i w PDF",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy sprawdzacie, co się dzieje po kliknięciu „Odrzuć”?",
          a: "Nie. Analizujemy kod strony, nie otwieramy jej w przeglądarce i nie klikamy w baner. Dlatego nie sprawdzamy, czy konwersje są liczone po odmowie, ani ciasteczek ustawianych skryptem po wczytaniu strony. Raport pokazuje, co jest widoczne w kodzie, i mówi wprost, czego nie widać.",
        },
        {
          q: "A tagi w Menedżerze Tagów Google?",
          a: "Menedżer ładuje je po wczytaniu strony, więc nie widzimy, które mają warunek zgody. Raport zaznacza to jako pozycję do ręcznego sprawdzenia w kontenerze.",
        },
        {
          q: "Czy raport jest poradą prawną?",
          a: "Nie. To techniczna kontrola kodu. Czy baner spełnia wymogi prawa, ocenia prawnik.",
        },
        {
          q: "Co, gdy strony nie da się pobrać?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem. Zwrot dostajesz też, gdy po naszej stronie wystąpi błąd.",
        },
        {
          q: "Czy poprawicie baner za mnie?",
          a: "Nie w tym zamówieniu. Raport mówi, co poprawić. Jeśli chcesz, żebyśmy to zrobili, napisz przez formularz poniżej.",
        },
      ]}
      formId="order_baner_cookies"
      formHeading="Chcesz, żebyśmy poprawili baner?"
      formIntro="Napisz, jakiego narzędzia zgód używasz, a odpiszemy z wyceną poprawek."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Kontrola banera cookies i Consent Mode v2"
      serviceDesc="Jednorazowy raport, czy tagi śledzące czekają na zgodę i czy Consent Mode v2 jest ustawiony poprawnie, za 19 zł netto."
      serviceType="Audyt banera cookies"
    />
  );
}
