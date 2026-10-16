/**
 * Wspólne kontrole audytu: jedna strona i cała strona korzystają z tych samych
 * reguł. Wszystko statycznie, bez przeglądarki: czytamy HTML, nagłówki, DNS i
 * kilka znanych adresów. Ten sam stan strony daje ten sam wynik.
 *
 * Kontrola zwraca znalezisko { klucz, szczegol }. Tytuł, skutek, waga i koszt
 * naprawy stoją w KATALOGU, w jednym miejscu, więc oba audyty opisują ten sam
 * problem tymi samymi słowami.
 *
 * Zakres w katalogu mówi, gdzie kontrola ma sens:
 *  - "strona": z samego HTML jednej podstrony (audyt całości robi ją na każdej),
 *  - "witryna": z cech zebranych ze wszystkich podstron (np. czy gdzieś jest NIP),
 *  - "domena": raz na domenę (nagłówki, pliki na serwerze, DNS).
 */

import { odmien } from "./odmiana";

export type WagaKontroli = "wazne" | "drobne";
export type ObszarKontroli =
  | "dostepnosc"
  | "szybkosc"
  | "mobile"
  | "seo"
  | "bezpieczenstwo"
  | "prawo"
  | "poczta";

export type OpisKontroli = {
  tytul: string;
  skutek: string;
  waga: WagaKontroli;
  obszar: ObszarKontroli;
  koszt: number;
  dostep: string;
  zakres: "strona" | "witryna" | "domena";
};

export type Znalezisko = { klucz: string; szczegol: string };

const KOD = "dostęp do kodu strony";
const SERWER = "konfiguracja serwera";
const DNS = "dostęp do DNS domeny";
const PANEL = "dostęp do panelu strony";

export const KATALOG: Record<string, OpisKontroli> = {
  // --- D: bezpieczeństwo ---------------------------------------------------
  brak_hsts: {
    tytul: "Brak nagłówka HSTS",
    skutek:
      "Przeglądarka może przy pierwszym wejściu połączyć się bez szyfrowania, a ktoś w tej samej sieci Wi-Fi może to przechwycić.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 80,
    dostep: SERWER,
    zakres: "domena",
  },
  naglowki_bezpieczenstwa: {
    tytul: "Brakuje nagłówków bezpieczeństwa",
    skutek:
      "Bez nich łatwiej osadzić Twoją stronę w cudzej ramce albo wstrzyknąć na nią obcy skrypt, a skanery bezpieczeństwa oceniają ją nisko.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 150,
    dostep: SERWER,
    zakres: "domena",
  },
  ciasteczka_bez_flag: {
    tytul: "Ciasteczka bez flag Secure, HttpOnly albo SameSite",
    skutek:
      "Ciasteczko sesji bez tych flag łatwiej wykraść albo podsunąć w cudzym żądaniu, co przy panelu logowania oznacza przejęcie konta.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 100,
    dostep: SERWER,
    zakres: "domena",
  },
  odsloniete_pliki: {
    tytul: "Pliki z hasłami albo kodem są publicznie dostępne",
    skutek:
      "Każdy może pobrać te pliki, a w nich zwykle są hasła do bazy danych albo cały kod strony. To prosta droga do przejęcia strony.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 150,
    dostep: SERWER,
    zakres: "domena",
  },
  wp_uzytkownicy: {
    tytul: "WordPress pokazuje loginy użytkowników",
    skutek:
      "Atakujący zna już połowę danych logowania i zgaduje tylko hasło, więc próby włamania są dużo skuteczniejsze.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 100,
    dostep: PANEL,
    zakres: "domena",
  },
  wp_xmlrpc: {
    tytul: "Włączony xmlrpc.php",
    skutek:
      "Przez ten plik można zgadywać hasła setkami w jednym zapytaniu i obciążać serwer, a prawie żadna strona go dziś nie potrzebuje.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 80,
    dostep: PANEL,
    zakres: "domena",
  },
  wersja_widoczna: {
    tytul: "Strona podaje wersje oprogramowania",
    skutek:
      "Numer wersji pozwala automatom od razu dobrać znane luki do Twojej strony, zamiast zgadywać.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 80,
    dostep: SERWER,
    zakres: "domena",
  },
  stary_wordpress: {
    tytul: "Nieaktualny WordPress",
    skutek:
      "Starsze wersje mają opisane publicznie luki, które automaty wykorzystują masowo, więc strona może zostać przejęta bez Twojej wiedzy.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 200,
    dostep: PANEL,
    zakres: "domena",
  },
  stare_jquery: {
    tytul: "Stara biblioteka jQuery ze znanymi lukami",
    skutek:
      "Wersje jQuery sprzed 3.5 mają opisane luki pozwalające wstrzyknąć skrypt, co skanery bezpieczeństwa wskazują od razu.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 150,
    dostep: KOD,
    zakres: "domena",
  },
  listowanie_katalogow: {
    tytul: "Serwer pokazuje listę plików w katalogu",
    skutek:
      "Każdy może przejrzeć wszystkie wgrane pliki, także te, których nigdzie nie podlinkowałeś, na przykład umowy czy kopie zapasowe.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 80,
    dostep: SERWER,
    zakres: "domena",
  },
  blank_bez_noopener: {
    tytul: "Linki w nowej karcie bez rel=noopener",
    skutek:
      "Otwarta strona może podmienić Twoją kartę na fałszywą, a starsze przeglądarki nie chronią przed tym same.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 50,
    dostep: KOD,
    zakres: "strona",
  },
};

