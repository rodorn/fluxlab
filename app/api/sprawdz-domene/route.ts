import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const UA = {
  "User-Agent": "FluxLab-Domain-Check/1.0 (+https://fluxlab.pl; pawel@fluxlab.pl)",
  Accept: "application/rdap+json",
};

// Slowa, po ktorych poznajemy, ze abonentem jest firma od informatyki albo
// agencja, a nie sama firma korzystajaca z domeny.
const WYKONAWCA = [
  "informatyc",
  "informatyk",
  "it ",
  " it",
  "serwis",
  "software",
  "studio",
  "agencja",
  "reklam",
  "media",
  "digital",
  "web",
  "net",
  "computer",
  "komputer",
  "system",
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

type Vcard = [string, Record<string, unknown>, string, string];

function nazwaAbonenta(dane: Record<string, unknown>): string | null {
  const encje = (dane.entities as Array<Record<string, unknown>>) || [];
  const abonent = encje.find((e) =>
    ((e.roles as string[]) || []).includes("registrant"),
  );
  if (!abonent) return null;
  const vcard = (abonent.vcardArray as [string, Vcard[]])?.[1] || [];
  const fn = vcard.find((p) => p[0] === "fn");
  return fn ? String(fn[3]) : null;
}

function dataZdarzenia(
  dane: Record<string, unknown>,
  akcja: string,
): string | null {
  const zdarzenia =
    (dane.events as Array<{ eventAction: string; eventDate: string }>) || [];
  const z = zdarzenia.find((e) => e.eventAction === akcja);
  return z ? z.eventDate.slice(0, 10) : null;
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
  if (!/\.(pl|com\.pl|net\.pl|org\.pl|edu\.pl|waw\.pl|info\.pl|biz\.pl)$/.test(domena)) {
    return NextResponse.json({
      status: "INNA_KONCOWKA",
      domena,
      naglowek: "Na razie sprawdzamy tylko domeny polskie",
      opis:
        "Rejestr, z którego korzystamy, obejmuje domeny z końcówką pl. Dla innych końcówek sprawdzimy to ręcznie, jeśli napiszesz.",
    });
  }

  let odpowiedz: Response;
  try {
    odpowiedz = await fetch(`https://rdap.dns.pl/domain/${domena}`, {
      headers: UA,
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return NextResponse.json({
      status: "BRAK_ODPOWIEDZI",
      domena,
      naglowek: "Rejestr nie odpowiedział",
      opis: "Spróbuj za chwilę. Jeśli to się powtórzy, sprawdzimy ręcznie.",
    });
  }

  // Rejestr ostro ogranicza liczbe zapytan z jednego adresu, wiec mowimy o tym
  // wprost zamiast udawac, ze domena nie istnieje.
  if (odpowiedz.status === 429) {
    return NextResponse.json({
      status: "LIMIT",
      domena,
      naglowek: "Rejestr chwilowo ogranicza zapytania",
      opis:
        "To ograniczenie po stronie rejestru domen, nie problem z Twoją domeną. Spróbuj za kilka minut.",
    });
  }
  if (odpowiedz.status === 404) {
    return NextResponse.json({
      status: "BRAK_DOMENY",
      domena,
      naglowek: "Nie znaleźliśmy takiej domeny w rejestrze",
      opis:
        "Sprawdź pisownię. Jeśli adres jest poprawny, może to być subdomena, a wtedy liczy się właściciel domeny nadrzędnej.",
    });
  }
  if (!odpowiedz.ok) {
    return NextResponse.json({
      status: "BRAK_ODPOWIEDZI",
      domena,
      naglowek: "Rejestr odpowiedział błędem",
      opis: "Spróbuj za chwilę.",
    });
  }

  const dane = (await odpowiedz.json()) as Record<string, unknown>;
  const abonent = nazwaAbonenta(dane);
  const wygasa = dataZdarzenia(dane, "expiration");
  const zarejestrowana = dataZdarzenia(dane, "registration");

  const dniDoKonca = wygasa
    ? Math.ceil((new Date(wygasa).getTime() - Date.now()) / 86_400_000)
    : null;

  const maly = (abonent || "").toLowerCase();
  const wyglada = WYKONAWCA.some((w) => maly.includes(w));

  const pilne = dniDoKonca !== null && dniDoKonca <= 60;
  const werdykt = pilne ? "CZERWONY" : wyglada ? "ZOLTY" : "ZIELONY";

  const naglowek = pilne
    ? `Rejestracja wygasa za ${dniDoKonca} dni`
    : abonent
      ? `Abonentem jest: ${abonent}`
      : "Rejestr nie pokazuje nazwy abonenta";

  return NextResponse.json({
    status: "OK",
    domena,
    werdykt,
    naglowek,
    abonent,
    wygasa,
    zarejestrowana,
    dniDoKonca,
    wygladaNaWykonawce: wyglada,
    // Nie przesadzamy, czy to blad. Umowa powiernicza albo wykonawca bedacy
    // wspolnikiem to sytuacje normalne, wiec pytamy, zamiast oskarzac.
    komentarz: !abonent
      ? "Rejestr ukrywa dane, co przy osobie fizycznej jest normalne. Nie da się wtedy stwierdzić z zewnątrz, kto jest właścicielem."
      : pilne
        ? "To jest termin, po którym domena przestaje działać razem ze stroną i całą pocztą firmową. Sprawdź, czy ktokolwiek pilnuje tego odnowienia i czy przypomnienia trafiają na adres, który ktoś czyta."
        : wyglada
          ? "Nazwa abonenta wygląda na firmę informatyczną albo agencję, a nie na firmę korzystającą z tej domeny. Jeśli to Twoja domena, a nazwa nie jest Twoja, warto ustalić, czy tak miało być. Bywa, że to świadome rozwiązanie z umową, ale częściej to pozostałość po wykonawcy strony."
          : "Abonentem wygląda na firmę korzystającą z domeny, czyli tak jak być powinno.",
  });
}
