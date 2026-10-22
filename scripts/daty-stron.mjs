// Zapisuje date ostatniej zmiany kazdej strony na podstawie historii gita.
// Mapa strony bez dat nie daje wyszukiwarce powodu, zeby wrocic: nasza byla
// ostatnio odczytana 15 kwietnia, mimo dziesiatek zmian od tamtej pory.
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const KORZEN = "app";
const wynik = {};

function obejdz(katalog) {
  for (const wpis of readdirSync(katalog)) {
    const sciezka = join(katalog, wpis);
    if (statSync(sciezka).isDirectory()) {
      obejdz(sciezka);
      continue;
    }
    if (wpis !== "page.tsx") continue;
    const trasa =
      "/" + katalog.slice(KORZEN.length + 1).replace(/\\/g, "/");
    const czysta = trasa === "/" ? "/" : trasa.replace(/\/$/, "");
    if (czysta.includes("[")) continue; // trasy dynamiczne pomijamy
    try {
      const data = execSync(`git log -1 --format=%cI -- "${sciezka}"`, {
        encoding: "utf8",
      }).trim();
      if (data) wynik[czysta] = data;
    } catch {
      // brak historii dla pliku, pomijamy zamiast zmyslac date
    }
  }
}

obejdz(KORZEN);
// Strony zmienione tylko przez wspolny komponent (bez zmiany page.tsx) dopisujemy
// recznie w lib/daty-stron-komponenty.json; wygrywa pozniejsza data.
const RECZNE = "lib/daty-stron-komponenty.json";
if (existsSync(RECZNE)) {
  for (const [trasa, data] of Object.entries(JSON.parse(readFileSync(RECZNE, "utf8")))) {
    if (trasa in wynik && new Date(data) > new Date(wynik[trasa])) wynik[trasa] = data;
  }
}
writeFileSync("lib/daty-stron.json", JSON.stringify(wynik, null, 1) + "\n");
console.log("zapisano dat:", Object.keys(wynik).length);
