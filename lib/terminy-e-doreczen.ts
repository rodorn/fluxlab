/** Terminy e-Doręczeń z ustawy. Osobno od komponentu, bo te same zdania stoją
 *  też w FAQ strony, czyli w HTML, a nie dopiero po kliknięciu w przeglądarce. */

export type Podmiot = {
  klucz: string;
  etykieta: string;
  /** Dzien, od ktorego obowiazek dziala. Format ISO, liczony w przegladarce. */
  data: string;
  dataOpis: string;
  /** Co dokladnie znaczy ten termin dla tego podmiotu. */
  opis: string;
  /** Warunek, ktory potrafi przesunac termin wczesniej. */
  uwaga?: string;
};

export const PODMIOTY: Podmiot[] = [
  {
    klucz: "ceidg-stare",
    etykieta: "Firma w CEIDG, wpisana przed 2025",
    data: "2026-10-01",
    dataOpis: "1 października 2026",
    opis:
      "Przedsiębiorcy wpisani do CEIDG do 31 grudnia 2024 mają obowiązek posiadania adresu do doręczeń elektronicznych od 1 października 2026. Adres można założyć wcześniej, wniosek jest bezpłatny i składa się go przez Biznes.gov.pl.",
    uwaga:
      "Jeżeli po 30 czerwca 2025 składaliście jakikolwiek wniosek o zmianę wpisu w CEIDG, dane do utworzenia adresu trzeba było podać już przy tamtym wniosku, czyli termin minął wcześniej.",
  },
  {
    klucz: "ceidg-nowe",
    etykieta: "Firma w CEIDG, wpisana od 2025",
    data: "2025-01-01",
    dataOpis: "dzień wpisu do CEIDG",
    opis:
      "Przedsiębiorcy rejestrujący działalność od 1 stycznia 2025 podają dane do utworzenia adresu do doręczeń elektronicznych już we wniosku o wpis. Obowiązek istnieje od pierwszego dnia działalności.",
  },
  {
    klucz: "krs-stare",
    etykieta: "Spółka w KRS, zarejestrowana przed 2025",
    data: "2025-04-01",
    dataOpis: "1 kwietnia 2025",
    opis:
      "Podmioty niepubliczne wpisane do KRS przed 1 stycznia 2025 miały obowiązek posiadania adresu do doręczeń elektronicznych od 1 kwietnia 2025.",
  },
  {
    klucz: "krs-nowe",
    etykieta: "Spółka w KRS, zarejestrowana od 2025",
    data: "2025-01-01",
    dataOpis: "dzień wpisu do KRS",
    opis:
      "Podmioty niepubliczne rejestrujące się w KRS od 1 stycznia 2025 zakładają adres do doręczeń elektronicznych w trakcie rejestracji. Obowiązek istnieje od wpisu.",
  },
  {
    klucz: "zawod",
    etykieta: "Zawód zaufania publicznego",
    data: "2025-01-01",
    dataOpis: "1 stycznia 2025",
    opis:
      "Adwokaci, radcowie prawni, doradcy podatkowi, doradcy restrukturyzacyjni, rzecznicy patentowi i notariusze mają obowiązek od 1 stycznia 2025, niezależnie od formy prowadzenia działalności.",
  },
  {
    klucz: "publiczny",
    etykieta: "Podmiot publiczny",
    data: "2025-01-01",
    dataOpis: "1 stycznia 2025",
    opis:
      "Organy administracji rządowej, jednostki budżetowe, które je obsługują, inne organy władzy publicznej, ZUS, KRUS i NFZ mają obowiązek od 1 stycznia 2025.",
  },
  {
    klucz: "wymiar",
    etykieta: "Sąd, prokuratura, komornik",
    data: "2029-10-01",
    dataOpis: "1 października 2029",
    opis:
      "Sądy, trybunały, komornicy, prokuratura, organy ścigania i Służba Więzienna wchodzą jako ostatnie, od 1 października 2029.",
  },
];
