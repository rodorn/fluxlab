import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const UA = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
  Accept: "text/html,application/xhtml+xml,application/xml",
};

const PROBKA = 15;

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

async function tekst(url: string, limit = 800_000): Promise<string | null> {
  try {
    const r = await fetch(url, {
      headers: UA,
      signal: AbortSignal.timeout(12000),
    });
    if (!r.ok) return null;
    const t = await r.text();
    return t.slice(0, limit);
  } catch {
    return null;
  }
}

async function kodOdpowiedzi(url: string): Promise<number | null> {
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

// robots.txt blokuje wszystko tylko wtedy, gdy w sekcji dla wszystkich botow
// stoi dokladnie "Disallow: /". Porownanie przez zawieranie daje falszywy
// alarm na kazdym "Disallow: /wp-admin/", co juz raz mnie zmylilo.
function blokujeWszystko(robots: string): boolean {
  let wSekcjiDlaWszystkich = false;
  for (const linia of robots.split(/\r?\n/)) {
    const l = linia.split("#")[0].trim();
    if (!l) continue;
    const ua = l.match(/^user-agent:\s*(.+)$/i);
    if (ua) {
      wSekcjiDlaWszystkich = ua[1].trim() === "*";
      continue;
    }
    if (!wSekcjiDlaWszystkich) continue;
    const dis = l.match(/^disallow:\s*(.*)$/i);
    if (dis && dis[1].trim() === "/") return true;
  }
  return false;
}

function adresyZSitemap(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
}

function toIndeks(xml: string): boolean {
  return /<sitemapindex/i.test(xml);
}


// Adresy, ktore nie moga zadzialac u nikogo poza autorem strony. Trafily tu z
// prawdziwego przypadku: mapa witryny firmy uslugowej miala 78 adresow
// zaczynajacych sie od localhost z numerem portu, bo plik wygenerowano na
// komputerze programisty i wgrano bez podmiany adresu. Narzedzie mowilo
// wtedy tylko tyle, ze adresy nie dzialaja, wiec wlasciciel nie mial jak
// zgadnac, ze to poprawka na kilka minut w generatorze mapy.
function obcyHost(url: string, domena: string): string | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return "adres nie jest poprawnym adresem internetowym";
  }
  const h = u.hostname.toLowerCase();
  if (h === "localhost" || h === "127.0.0.1" || h === "::1") {
    return "adres wskazuje na komputer autora strony (localhost)";
  }
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(h)) {
    return "adres wskazuje na komputer w sieci lokalnej";
  }
  if (/\.(test|local|localhost|invalid|example)$/.test(h)) {
    return "adres wskazuje na domenę testową";
  }
  const swoj = h.replace(/^www\./, "");
  const cel = domena.replace(/^www\./, "");
  if (swoj !== cel && !swoj.endsWith("." + cel)) {
    return `adres prowadzi do innej domeny (${h})`;
  }
  return null;
}

