import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";

const zrodlo = `${homedir()}/Projekty/fluxlab-prawo/reguly`;
for (const rok of [2026, 2027]) {
  const pelny = JSON.parse(readFileSync(`${zrodlo}/${rok}.json`, "utf8"));
  const { _opis, ...strona } = pelny.strona;
  writeFileSync(
    `lib/podatki/reguly/${rok}.json`,
    JSON.stringify({ rok, wygenerowano: pelny.wygenerowano, ...strona }, null, 1) + "\n",
  );
  console.log(rok, Object.keys(strona).length, "pozycji, stan", pelny.wygenerowano);
}
