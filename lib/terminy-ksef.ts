/** Terminy KSeF z ustawy. Osobno od komponentu, bo te same zdania stoją też
 *  w FAQ strony, czyli w HTML, a nie dopiero po kliknięciu w przeglądarce. */

/** Dzien, w ktorym koncza sie wszystkie przepisy przejsciowe naraz: limit
 *  10 tys. zl, faktury z kas rejestrujacych, brak sankcji i brak obowiazku
 *  numeru KSeF w przelewach. */
export const KONIEC_PRZEJSCIOWYCH = "2027-01-01";

export type Podatnik = {
  klucz: string;
  etykieta: string;
  /** Dzien, od ktorego ten podatnik musi wystawiac faktury w KSeF. */
  data: string;
  dataOpis: string;
  /** Co dokladnie ten termin znaczy dla tej grupy. */
  opis: string;
  /** Wyjatek albo warunek, ktory latwo przeoczyc. */
  uwaga?: string;
  /** Grupa poza obowiazkiem wystawiania. Wynik jest wtedy odmowny i taki ma
   *  zostac, bo sprzedawanie wdrozenia komus, kogo przepis nie dotyczy, jest
   *  sprzedawaniem strachu. */
  pozaObowiazkiem?: boolean;
};

export const PODATNICY: Podatnik[] = [
  {
    klucz: "duzi",
    etykieta: "Sprzedaż powyżej 200 mln zł w 2024",
    data: "2026-02-01",
    dataOpis: "1 lutego 2026",
    opis: "Podatnicy, u których wartość sprzedaży z podatkiem przekroczyła w 2024 roku 200 mln zł, wystawiają faktury wyłącznie w KSeF od 1 lutego 2026. Od tego samego dnia KSeF 2.0 działa produkcyjnie, na API v2.",
    uwaga:
      "Do 31 grudnia 2026 również Was obejmuje limit 10 tys. zł brutto miesięcznie na faktury wystawione poza systemem. To wyjątek czasowy na pojedyncze przypadki, nie równoległy tryb pracy.",
  },
  {
    klucz: "pozostali",
    etykieta: "Pozostali podatnicy VAT",
    data: "2026-04-01",
    dataOpis: "1 kwietnia 2026",
    opis: "Wszyscy pozostali podatnicy, czynni i zwolnieni, wystawiają faktury w KSeF od 1 kwietnia 2026. Obowiązek nie zależy od wielkości firmy ani od tego, czy fakturuje się raz w miesiącu, czy codziennie.",
    uwaga:
      "Do 31 grudnia 2026 działa limit 10 tys. zł brutto miesięcznie na faktury poza KSeF. Po przekroczeniu limitu w danym miesiącu wyjątek przestaje działać, a nikt o tym nie przypomni.",
  },
  {
    klucz: "najmniejsi",
    etykieta: "Do 10 tys. zł sprzedaży miesięcznie",
    data: KONIEC_PRZEJSCIOWYCH,
    dataOpis: "1 stycznia 2027",
    opis: "Jeżeli suma sprzedaży z podatkiem na fakturach w danym miesiącu nie przekracza 10 tys. zł, do 31 grudnia 2026 można wystawiać je poza KSeF, papierowo albo elektronicznie. Od 1 stycznia 2027 ten wyjątek znika i obowiązek obejmuje także Was.",
    uwaga:
      "Limit liczy się osobno w każdym miesiącu i od kwoty brutto. Jeden większy miesiąc wyrzuca z wyjątku tylko ten miesiąc, ale to znaczy, że sposób wystawiania faktur musi być gotowy wcześniej, a nie dopiero w dniu przekroczenia.",
  },
  {
    klucz: "kasa",
    etykieta: "Sprzedaż tylko przez kasę fiskalną",
    data: KONIEC_PRZEJSCIOWYCH,
    dataOpis: "1 stycznia 2027",
    opis: "Faktury wystawiane przy zastosowaniu kas rejestrujących, w tym paragony z NIP do 450 zł uznawane za faktury uproszczone, są poza KSeF do 31 grudnia 2026. To osobny przepis przejściowy, niezależny od limitu 10 tys. zł.",
    uwaga:
      "Ten wyjątek dotyczy wyłącznie dokumentów z kasy. Faktura wystawiona obok kasy, na przykład na przelew dla firmy, podlega zwykłemu terminowi dla Waszej grupy.",
  },
  {
    klucz: "zagraniczny",
    etykieta: "Podmiot zagraniczny bez działalności w Polsce",
    data: KONIEC_PRZEJSCIOWYCH,
    dataOpis: "nie dotyczy",
    pozaObowiazkiem: true,
    opis: "Podmioty bez siedziby i bez stałego miejsca prowadzenia działalności w Polsce nie mają obowiązku wystawiania faktur w KSeF. Poza systemem są też sprzedaż w procedurach OSS i IOSS oraz faktury dla osób prywatnych.",
    uwaga:
      "Jeżeli macie w Polsce stałe miejsce prowadzenia działalności, które uczestniczy w dostawie, obowiązek już Was dotyczy. To rozstrzyga stan faktyczny, nie sam brak siedziby, więc przy wątpliwości pytajcie księgowego, nie nas.",
  },
];
