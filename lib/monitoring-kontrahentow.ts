import { esc, ramkaMaila } from "@/lib/dokumenty-mail";
import { mapaRownolegla, podatnikPoNip } from "@/lib/rejestry-publiczne";

export const MAX_NIPOW = 50;
export const PRODUKT_DANE = "monitoring-kontrahentow";

/** Migawka jednego kontrahenta. s: "Czynny", "Zwolniony", "Niezarejestrowany" albo "brak" (nie ma w wykazie). */
export type Pozycja = { n: string; s: string; r: string[] };
export type Migawka = Record<string, Pozycja>;

export async function zrobMigawke(nipy: string[]): Promise<Migawka> {
  const lista = await mapaRownolegla(nipy, 5, async (nip) => {
    const p = await podatnikPoNip(nip);
    return [nip, p ? { n: p.nazwa, s: p.statusVat || "brak", r: [...p.rachunki].sort() } : { n: "", s: "brak", r: [] }] as const;
  });
  return Object.fromEntries(lista);
}

export const fmtRachunku = (r: string) => `${r.slice(0, 2)} ${r.slice(2).replace(/(\d{4})(?=\d)/g, "$1 ")}`;
const opisStatusu = (s: string) => (s === "Czynny" ? "czynny podatnik VAT" : s === "brak" ? "brak w wykazie podatników VAT" : s === "Zwolniony" ? "zwolniony z VAT" : s === "Niezarejestrowany" ? "niezarejestrowany jako podatnik VAT" : s);

export function mailPierwszy(m: Migawka) {
  const wpisy = Object.entries(m);
  const czynni = wpisy.filter(([, p]) => p.s === "Czynny").length;
  const uwagi = wpisy.filter(([, p]) => p.s !== "Czynny");
  const temat = `Monitoring kontrahentów: ${czynni} z ${wpisy.length} firm to czynni podatnicy VAT`;
  const wiersze = wpisy
    .map(
      ([nip, p]) =>
        `<tr><td style="padding:6px 8px;border-bottom:1px solid #e5e7eb">${esc(p.n || "(brak w wykazie)")}<br><span style="color:#6b7280;font-size:13px">NIP ${nip}</span></td><td style="padding:6px 8px;border-bottom:1px solid #e5e7eb;color:${p.s === "Czynny" ? "#047857" : "#b91c1c"}">${esc(opisStatusu(p.s))}<br><span style="color:#6b7280;font-size:13px">${p.r.length} rachunków</span></td></tr>`,
    )
    .join("");
  const html = ramkaMaila(
    "Monitoring kontrahentów jest włączony",
    `<p style="margin:0 0 12px;font-size:16px">Od dziś sprawdzamy codziennie <b>${wpisy.length}</b> firm. Dziś: <b>${czynni}</b> to czynni podatnicy VAT${uwagi.length ? `, <b>${uwagi.length}</b> wymaga uwagi` : ""}.</p><table style="width:100%;border-collapse:collapse">${wiersze}</table><p style="margin:16px 0 0;color:#6b7280;font-size:13px">Napiszemy do Ciebie tylko wtedy, gdy u którejś firmy zmieni się status VAT albo lista rachunków. Listę możesz zmienić pod tym samym linkiem co poprzednio.</p>`,
  );
  const tekst = `${temat}\n\n${wpisy.map(([nip, p]) => `${p.n || nip}: ${opisStatusu(p.s)}`).join("\n")}`;
  return { temat, html, tekst };
}
