import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Newsletter z bloga, 29 zł/mies. | Fluxlab",
  description:
    "Nowe wpisy z bloga same trafiają mailem do czytelników zapisanych formularzem na Twojej stronie. Podwójne potwierdzenie i wypis w mailu. 29 zł netto.",
  alternates: { canonical: "/newsletter-z-bloga" },
  openGraph: {
    title: "Newsletter z bloga, 29 zł/mies. | Fluxlab",
    description: "Czytelnik zapisuje się na blogu, a każdy nowy wpis dostaje mailem bez Twojej pracy.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, newsletter z bloga" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="newsletter-z-bloga"
      breadcrumb="Newsletter z bloga"
      eyebrow="Dla blogów firmowych i autorskich"
      h1="Nowy wpis na blogu sam trafia do czytelników"
      lead="Wklejasz formularz zapisu na stronę i podajesz adres kanału RSS bloga. Czytelnik potwierdza adres linkiem z maila, a każdy nowy wpis z kanału dostaje mailem: tytuł, początek tekstu i przycisk „Czytaj cały wpis”."
      ctaLabel="Zamów newsletter"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Zanim zaczniesz pisać, sprawdź, co jeszcze psuje stronę. Zrób",
          kotwica: "darmowy audyt strony",
          href: "/audyt-strony",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Podwójne potwierdzenie zapisu",
          desc: "Adres trafia na listę dopiero po kliknięciu linku w mailu. Bez kliknięcia nic nie wysyłamy.",
        },
        {
          title: "Wypis jednym kliknięciem",
          desc: "Każda wiadomość ma link do wypisu i nagłówek List-Unsubscribe, więc skrzynki pokazują przycisk „Wypisz się”.",
        },
        {
          title: "Działa bez Twojej pracy",
          desc: "Kanał RSS sprawdzamy co 30 minut. Wpisy, które już są na blogu w dniu startu, nie zostaną rozesłane.",
        },
      ]}
      pricing={[
        {
          name: "Newsletter z bloga",
          price: "29 zł/mies.",
          kup: "newsletter",
          desc: "Netto. Kod formularza w mailu, wysyłka działa do końca subskrypcji.",
          features: ["formularz zapisu do wklejenia", "wysyłka nowych wpisów z RSS", "rezygnacja w dowolnym dniu"],
          featured: true,
        },
      ]}
      poCenniku={
        <div className="mt-8">
          <p className="mb-3 text-sm text-gray-600">Tak wygląda formularz zapisu (wersja demonstracyjna):</p>
          <iframe
            src="/embed/newsletter"
            title="Formularz zapisu na newsletter, podgląd"
            loading="lazy"
            className="w-full max-w-[480px] rounded-xl border border-black/10"
            style={{ height: 240 }}
          />
        </div>
      }
      faq={[
        {
          q: "Skąd wziąć adres kanału RSS?",
          a: "Większość blogów ma go pod adresem kończącym się na /feed albo /rss.xml (WordPress: twojblog.pl/feed). Jeśli nie możesz go znaleźć, wpisz adres bloga, a odpiszemy, gdy kanału nie uda się odczytać.",
        },
        {
          q: "Kto jest nadawcą wiadomości?",
          a: "Nazwa, którą podasz przy zamówieniu, z dopiskiem „przez Fluxlab”. Wysyłamy z adresu Fluxlab, odpowiedzi czytelników trafiają do nas, a nie na Twoją skrzynkę.",
        },
        {
          q: "Co z danymi czytelników?",
          a: "Zapisujemy tylko adres e-mail i stan zapisu. Po anulowaniu subskrypcji formularz się wyłącza, a lista odbiorców jest usuwana. Na stronie z formularzem to Ty jesteś administratorem danych swoich czytelników.",
        },
        {
          q: "Czy roześlecie stare wpisy?",
          a: "Nie. W dniu startu zapamiętujemy wpisy, które już są na blogu, i wysyłamy dopiero te, które pojawią się później. Jednorazowo wysyłamy najwyżej trzy nowe wpisy.",
        },
      ]}
      formId="order_newsletter"
      formHeading="Zamów newsletter z bloga"
      formIntro="Podaj adres kanału RSS bloga i nazwę nadawcy. Kod formularza dostaniesz mailem."
      submitLabel="Zamów newsletter"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Newsletter z bloga"
      serviceDesc="Automatyczna wysyłka nowych wpisów z bloga do czytelników zapisanych formularzem. 29 zł netto miesięcznie."
      serviceType="Newsletter"
    />
  );
}
