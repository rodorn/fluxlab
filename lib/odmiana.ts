/**
 * Polska odmiana rzeczownika i orzeczenia po liczebniku.
 *
 * Audyt składa zdania z policzonych rzeczy, a szablon z doklejonym na sztywno
 * „obrazów” czy „znaków” jest poprawny tylko dla części liczb. Klient dostaje
 * wtedy „52 obrazów nie ma wersji”, co czyta się jak tekst pisany przez maszynę
 * i podważa wszystko, co jest niżej w raporcie.
 *
 * Reguła dotyczy rzeczowników nieosobowych, a takie tu występują: pliki,
 * obrazy, znaki, adresy, nagłówki.
 */

/** 1 obraz, 2 obrazy, 5 obrazów. */
export function odmien(
  n: number,
  pojedyncza: string,
  mnoga: string,
  dopelniacz: string,
): string {
  if (n === 1) return pojedyncza;
  const dziesiatki = n % 100;
  const jednosci = n % 10;
  return jednosci >= 2 && jednosci <= 4 && (dziesiatki < 12 || dziesiatki > 14)
    ? mnoga
    : dopelniacz;
}

/**
 * Czy orzeczenie ma stać w liczbie mnogiej.
 *
 * Idzie w parze z mianownikiem liczby mnogiej i tylko z nim: „2 obrazy nie
 * mają”, ale „1 obraz nie ma” i „5 obrazów nie ma”. Sama podmiana rzeczownika
 * bez orzeczenia daje nowy błąd zamiast poprawki.
 */
export function orzeczenieMnogie(n: number): boolean {
  if (n === 1) return false;
  const dziesiatki = n % 100;
  const jednosci = n % 10;
  return jednosci >= 2 && jednosci <= 4 && (dziesiatki < 12 || dziesiatki > 14);
}
