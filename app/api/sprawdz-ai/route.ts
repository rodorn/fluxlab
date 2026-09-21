import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const UA = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
  Accept: "text/html,application/xhtml+xml,application/xml",
};

// Roboty, ktore zbieraja tresc na potrzeby modeli jezykowych i odpowiedzi
// generowanych w wyszukiwarkach. Google-Extended nie wplywa na zwykle wyniki
// wyszukiwania, steruje wylacznie uzyciem tresci w odpowiedziach AI.
const BOTY = [
  { ua: "GPTBot", kto: "OpenAI, zbieranie treści do modeli" },
  { ua: "OAI-SearchBot", kto: "OpenAI, wyszukiwanie w ChatGPT" },
  { ua: "ChatGPT-User", kto: "OpenAI, odczyt strony na prośbę użytkownika" },
  { ua: "ClaudeBot", kto: "Anthropic" },
  { ua: "PerplexityBot", kto: "Perplexity" },
  { ua: "Google-Extended", kto: "Google, użycie treści w odpowiedziach AI" },
  { ua: "CCBot", kto: "Common Crawl, zasila wiele modeli" },
];

function czystaDomena(raw: string): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^.*@/, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

async function pobierz(url: string, limit = 600_000) {
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(12000) });
    if (!r.ok) return null;
    return (await r.text()).slice(0, limit);
  } catch {
    return null;
  }
}

async function kod(url: string): Promise<number | null> {
  try {
    const r = await fetch(url, {
      headers: UA,
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
    });
    return r.status;
  } catch {
    return null;
  }
}

// Zwraca liste zablokowanych botow. Reguly czytamy sekcjami, bo "Disallow: /"
// w sekcji dla jednego robota nie mowi nic o pozostalych, a sekcja dla
// wszystkich obowiazuje kazdego, ktory nie ma sekcji wlasnej.
function zablokowane(robots: string): { bot: string; kto: string; przez: string }[] {
  const sekcje: { agenci: string[]; blokujeWszystko: boolean }[] = [];
  let biezaca: { agenci: string[]; blokujeWszystko: boolean } | null = null;
  let poprzedniaToAgent = false;

  for (const linia of robots.split(/\r?\n/)) {
    const l = linia.split("#")[0].trim();
    if (!l) continue;
    const ua = l.match(/^user-agent:\s*(.+)$/i);
    if (ua) {
      if (!biezaca || !poprzedniaToAgent) {
        biezaca = { agenci: [], blokujeWszystko: false };
        sekcje.push(biezaca);
      }
      biezaca.agenci.push(ua[1].trim().toLowerCase());
      poprzedniaToAgent = true;
      continue;
    }
    poprzedniaToAgent = false;
    if (!biezaca) continue;
    const dis = l.match(/^disallow:\s*(.*)$/i);
    if (dis && dis[1].trim() === "/") biezaca.blokujeWszystko = true;
  }

  const wynik: { bot: string; kto: string; przez: string }[] = [];
  for (const b of BOTY) {
    const wlasna = sekcje.find((s) => s.agenci.includes(b.ua.toLowerCase()));
    if (wlasna) {
      if (wlasna.blokujeWszystko)
        wynik.push({ bot: b.ua, kto: b.kto, przez: "własna reguła" });
      continue;
    }
    const ogolna = sekcje.find((s) => s.agenci.includes("*"));
    if (ogolna?.blokujeWszystko)
      wynik.push({ bot: b.ua, kto: b.kto, przez: "reguła dla wszystkich" });
  }
  return wynik;
}

