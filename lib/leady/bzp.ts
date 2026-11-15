export type Ogloszenie = {
  nr: string;
  tytul: string;
  org: string;
  miasto: string;
  woj: string;
  cpv: string;
  termin: string;
  data: string;
  url: string;
};
export type KryteriaBzp = { slowa: string[]; cpv: string[]; woj: string };

const API = "https://ezamowienia.gov.pl/mo-board/api/v1/notice";

export const WOJEWODZTWA: Record<string, string> = {
  PL02: "dolnośląskie",
  PL04: "kujawsko-pomorskie",
  PL06: "lubelskie",
  PL08: "lubuskie",
  PL10: "łódzkie",
  PL12: "małopolskie",
  PL14: "mazowieckie",
  PL16: "opolskie",
  PL18: "podkarpackie",
  PL20: "podlaskie",
  PL22: "pomorskie",
  PL24: "śląskie",
  PL26: "świętokrzyskie",
  PL28: "warmińsko-mazurskie",
  PL30: "wielkopolskie",
  PL32: "zachodniopomorskie",
};

const mala = (s: string) => s.toLocaleLowerCase("pl");

export function kryteria(
  u: Record<string, string> | undefined,
): KryteriaBzp | null {
  const lista = (t: string | undefined) =>
    (t ?? "")
      .split(/[,;\n]/)
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 20);
  const k = {
    slowa: lista(u?.bzp_slowa).map(mala),
    cpv: lista(u?.bzp_cpv)
      .map((c) => c.replace(/-\d$/, "").replace(/\D/g, ""))
      .filter(Boolean),
    woj: u?.bzp_woj ?? "",
  };
  return k.slowa.length || k.cpv.length ? k : null;
}

export function bladKryteriow(u: Record<string, string>): string | null {
  if (u.bzp_woj && !(u.bzp_woj in WOJEWODZTWA)) return "Nieznane województwo.";
  if (
    (u.bzp_cpv ?? "")
      .split(/[,;\n]/)
      .some((c) => c.trim() && !/^\d{2,8}(-\d)?$/.test(c.trim()))
  )
    return "Kod CPV to od 2 do 8 cyfr, na przykład 72 albo 72200000.";
  return null;
}

export async function pobierz(odIso: string): Promise<Ogloszenie[]> {
  const wynik = new Map<string, Ogloszenie>();
  const doIso = new Date().toISOString();
  let kursor = odIso;
  for (let i = 0; i < 6; i++) {
    const r = await fetch(
      `${API}?NoticeType=ContractNotice&PublicationDateFrom=${encodeURIComponent(kursor)}&PublicationDateTo=${encodeURIComponent(doIso)}&PageSize=500`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(25000),
      },
    );
    if (!r.ok) throw new Error(`BZP ${r.status}`);
    const lista = (await r.json()) as Record<string, string>[];
    for (const n of lista)
      if (n.publicationDate > odIso)
        wynik.set(n.noticeNumber, {
          nr: n.bzpNumber,
          tytul: String(n.orderObject ?? "")
            .replace(/\s+/g, " ")
            .trim(),
          org: n.organizationName,
          miasto: n.organizationCity,
          woj: n.organizationProvince,
          cpv: String(n.cpvCode ?? ""),
          termin: n.submittingOffersDate ?? "",
          data: n.publicationDate,
          url: `https://ezamowienia.gov.pl/mo-client-board/bzp/notice-details/id/${encodeURIComponent(n.noticeNumber)}`,
        });
    if (lista.length < 500) break;
    kursor = lista[lista.length - 1].publicationDate;
  }
  return [...wynik.values()].sort((a, b) => a.data.localeCompare(b.data));
}

export function dopasuj(lista: Ogloszenie[], k: KryteriaBzp): Ogloszenie[] {
  return lista.filter((o) => {
    if (k.woj && o.woj !== k.woj) return false;
    const tekst = mala(`${o.tytul} ${o.cpv.replace(/\(.*?\)/g, " ")}`);
    const kody = o.cpv.match(/\d{8}/g) ?? [];
    return (
      k.slowa.some((s) => tekst.includes(s)) ||
      k.cpv.some((c) => kody.some((x) => x.startsWith(c)))
    );
  });
}
