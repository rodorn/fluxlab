/** Nr 80: mediany cen ofertowych mieszkań z jawnych danych deweloperów (dane.gov.pl). Liczy harvester, tu tylko odczyt z fl-dane. */
import { dane } from "@/lib/fl-dane";

const db = dane("ceny-dewelopery");

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
      db.lista<Miasto>("mediany", { limit: 500 }),
      db.pobierz<Meta>("meta", "dzis"),
    ]);
    return {
      miasta: m.map((x) => x.dane).sort((a, b) => b.oferty - a.oferty),
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
