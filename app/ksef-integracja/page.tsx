import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KsefCheck from "@/components/KsefCheck";
import ListaKsef2027 from "@/components/ListaKsef2027";
import { PODATNICY } from "@/lib/terminy-ksef";

export const metadata: Metadata = {
  title: "Od kiedy KSeF jest obowiązkowy? Terminy dla firm | Fluxlab",
  description:
    "Duże firmy od 1 lutego 2026, pozostałe od 1 kwietnia, sprzedaż do 10 tys. zł miesięcznie i kasy od 1 stycznia 2027. Sprawdźcie swój termin, bez rejestracji.",
  alternates: { canonical: "/ksef-integracja" },
  openGraph: {
    title:
      "Od kiedy KSeF obowiązuje Waszą firmę? Sprawdzenie w dwóch kliknięciach",
    description:
      "Wybieracie rodzaj sprzedaży i sposób wystawiania faktur, a wynik pokazuje termin, liczbę dni do 1 stycznia 2027 i co zrobić przy Waszym programie. Bez rejestracji.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function KsefIntegracja() {
  return (
    <ProductLanding
      slug="ksef-integracja"
      tool={
        <>
          <KsefCheck />
          <ListaKsef2027 />
        </>
      }
      breadcrumb="Integracja z KSeF"
      eyebrow="KSeF"
      h1="Integracja z KSeF"
      lead="Krajowy System e-Faktur jest obowiązkowy, ale nikt nie każe przeklejać do niego faktur ręcznie z osobnej aplikacji. Spinamy z nim system, którego już używacie, żeby faktura wychodziła tam, gdzie powstaje, a numer KSeF i UPO zapisywały się przy dokumencie."
      ctaLabel="Sprawdź, co Was obowiązuje"
      ctaNote="Dwa kliknięcia, bez wpisywania czegokolwiek"
      checks={[
        {
          title: "Napisaliśmy klienta tego API i oddaliśmy go za darmo",
          desc: "Kod jest dostępny publicznie pod adresem github.com/rodorn/fluxlab-ksef-integracja: klient API v2 z uwierzytelnianiem tokenem, obsługą sesji, wysyłką faktury i pobraniem UPO, budowanie XML w schemacie FA(3) z walidacją struktury i numeru NIP, oraz gotowy przykład importu faktur kosztowych do pliku CSV. Repozytorium działa w trybie demo, bez konta w KSeF, więc można je uruchomić u siebie w kilka minut i ocenić przed rozmową z kimkolwiek.",
        },
        {
          title: "Numer KSeF i UPO to nie są szczegóły techniczne",
          desc: "To najczęstszy błąd w takich wdrożeniach. Integracja wysyła fakturę, dostaje odpowiedź i wygląda na gotową, tylko nigdzie nie zapisuje numeru KSeF ani urzędowego poświadczenia odbioru. Bez nich nie ma czym wykazać, że faktura została przyjęta, a od 1 stycznia 2027 numer KSeF trzeba podawać przy płatności, czyli musi być dostępny poza systemem księgowym.",
        },
        {
          title: "Faktura odrzucona wygląda jak wystawiona",
          desc: "Sesja potrafi nie odpowiedzieć, a dokument zostać odrzucony na poziomie schematu. Jeżeli nie ma kolejki z ponowieniami i miejsca, w którym widać stan każdej faktury, odrzucenie przechodzi po cichu i wychodzi dopiero przy zamknięciu miesiąca. Budujemy to jako kolejkę ze stanami, a nie jako jedno wywołanie po zapisaniu dokumentu.",
        },
        {
          title: "Druga strona, czyli faktury kosztowe",
          desc: "Odbiór faktur w KSeF obowiązuje wszystkich od 1 lutego 2026, więc dokumenty od dostawców już tam są, niezależnie od tego, czy ktoś je stamtąd zabiera. Pobieranie ich automatycznie i wkładanie do systemu obiegu dokumentów albo do księgowości bywa większą oszczędnością niż sama wysyłka, bo tę i tak wykonuje program.",
        },
        {
          title: "Co zostaje poza systemem",
          desc: "Sprzedaż dla osób prywatnych, procedury OSS i IOSS oraz, do 31 grudnia 2026, faktury z kas rejestrujących. Przy sprzedaży mieszanej te strumienie trzeba rozdzielić na etapie wdrożenia, inaczej do KSeF trafi dokument, którego tam być nie powinno.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy kilku fakturach miesięcznie wystarczy darmowa Aplikacja Podatnika KSeF od Ministerstwa Finansów albo zwykły program do fakturowania z wbudowaną obsługą systemu. Integracja ma sens tam, gdzie faktury powstają w Waszym systemie sprzedażowym albo jest ich na tyle dużo, że ktoś je dziś przenosi ręcznie.",
        },
      ]}
      pricing={[
        {
          name: "Rozpoznanie",
          price: "0 zł",
          desc: "Zanim cokolwiek zlecicie.",
          features: [
            "Sprawdzamy, czy Wasz system da się z tym spiąć i czym",
            "Informacja, czy wystarczy Wam gotowy program zamiast wdrożenia",
            "Gotowy klient API do uruchomienia u siebie, publicznie",
          ],
        },
        {
          name: "Odbiór faktur kosztowych",
          price: "4 900 zł",
          desc: "Najczęstszy zakres na start.",
          features: [
            "Faktury zakupowe pobierane z KSeF automatycznie",
            "Trafiają do księgowości, obiegu dokumentów albo arkusza",
            "Numer KSeF i UPO zapisane przy każdym dokumencie",
            "Kod i dostępy zostają u Was",
          ],
          featured: true,
        },
        {
          name: "Wystawianie i odbiór",
          price: "9 900 zł",
          desc: "Z wysyłaniem faktur z Waszego systemu.",
          features: [
            "Wszystko z wariantu podstawowego",
            "Wysyłka w schemacie FA(3), z walidacją przed wysłaniem",
            "Kolejka ponowień i widok stanu każdej faktury",
            "Rozdzielenie sprzedaży dla firm i dla osób prywatnych",
            "Pierwszy miesiąc opieki w cenie",
          ],
        },
      ]}
      faq={[
        {
          q: "Od kiedy KSeF jest obowiązkowy?",
          a: `${PODATNICY.map((p) => p.opis).join(" ")} Odbierać faktury w KSeF muszą wszyscy od 1 lutego 2026. Do 31 grudnia 2026 nie ma kar za błędy, a od 1 stycznia 2027 numer KSeF trzeba podawać przy płatności.`,
        },
        {
          q: "Co się zmienia w KSeF 1 stycznia 2027?",
          a: "Kończą się naraz wszystkie przepisy przejściowe. Znika limit 10 tys. zł brutto miesięcznie na faktury poza KSeF, a faktury z kas rejestrujących, w tym paragony z NIP do 450 zł, też muszą przechodzić przez system. Kary z art. 106ni ustawy o VAT, do 100% kwoty VAT z faktury wystawionej poza KSeF albo do 18,7% kwoty należności przy fakturze bez VAT, miały ruszyć tego samego dnia, ale 16 września 2026 Ministerstwo Finansów zapowiedziało przesunięcie ich na 1 stycznia 2028, a 23 września 2026 opublikowało projekt tej ustawy na stronie Rządowego Centrum Legislacji (numer w wykazie prac rządu UD477, legislacja.rcl.gov.pl/projekt/12414954). To projekt, a nie uchwalone prawo. Według projektu w 2027 urząd skarbowy najpierw przypomina firmie o obowiązku, a gdy ta nie zareaguje, sprawdza jej rozliczenia. Sam obowiązek wystawiania faktur w KSeF nie jest zawieszony ani o jeden dzień, więc terminy z tej listy zostają. Przelew za fakturę z KSeF między czynnymi podatnikami VAT ma zawierać jej numer KSeF albo identyfikator zbiorczy. Tokeny do logowania zostają, Ministerstwo Finansów zrezygnowało z ich wygaszenia, ale do faktur w trybie offline potrzebny jest certyfikat KSeF typu 2.",
        },
        {
          q: "KSeF nie działa. Co robimy z fakturą, którą trzeba wystawić dziś?",
          a: "Wystawiacie ją w trybie offline24. Może z niego skorzystać każdy podatnik, bez żadnego komunikatu Ministerstwa Finansów: fakturę w strukturze FA(3) tworzycie u siebie i przesyłacie do KSeF najpóźniej w następnym dniu roboczym. Jeżeli nabywca ma ją dostać, zanim trafi do systemu, faktura musi mieć dwa kody QR, pierwszy do weryfikacji faktury w KSeF i drugi potwierdzający wystawcę, a do tego drugiego potrzebny jest certyfikat KSeF typu 2. Warto go pobrać zawczasu, bo w czasie awarii też go nie dostaniecie. Termin wydłuża się do 7 dni roboczych od zakończenia awarii tylko wtedy, gdy Ministerstwo ogłosi awarię KSeF w BIP MF i w oprogramowaniu interfejsowym. Komunikat o utrudnieniach w Aplikacji Podatnika, taki jak ten z 25 września 2026, sam w sobie nie jest ogłoszeniem awarii. Przy awarii całkowitej, ogłaszanej w środkach społecznego przekazu, faktur wystawionych w jej trakcie w ogóle nie dosyła się do KSeF. Źródło: ksef.podatki.gov.pl, strony o trybie offline24 i trybie awaryjnym.",
        },
        {
          q: "Wysłaliśmy do KSeF fakturę z błędem. Jak ją poprawić albo usunąć?",
          a: "Tylko fakturą korygującą. Faktura przyjęta przez KSeF jest dokumentem i nie da się jej edytować, anulować ani usunąć. Korektę wystawia sprzedawca, bo nabywca nie może już poprawić błędu notą korygującą, także przy fakturach z 2025 roku. Korekta jest potrzebna nawet przy błędzie w adresie, a KSeF nie sprawdza ani rachunków, ani danych kontrahenta, więc źle policzoną kwotę czy zły NIP przyjmie bez ostrzeżenia. Przy fakturze na zły NIP wystawiacie korektę do zera na błędnego nabywcę i nową fakturę na właściwego. Pamiętajcie, że błędna faktura i tak będzie widoczna dla firmy o tamtym NIP, jeśli taka istnieje. Liczba korekt do jednej faktury nie jest ograniczona. Inaczej jest, gdy KSeF odrzucił plik: wtedy faktura w ogóle nie powstała, więc nie ma czego korygować ani anulować, tylko wysyłacie nowy, poprawny plik. Źródło: ksef.podatki.gov.pl, Pytania i odpowiedzi KSeF 2.0.",
        },
        {
          q: "Kontrahent twierdzi, że nie dostał faktury z KSeF. Jak to sprawdzić?",
          a: "Faktura jest uznana za otrzymaną w chwili, gdy KSeF nada jej numer. Nabywca nie musi jej akceptować ani pobierać, więc „nie dostałem” zwykle znaczy „nie zajrzałem”. KSeF nie wysyła nabywcy żadnych powiadomień, a jego program księgowy albo Aplikacja Podatnika KSeF musi sama sprawdzać, czy pojawiły się nowe faktury. Nie da się też sprawdzić, czy nabywca fakturę pobrał, ani czy ma skonfigurowany dostęp, bo dostęp do KSeF ma z mocy prawa każdy podmiot z NIP. W praktyce wysyłacie kontrahentowi numer KSeF faktury i datę z UPO, pole „Data przyjęcia dokumentu do systemu teleinformatycznego MF”, bo to ona wyznacza moment otrzymania. Wyjątkiem są odbiorcy bez polskiego NIP, na przykład zagraniczni: oni do KSeF się nie zalogują, więc fakturę przekazujecie im w uzgodniony sposób, na przykład jako PDF z kodem QR. Źródło: ksef.podatki.gov.pl, Pytania i odpowiedzi KSeF 2.0.",
        },
        {
          q: "W KSeF pojawiła się faktura od firmy, z którą nic nas nie łączy. Co robimy?",
          a: "Najpierw ustalcie, czy to pomyłka, czy oszustwo. KSeF nie sprawdza danych nabywcy, więc prawdziwa firma mogła po prostu wpisać zły NIP. Wtedy piszecie do niej, a ona wystawia korektę do zera, przy czym oryginał i tak zostanie widoczny w Waszym KSeF. Jeśli nie rozpoznajecie wystawcy albo faktura wygląda na próbę wyłudzenia zapłaty, zgłoście ją jako podejrzaną w Aplikacji Podatnika KSeF 2.0, gdzie działa już usługa zgłaszania faktur scamowych do administracji skarbowej. Ukrywania takich faktur jeszcze nie ma, Ministerstwo Finansów zapowiada je w kolejnych wersjach systemu. Do czasu wyjaśnienia nie płaćcie i nie księgujcie, bo samo to, że faktura jest w KSeF, nie znaczy, że transakcja się odbyła. Jeśli Wasz program księgowy pobiera faktury kosztowe automatycznie, ustalcie z księgową, żeby każdą od nowego wystawcy ktoś zatwierdzał ręcznie. Źródło: ksef.podatki.gov.pl, Pytania i odpowiedzi KSeF 2.0.",
        },
        {
          q: "Jak dać biuru rachunkowemu dostęp do naszych faktur w KSeF?",
          a: "Nadajcie biuru uprawnienia w Aplikacji Podatnika KSeF albo w programie zintegrowanym z KSeF, zamiast przekazywać mu swój certyfikat albo logowanie. Certyfikat KSeF jest osobisty: ten pobrany przez właściciela jednoosobowej działalności może używać tylko on. Nie trzeba też nadawać uprawnień każdej księgowej osobno. Można nadać je całemu biuru jako firmie i zaznaczyć, że biuro może delegować je swoim pracownikom, a biuro samo wskaże, kto będzie wystawiał i pobierał Wasze faktury. Kto może nadawać: przedsiębiorca z jednoosobową działalnością ma uprawnienia właścicielskie od razu, bez zgłoszeń. Spółka loguje się pieczęcią kwalifikowaną z NIP, a jeśli jej nie ma, składa ZAW-FA ze wskazaniem jednej osoby, która dalej nadaje uprawnienia już w KSeF. ZAW-FA składa się w e-Urzędzie Skarbowym, przez e-Doręczenia albo papierowo, przez ePUAP już nie. Uprawnienia nadane w KSeF działają zwykle od razu, a te z ZAW-FA dopiero po wprowadzeniu ich przez urząd skarbowy, który potwierdza to e-mailem. Jeśli biuro miało dostęp jeszcze w KSeF 1.0, sprawdźcie, czy ma go nadal: uprawnienia nadane przed lutym 2026 nie przeszły do KSeF 2.0, poza tymi z ZAW-FA i właścicielskimi. Przy zmianie biura odbierzcie poprzedniemu uprawnienia, bo nie wygasają same. Źródło: ksef.podatki.gov.pl, Pytania i odpowiedzi KSeF 2.0.",
        },
        {
          q: "Jak księgowa loguje się do KSeF klienta i czy musi używać prywatnego telefonu?",
          a: "Uprawnienie nadane biuru albo księgowej zadziała dopiero wtedy, gdy przy logowaniu wybierze się kontekst klienta. W Aplikacji Podatnika KSeF (ap.ksef.mf.gov.pl) po wyborze sposobu logowania w polu „Identyfikator” wybiera się „NIP podmiotu” i wpisuje NIP klienta, a nie biura. Tożsamość potwierdza się już własnym środkiem: profilem zaufanym, aplikacją mObywatel, bankowością elektroniczną, e-dowodem albo kwalifikowanym podpisem. Uprawnienia, które biuro przekazało pracownikom, są przypisane do ich numerów PESEL, więc logowanie własnym mObywatelem jest zgodne z tym, jak działa system. Telefon nie jest jednak jedyną drogą. Pracownik może logować się podpisem kwalifikowanym albo po pierwszym logowaniu złożyć w Aplikacji Podatnika wniosek o certyfikat KSeF i dalej logować się nim. Certyfikat dostaje identyfikator użyty przy logowaniu, czyli PESEL tej osoby, więc też jest osobisty i nie przekazuje się go innym pracownikom. Biuro, które nie chce, żeby pracownicy używali prywatnych profili, może im kupić podpis kwalifikowany. Na co dzień do samej Aplikacji Podatnika wchodzi się rzadko, bo faktury pobiera i wysyła program księgowy połączony z KSeF tokenem albo certyfikatem. Źródło: Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0, Ministerstwo Finansów, 6 sierpnia 2026, rozdziały 4.1 i 5.7.",
        },
        {
          q: "Sprzedajemy w sklepie internetowym. Czy faktury dla osób prywatnych też muszą iść przez KSeF?",
          a: "Nie. Fakturę dla konsumenta, czyli osoby prywatnej bez działalności, można wystawić w KSeF, ale nie trzeba, i tak zostaje także po 1 stycznia 2027. Tak samo traktuje się przedsiębiorcę, który kupuje na prywatny użytek, bo to w istocie sprzedaż do konsumenta. Obowiązek dotyczy zamówień, w których klient kupuje jako firma i podaje NIP. W sklepie oznacza to w praktyce dwie ścieżki: zamówienie z fakturą na firmę idzie do KSeF, a zamówienie osoby prywatnej może zostać przy dotychczasowym PDF-ie w mailu. Uwaga na kasę fiskalną: do końca 2026 faktura do paragonu z NIP, także paragon z NIP do 450 zł, może jeszcze powstać w kasie poza KSeF, a od 1 stycznia 2027 każda faktura z kasy dla firmy idzie przez KSeF. Jeśli wolicie jedną ścieżkę dla wszystkich zamówień i konsumentom też wystawiacie faktury w KSeF, przekazujecie je w uzgodniony sposób, jako wydruk albo PDF w mailu, z kodem QR z numerem KSeF, bo osoba prywatna do KSeF się nie loguje. Numeracja faktur może być wspólna dla obu ścieżek, numer KSeF to osobny identyfikator nadawany przez system. Faktura proforma nie jest fakturą i do KSeF nie trafia. Źródło: ksef.podatki.gov.pl, Pytania i odpowiedzi KSeF 2.0.",
        },
        {
          q: "Mamy klientów i dostawców za granicą. Które z tych faktur idą przez KSeF?",
          a: "Sprzedaż tak, zakupy nie. Fakturę dla firmy z zagranicy, zarówno z Unii (np. przy wewnątrzwspólnotowej dostawie towarów), jak i spoza niej, wystawiacie w KSeF tak samo jak krajową i w tym samym terminie, który Was obowiązuje. Zagraniczny nabywca nie loguje się do KSeF, więc fakturę przekazujecie mu w uzgodniony sposób, np. jako PDF w mailu, z kodem QR, po którym da się ją sprawdzić w KSeF. Przy dostawie do Unii nabywca z numerem VAT UE może też wystawiać faktury w Waszym imieniu w ramach samofakturowania. Poza KSeF zostaje sprzedaż do osób prywatnych rozliczana w procedurach OSS i IOSS. Zakupy: faktur od zagranicznych dostawców, np. za reklamy, oprogramowanie czy hosting, KSeF nie obejmuje, nie wprowadzacie ich do systemu i nie znajdziecie ich w nim. Rozliczacie je jak dotąd, np. jako import usług, na podstawie faktury, którą dostawca przysłał. Wyjątek to zagraniczna firma ze stałym miejscem prowadzenia działalności w Polsce, które bierze udział w sprzedaży: ona wystawia faktury w KSeF. Czy tak jest, ocenia się osobno dla każdego dostawcy. Źródło: ksef.podatki.gov.pl, Pytania i odpowiedzi KSeF 2.0.",
        },
        {
          q: "Jesteśmy zwolnieni z VAT. Czy KSeF nas w ogóle dotyczy?",
          a: "Tak, jeśli wystawiacie faktury firmom. Ministerstwo Finansów wprost odpowiada, że podatnik zwolniony z VAT, także taki, który wykonuje wyłącznie czynności zwolnione, wystawia faktury na rzecz innych podatników w KSeF, a zwolnienie niczego tu nie zmienia. Obowiązują was te same wyjątki co wszystkich: faktury dla osób prywatnych są poza obowiązkiem, a do końca 2026 roku faktury do 10 tys. zł brutto miesięcznie (limit liczy się osobno w każdym miesiącu) można wystawiać poza KSeF. Od 1 stycznia 2027 limit znika. Jest jedna różnica, która zwykle ratuje małe firmy: przy niektórych zwolnieniach przedmiotowych, na przykład przy pośrednictwie ubezpieczeniowym, sama faktura nie jest obowiązkowa, tylko na żądanie nabywcy (art. 106b ust. 2 i 3 ustawy o VAT). Jeśli wtedy nikt o fakturę nie prosi, nie ma co wysyłać do KSeF. Odbiór faktur w KSeF nie wymaga wystawiania własnych, ale faktury od dostawców już tam są i warto zalogować się choć raz, żeby zobaczyć, co na was czeka. Źródło: Ministerstwo Finansów, Pytania i odpowiedzi KSeF 2.0, ksef.podatki.gov.pl.",
        },
        {
          q: "Kupujemy od rolników ryczałtowych. Czy fakturę VAT RR wystawiamy w KSeF?",
          a: "Zależy od rolnika, nie od Was. Ministerstwo Finansów odpowiada, że nabywca, czyli czynny podatnik VAT, wystawia fakturę VAT RR w KSeF tylko wtedy, gdy rolnik ryczałtowy złoży w systemie oświadczenie, że jest rolnikiem ryczałtowym, i wskaże Was jako uprawnionego nabywcę. Jeśli rolnik takiego oświadczenia w KSeF nie złoży, faktura VAT RR jest wystawiana poza systemem. W praktyce przy każdym nowym dostawcy rolniku warto zapytać wprost, czy takie oświadczenie złożył i czy wskazał Waszą firmę, bo od tego zależy, którą drogą wystawiacie dokument. Źródło: Ministerstwo Finansów, Pytania i odpowiedzi KSeF 2.0, pytanie 12, ksef.podatki.gov.pl.",
        },
        {
          q: "Bierzemy od klientów zaliczki. Jak wystawiać faktury zaliczkowe i końcowe w KSeF?",
          a: "Faktura zaliczkowa idzie przez KSeF tak samo jak każda inna. W strukturze FA(3) ma oznaczenie „ZAL”, kwotę otrzymanej zaliczki, podatek wyliczony od tej kwoty i dane zamówienia, ale bez pozycji towarów. Jedną fakturą można udokumentować kilka zaliczek, do 31, każdą z datą otrzymania. Faktura końcowa ma oznaczenie „ROZ”, pełne wartości zamówienia w pozycjach, a podatek i kwotę do zapłaty pomniejszone o to, co już rozliczyły zaliczkowe. Najczęstsze potknięcie: faktura końcowa musi wskazać numery KSeF wcześniejszych faktur zaliczkowych. Jeśli zaliczkowa powstała poza KSeF, na przykład w 2025 roku albo w ramach limitu 10 tys. zł do końca 2026, podaje się jej zwykły numer ze znacznikiem, że była wystawiona poza KSeF. To samo dotyczy ostatniej z kilku zaliczkowych, które razem pokrywają całą cenę: ona też wymienia poprzednie. Gdy zaliczka pokryła 100% ceny, faktury końcowej wystawiać nie trzeba, a jeśli ją wystawiacie, to z kwotą 0 i numerem zaliczkowej. Gdy zaliczka i sprzedaż wypadają w tym samym miesiącu, zaliczkowej można nie wystawiać, a zaliczkę wykazać na fakturze „ROZ”. Proformy do KSeF się nie wysyła, bo nie jest fakturą. Źródło: Ministerstwo Finansów, Podręcznik KSeF 2.0 cz. II (rozdziały 2.6 do 2.8 i 4.1) oraz broszura o strukturze FA(3).",
        },
        {
          q: "Jak długo faktury zostają w KSeF i czy musimy je drukować albo archiwizować u siebie?",
          a: "Faktury są przechowywane w KSeF przez 10 lat, licząc od końca roku, w którym zostały wystawione. Ministerstwo Finansów podkreśla, że przepisy ustawy o VAT nie nakładają obowiązku drukowania faktur ustrukturyzowanych do papierowej archiwizacji, bo system sam je przechowuje. Wyjątek dotyczy sytuacji, gdy dokument jest potrzebny dłużej niż 10 lat: jeśli okres amortyzacji środka trwałego jest dłuższy niż dziesięcioletni okres przechowywania w KSeF, fakturę trzeba trzymać poza KSeF do czasu przedawnienia zobowiązań podatkowych. Praktycznie: zakładamy, że kopię faktur ważnych dłużej niż 10 lat, np. za środki trwałe, pobieramy i trzymamy u siebie, a resztę zostawiamy w systemie. Źródło: Ministerstwo Finansów, Pytania i odpowiedzi KSeF 2.0, pytania 75 i 82, ksef.podatki.gov.pl.",
        },
        {
          q: "Mamy program księgowy, który obsługuje KSeF. Po co nam integracja?",
          a: "Najprawdopodobniej po nic i tak powiemy, jeśli tak wyjdzie z rozpoznania. Integracja przydaje się wtedy, gdy faktury powstają poza programem księgowym, na przykład w sklepie, w systemie zamówień albo w CRM, i ktoś je dziś przenosi ręcznie. Drugi przypadek to faktury kosztowe, których program księgowy często nie pobiera sam.",
        },
        {
          q: "Czy to znaczy, że musimy zmienić program do faktur?",
          a: "Nie. Sens integracji polega właśnie na tym, żeby zostawić Wam narzędzie, w którym umiecie pracować, i dołożyć pod spodem warstwę rozmawiającą z KSeF. Zmiana programu jest osobną decyzją i jeżeli i tak ją rozważacie, lepiej najpierw ją podjąć, a dopiero potem spinać cokolwiek.",
        },
        {
          q: "Skąd mamy wiedzieć, że umiecie to zrobić?",
          a: "Z kodu, pod adresem github.com/rodorn/fluxlab-ksef-integracja. Jest tam klient API v2, budowanie faktury w schemacie FA(3), testy uruchamiane automatycznie przy każdej zmianie i tryb demo, który działa bez konta w KSeF. Możecie go uruchomić sami albo dać do oceny swojemu programiście, zanim cokolwiek zlecicie. To więcej niż referencja, bo referencji nie da się sprawdzić linijka po linijce.",
        },
        {
          q: "Gdzie trzymane są nasze dane i token do KSeF?",
          a: "U Was. Integrację stawiamy na Waszym serwerze, a klient czyta konfigurację wyłącznie ze zmiennych środowiskowych, więc w kodzie nie ma żadnych sekretów. Jeżeli wolicie rozwiązanie chmurowe, powiemy wprost, co przez czyją infrastrukturę przechodzi, zanim cokolwiek uruchomimy.",
        },
        {
          q: "Zdążymy przed 1 stycznia 2027?",
          a: "Przy typowym zakresie wdrożenie zajmuje kilka tygodni, więc tak, ale grudzień 2026 będzie najgorszym możliwym momentem na zaczynanie. Wtedy naraz kończą się wszystkie przepisy przejściowe i wszyscy, którzy odkładali temat, będą szukać tego samego w tym samym tygodniu.",
        },
      ]}
      formId="ksef"
      formHeading="Napiszcie, w czym dziś wystawiacie faktury"
      formIntro="Wystarczy nazwa programu księgowego albo systemu sprzedażowego i jedno zdanie o tym, ile faktur miesięcznie z niego wychodzi. Odpiszemy, czy integracja ma sens, czy wystarczy Wam gotowy program."
      submitLabel="Wyślij opis"
      microCopy="Ustalenia prowadzimy mailowo. Telefon, jeśli tak Wam wygodniej."
      serviceName="Integracja z KSeF"
      serviceDesc="Spięcie systemu sprzedażowego, ERP albo programu księgowego z Krajowym Systemem e-Faktur: wysyłka faktur w schemacie FA(3) przez API v2, zapis numeru KSeF i UPO, pobieranie faktur kosztowych."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
