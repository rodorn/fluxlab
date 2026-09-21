import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 45;

const UA = {
  "User-Agent": "FluxLab-Index-Check/1.0 (+https://fluxlab.pl; pawel@fluxlab.pl)",
};

type Blokada = {
  gdzie: string;
  tresc: string;
  opis: string;
};

function czystaDomena(raw: string): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^.*@/, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

async function pobierz(
  url: string,
  ms = 12000,
): Promise<{ status: number; naglowki: Headers; tresc: string } | null> {
  try {
    const r = await fetch(url, {
      headers: UA,
      signal: AbortSignal.timeout(ms),
      redirect: "follow",
    });
    return { status: r.status, naglowki: r.headers, tresc: await r.text() };
  } catch {
    return null;
  }
}

/** robots.txt blokuje calosc tylko wtedy, gdy Disallow: / dotyczy sekcji * */
function blokujeWszystko(robots: string): boolean {
  const linie = robots.split(/\r?\n/).map((l) => l.trim().toLowerCase());
  let wSekcjiGwiazdka = false;
  for (const l of linie) {
    if (l.startsWith("user-agent:")) {
      wSekcjiGwiazdka = l.replace("user-agent:", "").trim() === "*";
      continue;
    }
    if (!wSekcjiGwiazdka) continue;
    if (l === "disallow: /") return true;
  }
  return false;
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
      { error: "Podaj sam adres strony, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }

  const strona =
    (await pobierz(`https://${domena}/`)) ??
    (await pobierz(`https://www.${domena}/`)) ??
    (await pobierz(`http://${domena}/`));

  if (!strona) {
    return NextResponse.json({
      status: "BRAK_STRONY",
      domena,
      naglowek: "Nie mogę otworzyć tej strony",
      opis:
        "Strona nie odpowiedziała. Jeśli adres jest poprawny, problem może leżeć w certyfikacie albo w samym serwerze, a wtedy wyszukiwarka też jej nie odwiedza. Sprawdzę to ręcznie, jeśli napiszesz.",
    });
  }

  // Strona oddana z kodem bledu to najczesciej zapora przed automatami, a nie
  // prawdziwa strona glowna. Takie zapory potrafia same nosic znacznik
  // noindex, wiec bez tego warunku narzedzie oskarza firme o blokade, ktorej
  // na jej stronie nie ma.
  if (strona.status >= 400) {
    return NextResponse.json({
      status: "BRAK_DOSTEPU",
      domena,
      naglowek: "Serwer nie wpuścił mnie na stronę",
      opis:
        "Serwer odpowiedział kodem " +
        strona.status +
        ", czyli odmową, i zamiast strony głównej oddał stronę zapory przed automatami. Nie wyciągam z niej żadnych wniosków, bo nie jest tym, co widzi wyszukiwarka. Wyszukiwarki zwykle mają na takich zaporach wyjątek. Jeśli chcesz mieć pewność, napisz, a sprawdzę to ręcznie.",
    });
  }

  const blokady: Blokada[] = [];

  // 1. meta robots w kodzie strony
  const meta = [
    ...strona.tresc.matchAll(
      /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/gi,
    ),
    ...strona.tresc.matchAll(
      /<meta[^>]+content=["']([^"']+)["'][^>]*name=["']robots["']/gi,
    ),
  ]
    .map((m) => m[1])
    .filter((t) => /noindex/i.test(t));
  if (meta.length > 0) {
    blokady.push({
      gdzie: "znacznik w kodzie strony głównej",
      tresc: meta[0],
      opis:
        "W kodzie strony jest polecenie, żeby wyszukiwarka jej nie pokazywała. Najczęściej zostaje po wersji roboczej, którą ktoś wgrał na serwer razem z resztą, i nikt tego potem nie zdjął.",
    });
  }

  // 2. naglowek serwera
  const xrob = strona.naglowki.get("x-robots-tag") || "";
  if (/noindex/i.test(xrob)) {
    blokady.push({
      gdzie: "nagłówek wysyłany przez serwer",
      tresc: xrob,
      opis:
        "Serwer dokłada do każdej odpowiedzi polecenie nieindeksowania. Tego nie widać w kodzie strony, więc bywa szukane najdłużej.",
    });
  }

  // 3. robots.txt
  const robots = await pobierz(`https://${domena}/robots.txt`, 8000);
  const robotsBlokuje =
    robots !== null && robots.status === 200 && blokujeWszystko(robots.tresc);
  if (robotsBlokuje) {
    blokady.push({
      gdzie: "plik robots.txt",
      tresc: "User-agent: * / Disallow: /",
      opis:
        "Plik sterujący ruchem wyszukiwarek zabrania odwiedzania całej witryny. To najczęstsza pozostałość po pracach nad stroną.",
    });
  }

  const zablokowana = blokady.length > 0;

  return NextResponse.json({
    status: "OK",
    domena,
    werdykt: zablokowana ? "CZERWONY" : "ZIELONY",
    naglowek: zablokowana
      ? "Twoja strona każe wyszukiwarce się nie pokazywać"
      : "Nic nie blokuje wyszukiwarki",
    opis: zablokowana
      ? "Znalazłem polecenie, przez które strona nie trafia do wyników wyszukiwania. Dopóki tam jest, nie znajdzie Cię nikt, kto nie zna adresu na pamięć, a reklama i wizytówki to jedyne źródło wejść."
      : "Nie znalazłem żadnego polecenia blokującego indeksowanie. To nie gwarantuje wysokiej pozycji, ale znaczy, że przynajmniej nic nie stoi na przeszkodzie.",
    blokady,
    // Blokada w kodzie to fakt, ale wypadniecie z wynikow bywa opoznione
    // o tygodnie, wiec nie twierdzimy, ze strony juz tam nie ma.
    zastrzezenie: zablokowana
      ? "Sprawdziłem, co strona mówi wyszukiwarce dzisiaj. Jeśli to polecenie pojawiło się niedawno, część podstron może być jeszcze w wynikach, ale zniknie przy kolejnym odwiedzeniu. Im dłużej to zostaje, tym trudniej wrócić."
      : null,
    rozmiarStrony: Math.round(strona.tresc.length / 1024),
  });
}
