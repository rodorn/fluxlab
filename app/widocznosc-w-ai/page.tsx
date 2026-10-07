import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import AiCheck from "@/components/AiCheck";

export const metadata: Metadata = {
  title: "Asystent AI a Wasza strona: czy ChatGPT ją widzi | Fluxlab",
  description:
    "Asystent AI poleci Waszą firmę tylko, gdy przeczyta stronę. Sprawdzamy za darmo 7 rzeczy, od których to zależy: dostęp robotów, treść, dane, llms.txt.",
  alternates: { canonical: "/widocznosc-w-ai" },
  openGraph: {
    title: "Asystent AI a Wasza strona: czy ChatGPT ją widzi | Fluxlab",
    description:
      "Klient pyta asystenta zamiast wpisywać frazę. Sprawdź, czy Twoja strona może w takiej odpowiedzi wystąpić.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, widoczność strony dla asystentów AI",
      },
    ],
  },
};

export default function WidocznoscWAi() {
  return (
    <ProductLanding
      slug="widocznosc-w-ai"
      breadcrumb="Widoczność w AI"
      eyebrow="Za darmo"
      h1="Czy asystent AI widzi Twoją stronę"
      lead="Coraz więcej klientów pyta asystenta AI zamiast wpisywać frazę w wyszukiwarkę. Asystent poleci tylko stronę, którą zdołał przeczytać. Sprawdzamy siedem warunków, od których to zależy."
      ctaLabel="Sprawdź swoją stronę"
      ctaNote="Wynik od ręki, bez rejestracji"
      tool={<AiCheck />}
      checks={[
        {
          title: "Zapomniana blokada",
          desc: "Stara reguła w robots.txt przeciwko robotom kopiującym treść potrafi zablokować wszystkie roboty AI naraz. Warto wiedzieć, że się ją ma.",
        },
        {
          title: "Strona budowana w przeglądarce",
          desc: "Najczęstszy problem. Większość robotów AI nie uruchamia skryptów, więc strona oparta na nich jest dla nich pusta.",
        },
        {
          title: "Dane o firmie dla maszyny",
          desc: "Kilkanaście linii danych uporządkowanych mówi wprost, czym się zajmujecie i gdzie działacie. Bez nich robot zgaduje i często myli branżę.",
        },
        {
          title: "Tytuł i opis strony",
          desc: "To najczęściej cytowany fragment serwisu. Powinien mówić, co robicie i dla kogo, a nie tylko „strona główna”.",
        },
        {
          title: "Plik llms.txt",
          desc: "Krótki opis firmy Waszymi słowami. Nie jest wymagany, ale to najtańszy sposób, by samemu napisać zdanie o sobie.",
        },
        {
          title: "Czego nie obiecujemy",
          desc: "Nikt nie gwarantuje miejsca w odpowiedzi asystenta. Sprawdzamy warunki wstępne: czy robot ma co przeczytać.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Tu, na stronie, od ręki.",
          features: [
            "Siedem punktów z opisem wyniku",
            "Bez rejestracji",
          ],
        },
        {
          name: "Naprawa warunków wstępnych",
          price: "890 zł",
          desc: "Gdy sprawdzenie wyszło na czerwono.",
          features: [
            "Usunięcie przypadkowych blokad z robots.txt",
            "Dane uporządkowane o firmie i usługach",
            "Tytuły i opisy kluczowych podstron",
            "Plik llms.txt i ponowne sprawdzenie",
          ],
          featured: true,
        },
        {
          name: "Treść pod pytania klientów",
          price: "od 1 900 zł",
          desc: "Gdy technicznie jest już dobrze.",
          features: [
            "Realne pytania, które zadaje Wasz klient",
            "Konkretne odpowiedzi na stronie, łatwe do zacytowania",
          ],
        },
      ]}
      faq={[
        {
          q: "Jak wpuścić ChatGPT na stronę, ale nie oddawać treści do trenowania modeli?",
          a: "W robots.txt wpuśćcie OAI-SearchBot (wyszukiwanie w ChatGPT), a zablokujcie GPTBot (trenowanie): „User-agent: OAI-SearchBot” z „Allow: /” oraz „User-agent: GPTBot” z „Disallow: /”.",
        },
        {
          q: "Czy zablokowanie GPTBot usuwa nas z ChatGPT?",
          a: "Nie, GPTBot dotyczy tylko trenowania. Z wyszukiwania w ChatGPT usuwa Was natomiast reguła „User-agent: *” z „Disallow: /” albo gotowa lista blokująca wszystkie roboty AI.",
        },
        {
          q: "Czy blokada Google-Extended wyłącza nas z AI Overviews w Google?",
          a: "Nie. Google-Extended dotyczy trenowania Gemini. AI Overviews to część wyszukiwarki, którą steruje zwykły Googlebot i znaczniki takie jak nosnippet czy noindex.",
        },
        {
          q: "Czy da się sprawdzić, czy ChatGPT już mnie wymienia?",
          a: "Nie w sposób, który byłby pomiarem. Odpowiedzi asystentów różnią się między użytkownikami i zmieniają w czasie, dlatego sprawdzamy warunki, na które macie wpływ.",
        },
      ]}
      formId="widocznosc_ai"
      formHeading="Wynik wyszedł na czerwono i nie wiesz, od czego zacząć"
      formIntro="Podaj adres strony. Odeślemy kolejność działań i napiszemy, co zrobicie sami, a co wymaga dostępu do kodu."
      submitLabel="Poproś o kolejność działań"
      microCopy="Odpisujemy zwykle tego samego dnia. Ustalenia prowadzimy mailowo."
      serviceName="Audyt widoczności strony dla asystentów AI"
      serviceDesc="Sprawdzenie, czy roboty zbierające treść na potrzeby asystentów AI mogą przeczytać stronę: dostęp w robots.txt, treść bez skryptów, dane uporządkowane, metadane, mapa strony i llms.txt."
      serviceType="Audyt techniczny strony internetowej"
    />
  );
}