function przyczynyObce(
  adresy: string[],
  domena: string,
): { ile: number; powod: string; przyklad: string } | null {
  const zliczone = new Map<string, { ile: number; przyklad: string }>();
  for (const a of adresy) {
    const p = obcyHost(a, domena);
    if (!p) continue;
    const w = zliczone.get(p) ?? { ile: 0, przyklad: a };
    w.ile += 1;
    zliczone.set(p, w);
  }
  if (!zliczone.size) return null;
  const [powod, w] = [...zliczone.entries()].sort((a, b) => b[1].ile - a[1].ile)[0];
  return { ile: w.ile, powod, przyklad: w.przyklad };
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

  // Czesc stron odpowiada tylko pod www, czesc tylko bez. Bierzemy ten wariant,
  // ktory faktycznie oddaje strone glowna.
  let baza = `https://${domena}`;
  if ((await kodOdpowiedzi(baza)) === null) {
    baza = `https://www.${domena}`;
    if ((await kodOdpowiedzi(baza)) === null) {
      return NextResponse.json({
        status: "BRAK_STRONY",
        domena,
        naglowek: "Nie mogę połączyć się z tą stroną",
        komentarz:
          "Ani wersja z www, ani bez www nie odpowiedziała. Sprawdź pisownię albo spróbuj za chwilę.",
      });
    }
  }

  const robots = await tekst(`${baza}/robots.txt`, 30_000);
  const wskazane = robots
    ? [...robots.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1])
    : [];

  const kandydaci = wskazane.length
    ? wskazane.slice(0, 3)
    : [`${baza}/sitemap.xml`, `${baza}/sitemap_index.xml`];

  const adresy: string[] = [];
  const uzyte: string[] = [];
  for (const k of kandydaci) {
    if (adresy.length > 2000) break;
    const xml = await tekst(k);
    if (!xml || !/<(urlset|sitemapindex)/i.test(xml)) continue;
    uzyte.push(k);
    if (toIndeks(xml)) {
      for (const pod of adresyZSitemap(xml).slice(0, 3)) {
        const podXml = await tekst(pod);
        if (podXml) adresy.push(...adresyZSitemap(podXml));
      }
    } else {
      adresy.push(...adresyZSitemap(xml));
    }
  }

  // robots.txt potrafi wskazywac mape pod hostem, ktory nie odpowiada, na
  // przyklad bez www, podczas gdy strona zyje pod www. Wtedy wyszukiwarka
  // dostaje adres donikad, a mapa lezy obok. Sprawdzamy to wprost.
  let wskazanaNieDziala = false;
  if (wskazane.length && !adresy.length) {
    for (const k of [`${baza}/sitemap.xml`, `${baza}/sitemap_index.xml`]) {
      const xml = await tekst(k);
      if (!xml || !/<(urlset|sitemapindex)/i.test(xml)) continue;
      wskazanaNieDziala = true;
      uzyte.push(k);
      if (toIndeks(xml)) {
        for (const pod of adresyZSitemap(xml).slice(0, 3)) {
          const podXml = await tekst(pod);
          if (podXml) adresy.push(...adresyZSitemap(podXml));
        }
      } else {
        adresy.push(...adresyZSitemap(xml));
      }
      break;
    }
  }

  const blokada = robots ? blokujeWszystko(robots) : false;
  const unikalne = [...new Set(adresy)];

  if (!unikalne.length) {
    return NextResponse.json({
      status: "OK",
      domena,
      werdykt: "CZERWONY",
      naglowek: "Nie znalazłem mapy strony",
      maRobots: Boolean(robots),
      wskazanaWRobots: wskazane.length > 0,
      blokadaIndeksowania: blokada,
      wSitemap: 0,
      sprawdzone: 0,
      zepsute: [],
      komentarz: blokada
        ? "Nie ma mapy strony, a dodatkowo plik robots.txt prosi wyszukiwarki, żeby nie odwiedzały całego serwisu. To ustawienie zostaje czasem po pracach nad nową wersją strony i skutecznie wycina firmę z wyników wyszukiwania."
        : "Mapa strony to lista wszystkich podstron, którą wyszukiwarka pobiera jednym zapytaniem. Bez niej robot musi sam poklikać po linkach, więc podstrony podlinkowane głęboko albo tylko z menu rozwijanego bywają odkrywane miesiącami, a bywa że wcale. Przy kilku stronach to nie problem, przy katalogu ofert albo bloga zaczyna kosztować realne wejścia.",
    });
  }

  // Probka, nie caly serwis. Nie obciazamy cudzego serwera, bo do werdyktu
  // wystarczy kilkanascie adresow, a pelny przeglad to juz platna usluga.
  const krok = Math.max(1, Math.floor(unikalne.length / PROBKA));
  const probka = unikalne.filter((_, i) => i % krok === 0).slice(0, PROBKA);
  const kody = await Promise.all(probka.map(kodOdpowiedzi));
  const zepsute = probka
    .map((u, i) => ({ adres: u, kod: kody[i] }))
    .filter((x) => x.kod === null || x.kod >= 400);

  // Jesli adresy w mapie prowadza poza serwis, przyczyna jest jedna i da sie
  // ja nazwac, zamiast wypisywac liste martwych adresow.
  const obce = przyczynyObce(unikalne, domena);

  const udzial = zepsute.length / probka.length;
  const werdykt = blokada
    ? "CZERWONY"
    : udzial >= 0.2
      ? "CZERWONY"
      : zepsute.length > 0 || !wskazane.length || wskazanaNieDziala
        ? "ZOLTY"
        : "ZIELONY";

  const naglowek = blokada
    ? "Strona prosi wyszukiwarki, żeby jej nie odwiedzały"
    : obce && obce.ile >= unikalne.length / 2
      ? `Adresy w mapie prowadzą poza Twoją stronę, ${obce.ile} z ${unikalne.length}`
      : zepsute.length
      ? `${zepsute.length} z ${probka.length} sprawdzonych adresów nie działa`
      : wskazanaNieDziala
        ? "robots.txt wskazuje mapę pod adresem, który nie odpowiada"
        : wskazane.length
          ? `Mapa strony działa, ${unikalne.length} adresów`
          : "Mapa strony jest, ale nie jest wskazana w robots.txt";

  // Rozbieznosc miedzy adresem z robots.txt a miejscem, w ktorym mapa
  // faktycznie lezy, dopisujemy takze wtedy, gdy glownym problemem sa martwe
  // adresy. To zwykle jedna i ta sama przyczyna: zla wersja adresu.
  const oRobots = wskazanaNieDziala
    ? ` Osobno: plik robots.txt wskazuje mapę pod adresem ${wskazane[0]}, a ten adres nie odpowiada. Mapę znalazłem dopiero obok, pod ${uzyte[uzyte.length - 1]}. To zwykle ta sama przyczyna: wpis zrobiony dla wersji adresu z www albo bez www, która potem przestała działać.`
    : "";

  const bazowy = blokada
    ? "W pliku robots.txt stoi prośba o nieodwiedzanie całego serwisu. Mapa strony przy takim ustawieniu niczego nie zmienia, bo robot i tak nie wejdzie. To najczęściej pozostałość po wersji roboczej strony, która pojechała na produkcję razem z tym ustawieniem."
    : zepsute.length
      ? "Adresy z mapy strony są dla wyszukiwarki obietnicą: tu są moje podstrony. Jeśli część z nich nie odpowiada, robot zużywa na nie swój limit odwiedzin i traci zaufanie do całej listy, a klient, który trafi na taki adres z wyników wyszukiwania, widzi komunikat o błędzie zamiast oferty."
      : wskazanaNieDziala
        ? `Plik robots.txt wskazuje mapę strony pod adresem ${wskazane[0]}, a ten adres nie odpowiada. Sama mapa istnieje i znalazłem ją pod ${uzyte[uzyte.length - 1]}, czyli obok. Dla wyszukiwarki to jednak ślepy zaułek: dostaje jeden konkretny adres i pod nim nic nie ma.`
        : wskazane.length
          ? "Mapa strony jest, jest wskazana w robots.txt i sprawdzone adresy odpowiadają poprawnie. Tego punktu nie musisz ruszać."
          : "Mapa strony istnieje, ale plik robots.txt o niej nie wspomina. Wyszukiwarka zwykle i tak sprawdzi standardową lokalizację, więc to nie jest awaria, natomiast wskazanie mapy wprost jest darmowe i usuwa zgadywanie.";

  // Wyjasnienie przyczyny idzie przed reszta komentarza, bo gdy adresy
  // prowadza donikad z tego powodu, cala reszta uwag jest wtorna.
  const oObcych = obce
    ? `W mapie strony ${obce.ile} z ${unikalne.length} adresów ma tę samą wadę: ${obce.powod}. Przykład: ${obce.przyklad}. Tak wygląda plik wygenerowany w środowisku roboczym i wgrany na serwer bez podmiany adresu bazowego. Dla wyszukiwarki te wpisy nie istnieją, bo taki adres działa wyłącznie na komputerze, na którym powstał. To poprawka na kilka minut w ustawieniach generatora mapy, a nie przebudowa serwisu. `
    : "";

  const komentarz = oObcych + bazowy + (zepsute.length ? oRobots : "");

  return NextResponse.json({
    status: "OK",
    domena,
    werdykt,
    naglowek,
    komentarz,
    maRobots: Boolean(robots),
    wskazanaWRobots: wskazane.length > 0,
    wskazanaNieDziala,
    blokadaIndeksowania: blokada,
    zrodla: uzyte,
    wSitemap: unikalne.length,
    sprawdzone: probka.length,
    zepsute,
    obceAdresy: obce,
  });
}
