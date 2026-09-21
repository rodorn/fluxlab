import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Landing z formularzem i płatnością, od 299 zł | Fluxlab",
  description:
    "Jedna strona sprzedażowa z formularzem i bramką płatniczą pod BLIK i przelewy. Zgłoszenie zapisuje się przed przejściem do płatności, a potwierdzenie przychodzi webhookiem, nie powrotem na stronę.",
  alternates: { canonical: "/landing-z-platnoscia" },
  openGraph: {
    title: "Landing z formularzem i płatnością, od 299 zł | Fluxlab",
    description:
      "Szybkie wdrożenie pod jedną kampanię. Nie tracisz danych osób, które zrezygnują w trakcie płatności.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, landing z formularzem i płatnością",
      },
    ],
  },
};

export default function LandingZPlatnoscia() {
  return (
    <ProductLanding
      slug="landing-z-platnoscia"
      breadcrumb="Landing z płatnością"
      eyebrow="Strony"
      h1="Landing z formularzem i płatnością"
      lead="Jedna strona pod jedną kampanię: opis, formularz, płatność. Zbudowana wokół dwóch rzeczy, na których takie strony tracą najwięcej pieniędzy, czyli momentu zapisu zgłoszenia i sposobu potwierdzania płatności."
      ctaLabel="Opisz, co sprzedajesz"
      ctaNote="Od 299 zł, wdrożenie zwykle w kilka dni"
      checks={[
        {
          title: "Zgłoszenie zapisuje się przed płatnością",
          desc: "To jest najczęstszy i najdroższy błąd na takich stronach: dane trafiają do bazy dopiero po udanej płatności. Człowiek, który wypełnił formularz i odpadł przy BLIKu, znika bez śladu, a to jest osoba najbliższa zakupowi z wszystkich, które tego dnia weszły na stronę. U mnie zapis idzie wcześniej, więc masz do kogo wrócić.",
        },
        {
          title: "Potwierdzenie płatności idzie webhookiem",
          desc: "Poleganie na powrocie klienta na stronę po płatności oznacza, że każdy, kto zamknie kartę albo straci zasięg, zostanie w systemie jako nieopłacony mimo pobranych pieniędzy. Operator płatności wysyła potwierdzenie osobnym kanałem i to ono rozstrzyga o statusie zamówienia.",
        },
        {
          title: "Jeden szablon, wiele kampanii",
          desc: "Strona powstaje tak, żeby druga i trzecia kampania nie oznaczały budowy od zera. Treść, ceny i grafiki są oddzielone od układu, więc kolejny landing to podmiana zawartości i podpięcie domeny, a nie nowy projekt.",
        },
        {
          title: "Zgodność z obowiązkami przy sprzedaży online",
          desc: "Przy sprzedaży konsumentowi trzeba zebrać zgodę na rozpoczęcie świadczenia przed upływem terminu odstąpienia, pokazać cenę całkowitą i udostępnić regulamin w sposób pozwalający go zapisać. To są elementy strony, nie dodatek prawny, i buduję je od razu, zamiast dokładać po fakcie.",
        },
        {
          title: "Co dostajesz razem ze stroną",
          desc: "Powiadomienie mailowe o każdym zgłoszeniu, potwierdzenie dla kupującego, panel z listą zgłoszeń i statusem płatności oraz dostęp do repozytorium. Żadnego mojego panelu, bez którego strona przestaje działać.",
        },
        {
          title: "Czego nie obejmuje cena",
          desc: "Umowy z operatorem płatności, bo to Wasza rejestracja i Wasza weryfikacja tożsamości, oraz kosztu domeny i hostingu, jeśli nie macie własnych. Prowizja operatora jest po Waszej stronie i nie przechodzi przeze mnie. Mówię to przed startem, nie po pierwszej fakturze.",
        },
      ]}
      pricing={[
        {
          name: "Jedna kampania",
          price: "299 zł",
          desc: "Strona, formularz, powiadomienia.",
          features: [
            "Jedna strona sprzedażowa na Waszej domenie",
            "Formularz z zapisem przed płatnością",
            "Powiadomienie mailem o każdym zgłoszeniu",
            "Potwierdzenie dla kupującego",
          ],
        },
        {
          name: "Z płatnością",
          price: "790 zł",
          desc: "Z podpiętą bramką i obsługą statusów.",
          features: [
            "Wszystko z wariantu podstawowego",
            "Bramka płatnicza pod BLIK i przelewy",
            "Potwierdzenie płatności webhookiem",
            "Panel ze zgłoszeniami i statusem płatności",
            "Regulamin i zgody wymagane przy sprzedaży online",
          ],
          featured: true,
        },
        {
          name: "Kolejna kampania",
          price: "190 zł",
          desc: "Gdy szablon już stoi.",
          features: [
            "Nowa treść i grafiki na istniejącym szablonie",
            "Osobna domena albo adres pod istniejącą",
            "Osobna lista zgłoszeń",
            "Bez budowania od zera",
          ],
        },
      ]}
      faq={[
        {
          q: "Jakiej bramki płatniczej używasz?",
          a: "Tej, którą wybierzecie i w której przejdziecie weryfikację, bo umowa jest zawierana na Waszą firmę. Technicznie różnice są niewielkie: liczy się to, czy operator wysyła potwierdzenie osobnym kanałem, a robią to wszyscy liczący się na polskim rynku. Jeśli nie macie jeszcze żadnej, powiem, czym się różnią prowizje i czas wypłaty, ale rejestrację przechodzicie sami.",
        },
        {
          q: "Ile to trwa?",
          a: "Wariant z płatnością to zwykle trzy do pięciu dni roboczych od chwili, gdy mam treść i działające dane dostępowe do bramki. Jeśli treść dopiero powstaje, to ona jest wąskim gardłem, a nie kod.",
        },
        {
          q: "Czy strona będzie na WordPressie?",
          a: "Nie, jeśli nie ma ku temu powodu. Jedna strona sprzedażowa nie potrzebuje systemu zarządzania treścią, a bez niego ładuje się szybciej, jest odporniejsza na włamania i nie wymaga comiesięcznych aktualizacji. Jeśli jednak macie już stronę na WordPressie i landing ma być jej częścią, zrobię go tam.",
        },
        {
          q: "Co, jeśli kampania nie wypali?",
          a: "Strona zostaje u Was razem z kodem i można ją wyłączyć albo przerobić pod inną ofertę. Nie ma tu abonamentu, który trzeba wypowiadać, ani przywiązania do mojego serwera.",
        },
      ]}
      formId="landing_platnosc"
      formHeading="Napisz, co sprzedajesz i komu"
      formIntro="Wystarczy jedno zdanie o produkcie, cena i informacja, czy macie już bramkę płatniczą. Odpiszę, który wariant ma sens i ile zajmie."
      submitLabel="Wyślij opis kampanii"
      microCopy="Odpisuję zwykle tego samego dnia. Ustalenia prowadzę mailowo."
      serviceName="Landing z formularzem i płatnością"
      serviceDesc="Strona sprzedażowa pod jedną kampanię, z formularzem zapisującym zgłoszenie przed płatnością i bramką płatniczą potwierdzaną webhookiem."
      serviceType="Tworzenie stron internetowych"
    />
  );
}
