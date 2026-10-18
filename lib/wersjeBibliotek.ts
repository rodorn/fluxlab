/**
 * Tabela wersji, z którymi porównujemy to, co wykryliśmy na stronie.
 *
 * Wartości sprawdzone 2026-10-18 w źródłach:
 *  - npm view <pakiet> version (jquery, bootstrap, jquery-ui, font-awesome,
 *    react, next, nuxt, vue, @angular/core, gatsby)
 *  - https://api.wordpress.org/core/version-check/1.7/
 *  - https://www.php.net/supported-versions.php i /releases/active.php
 *  - https://nginx.org/en/download.html, https://httpd.apache.org/download.cgi
 *
 * Tabela jest stała w kodzie i trzeba ją odświeżać przy większych wydaniach.
 * Każda reguła niżej opiera się na publicznie znanym końcu wsparcia albo
 * opisanej luce, nie na naszej opinii.
 */

export const SPRAWDZONO = "2026-10-18";

export const NAJNOWSZE = {
  wordpress: "7.1.3",
  php: "8.5.11",
  jquery: "4.0.0",
  jqueryUi: "1.14.2",
  bootstrap: "5.3.8",
  fontAwesome: "4.7.0 (linia 4), 6 (aktualna)",
  react: "19.3.1",
  next: "16.4.2",
  nuxt: "4.6.2",
  vue: "3.5.44",
  angular: "22.2.3",
  gatsby: "5.16.1",
  nginx: "1.31.7",
  apache: "2.4.69",
} as const;

/** Koniec wsparcia bezpieczeństwa gałęzi PHP (php.net/supported-versions.php). */
export const PHP_KONIEC_WSPARCIA: Record<string, string> = {
  "8.2": "2026-12-31",
  "8.3": "2027-12-31",
  "8.4": "2028-12-31",
  "8.5": "2029-12-31",
};

/** Angular: wsparcie 18 miesięcy od wydania wersji głównej (6 aktywnego + 12 LTS). */
export const ANGULAR_KONIEC_WSPARCIA: Record<number, string> = {
  19: "2026-05-19",
  20: "2026-11-28",
  21: "2027-05-19",
};

export type Status = "aktualna" | "starsza" | "przestarzala" | "bez_oceny";

export type Ocena = {
  status: Status;
  /** Jedno zdanie: co z tej wersji wynika. */
  powod: string;
  /** Czy to dotyczy bezpieczeństwa (znane luki albo brak łatek). */
  bezpieczenstwo: boolean;
  najnowsza?: string;
};

/** Ostatnie wydanie (druga liczba) każdej zakończonej głównej linii WordPressa. */
const OSTATNIE_WYDANIE: Record<number, number> = { 5: 9, 6: 9 };

export function czesci(w: string): number[] {
  return w
    .split(/[.\-]/)
    .map((x) => parseInt(x, 10))
    .map((x) => (Number.isFinite(x) ? x : 0));
}

export function porownaj(a: string, b: string): number {
  const x = czesci(a);
  const y = czesci(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d) return d < 0 ? -1 : 1;
  }
  return 0;
}

const BEZ_OCENY = (powod: string): Ocena => ({
  status: "bez_oceny",
  powod,
  bezpieczenstwo: false,
});

