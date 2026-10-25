import { NextResponse } from "next/server";
import { BladAdresu, pobierzStrone } from "@/lib/bezpieczny-fetch";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { wykryjTechnologie } from "@/lib/audyt-technologie";
import { daneliczbowe, zbadajCalosc } from "@/lib/audyt-calosc";
import { punktacja, wycenNaprawe } from "@/lib/audyt-ocena";
import { czystaDomena } from "@/lib/audyt-pomiar";
import type { AudytHandlowca } from "@/lib/uslugiHandlowca";

/** Wirtualny handlowiec, etap 1: fakty ze strony i rejestru od razu, potem
 *  wyszukiwanie w sieci. Wynik płynie jako NDJSON, żeby klient widział postęp,
 *  a w tym czasie odpowiadał na pytania do pakietu (etap 2: ./pakiet). */

export const maxDuration = 120;

const limit = utworzLimit();

/** Audyt całej strony w trakcie analizy: na nim handlowiec opiera decyzję,
 *  czy poprawić stronę, czy postawić nową. */
async function audytuj(
  host: string,
  terminMs: number,
): Promise<AudytHandlowca | null> {
  const w = await Promise.race([
    zbadajCalosc(host, {
      terminStronMs: terminMs - 15_000,
      terminLinkowMs: terminMs,
    }),
    new Promise<null>((r) => setTimeout(() => r(null), terminMs + 15_000)),
  ]);
  if (!w?.osiagalna || !w.strony.length) return null;
  const d = daneliczbowe(w);
  const wycena = wycenNaprawe(w.domenowe);
  return {
    host,
    punkty: punktacja(w.domenowe),
    sprawdzone: d.sprawdzone,
    zBledem: d.zBledem,
    problemow: d.problemow + w.domenowe.length,
    zlamane: w.zlamane.length,
    ustalenia: [
      ...w.domenowe.slice(0, 4).map((u) => ({
        tytul: u.tytul,
        fakt: u.fakt,
        waga: u.waga,
        koszt: u.koszt,
      })),
      ...d.grupy.slice(0, 3).map((g) => ({
        tytul: g.tytul,
        fakt: `${g.wpisy.length} podstron`,
        waga: g.waga,
        koszt: 0,
      })),
    ],
    naprawa: wycena.pakiet,
    pozycji: w.domenowe.filter((u) => u.koszt > 0).length,
    dni: wycena.dniRobocze,
  };
}

function dekoduj(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) =>
      String.fromCodePoint(Math.min(Number(n), 0x10ffff)),
    )
    .replace(/\s+/g, " ")
    .trim();
}

function meta(html: string, klucz: string): string {
  for (const m of html.matchAll(/<meta\s[^>]*>/gi)) {
    const tag = m[0];
    const nazwa = tag
      .match(/(?:name|property)\s*=\s*["']([^"']+)["']/i)?.[1]
      ?.toLowerCase();
    if (nazwa === klucz) {
      return dekoduj(
        tag
          .match(/content\s*=\s*"([^"]*)"|content\s*=\s*'([^']*)'/i)
          ?.slice(1)
          .find(Boolean) ?? "",
      );
    }
  }
  return "";
}

function nipPoprawny(nip: string): boolean {
  if (nip.length !== 10) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  return (
    w.reduce((s, x, i) => s + x * Number(nip[i]), 0) % 11 === Number(nip[9])
  );
}

export type FaktyStrony = {
  host: string;
  ms: number;
  kb: number;
  https: boolean;
  tytul: string;
  technologie: string[];
  sociale: string[];
  formularz: boolean;
  telefon: boolean;
  sklep: boolean;
};

export type Rejestr = {
  nazwa: string;
  status: string;
  adres: string;
  od: string;
  krs: string;
};

