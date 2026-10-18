// Zapisuje lib/zmiany.json: ostatnie 40 zmian strony widocznych dla klienta.
// Na Vercelu klon bywa płytki, wtedy zostaje plik z repo zamiast gorszego.
import { execSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";

const POMIN = /^(Dziennik cyklu|Mapa witryny|Plan ruchu|Bramki)|finreal/i;
const run = (c) => execSync(c, { encoding: "utf8", maxBuffer: 1 << 26 }).trim();

try {
  const wpisy = run('git log --format=%cI%x09%s -n 400')
    .split("\n")
    .map((l) => {
      const [data, ...r] = l.split("\t");
      return { data, temat: r.join("\t").trim() };
    })
    .filter((w) => w.temat && !POMIN.test(w.temat))
    .slice(0, 40)
    .map(({ data, temat }) => {
      let opis = temat.replace(/\s*\((?:[^()]|\([^()]*\))*\)/g, "").replace(/,\s*wpis w llms\.txt.*$/, "");
      if (opis.length > 170) opis = opis.split(/;\s|\.\s(?=[A-ZŁŚŻ])/)[0];
      if (opis.length > 170) opis = opis.slice(0, 170).replace(/[\s,;:]+\S*$/, "") + "…";
      return { data, opis };
    });
  if (wpisy.length < 40 && existsSync("lib/zmiany.json")) {
    console.log("zmiany: za krótka historia, zostawiam lib/zmiany.json");
    process.exit(0);
  }
  writeFileSync("lib/zmiany.json", JSON.stringify(wpisy, null, 2) + "\n");
  console.log(`zmiany: zapisano ${wpisy.length}`);
} catch (e) {
  console.log("zmiany: brak gita, zostawiam lib/zmiany.json");
}