/* ------------------------------------------------------------------ */
/* Pomocnicze                                                           */
/* ------------------------------------------------------------------ */

const UA =
  "Mozilla/5.0 (compatible; FluxlabAudyt/1.0; +https://fluxlab.pl/audyt)";
const CZAS_MS = 6_000;

type Odp = { status: number; url: string; naglowki: Headers; tekst: string };

/** Pobranie z limitem czasu i wielkości. Null przy błędzie sieci. */
export async function zapytaj(
  adres: string,
  opcje: {
    metoda?: string;
    przekierowania?: boolean;
    maxZnakow?: number;
    cialo?: string;
  } = {},
): Promise<Odp | null> {
  try {
    const odp = await fetch(adres, {
      method: opcje.metoda ?? "GET",
      redirect: opcje.przekierowania === false ? "manual" : "follow",
      signal: AbortSignal.timeout(CZAS_MS),
      headers: { "user-agent": UA, "accept-encoding": "gzip, deflate, br" },
      body: opcje.cialo,
    });
    let tekst = "";
    if (opcje.metoda !== "HEAD") {
      tekst = await odp.text();
      if (opcje.maxZnakow) tekst = tekst.slice(0, opcje.maxZnakow);
    }
    return {
      status: odp.status,
      url: odp.url || adres,
      naglowki: odp.headers,
      tekst,
    };
  } catch {
    return null;
  }
}

const ENCJE: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  copy: "©",
};
export function dekoduj(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(\w+);/g, (m, n) => ENCJE[n] ?? m);
}

export type Tag = {
  tag: string;
  atr: Map<string, string>;
  poz: number;
  koniec: number;
};