// Tresc widoczna bez uruchamiania skryptow. Roboty zbierajace dane do modeli
// w wiekszosci nie wykonuja JavaScriptu, wiec strona, ktorej tekst dokleja sie
// dopiero w przegladarce, jest dla nich pusta.
function tekstBezSkryptow(html: string): string {
  const bez = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  const body = bez.match(/<body[\s\S]*<\/body>/i)?.[0] ?? bez;
  return body
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function typyDanych(html: string): string[] {
  const typy = new Set<string>();
  for (const m of html.matchAll(
    /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    for (const t of m[1].matchAll(/"@type"\s*:\s*"([^"]+)"/g)) typy.add(t[1]);
  }
  return [...typy];
}

export async function POST(request: Request) {
  let domena = "";
  try {
    const body = await request.json();
    domena = czystaDomena(body?.domena);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json(
      { error: "Podaj samą domenę, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }

  let baza = `https://${domena}`;
  let html = await pobierz(baza);
  if (html === null) {
    baza = `https://www.${domena}`;
    html = await pobierz(baza);
  }
  if (html === null) {
    return NextResponse.json({
      status: "BRAK_STRONY",
      domena,
      naglowek: "Nie mogę połączyć się z tą stroną",
      komentarz:
        "Ani wersja z www, ani bez www nie odpowiedziała. Sprawdź pisownię albo spróbuj za chwilę.",
    });
  }

  const [robots, llms, sitemapKod] = await Promise.all([
    pobierz(`${baza}/robots.txt`, 40_000),
    pobierz(`${baza}/llms.txt`, 40_000),
    kod(`${baza}/sitemap.xml`),
  ]);

  const blokady = robots ? zablokowane(robots) : [];
  const tekst = tekstBezSkryptow(html);
  const znakow = tekst.length;
  const typy = typyDanych(html);
  const opis = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']{20,})/i.test(
    html,
  );
  const tytul = /<title[^>]*>\s*\S[\s\S]{9,}?<\/title>/i.test(html);
  // llms.txt to plik z opisem serwisu pisanym pod modele jezykowe. Nie jest
  // standardem obowiazkowym, wiec jego brak nie moze psuc werdyktu, natomiast
  // obecnosc jest sygnalem, ze ktos o tym pomyslal.
  const maLlms = Boolean(llms && llms.trim().length > 40);
  const maSitemap = sitemapKod !== null && sitemapKod < 400;

  const trescPusta = znakow < 600;
  const werdykt =
    blokady.length >= 3 || trescPusta
      ? "CZERWONY"
      : blokady.length > 0 || !opis || typy.length === 0
        ? "ZOLTY"
        : "ZIELONY";

  const naglowek = trescPusta
    ? "Bez uruchomienia skryptów Twoja strona jest prawie pusta"
    : blokady.length
      ? `${blokady.length} z ${BOTY.length} robotów AI ma zakaz wejścia`
      : typy.length === 0
        ? "Roboty wchodzą, ale strona nie mówi im, czym jest firma"
        : "Strona jest dostępna dla robotów AI";

  const punkty: { tytul: string; stan: "ok" | "uwaga" | "zle"; opis: string }[] = [];

  punkty.push({
    tytul: "Dostęp dla robotów AI",
    stan: blokady.length >= 3 ? "zle" : blokady.length ? "uwaga" : "ok",
    opis: blokady.length
      ? `Zakaz wejścia mają: ${blokady
          .map((b) => `${b.bot} (${b.przez})`)
          .join(", ")}. Blokada bywa świadomą decyzją o nieoddawaniu treści do trenowania modeli, ale częściej jest skutkiem ubocznym reguły napisanej przeciwko innym robotom. Warto wiedzieć, że się ją ma.`
      : "Żaden z siedmiu sprawdzanych robotów nie jest zablokowany w robots.txt, więc treść może trafić do odpowiedzi generowanych przez asystentów.",
  });

  punkty.push({
    tytul: "Treść bez uruchamiania skryptów",
    stan: trescPusta ? "zle" : znakow < 2000 ? "uwaga" : "ok",
    opis: trescPusta
      ? `Po odrzuceniu skryptów zostaje ${znakow} znaków tekstu. To znaczy, że treść dokleja się dopiero w przeglądarce. Roboty zbierające dane do modeli w większości nie uruchamiają skryptów, więc widzą pustą stronę, niezależnie od tego, jak wygląda ona u człowieka.`
      : `Po odrzuceniu skryptów zostaje ${znakow.toLocaleString("pl-PL")} znaków tekstu, czyli treść jest w samym dokumencie i nie wymaga uruchamiania niczego.`,
  });

  punkty.push({
    tytul: "Dane uporządkowane o firmie",
    stan: typy.length === 0 ? "uwaga" : "ok",
    opis: typy.length
      ? `Strona opisuje się typami: ${typy.slice(0, 6).join(", ")}. To jest forma, którą maszyna czyta bez zgadywania.`
      : "Nie znalazłem żadnego opisu w formacie uporządkowanym. Człowiek wyczyta z tekstu, czym jest firma, maszyna musi to zgadnąć z układu strony, a przy zgadywaniu myli się o wiele częściej.",
  });

  punkty.push({
    tytul: "Tytuł i opis strony",
    stan: tytul && opis ? "ok" : "uwaga",
    opis:
      tytul && opis
        ? "Strona ma wypełniony tytuł i opis, czyli dwa zdania, które najczęściej cytuje się w podsumowaniu."
        : `Brakuje ${!tytul ? "sensownego tytułu" : ""}${!tytul && !opis ? " oraz " : ""}${!opis ? "opisu w metadanych" : ""}. To jest materiał, z którego asystent buduje jedno zdanie o Twojej firmie.`,
  });

  punkty.push({
    tytul: "Mapa strony",
    stan: maSitemap ? "ok" : "uwaga",
    opis: maSitemap
      ? "Mapa strony odpowiada, więc robot dostaje listę podstron jednym zapytaniem."
      : "Nie znalazłem mapy strony pod standardowym adresem. Bez niej robot musi odkrywać podstrony sam, przez linki.",
  });

  punkty.push({
    tytul: "Plik llms.txt",
    stan: maLlms ? "ok" : "uwaga",
    opis: maLlms
      ? "Strona ma plik llms.txt, czyli krótki opis serwisu pisany wprost pod modele językowe."
      : "Nie ma pliku llms.txt. To nie jest wymóg i jego brak niczego nie psuje, natomiast jest to najtańszy sposób, żeby samemu napisać zdanie, którym asystent opisze Twoją firmę, zamiast zostawiać to jego interpretacji.",
  });

  const komentarz = trescPusta
    ? "Najpoważniejszy problem jest tu jeden: strona buduje się dopiero w przeglądarce. Dla odwiedzającego to niewidoczne, dla robota oznacza pustą kartkę. Zanim cokolwiek innego, warto sprawić, żeby najważniejsza treść była w samym dokumencie."
    : blokady.length
      ? "Zablokowane roboty to często pozostałość po regule wpisanej dawno temu przeciwko zupełnie innym robotom. Jeśli blokada jest świadoma, nie ma o czym mówić. Jeśli nie, warto ją zdjąć, bo dziś to jest kanał, którym ludzie pytają o firmy zamiast wpisywać frazy w wyszukiwarkę."
      : "Technicznie nic tu nie stoi na przeszkodzie. To, czy asystent poleci akurat Ciebie, zależy dalej od tego, czy na stronie stoją konkretne odpowiedzi na pytania klientów, a nie ogólne hasła o jakości i indywidualnym podejściu.";

  return NextResponse.json({
    status: "OK",
    domena,
    werdykt,
    naglowek,
    komentarz,
    punkty,
    znakow,
    typy,
    zablokowane: blokady,
    maLlms,
    maSitemap,
  });
}
