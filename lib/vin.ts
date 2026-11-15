const TRANS: Record<string, number> = {};
"0123456789".split("").forEach((c) => (TRANS[c] = Number(c)));
"ABCDEFGH".split("").forEach((c, i) => (TRANS[c] = i + 1));
"JKLMN".split("").forEach((c, i) => (TRANS[c] = i + 1));
Object.assign(TRANS, { P: 7, R: 9 });
"STUVWXYZ".split("").forEach((c, i) => (TRANS[c] = i + 2));
const WAGI = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

export type WynikVin = { ok: boolean; bledy: string[]; uwagi: string[]; region: string };

export function normalizujVin(t: string): string {
  return t.toUpperCase().replace(/[\s-]/g, "");
}

export function sprawdzVin(vin: string): WynikVin {
  if (vin.length !== 17) return { ok: false, bledy: [`VIN ma ${vin.length} znaków, a powinien mieć 17.`], uwagi: [], region: "" };
  const zle = [...new Set(vin.split("").filter((c) => "IOQ".includes(c) || !/[A-Z0-9]/.test(c)))];
  if (zle.length) return { ok: false, bledy: [`VIN zawiera niedozwolone znaki: ${zle.join(", ")} (liter I, O i Q w VIN nie ma).`], uwagi: [], region: "" };
  const p = vin[0];
  const region = "STUVWXYZ".includes(p) ? "Europa" : "12345".includes(p) ? "Ameryka Północna" : "67".includes(p) ? "Oceania" : "89".includes(p) ? "Ameryka Południowa" : "JKLMNPR".includes(p) ? "Azja" : "Afryka";
  const suma = vin.split("").reduce((s, c, i) => s + TRANS[c] * WAGI[i], 0) % 11;
  const kontrolna = suma === 10 ? "X" : String(suma);
  const bledy: string[] = [];
  const uwagi: string[] = [];
  if (vin[8] !== kontrolna) {
    if (region === "Ameryka Północna") bledy.push(`Cyfra kontrolna (9. znak) nie zgadza się: jest ${vin[8]}, wyliczona ${kontrolna}.`);
    else uwagi.push("Cyfra kontrolna (9. znak) nie zgadza się z wyliczoną. W Europie ten znak nie musi jej zawierać, więc samo to nie przesądza o błędzie.");
  }
  return { ok: bledy.length === 0, bledy, uwagi, region };
}
