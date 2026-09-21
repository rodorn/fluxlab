import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import AiCheck from "@/components/AiCheck";

export const metadata: Metadata = {
  title: "Czy asystent AI widzi Twoją stronę? Darmowe sprawdzenie | Fluxlab",
  description:
    "Sprawdzam siedem rzeczy, od których zależy, czy ChatGPT, Claude czy Perplexity mogą w ogóle przeczytać Twoją stronę: dostęp dla robotów, treść bez skryptów, dane uporządkowane, mapa strony i llms.txt. Bez rejestracji.",
  alternates: { canonical: "/widocznosc-w-ai" },
  openGraph: {
    title: "Czy asystent AI widzi Twoją stronę? Darmowe sprawdzenie | Fluxlab",
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
      lead="Część klientów przestała wpisywać frazy w wyszukiwarkę i zaczęła pytać asystenta o firmę do konkretnego zadania. Odpowiedź powstaje z tego, co robot zdołał przeczytać. Sprawdzam siedem rzeczy, które decydują, czy Twoja strona w ogóle może się w niej pojawić."
      ctaLabel="Sprawdź swoją stronę"
      ctaNote="Wynik od ręki, bez rejestracji"
      tool={<AiCheck />}
      checks={[
        {
          title: "Blokada, o której nikt nie pamięta",
          desc: "Roboty zbierające treść do modeli mają własne nazwy i własne reguły w pliku robots.txt. Reguła napisana kiedyś przeciwko robotom kopiującym treść potrafi przy okazji wyciąć wszystkie z nich naraz. Blokada bywa świadoma i wtedy nie ma o czym mówić, ale warto wiedzieć, że się ją ma, zamiast odkryć to przypadkiem.",
        },
        {
          title: "Strona, która buduje się dopiero w przeglądarce",
          desc: "To najczęstszy i najpoważniejszy problem. Sklep albo strona oparta na skryptach wygląda u człowieka normalnie, a w samym dokumencie ma kilkaset znaków. Roboty zbierające dane do modeli w większości nie uruchamiają skryptów, więc widzą pustą kartkę i nie mają czego zacytować.",
        },
        {
          title: "Firma opisana tak, żeby maszyna nie musiała zgadywać",
          desc: "Dane uporządkowane to kilkanaście linii w dokumencie, które mówią wprost: to jest firma, tym się zajmuje, tu działa, tak się z nią kontaktuje. Bez nich maszyna wyciąga to z układu strony, a przy wyciąganiu myli branżę i zakres usług znacznie częściej, niż się wydaje.",
        },
        {
          title: "Zdanie, którym asystent Cię opisze",
          desc: "Tytuł strony i opis w metadanych to najczęściej cytowany fragment całego serwisu. Jeśli stoi tam nazwa firmy i słowo „strona główna\", to jest dokładnie to, co usłyszy pytający. Jeśli stoi tam, co robicie i dla kogo, odpowiedź wygląda zupełnie inaczej.",
        },
        {
          title: "llms.txt, czyli własnymi słowami",
          desc: "Krótki plik tekstowy, w którym firma sama opisuje, czym jest i gdzie w serwisie leży co. Nie jest wymogiem i jego brak niczego nie psuje. Jest natomiast najtańszym sposobem, żeby samemu napisać zdanie o swojej firmie, zamiast zostawiać je interpretacji.",
        },
        {
          title: "Czego to sprawdzenie nie robi",
          desc: "Nie obiecuje miejsca w odpowiedzi asystenta i nie mierzy, jak często ktoś już Cię wymienia. Żaden dostawca tego nie gwarantuje, a każdy, kto obiecuje pozycję w odpowiedziach AI, obiecuje rzecz, na którą nie ma wpływu. To jest sprawdzenie warunków wstępnych: czy robot w ogóle ma co przeczytać.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Tu, na stronie, od ręki.",
          features: [
            "Siedem punktów z opisem, co dokładnie znaleziono",
            "Bez rejestracji i bez zapisu na listę",
            "Wynik możesz przesłać dalej swojemu wykonawcy",
          ],
        },
        {
          name: "Naprawa warunków wstępnych",
          price: "890 zł",
          desc: "Gdy sprawdzenie wyszło na czerwono.",
          features: [
            "Zdjęcie przypadkowych blokad z robots.txt",
            "Dane uporządkowane o firmie i usługach",
            "Tytuły i opisy na kluczowych podstronach",
            "Plik llms.txt napisany Waszymi słowami",
            "Ponowne sprawdzenie po zmianach, na piśmie",
          ],
          featured: true,
        },
        {
          name: "Treść pod pytania klientów",
          price: "od 1 900 zł",
          desc: "Gdy technicznie jest już dobrze.",
          features: [
            "Zestaw realnych pytań, które zadaje Wasz klient",
            "Odpowiedzi na stronie, konkretne i cytowalne",
            "Układ treści, z którego da się wyciąć fragment",
            "Bez ogólników o jakości i indywidualnym podejściu",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy blokowanie tych robotów jest błędem?",
          a: "Nie zawsze. Wydawca, który żyje ze swoich treści, ma dobry powód, żeby nie oddawać ich do trenowania modeli za darmo. Firma usługowa zwykle nie ma takiego powodu, a blokada odcina ją od kanału, w którym ktoś właśnie pyta o wykonawcę. Sprawdzenie pokazuje stan, a decyzja należy do Was.",
        },
        {
          q: "Skąd wiadomo, że roboty nie uruchamiają skryptów?",
          a: "Z dokumentacji dostawców i z zachowania, które widać po stronie serwera. Część z nich potrafi już renderować, ale nie jest to regułą i nie jest to gwarantowane. Strona, której treść siedzi w samym dokumencie, działa u wszystkich, a strona zależna od skryptów działa u części. Przy równym koszcie wybór jest oczywisty.",
        },
        {
          q: "Czy da się sprawdzić, czy ChatGPT już mnie wymienia?",
          a: "Nie tym narzędziem i nie w sposób, który dałoby się nazwać pomiarem. Odpowiedzi asystentów różnią się między użytkownikami i zmieniają w czasie, więc pojedyncze zapytanie niczego nie dowodzi. Dlatego sprawdzam warunki, na które macie wpływ, a nie wynik, na który nie ma go nikt.",
        },
        {
          q: "Czy to nie jest to samo co pozycjonowanie?",
          a: "Częściowo się pokrywa, bo jedno i drugie wymaga, żeby treść dała się przeczytać. Różnica jest w tym, co się dzieje dalej: wyszukiwarka pokazuje listę odnośników, a asystent wybiera kilka źródeł i buduje z nich jedną odpowiedź. Materiałem do zacytowania jest konkretna odpowiedź na konkretne pytanie, a nie strona nasycona frazami.",
        },
      ]}
      formId="widocznosc_ai"
      formHeading="Wynik wyszedł na czerwono i nie wiesz, od czego zacząć"
      formIntro="Napisz adres strony i jedno zdanie o tym, kto ją dla Was prowadzi. Odeślę kolejność działań i informację, co da się zrobić samemu, a co wymaga kogoś z dostępem do kodu."
      submitLabel="Poproś o kolejność działań"
      microCopy="Odpisuję zwykle tego samego dnia. Ustalenia prowadzę mailowo."
      serviceName="Audyt widoczności strony dla asystentów AI"
      serviceDesc="Sprawdzenie, czy roboty zbierające treść na potrzeby asystentów AI mogą przeczytać stronę: dostęp w robots.txt, treść bez skryptów, dane uporządkowane, metadane, mapa strony i llms.txt."
      serviceType="Audyt techniczny strony internetowej"
    />
  );
}