/** Znaczniki otwierające z atrybutami, bez treści skryptów i komentarzy. */
export function znaczniki(html: string, nazwy?: string[]): Tag[] {
  const czysty = bezSkryptow(html, true);
  const wynik: Tag[] = [];
  const re =
    /<([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*\/?>/g;
  for (const m of czysty.matchAll(re)) {
    const tag = m[1].toLowerCase();
    if (nazwy && !nazwy.includes(tag)) continue;
    const atr = new Map<string, string>();
    for (const a of m[2].matchAll(
      /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g,
    )) {
      const n = a[1].toLowerCase();
      if (!atr.has(n)) atr.set(n, dekoduj(a[2] ?? a[3] ?? a[4] ?? ""));
    }
    const poz = m.index ?? 0;
    wynik.push({ tag, atr, poz, koniec: poz + m[0].length });
  }
  return wynik;
}

/** HTML bez komentarzy i treści skryptów (tagi skryptów zostają, puste). */
export function bezSkryptow(html: string, zostawTagi = false): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(
      /<(script|style|template|noscript)\b([^>]*)>[\s\S]*?<\/\1\s*>/gi,
      (_, t, a) => (zostawTagi ? `<${t}${a}></${t}>` : " "),
    );
}

export function tekstWidoczny(html: string): string {
  return dekoduj(
    bezSkryptow(html)
      .replace(/<(svg)\b[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function krotko(s: string, ile = 70): string {
  return s.length > ile ? s.slice(0, ile) + "..." : s;
}

function lista(x: string[], ile = 5): string {
  return (
    x.slice(0, ile).join(", ") +
    (x.length > ile ? ` i ${x.length - ile} innych` : "")
  );
}

function porownajWersje(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

/* ------------------------------------------------------------------ */
/* Kontrole jednej podstrony (z HTML, bez sieci)                         */
/* ------------------------------------------------------------------ */

export function kontroleStrony(html: string, adres: string): Znalezisko[] {
  const z: Znalezisko[] = [];
  const tagi = znaczniki(html);
  let host = "";
  try {
    host = new URL(adres).hostname.replace(/^www\./, "");
  } catch {
    /* adres bez hosta */
  }

  // D: target=_blank bez noopener (do obcych domen)
  const blank = tagi.filter((t) => {
    if (t.tag !== "a" || (t.atr.get("target") ?? "").toLowerCase() !== "_blank")
      return false;
    if (/\bnoopener\b|\bnoreferrer\b/i.test(t.atr.get("rel") ?? ""))
      return false;
    try {
      const u = new URL(t.atr.get("href") ?? "", adres);
      return (
        /^https?:$/.test(u.protocol) &&
        u.hostname.replace(/^www\./, "") !== host
      );
    } catch {
      return false;
    }
  });
  if (blank.length)
    z.push({
      klucz: "blank_bez_noopener",
      szczegol: `${blank.length} ${odmien(blank.length, "link", "linki", "linków")} do innych stron, np. ${lista(
        blank.map((t) => krotko(t.atr.get("href") ?? "")),
        2,
      )}`,
    });

  return z;
}

/* ------------------------------------------------------------------ */
/* Kontrole domeny (sieć, raz na badanie)                               */
/* ------------------------------------------------------------------ */

export type KontekstDomeny = {
  domena: string;
  /** Adres bazowy, np. https://www.firma.pl */
  baza: string;
  /** HTML strony głównej. */
  html: string;
  /** Nagłówki odpowiedzi strony głównej. */
  naglowki: Headers;
};

async function bezpieczenstwo(k: KontekstDomeny): Promise<Znalezisko[]> {
  const z: Znalezisko[] = [];
  const h = k.naglowki;
  if (k.baza.startsWith("https://") && !h.get("strict-transport-security"))
    z.push({
      klucz: "brak_hsts",
      szczegol:
        "Odpowiedź strony głównej nie ma nagłówka Strict-Transport-Security.",
    });

  const csp = h.get("content-security-policy") ?? "";
  const brak: string[] = [];
  if (!csp) brak.push("Content-Security-Policy");
  if (!/nosniff/i.test(h.get("x-content-type-options") ?? ""))
    brak.push("X-Content-Type-Options");
  if (!h.get("x-frame-options") && !/frame-ancestors/i.test(csp))
    brak.push("X-Frame-Options (lub frame-ancestors)");
  if (!h.get("referrer-policy")) brak.push("Referrer-Policy");
  if (!h.get("permissions-policy")) brak.push("Permissions-Policy");
  if (brak.length >= 2)
    z.push({
      klucz: "naglowki_bezpieczenstwa",
      szczegol: `Brakuje: ${brak.join(", ")}.`,
    });

  const ciastka = (
    typeof h.getSetCookie === "function" ? h.getSetCookie() : []
  ).map((c) => {
    const nazwa = c.split("=")[0].trim();
    const braki = [
      !/;\s*secure/i.test(c) && "Secure",
      !/;\s*httponly/i.test(c) && "HttpOnly",
      !/;\s*samesite=/i.test(c) && "SameSite",
    ].filter(Boolean) as string[];
    return { nazwa, braki };
  });
  const zle = ciastka.filter((c) => c.braki.length);
  if (zle.length)
    z.push({
      klucz: "ciasteczka_bez_flag",
      szczegol: lista(
        zle.map((c) => `${c.nazwa} (brak ${c.braki.join(", ")})`),
        4,
      ),
    });

  // Wersje w nagłówkach
  const wersje: string[] = [];
  for (const n of ["server", "x-powered-by", "x-aspnet-version"]) {
    const v = h.get(n);
    if (v && /\d+\.\d+/.test(v)) wersje.push(`${n}: ${v.slice(0, 60)}`);
  }
  const generator =
    k.html.match(
      /<meta[^>]+name=["']generator["'][^>]*content=["']([^"']+)["']/i,
    )?.[1] ??
    k.html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]*name=["']generator["']/i,
    )?.[1];
  if (generator && /\d+\.\d+/.test(generator))
    wersje.push(`meta generator: ${generator.slice(0, 60)}`);
  if (wersje.length)
    z.push({ klucz: "wersja_widoczna", szczegol: wersje.join("; ") });

  // Odsłonięte pliki. Bez przekierowań i z kontrolą treści, bo wiele serwerów
  // na każdy adres oddaje stronę główną z kodem 200.
  const pliki: [string, (t: string) => boolean][] = [
    ["/.git/HEAD", (t) => /^ref:\s*refs\//.test(t.trim())],
    [
      "/.env",
      (t) => /^\s*[A-Z][A-Z0-9_]*\s*=/m.test(t) && !/<html|<!doctype/i.test(t),
    ],
    ...[
      "wp-config.php.bak",
      "wp-config.php~",
      "wp-config.bak",
      "wp-config.php.save",
      "wp-config.old",
      "wp-config.php.old",
      "wp-config.txt",
    ].map(
      (p) =>
        [`/${p}`, (t: string) => /DB_PASSWORD|DB_NAME/.test(t)] as [
          string,
          (t: string) => boolean,
        ],
    ),
  ];
  const wp = /wp-content|wp-includes/i.test(k.html);
  const [odsloniete, uzytkownicy, xmlrpc, katalog, wersjaWp] =
    await Promise.all([
      Promise.all(
        pliki.map(async ([p, test]) => {
          const o = await zapytaj(k.baza + p, {
            przekierowania: false,
            maxZnakow: 20_000,
          });
          return o && o.status === 200 && test(o.tekst) ? p : null;
        }),
      ),
      wp
        ? zapytaj(`${k.baza}/wp-json/wp/v2/users`, { maxZnakow: 200_000 })
        : null,
      wp
        ? zapytaj(`${k.baza}/xmlrpc.php`, {
            przekierowania: false,
            maxZnakow: 2_000,
          })
        : null,
      wp
        ? zapytaj(`${k.baza}/wp-content/uploads/`, {
            przekierowania: false,
            maxZnakow: 20_000,
          })
        : null,
      wp && generator && /wordpress/i.test(generator)
        ? zapytaj("https://api.wordpress.org/core/version-check/1.7/", {
            maxZnakow: 200_000,
          })
        : null,
    ]);
  const zle2 = odsloniete.filter(Boolean) as string[];
  if (zle2.length)
    z.push({
      klucz: "odsloniete_pliki",
      szczegol: `Dostępne bez logowania: ${zle2.join(", ")}.`,
    });

  if (uzytkownicy && uzytkownicy.status === 200) {
    try {
      const j = JSON.parse(uzytkownicy.tekst);
      if (Array.isArray(j) && j.length) {
        const loginy = j.map((u) => String(u?.slug ?? "")).filter(Boolean);
        if (loginy.length)
          z.push({
            klucz: "wp_uzytkownicy",
            szczegol: `Adres /wp-json/wp/v2/users zwraca ${loginy.length} ${odmien(loginy.length, "login", "loginy", "loginów")}, np. ${lista(loginy, 3)}.`,
          });
      }
    } catch {
      /* nie JSON, nic nie ujawnia */
    }
  }
  if (
    xmlrpc &&
    (xmlrpc.status === 405 || xmlrpc.status === 200) &&
    /XML-RPC/i.test(xmlrpc.tekst)
  )
    z.push({
      klucz: "wp_xmlrpc",
      szczegol: "Adres /xmlrpc.php odpowiada i przyjmuje zapytania.",
    });
  if (
    katalog &&
    katalog.status === 200 &&
    /<title>\s*Index of \//i.test(katalog.tekst)
  )
    z.push({
      klucz: "listowanie_katalogow",
      szczegol: "Pod /wp-content/uploads/ widać listę wgranych plików.",
    });

  const wpWersja = generator?.match(/wordpress\s+(\d+(?:\.\d+)+)/i)?.[1];
  if (wpWersja && wersjaWp && wersjaWp.status === 200) {
    try {
      const najnowsza = String(
        JSON.parse(wersjaWp.tekst)?.offers?.[0]?.current ?? "",
      );
      const [a1, a2] = najnowsza.split(".").map(Number);
      const [b1, b2] = wpWersja.split(".").map(Number);
      // Za nieaktualną uznajemy wersję starszą o więcej niż jedno wydanie główne.
      if (najnowsza && (a1 - b1) * 10 + (a2 - b2) > 1)
        z.push({
          klucz: "stary_wordpress",
          szczegol: `Strona ma WordPress ${wpWersja}, aktualny to ${najnowsza}.`,
        });
    } catch {
      /* brak danych o wersji */
    }
  }

  const jq = k.html.match(
    /jquery(?:[.-]min)?[.-]?(\d+\.\d+(?:\.\d+)?)?(?:\.min)?\.js(?:\?ver=(\d+\.\d+(?:\.\d+)?))?/i,
  );
  const jqWersja = jq?.[1] ?? jq?.[2];
  if (jqWersja && porownajWersje(jqWersja, "3.5.0") < 0)
    z.push({
      klucz: "stare_jquery",
      szczegol: `Ładowana jest jQuery ${jqWersja}.`,
    });

  return z;
}

export async function kontroleDomeny(k: KontekstDomeny): Promise<Znalezisko[]> {
  const czesci = await Promise.all([bezpieczenstwo(k).catch(() => [])]);
  return czesci.flat();
}
