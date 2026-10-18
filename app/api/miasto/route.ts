import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Vercel podaje nazwę po angielsku i bez znaków; pokazujemy tylko miasta,
// które umiemy poprawnie odmienić.
const ODMIANA: Record<string, string> = {
  warsaw: "z Warszawy", warszawa: "z Warszawy", krakow: "z Krakowa", cracow: "z Krakowa",
  wroclaw: "z Wrocławia", lodz: "z Łodzi", poznan: "z Poznania", gdansk: "z Gdańska",
  gdynia: "z Gdyni", sopot: "z Sopotu", szczecin: "ze Szczecina", bydgoszcz: "z Bydgoszczy",
  lublin: "z Lublina", bialystok: "z Białegostoku", katowice: "z Katowic", gliwice: "z Gliwic",
  czestochowa: "z Częstochowy", radom: "z Radomia", torun: "z Torunia", kielce: "z Kielc",
  rzeszow: "z Rzeszowa", olsztyn: "z Olsztyna", opole: "z Opola", "zielona gora": "z Zielonej Góry",
  sosnowiec: "z Sosnowca", "bielsko-biala": "z Bielska-Białej", plock: "z Płocka", elblag: "z Elbląga",
  tarnow: "z Tarnowa", koszalin: "z Koszalina", legnica: "z Legnicy", kalisz: "z Kalisza",
  pruszkow: "z Pruszkowa", piaseczno: "z Piaseczna", "grodzisk mazowiecki": "z Grodziska Mazowieckiego",
};

const klucz = (t: string) =>
  t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L").toLowerCase().trim();

// Miasto z nagłówków Vercela. Osobna trasa, żeby strona główna została statyczna.
export async function GET(request: Request) {
  const h = request.headers;
  let miasto = "";
  if (h.get("x-vercel-ip-country") === "PL") {
    try {
      miasto = decodeURIComponent(h.get("x-vercel-ip-city") ?? "").trim();
    } catch {}
  }
  miasto = ODMIANA[klucz(miasto)] ?? "";
  return NextResponse.json(
    { miasto },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
