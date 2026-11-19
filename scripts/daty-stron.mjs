// Zapisuje date ostatniej zmiany kazdej strony na podstawie historii gita.
// Mapa strony bez dat nie daje wyszukiwarce powodu, zeby wrocic: nasza byla
// ostatnio odczytana 15 kwietnia, mimo dziesiatek zmian od tamtej pory.
// Biegnie w prebuild. Na Vercelu klon jest plytki: commity graniczne pokazuja
// kazdy plik jako zmieniony, wiec je pomijamy, a daty z repo zostaja, gdy sa pozniejsze.
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const PLIK = "lib/daty-stron.json";
const RECZNE = "lib/daty-stron-komponenty.json";
// Commity bez zmiany tresci (dane strukturalne, masowe poprawki kodu) nie podbijaja dat:
// pelny SHA tutaj albo "[bez daty]" w temacie commita.
const BEZ_DATY = new Set(["e33bb2b1a695742b773ce05c13a6615f9cbf666a"]);
const run = (c) => execSync(c, { encoding: "utf8", maxBuffer: 1 << 28 }).trim();
const wynik = existsSync(PLIK) ? JSON.parse(readFileSync(PLIK, "utf8")) : {};
const pozniejsza = (trasa, data) => {
  if (!wynik[trasa] || new Date(data) > new Date(wynik[trasa])) wynik[trasa] = data;
};

try {
  const sciezkaShallow = run("git rev-parse --git-path shallow");
  const graniczne = new Set(
    existsSync(sciezkaShallow) ? readFileSync(sciezkaShallow, "utf8").split("\n").filter(Boolean) : [],
  );
  let data = null;
  for (const linia of run("git log --format=@%H%x09%cI%x09%s --name-only --no-renames -- app").split("\n")) {
    if (linia.startsWith("@")) {
      const [sha, d, temat = ""] = linia.slice(1).split("\t");
      data = graniczne.has(sha) || BEZ_DATY.has(sha) || temat.includes("[bez daty]") ? null : d;
      continue;
    }
    if (!data || !linia.endsWith("/page.tsx") || linia.includes("[")) continue;
    if (!existsSync(linia)) continue;
    pozniejsza(linia === "app/page.tsx" ? "/" : linia.slice(3, -"/page.tsx".length), data);
  }
} catch {
  console.log("daty stron: brak gita, zostawiam", PLIK);
}

if (existsSync(RECZNE)) {
  for (const [trasa, d] of Object.entries(JSON.parse(readFileSync(RECZNE, "utf8")))) {
    if (trasa in wynik) pozniejsza(trasa, d);
  }
}
const posortowane = Object.fromEntries(Object.entries(wynik).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(PLIK, JSON.stringify(posortowane, null, 1) + "\n");
console.log("daty stron: zapisano", Object.keys(posortowane).length);
