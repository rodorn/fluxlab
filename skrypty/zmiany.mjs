// Zapisuje lib/zmiany.json: ostatnie 40 zmian strony widocznych dla klienta.
// Na Vercelu klon jest płytki, więc nowe wpisy dopisujemy do pliku z repo.
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const POMIN =
  /^(Dziennik|Mapa witryny|Plan ruchu|Bramki|Strategia|llms\.txt|Pomiar|Link wewnętrzny)|finreal|carmore|zyte|outreach|piksel|token|kolektor|Pawła|mjs|jakosc|spojnosc|zdarzeni|og:image|Article|FAQPage|Resend|Mailjet|DKIM|Vercel|limit funkcji|tytuł i opis|<|>|\.ts\b| zł|\bcen|pakiet|płatno|beta|^Bez |partia|limit|próg|srcset|lazy|krotki|artykul|odliczyc|blednej|wydluz|^(Daty stron|Lastmod|GA:)|WebApplication|getPointAtLength|lastmod|zapytani|wyśw\.|\bZ\d+\b/i;
// Wielkość liter ma znaczenie: temat od małej litery to commit techniczny ("serp:", "slownik:").
const POMIN_TECH =
  /^Cykl |^[a-z]|^(Tlo|Nr \d+|Strona \d+|Spójność|Podgląd|Demo|Google):|^Demo |\[|\]|komunikat błędu|\bw logu\b|\bautomat(u|ów)\b|NEXT_PUBLIC|\butm|\breklam|FL_|^Nr \d|^Produkty:|^Dodaj produkty|Słownik jakości|fl-dane|\bid\b|sesji klienta|poprawki stylu|^Poprawka|składni|poza akapitem|\bstrone\b|^Prosba/;
const NUMER = String.raw`produkt(?:y)?(?: nr)? \d+(?:(?:, | i )(?:nr )?\d+)*`;
const bezNumeru = (t) => {
  const o = t.replace(new RegExp(`^${NUMER}:\\s*`, "i"), "").replace(new RegExp(`:\\s*${NUMER}$`, "i"), "");
  return o.charAt(0).toUpperCase() + o.slice(1);
};
const pomin = (t) => POMIN.test(t) || POMIN_TECH.test(t);
const run = (c) => execSync(c, { encoding: "utf8", maxBuffer: 1 << 26 }).trim();

try {
  const wpisy = run('git log --format=%cI%x09%s -n 400')
    .split("\n")
    .map((l) => {
      const [data, ...r] = l.split("\t");
      return { data, temat: r.join("\t").trim() };
    })
    .filter((w) => w.temat && !pomin(w.temat) && !pomin(bezNumeru(w.temat)))
    .slice(0, 40)
    .map(({ data, temat }) => {
      let opis = bezNumeru(temat).replace(/\s*\((?:[^()]|\([^()]*\))*\)/g, "").replace(/,\s*wpis w llms\.txt.*$/, "");
      if (opis.length > 170) opis = opis.split(/;\s|\.\s(?=[A-ZŁŚŻ])/)[0];
      if (opis.length > 170) opis = opis.slice(0, 170).replace(/[\s,;:]+\S*$/, "") + "…";
      return { data, opis };
    });
  const stare = existsSync("lib/zmiany.json") ? JSON.parse(readFileSync("lib/zmiany.json", "utf8")) : [];
  const nowe = new Set(wpisy.map((w) => w.data));
  const lista = [...wpisy, ...stare.filter((w) => !nowe.has(w.data) && !pomin(w.opis))]
    .sort((a, b) => Date.parse(b.data) - Date.parse(a.data))
    .slice(0, 40);
  writeFileSync("lib/zmiany.json", JSON.stringify(lista, null, 2) + "\n");
  console.log(`zmiany: zapisano ${lista.length}, z gita ${wpisy.length}`);
} catch (e) {
  console.log("zmiany: brak gita, zostawiam lib/zmiany.json");
}
