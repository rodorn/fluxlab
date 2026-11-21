/**
 * Publiczne rejestry używane przez produkty z rodziny „rejestry”:
 * wykaz podatników VAT (Ministerstwo Finansów) i odpis aktualny z KRS.
 */

const MF = "https://wykazpodatnikowvat.mf.gov.pl/api/search/nip";
const KRS = "https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/";

export function nipPoprawny(nip: string): boolean {
  if (!/^\d{10}$/.test(nip)) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const suma = w.reduce((s, x, i) => s + x * Number(nip[i]), 0) % 11;
  return suma !== 10 && suma === Number(nip[9]);
}

/** Z wklejonego tekstu (CSV, kolumna z Excela, NIP-y po przecinku) wyciąga unikalne 10-cyfrowe numery. */
export function wyciagnijNipy(tekst: string): {
  nipy: string[];
  odrzucone: string[];
} {
  const nipy: string[] = [];
  const odrzucone: string[] = [];
  const widziane = new Set<string>();
  for (const kawalek of tekst.split(/[\n\r;,\t ]+/)) {
    const cyfry = kawalek.replace(/^PL/i, "").replace(/[-\s.]/g, "");
    if (!cyfry) continue;
    if (!/^\d{10}$/.test(cyfry)) {
      if (/\d{5,}/.test(cyfry) && odrzucone.length < 20)
        odrzucone.push(kawalek.slice(0, 24));
      continue;
    }
    if (widziane.has(cyfry)) continue;
    widziane.add(cyfry);
    nipy.push(cyfry);
  }
  return { nipy, odrzucone };
}

export type Podatnik = {
  nazwa: string;
  nip: string;
  statusVat: string;
  krs: string | null;
  adres: string;
  rachunki: string[];
};

/** null = nie ma w wykazie. Rzuca wyjątek, gdy rejestr nie odpowiada. */
export async function podatnikPoNip(nip: string): Promise<Podatnik | null> {
  const data = new Date().toISOString().slice(0, 10);
  const r = await fetch(`${MF}/${nip}?date=${data}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (r.status === 404 || r.status === 400) return null;
  if (!r.ok) throw new Error(`MF ${r.status}`);
  const s = (await r.json())?.result?.subject;
  if (!s) return null;
  return {
    nazwa: s.name ?? "",
    nip,
    statusVat: s.statusVat ?? "",
    krs: s.krs ?? null,
    adres: s.workingAddress ?? s.residenceAddress ?? "",
    rachunki: Array.isArray(s.accountNumbers) ? s.accountNumbers : [],
  };
}

async function odpisKrs(krs: string, rejestr: "P" | "S") {
  const r = await fetch(`${KRS}${krs}?rejestr=${rejestr}&format=json`, {
    headers: { "User-Agent": "curl/8.5.0", Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`KRS ${r.status}`);
  return JSON.parse((await r.text()).replace(/[\u0000-\u001f]/g, " "));
}

/** Adres do e-Doręczeń wpisany do KRS (pole jest dopiero, gdy adres trafił do bazy adresów elektronicznych). */
export async function adresEDoreczenKrs(
  krs: string,
): Promise<{ adres: string | null; stanZDnia: string } | null> {
  const odpis = (await odpisKrs(krs, "P")) ?? (await odpisKrs(krs, "S"));
  if (!odpis) return null;
  return {
    adres:
      odpis?.odpis?.dane?.dzial1?.siedzibaIAdres
        ?.adresDoDoreczenElektronicznychWpisanyDoBAE ?? null,
    stanZDnia: odpis?.odpis?.naglowekA?.stanZDnia ?? "",
  };
}

/** map z ograniczoną równoległością, żeby nie zalać rejestrów. */
export async function mapaRownolegla<T, R>(
  wej: T[],
  rownolegle: number,
  f: (x: T) => Promise<R>,
): Promise<R[]> {
  const wyn: R[] = new Array(wej.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(rownolegle, wej.length) }, async () => {
      while (i < wej.length) {
        const k = i++;
        wyn[k] = await f(wej[k]);
      }
    }),
  );
  return wyn;
}

export const esc = (t: string) =>
  t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
