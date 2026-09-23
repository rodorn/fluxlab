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


// Tytul i opis w dokumencie sa zapisane z encjami, wiec bez odkodowania
// szkic zawieralby "Car&amp;More" zamiast nazwy firmy.
const ENCJE: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function bezEncji(t: string): string {
  return t
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, n) => ENCJE[n])
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function tytulStrony(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]{3,200}?)<\/title>/i);
  return m ? bezEncji(m[1].replace(/\s+/g, " ").trim()) : null;
}

function opisStrony(html: string): string | null {
  const m = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']{20,300})/i,
  );
  return m ? bezEncji(m[1].replace(/\s+/g, " ").trim()) : null;
}

// Najwazniejsze podstrony wybieramy po tekscie odnosnika, bo sciezka bywa
// nic nie mowiaca. Bierzemy tylko adresy w tej samej domenie i odrzucamy
// kotwice, pliki i strony sluzbowe, ktore w takim spisie nikomu nie pomoga.
const POMIJANE = /polityk|regulamin|cookie|rodo|logow|koszyk|rejestr|#|\.(pdf|jpg|png|webp|zip|docx?)$/i;

function waznePodstrony(html: string, baza: string): { tekst: string; url: string }[] {
  const wynik: { tekst: string; url: string }[] = [];
  const widziane = new Set<string>();
  for (const m of html.matchAll(
    /<a[^>]+href=["']([^"'#]+)["'][^>]*>([\s\S]{2,80}?)<\/a>/gi,
  )) {
    const surowy = m[1];
    const tekst = bezEncji(m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (!tekst || tekst.length < 3 || POMIJANE.test(surowy) || POMIJANE.test(tekst)) {
      continue;
    }
    let url: string;
    try {
      url = new URL(surowy, baza).toString();
    } catch {
      continue;
    }
    if (!url.startsWith(baza)) continue;
    if (url.replace(/\/$/, "") === baza.replace(/\/$/, "")) continue;
    if (widziane.has(url)) continue;
    widziane.add(url);
    wynik.push({ tekst, url });
    if (wynik.length >= 8) break;
  }
  return wynik;
}

// Szkic pliku llms.txt zbudowany z tego, co strona juz o sobie mowi. Nie
// zgadujemy niczego o firmie: tytul, opis i nazwy podstron pochodza wprost
// z dokumentu, a miejsca wymagajace decyzji czlowieka zostawiamy wprost
// zaznaczone, zeby nikt nie wkleil na produkcje zdania, ktorego nie napisal.
function szkicLlms(
  domena: string,
  tytul: string | null,
  opis: string | null,
  podstrony: { tekst: string; url: string }[],
): string {
  const nazwa = (tytul || domena).split(/[|\u2013-]/)[0].trim() || domena;
  const linie = [`# ${nazwa}`, ""];
  linie.push(
    opis
      ? `> ${opis}`
      : `> [Tu wpisz jedno zdanie o tym, czym zajmuje się firma i dla kogo. Na stronie nie było opisu w metadanych, więc nie mamy czego zacytować.]`,
  );
  linie.push("");
  if (podstrony.length) {
    linie.push("## Najważniejsze strony", "");
    for (const p of podstrony) linie.push(`- [${p.tekst}](${p.url})`);
    linie.push("");
  }
  linie.push("## Kontakt", "");
  linie.push(`- https://${domena}`);
  linie.push("- [Tu wpisz adres e-mail albo odnośnik do formularza kontaktu.]");
  return linie.join("\n");
}


// Szkic danych uporzadkowanych. Brak tego elementu jest w naszym pomiarze
// najczestszy (54 procent stron), a jednoczesnie najtanszy do naprawienia,
// bo to kilkanascie linii w dokumencie. Tak jak przy llms.txt, nie zgadujemy
// nic o firmie: bierzemy tylko to, co strona juz o sobie mowi, a reszte
// zostawiamy jako wyrazny do uzupelnienia.
function szkicDanych(
  domena: string,
  tytul: string | null,
  opis: string | null,
  html: string,
): string {
  const nazwa = (tytul || domena).split(/[|\u2013-]/)[0].trim() || domena;
  const mail = html.match(/mailto:([\w.+-]+@[\w.-]+\.\w{2,})/i)?.[1];
  const telefon = html.match(/tel:([+0-9\s()-]{9,20})/i)?.[1]?.replace(/\s+/g, " ").trim();

  const dane: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: nazwa,
    url: `https://${domena}`,
    description: opis ?? "[Jedno zdanie o tym, czym zajmuje się firma i dla kogo.]",
  };
  const kontakt: Record<string, string> = { "@type": "ContactPoint", contactType: "customer service" };
  if (mail) kontakt.email = mail;
  if (telefon) kontakt.telephone = telefon;
  if (mail || telefon) dane.contactPoint = kontakt;
  else dane.contactPoint = { ...kontakt, email: "[adres e-mail]" };

  return (
    '<script type="application/ld+json">\n' +
    JSON.stringify(dane, null, 2) +
    "\n</script>"
  );
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
      naglowek: "Nie możemy połączyć się z tą stroną",
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
      : "Nie znaleźliśmy żadnego opisu w formacie uporządkowanym. Człowiek wyczyta z tekstu, czym jest firma, maszyna musi to zgadnąć z układu strony, a przy zgadywaniu myli się o wiele częściej.",
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
      : "Nie znaleźliśmy mapy strony pod standardowym adresem. Bez niej robot musi odkrywać podstrony sam, przez linki.",
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
    // Szkic dajemy tylko tam, gdzie pliku nie ma. Podsuwanie gotowca komus,
    // kto juz ma swoj, byloby sugerowaniem, ze jego jest gorszy, czego nie
    // sprawdzamy.
    szkicLlms: maLlms
      ? null
      : szkicLlms(domena, tytulStrony(html), opisStrony(html), waznePodstrony(html, baza)),
    szkicDanych: typy.length
      ? null
      : szkicDanych(domena, tytulStrony(html), opisStrony(html), html),
  });
}
