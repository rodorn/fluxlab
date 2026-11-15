export type Pozycja = { nazwa: string; cena: number };

export function parsujWycene(tekst: string): Pozycja[] | string {
  const wyn: Pozycja[] = [];
  for (const [i, linia] of tekst.split("\n").entries()) {
    if (!linia.trim()) continue;
    const m = linia.match(/^(.{1,80}?)\s*\|\s*(\d{1,7}(?:[.,]\d{1,2})?)\s*(?:zł)?\s*$/i);
    if (!m) return `Linia ${i + 1}: użyj formatu „Nazwa | cena”, na przykład „Montaż okna | 450”.`;
    wyn.push({ nazwa: m[1].trim(), cena: Number(m[2].replace(",", ".")) });
  }
  if (wyn.length > 20) return "Najwyżej 20 pozycji.";
  return wyn;
}

export const zl = (n: number) => `${n.toLocaleString("pl-PL", { maximumFractionDigits: 2 })} zł`;
