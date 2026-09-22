/**
 * Podpisywanie gotowego raportu.
 *
 * Pierwsza wersja trzymała raporty w pamięci funkcji i wydawała do nich
 * identyfikatory. Na produkcji okazało się to nieprawdziwym założeniem:
 * kolejne wywołanie trafia do innej instancji, która tamtej pamięci nie zna,
 * więc prośba o wysyłkę kończyła się komunikatem o wygasłym raporcie przy
 * pierwszej próbie. Zmierzone, nie przewidziane.
 *
 * Teraz raport wraca do przeglądarki razem z podpisem i wraca stamtąd przy
 * prośbie o wysyłkę. Serwer nie musi niczego pamiętać, a mimo to wysyła
 * dokładnie ten dokument, który sam policzył: bez klucza nie da się podmienić
 * ani jednej liczby, a już na pewno nie ceny. Gdyby raport przychodził bez
 * podpisu, każdy mógłby kazać nam wysłać z własnej domeny dowolną treść jako
 * naszą opinię.
 */

import { createHmac, hkdfSync, timingSafeEqual } from "crypto";

/**
 * Klucz do podpisu wyprowadzamy z sekretu, który i tak stoi w środowisku,
 * zamiast używać go wprost. Osobne przeznaczenie to osobny klucz, nawet jeśli
 * pochodzi z tego samego materiału. Gdy pojawi się AUDYT_SEKRET, wygrywa on.
 */
function klucz(): Buffer | null {
  const podstawa =
    process.env.AUDYT_SEKRET || process.env.RUCH_SEKRET || process.env.RESEND_API_KEY;
  if (!podstawa) return null;
  return Buffer.from(
    hkdfSync("sha256", Buffer.from(podstawa), Buffer.from("fluxlab-audyt"), Buffer.from("podpis-raportu"), 32),
  );
}

export function podpisz(tresc: string): string | null {
  const k = klucz();
  if (!k) return null;
  return createHmac("sha256", k).update(tresc).digest("base64url");
}

export function podpisZgodny(tresc: string, podpis: string): boolean {
  const oczekiwany = podpisz(tresc);
  if (!oczekiwany) return false;
  const a = Buffer.from(oczekiwany);
  const b = Buffer.from(podpis);
  // Porównanie o stałym czasie, żeby nie dało się dobierać podpisu po tym,
  // jak szybko odpowiadamy.
  return a.length === b.length && timingSafeEqual(a, b);
}