/** Ocena wersji danej technologii. Wersja null oznacza, że jej nie widać. */
export function ocenWersje(
  id: string,
  wersja: string | null,
  teraz: Date = new Date(),
): Ocena {
  if (id === "universal-analytics")
    return {
      status: "przestarzala",
      bezpieczenstwo: false,
      powod: "Universal Analytics przestał zbierać dane w 2023 roku, więc te statystyki są puste.",
    };
  if (!wersja) {
    return BEZ_OCENY("Wersja nie jest widoczna, więc jej nie oceniamy.");
  }
  const [g, m = 0] = czesci(wersja);

  switch (id) {
    case "wordpress": {
      const [a, b] = czesci(NAJNOWSZE.wordpress);
      // Wydania głównej linii 6 kończą się na 6.9, po nich wychodzi 7.0.
      const wydan =
        a === g ? b - m : (OSTATNIE_WYDANIE[g] ?? 9) - m + (a - g - 1) * 10 + b + 1;
      if (wydan > 1)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          najnowsza: NAJNOWSZE.wordpress,
          powod: `WordPress ${wersja} jest starszy o ponad jedno wydanie od ${NAJNOWSZE.wordpress}, a poprawki bezpieczeństwa wychodzą dla najnowszej linii.`,
        };
      if (wydan === 1)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.wordpress,
          powod: `Dostępny jest nowszy WordPress ${NAJNOWSZE.wordpress}.`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Aktualna wersja." };
    }
    case "php": {
      const gal = `${g}.${m}`;
      const koniec = PHP_KONIEC_WSPARCIA[gal];
      if (!koniec)
        return porownaj(gal, "8.2") < 0
          ? {
              status: "przestarzala",
              bezpieczenstwo: true,
              najnowsza: NAJNOWSZE.php,
              powod: `PHP ${gal} nie dostaje już poprawek bezpieczeństwa (php.net).`,
            }
          : { status: "aktualna", bezpieczenstwo: false, powod: "Wersja w obsłudze." };
      if (new Date(koniec) < teraz)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          najnowsza: NAJNOWSZE.php,
          powod: `PHP ${gal} nie dostaje już poprawek bezpieczeństwa (php.net).`,
        };
      // Mniej niż rok do końca wsparcia.
      if (new Date(koniec).getTime() - teraz.getTime() < 365 * 864e5)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.php,
          powod: `Wsparcie bezpieczeństwa PHP ${gal} kończy się ${koniec}.`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Wersja w obsłudze." };
    }
    case "jquery":
      if (porownaj(wersja, "3.5.0") < 0)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          najnowsza: NAJNOWSZE.jquery,
          powod: `jQuery ${wersja} ma znane luki XSS (CVE-2020-11022 i CVE-2020-11023), poprawione w 3.5.0.`,
        };
      if (g < 3 || (g === 3 && m < 7))
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.jquery,
          powod: `Dostępna jest nowsza jQuery (3.7.1 lub ${NAJNOWSZE.jquery}).`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Aktualna wersja." };
    case "jquery-ui":
      if (porownaj(wersja, "1.13.2") < 0)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          najnowsza: NAJNOWSZE.jqueryUi,
          powod: `jQuery UI ${wersja} ma znane luki XSS (m.in. CVE-2021-41182, CVE-2022-31160), poprawione w 1.13.2.`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Wersja bez znanych luk." };
    case "bootstrap":
      if (g <= 3)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          najnowsza: NAJNOWSZE.bootstrap,
          powod: `Bootstrap ${g} nie jest rozwijany od 2019 roku i ma opisane luki XSS w starszych wydaniach.`,
        };
      if (g === 4)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.bootstrap,
          powod: "Bootstrap 4 nie jest rozwijany od stycznia 2023.",
        };
      if (m < 3)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.bootstrap,
          powod: `Dostępny jest Bootstrap ${NAJNOWSZE.bootstrap}.`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Aktualna linia." };
    case "font-awesome":
      if (g <= 4)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: "6",
          powod: "Font Awesome 4 nie jest rozwijany, ostatnie wydanie 4.7.0 pochodzi z 2016 roku.",
        };
      return BEZ_OCENY("Wersja 5 lub nowsza.");
    case "angular": {
      const koniec = ANGULAR_KONIEC_WSPARCIA[g];
      if (g < 22 && (!koniec || new Date(koniec) < teraz))
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          najnowsza: NAJNOWSZE.angular,
          powod: `Angular ${g} jest poza okresem wsparcia, nowe luki nie dostają w nim poprawek.`,
        };
      if (g < 22)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.angular,
          powod: `Angular ${g} jest jeszcze wspierany do ${koniec}.`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Aktualna linia." };
    }
    case "angularjs":
      return {
        status: "przestarzala",
        bezpieczenstwo: true,
        najnowsza: NAJNOWSZE.angular,
        powod: "AngularJS (1.x) nie jest wspierany od 31 grudnia 2021.",
      };
    case "vue":
      if (g <= 2)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          najnowsza: NAJNOWSZE.vue,
          powod: "Vue 2 nie jest wspierane od 31 grudnia 2023.",
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Aktualna linia." };
    case "react":
      if (g < 18)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.react,
          powod: `React ${wersja} jest dwie linie za najnowszym ${NAJNOWSZE.react}.`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Nowa linia." };
    case "drupal":
      if (g <= 9)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          powod: `Drupal ${g} nie dostaje już poprawek bezpieczeństwa (Drupal 7 do stycznia 2025, 9 do listopada 2023).`,
        };
      return BEZ_OCENY("Linia w obsłudze.");
    case "joomla":
      if (g <= 3)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          powod: "Joomla 3 nie jest wspierana od sierpnia 2023.",
        };
      return BEZ_OCENY("Wersja 4 lub nowsza.");
    case "nginx":
      if (porownaj(wersja, "1.26.0") < 0)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.nginx,
          powod: `nginx ${wersja} jest sporo starszy od ${NAJNOWSZE.nginx}. Hosting mógł wdrożyć łatki bez zmiany numeru.`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Nowa linia." };
    case "apache":
      if (porownaj(wersja, "2.4.0") < 0)
        return {
          status: "przestarzala",
          bezpieczenstwo: true,
          najnowsza: NAJNOWSZE.apache,
          powod: "Apache 2.2 i starszy nie jest wspierany od 2017 roku.",
        };
      if (porownaj(wersja, "2.4.58") < 0)
        return {
          status: "starsza",
          bezpieczenstwo: false,
          najnowsza: NAJNOWSZE.apache,
          powod: `Apache ${wersja} jest wyraźnie starszy od ${NAJNOWSZE.apache}. Hosting mógł wdrożyć łatki bez zmiany numeru.`,
        };
      return { status: "aktualna", bezpieczenstwo: false, powod: "Nowa wersja." };
    default:
      return BEZ_OCENY("Nie porównujemy wersji tej technologii.");
  }
}
