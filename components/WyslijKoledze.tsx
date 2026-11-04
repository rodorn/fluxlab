"use client";

import { zglosZdarzenie } from "@/lib/zdarzenie";

const TEMAT = "FluxLab w skrócie: do decyzji";
const WSTEP = "Podsyłam firmę od automatyzacji, którą rozważam. Najważniejsze w czterech punktach:"; // głos klienta
const TRESC = `${WSTEP}

- stała cena przed startem, pierwszy krok automatyzacji od 900 zł netto w 5 dni roboczych,
- pierwsze zlecenie przez Useme: płacimy dopiero po odbiorze, bez osobnej umowy,
- 30 dni poprawek bez opłat, dokumentacja i szkolenie zespołu w cenie,
- abonament można zakończyć w dowolnym dniu.

Ceny, przebieg współpracy, ryzyka i dane firmy: https://fluxlab.pl/dla-zespolu`;

export default function WyslijKoledze() {
  async function wyslij() {
    zglosZdarzenie("dla_zespolu_wyslij");
    if (navigator.share) {
      try {
        await navigator.share({ title: TEMAT, text: TRESC });
        return;
      } catch {
        return;
      }
    }
    window.location.href = `mailto:?subject=${encodeURIComponent(TEMAT)}&body=${encodeURIComponent(TRESC)}`;
  }

  return (
    <button type="button" onClick={wyslij} className="btn-secondary print:hidden">
      Wyślij podsumowanie koledze
    </button>
  );
}