async function bialaLista(nip: string): Promise<Rejestr | null> {
  try {
    const data = new Date().toISOString().slice(0, 10);
    const r = await fetch(
      `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${data}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!r.ok) return null;
    const s = (await r.json())?.result?.subject;
    if (!s) return null;
    return {
      nazwa: s.name,
      status: s.statusVat,
      adres: s.workingAddress || s.residenceAddress || "",
      od: s.registrationLegalDate || "",
      krs: s.krs || "",
    };
  } catch {
    return null;
  }
}

async function odpisKrs(krs: string): Promise<string | null> {
  try {
    const r = await fetch(
      `https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/${krs}?rejestr=P&format=json`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (!r.ok) return null;
    const d = (await r.json())?.odpis?.dane;
    if (!d) return null;
    const kapital = d.dzial1?.kapital?.wysokoscKapitaluZakladowego?.wartosc;
    const pkd =
      d.dzial3?.przedmiotDzialalnosci?.przedmiotPrzewazajacejDzialalnosci?.[0]
        ?.opis;
    const spr: { dataZlozenia: string; zaOkresOdDo: string }[] =
      d.dzial3?.wzmiankiOZlozonychDokumentach
        ?.wzmiankaOZlozeniuRocznegoSprawozdaniaFinansowego ?? [];
    const ost = spr.at(-1);
    return [
      `KRS ${krs}: ${d.dzial1?.danePodmiotu?.formaPrawna ?? ""}`,
      kapital && `kapitał zakładowy ${kapital} zł`,
      pkd && `główna działalność: ${pkd}`,
      ost
        ? `ostatnie sprawozdanie finansowe za ${ost.zaOkresOdDo}, złożone ${ost.dataZlozenia}`
        : "brak złożonych sprawozdań finansowych",
    ]
      .filter(Boolean)
      .join(", ");
  } catch {
    return null;
  }
}

async function finanseKrs(krs: string): Promise<string | null> {
  const adres = `https://analizafirm.pl/firma/${krs}`;
  try {
    const r = await fetch(adres, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FluxLab/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return null;
    const h = await r.text();
    const rok = h.match(/Rachunek zysków i strat \((\d{4})\)/)?.[1];
    const wiersz = (n: string) => {
      const m = h.match(
        new RegExp(
          `<td>${n}</td><td[^>]*>([^<]+)</td><td[^>]*>([^<]+)</td><td[^>]*>([^<]+)</td>`,
        ),
      );
      return (
        m && `${n.toLowerCase()} ${m[1]} (rok wcześniej ${m[2]}, r/r ${m[3]})`
      );
    };
    const dane = [
      wiersz("Przychody netto ze sprzedaży"),
      wiersz("Zysk / strata netto"),
    ].filter(Boolean);
    if (!rok || !dane.length) return null;
    return `Sprawozdanie finansowe za ${rok} (źródło ${adres}): ${dane.join(", ")}`;
  } catch {
    return null;
  }
}

async function analizaStrony(adres: string) {
  const start = Date.now();
  const { url, html } = await pobierzStrone(adres);
  const tekst = dekoduj(
    html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
  const h = [...html.matchAll(/<h([1-2])[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((m) => dekoduj(m[2].replace(/<[^>]+>/g, " ")))
    .filter((t) => t && t.length < 140)
    .slice(0, 8);
  const fakty: FaktyStrony = {
    host: url.hostname.replace(/^www\./, ""),
    ms: Date.now() - start,
    kb: Math.round(html.length / 1024),
    https: url.protocol === "https:",
    tytul: dekoduj(
      html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "",
    ).slice(0, 160),
    technologie: wykryjTechnologie(html, {}).map(
      (t) => t.nazwa + (t.wersja ? " " + t.wersja : ""),
    ),
    sociale: [
      ...new Set(
        [
          ...html.matchAll(
            /https?:\/\/(?:www\.)?(facebook|instagram|linkedin|youtube|tiktok)\.com\/[^"'\s<>]+/gi,
          ),
        ].map((m) => m[1].toLowerCase()),
      ),
    ],
    formularz: /<form[\s>]/i.test(html),
    telefon: /href=["']tel:/i.test(html),
    sklep: /koszyk|add[-_]to[-_]cart|woocommerce|shoper|prestashop/i.test(html),
  };
  const opis = [
    `Strona ${fakty.host}: pobrana w ${fakty.ms} ms, ${fakty.kb} KB HTML, ${fakty.https ? "HTTPS" : "bez HTTPS"}`,
    `tytuł: ${fakty.tytul || "brak"}`,
    `opis meta: ${(meta(html, "description") || "brak").slice(0, 300)}`,
    `nagłówki: ${h.join(" | ").slice(0, 600) || "brak"}`,
    `technologie: ${fakty.technologie.join(", ") || "nie rozpoznano"}`,
    `media społecznościowe w linkach: ${fakty.sociale.join(", ") || "brak"}`,
    `formularz: ${fakty.formularz ? "tak" : "nie"}, klikalny telefon: ${fakty.telefon ? "tak" : "nie"}, sklep: ${fakty.sklep ? "tak" : "nie"}`,
    `fragment treści: ${tekst.slice(0, 1500)}`,
  ].join("\n");
  const nip =
    tekst.match(/NIP[:\s]*((?:\d[\s-]?){10})/i)?.[1]?.replace(/\D/g, "") ?? "";
  return { fakty, opis, nip };
}

const SCHEMAT = {
  type: "object",
  additionalProperties: false,
  required: ["firma", "obserwacje", "zrodla"],
  properties: {
    firma: {
      type: "object",
      additionalProperties: false,
      required: ["nazwa", "branza", "miasto", "strona", "opis"],
      properties: {
        nazwa: { type: "string" },
        branza: { type: "string" },
        miasto: { type: "string" },
        strona: {
          type: "string",
          description: "Adres strony firmy albo pusty",
        },
        opis: {
          type: "string",
          description: "Jedno zdanie, czym firma się zajmuje i dla kogo",
        },
      },
    },
    obserwacje: {
      type: "array",
      description:
        "4-7 konkretnych faktów o obecności firmy w sieci, każdy z krótkim wnioskiem",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["obszar", "fakt", "wniosek"],
        properties: {
          obszar: {
            type: "string",
            enum: [
              "strona",
              "google",
              "opinie",
              "social",
              "rejestr",
              "konkurencja",
              "zespol",
              "finanse",
            ],
          },
          fakt: { type: "string" },
          wniosek: { type: "string" },
        },
      },
    },
    zrodla: {
      type: "array",
      items: { type: "string" },
      description: "Adresy stron, z których pochodzą fakty",
    },
  },
};

const INSTRUKCJE = `Jesteś analitykiem sprzedaży FluxLab (strony WWW, CRM, automatyzacje, dane z sieci). Przygotuj rzetelny profil firmy klienta z publicznych źródeł.
Wykonaj kilka wyszukiwań: strona firmy, wizytówka Google i opinie (ocena, liczba, czy firma odpowiada), media społecznościowe (czy aktywne), rejestry (KRS, CEIDG, rok założenia), dane z ostatniego sprawozdania finansowego (przychody, zysk netto, zatrudnienie, z rokiem; gdy materiał już je zawiera, użyj ich i nie szukaj ponownie; inaczej szukaj po numerze KRS w serwisach publikujących dane z KRS, np. analizafirm.pl, rejestr.io, aleo.com), ogłoszenia o pracę (wielkość zespołu), 2-3 konkurentów w tym samym mieście.
Opisuj wyłącznie firmę, nigdy prywatne dane osób. Nie zmyślaj: czego nie znalazłeś, tego nie wpisuj. Jeśli nie da się ustalić, o jaką firmę chodzi, w polu nazwa wpisz "nie znaleziono".
Pisz po polsku, do klienta na "ty", o sobie "my" (sprawdziliśmy, nie znaleźliśmy), nigdy "znalazłem". Każdy fakt i wniosek najwyżej 20 słów. Bez długich myślników i emoji.`;

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) {
    return NextResponse.json(
      { error: "Niedozwolone źródło żądania." },
      { status: 403 },
    );
  }
  const klucz = process.env.OPENAI_API_KEY;
  if (!klucz)
    return NextResponse.json({ error: "Brak klucza API" }, { status: 500 });
  if (limit(req)) {
    return NextResponse.json(
      { error: "Za dużo prób naraz, odczekaj chwilę." },
      { status: 429 },
    );
  }

  let firma = "";
  try {
    const body = await req.json();
    firma = typeof body.firma === "string" ? body.firma.trim() : "";
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }
  if (firma.length < 3 || firma.length > 200) {
    return NextResponse.json(
      { error: "Podaj nazwę firmy, NIP albo adres strony." },
      { status: 400 },
    );
  }

  const enc = new TextEncoder();
  const strumien = new ReadableStream({
    async start(ctrl) {
      const t0 = Date.now();
      let audyt: Promise<AudytHandlowca | null> | null = null;
      let bladProfilu = false;
      const wyslij = (o: object) =>
        ctrl.enqueue(enc.encode(JSON.stringify(o) + "\n"));
      const material: string[] = [`Klient wpisał: ${firma}`];
      const cyfry = firma.replace(/[\s-]/g, "");
      let nip = /^\d{10}$/.test(cyfry) ? cyfry : "";
      const adres =
        !nip && /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(firma)
          ? firma
          : "";

      if (adres) {
        try {
          const s = await analizaStrony(adres);
          wyslij({ typ: "strona", dane: s.fakty });
          wyslij({ typ: "audyt_start" });
          audyt = audytuj(s.fakty.host, 70_000).catch(() => null);
          material.push(s.opis);
          if (s.nip) nip = s.nip;
        } catch (e) {
          wyslij({
            typ: "strona",
            blad:
              e instanceof BladAdresu
                ? e.message
                : "Nie udało się pobrać strony.",
          });
          material.push(`Strona ${adres} nie odpowiada.`);
        }
      }
      if (nip && nipPoprawny(nip)) {
        const r = await bialaLista(nip);
        if (r) {
          wyslij({ typ: "rejestr", dane: r });
          material.push(
            `Rejestr VAT (MF): ${r.nazwa}, status ${r.status}, adres ${r.adres}, VAT od ${r.od || "brak danych"}`,
          );
          const [k, f] = r.krs
            ? await Promise.all([odpisKrs(r.krs), finanseKrs(r.krs)])
            : [null, null];
          if (k) material.push(k);
          if (f) material.push(f);
        }
      }

      try {
        const r = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          signal: AbortSignal.timeout(110_000),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${klucz}`,
          },
          body: JSON.stringify({
            model: "gpt-5.4-mini",
            stream: true,
            instructions: INSTRUKCJE,
            input: material.join("\n\n"),
            tools: [
              {
                type: "web_search",
                user_location: { type: "approximate", country: "PL" },
              },
            ],
            max_output_tokens: 6000,
            text: {
              format: {
                type: "json_schema",
                name: "profil",
                strict: true,
                schema: SCHEMAT,
              },
            },
          }),
        });
        if (!r.ok || !r.body) {
          console.error(
            "handlowiec OpenAI",
            r.status,
            (await r.text()).slice(0, 500),
          );
          throw new Error("openai");
        }
        const czytnik = r.body.pipeThrough(new TextDecoderStream()).getReader();
        let bufor = "";
        let tekst = "";
        for (;;) {
          const { value, done } = await czytnik.read();
          if (done) break;
          bufor += value;
          const linie = bufor.split("\n");
          bufor = linie.pop() ?? "";
          for (const l of linie) {
            if (!l.startsWith("data: ")) continue;
            let z;
            try {
              z = JSON.parse(l.slice(6));
            } catch {
              continue;
            }
            if (
              z.type === "response.output_item.done" &&
              z.item?.type === "web_search_call"
            ) {
              const q = z.item.action?.query;
              if (q)
                wyslij({ typ: "szukamy", zapytanie: String(q).slice(0, 120) });
            } else if (z.type === "response.output_text.delta") {
              tekst += z.delta;
            }
          }
        }
        const profil = JSON.parse(tekst);
        if (profil.firma.nazwa === "nie znaleziono") {
          bladProfilu = true;
          wyslij({
            typ: "blad",
            error: "Nie znaleźliśmy tej firmy. Wpisz adres strony albo NIP.",
          });
        } else {
          wyslij({ typ: "profil", dane: profil });
          const host = czystaDomena(profil.firma.strona ?? "");
          const zostalo = 110_000 - (Date.now() - t0);
          if (
            !audyt &&
            /^[a-z0-9.-]+\.[a-z]{2,}$/.test(host) &&
            zostalo > 40_000
          ) {
            wyslij({ typ: "audyt_start" });
            audyt = audytuj(host, Math.min(70_000, zostalo - 20_000)).catch(
              () => null,
            );
          }
        }
      } catch (e) {
        bladProfilu = true;
        console.error("handlowiec", e);
        wyslij({
          typ: "blad",
          error: "Nie udało się dokończyć analizy. Spróbuj jeszcze raz.",
        });
      }
      if (audyt && !bladProfilu) {
        const a = await audyt;
        wyslij(
          a
            ? { typ: "audyt", dane: a }
            : { typ: "audyt", blad: "Nie udało się zbadać całej strony." },
        );
      }
      ctrl.close();
    },
  });

  return new Response(strumien, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
