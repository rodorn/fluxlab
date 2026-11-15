/** Nr 80: mediany cen ofertowych mieszkań z jawnych danych deweloperów (dane.gov.pl). Liczy harvester, tu tylko odczyt z fl-dane. */
import type { Dok } from "@/lib/fl-dane";

async function czytaj<T>(sciezka: string): Promise<T | null> {
  const r = await fetch(`${process.env.DANE_URL ?? "https://dane.fluxlab.pl"}/ceny-dewelopery/${sciezka}`, {
    headers: { "X-Dane-Sekret": process.env.DANE_SEKRET ?? "" },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(10000),
  });
  return r.ok ? ((await r.json()) as T) : null;
}

export type Miasto = {
  miasto: string;
  mediana_m2: number;
  oferty: number;
  dewelopery: number;
  zbiory: number;
  od: string;
  do: string;
  dzien: string;
};

export type Meta = {
  od: string;
  do: string;
  dzien: string;
  zbiorow: number;
  z_ofertami: number;
  oferty: number;
  dewelopery: number;
  miast: number;
};

export async function ceny(): Promise<{ miasta: Miasto[]; meta: Meta | null }> {
  try {
    const [m, meta] = await Promise.all([
      czytaj<{ dokumenty: Dok<Miasto>[] }>("mediany?limit=500"),
      czytaj<Dok<Meta>>("meta/dzis"),
    ]);
    return {
      miasta: (m?.dokumenty ?? []).map((x) => x.dane).sort((a, b) => b.oferty - a.oferty),
      meta: meta?.dane ?? null,
    };
  } catch {
    return { miasta: [], meta: null };
  }
}

export const dataPl = (iso: string) => {
  const [r, m, d] = iso.split("-");
  return `${Number(d)}.${m}.${r}`;
};
