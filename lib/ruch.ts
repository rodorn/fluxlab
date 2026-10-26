import { SIECI_AUTOMATOW } from "@/lib/sieci-automatow";

// Wlasny licznik wejsc, niezalezny od Google. Przegladarka rozmawia wylacznie
// z fluxlab.pl, a stad lecimy do kolektora. Bez tego przegladarka zablokowalaby
// polaczenie, bo kolektor nie stoi na HTTPS.
const KOLEKTOR = process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta";
const SEKRET = process.env.RUCH_SEKRET ?? "";

export function zSieciAutomatow(ip: string): boolean {
  const czesci = ip.split(".").map(Number);
  if (czesci.length !== 4 || czesci.some((c) => !(c >= 0 && c <= 255))) return false;
  const adres = ((czesci[0] << 24) >>> 0) + (czesci[1] << 16) + (czesci[2] << 8) + czesci[3];
  return SIECI_AUTOMATOW.some(([siec, maska]) => Math.floor(adres / 2 ** (32 - maska)) === Math.floor(siec / 2 ** (32 - maska)));
}

export function ipZadania(request: Request): string {
  return (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
}

export async function wyslijWizyte(ladunek: Record<string, unknown>): Promise<void> {
  // Bez sekretu nie wysylamy nic. Repozytorium jest publiczne, wiec wartosc
  // moze pochodzic wylacznie ze zmiennej srodowiskowej.
  if (!SEKRET) return;
  try {
    await fetch(KOLEKTOR, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": SEKRET },
      body: JSON.stringify(ladunek),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // Licznik nigdy nie moze popsuc strony odwiedzajacemu.
  }
}
