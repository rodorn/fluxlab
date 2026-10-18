import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Vercel podaje nazwę po angielsku i bez znaków; pokazujemy tylko miasta,
// które umiemy poprawnie zapisać po polsku.
const MIASTA: Record<string, string> = {
  warsaw: "Warszawa", warszawa: "Warszawa", krakow: "Kraków", cracow: "Kraków",
  wroclaw: "Wrocław", lodz: "Łódź", poznan: "Poznań", gdansk: "Gdańsk",
  gdynia: "Gdynia", sopot: "Sopot", szczecin: "Szczecin", bydgoszcz: "Bydgoszcz",
  lublin: "Lublin", bialystok: "Białystok", katowice: "Katowice", gliwice: "Gliwice",
  czestochowa: "Częstochowa", radom: "Radom", torun: "Toruń", kielce: "Kielce",
  rzeszow: "Rzeszów", olsztyn: "Olsztyn", opole: "Opole", "zielona gora": "Zielona Góra",
  sosnowiec: "Sosnowiec", "bielsko-biala": "Bielsko-Biała", plock: "Płock", elblag: "Elbląg",
  tarnow: "Tarnów", koszalin: "Koszalin", legnica: "Legnica", kalisz: "Kalisz",
  pruszkow: "Pruszków", piaseczno: "Piaseczno", "grodzisk mazowiecki": "Grodzisk Mazowiecki",
};

const WARSZAWA = { miasto: "Warszawa", lat: 52.23, lon: 21.01 };

const klucz = (t: string) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L").toLowerCase().trim();

// Miasto z nagłówków Vercela i bieżąca pogoda z Open-Meteo, jak na ekranie
// blokady Androida. Osobna trasa, żeby strona główna została statyczna.
export async function GET(request: Request) {
  const h = request.headers;
  let miejsce = WARSZAWA;
  if (h.get("x-vercel-ip-country") === "PL") {
    let surowe = "";
    try {
      surowe = decodeURIComponent(h.get("x-vercel-ip-city") ?? "");
    } catch {}
    const miasto = MIASTA[klucz(surowe)];
    const lat = Number(h.get("x-vercel-ip-latitude"));
    const lon = Number(h.get("x-vercel-ip-longitude"));
    if (miasto && lat && lon) miejsce = { miasto, lat, lon };
  }

  let temp: number | null = null;
  let kod: number | null = null;
  try {
    const r = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${miejsce.lat.toFixed(1)}&longitude=${miejsce.lon.toFixed(1)}&current=temperature_2m,weather_code`,
      { next: { revalidate: 1800 }, signal: AbortSignal.timeout(2000) },
    );
    if (r.ok) {
      const d = await r.json();
      temp = Math.round(d.current.temperature_2m);
      kod = d.current.weather_code;
    }
  } catch {}

  return NextResponse.json(
    { miasto: miejsce.miasto, temp, kod },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
