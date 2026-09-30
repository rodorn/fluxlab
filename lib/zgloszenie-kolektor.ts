// Zgloszenie z formularza kontaktowego laduje jako rekord w kolektorze na
// VPS (tabela zgloszenia), zanim pojdzie mail. Mail mozna skasowac albo
// przeoczyc, a rekord z czasem zdarzenia zostaje i stamtad czyta go FluxCRM.
// Awaria kolektora nie moze zablokowac maila, dlatego kazdy blad konczy sie
// tylko wpisem w konsoli.

export type PolaZgloszenia = {
  email: string;
  firma?: string;
  rodzaj_problemu?: string;
  skala?: string;
  preferowany_kontakt?: string;
  opis?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  sesja?: string;
};

export type LadunekZgloszenia = {
  email: string;
  firma: string;
  rodzaj_problemu: string;
  skala: string;
  preferowany_kontakt: string;
  opis: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
  sesja: string;
};

// Te same granice, co w kolektorze: kolektor i tak utnie, ale nie ma powodu
// wysylac wiecej, niz zostanie zapisane.
const LIMITY: Record<keyof LadunekZgloszenia, number> = {
  email: 320,
  firma: 200,
  rodzaj_problemu: 200,
  skala: 100,
  preferowany_kontakt: 100,
  opis: 5000,
  utm_source: 200,
  utm_medium: 200,
  utm_campaign: 200,
  utm_term: 200,
  utm_content: 200,
  landing_page: 500,
  referrer: 500,
  sesja: 40,
};

function utnij(wartosc: unknown, max: number): string {
  if (typeof wartosc !== "string") return "";
  return wartosc.trim().slice(0, max);
}

export function ladunekZgloszenia(pola: PolaZgloszenia): LadunekZgloszenia {
  const ladunek = {} as LadunekZgloszenia;
  for (const klucz of Object.keys(LIMITY) as (keyof LadunekZgloszenia)[]) {
    ladunek[klucz] = utnij(pola[klucz], LIMITY[klucz]);
  }
  ladunek.email = ladunek.email.toLowerCase();
  return ladunek;
}

// Ta sama zmienna, z ktorej korzysta licznik wizyt i zapis zgod. Osobna nazwa
// na ten sam kolektor skonczylaby sie tym, ze jedna z nich kiedys nie
// zostanie ustawiona i zgloszenia po cichu przestana sie zapisywac.
export function adresZgloszen(): string {
  return (process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta").replace(
    /\/wizyta$/,
    "/zgloszenie",
  );
}

export async function wyslijZgloszenie(
  ladunek: LadunekZgloszenia,
): Promise<boolean> {
  // Bez sekretu nie wysylamy nic. Repozytorium jest publiczne, wiec wartosc
  // moze pochodzic wylacznie ze zmiennej srodowiskowej.
  const sekret = process.env.RUCH_SEKRET;
  if (!sekret) return false;
  try {
    const odp = await fetch(adresZgloszen(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": sekret },
      body: JSON.stringify(ladunek),
      signal: AbortSignal.timeout(3000),
    });
    if (!odp.ok) {
      console.error("[contact] kolektor odpowiedzial", odp.status);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[contact] zapis zgloszenia w kolektorze nie przeszedl -", e);
    return false;
  }
}
