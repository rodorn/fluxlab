import { NextResponse } from "next/server";
import {
  MAX_DNI,
  WALUTY,
  dataOk,
  dzis,
  pobierzKursy,
  poprzedzajacy,
  przesun,
} from "@/lib/kursy-nbp";

export const runtime = "nodejs";
export const maxDuration = 30;

function blad(tekst: string, status = 400) {
  return new NextResponse(tekst, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

/**
 * Kurs średni NBP z tabeli A z dnia poprzedzającego dzień faktury.
 *  ?waluta=EUR&data=2026-11-12                 jeden kurs (format=json|txt)
 *  ?waluta=EUR&od=2026-01-01&do=2026-12-31     tabela dla arkusza (format=csv)
 * Dla arkusza: przecinek=1 daje przecinek dziesiętny.
 */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const waluta = (q.get("waluta") ?? "").toUpperCase();
  if (!(WALUTY as readonly string[]).includes(waluta)) {
    return blad("Nieznana waluta. Użyj kodu z tabeli A NBP, na przykład EUR albo USD.");
  }
  const przecinek = q.get("przecinek") === "1";
  const liczba = (n: number) =>
    przecinek ? String(n).replace(".", ",") : String(n);
  const format = q.get("format") ?? (q.get("data") ? "json" : "csv");

  const data = q.get("data");
  const od = q.get("od") ?? data;
  let doDnia = q.get("do") ?? data;
  const jutro = przesun(dzis(), 1);
  if (q.get("do") && doDnia && dataOk(doDnia) && od && dataOk(od) && od <= jutro && doDnia > jutro) {
    doDnia = jutro;
  }
  if (!od || !doDnia || !dataOk(od) || !dataOk(doDnia) || od > doDnia) {
    return blad("Podaj datę faktury (data=RRRR-MM-DD) albo zakres (od=…&do=…).");
  }
  const dni = (Date.parse(doDnia) - Date.parse(od)) / 86_400_000 + 1;
  if (dni > MAX_DNI) return blad(`Zakres może mieć najwyżej ${MAX_DNI} dni.`);
  if (od < "2002-01-02") return blad("NBP udostępnia kursy od 2002 roku.");
  if (doDnia > jutro) {
    return blad("Kurs z dnia poprzedzającego jest znany najwyżej dla jutra.");
  }

  let kursy;
  try {
    kursy = await pobierzKursy(waluta, przesun(od, -14), przesun(doDnia, -1));
  } catch {
    return blad("API NBP nie odpowiedziało. Spróbuj za chwilę.", 502);
  }

  const wiersze: { dzien: string; k: ReturnType<typeof poprzedzajacy> }[] = [];
  for (let d = od; d <= doDnia; d = przesun(d, 1)) {
    wiersze.push({ dzien: d, k: poprzedzajacy(kursy, d) });
  }

  if (od === doDnia) {
    const k = wiersze[0].k;
    if (!k) return blad("Brak kursu NBP dla tego dnia.", 404);
    if (format === "txt") {
      return new NextResponse(liczba(k.mid), {
        headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
      });
    }
    if (format === "json") {
      return NextResponse.json(
        {
          waluta,
          dataFaktury: od,
          kurs: k.mid,
          dataKursu: k.dzien,
          tabela: k.tabela,
          zrodlo: "NBP, tabela A kursów średnich",
        },
        { headers: { "cache-control": "public, max-age=3600" } },
      );
    }
  }

  const csv =
    "data_faktury;kurs;data_kursu;tabela\n" +
    wiersze
      .map((w) =>
        w.k
          ? `${w.dzien};${liczba(w.k.mid)};${w.k.dzien};${w.k.tabela}`
          : `${w.dzien};;;`,
      )
      .join("\n") +
    "\n";
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "cache-control": "public, max-age=3600",
      "content-disposition": `inline; filename="kursy-nbp-${waluta.toLowerCase()}.csv"`,
    },
  });
}
