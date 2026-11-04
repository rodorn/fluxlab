import { zl } from "@/lib/wycena";

export type Oferta = {
  nazwa: string;
  netto: number;
  miesiecznie: boolean;
  strona: string;
  pole?: string;
  pole2?: string;
};

const ADRES = "Adres strony";
const KONKURENCI = "Konkurenci: adresy po przecinku (opcjonalnie)";

export const OFERTA: Record<string, Oferta> = {
  "wlamanie-diagnoza": { nazwa: "Diagnoza strony po włamaniu", netto: 49, miesiecznie: false, strona: "/strona-po-wlamaniu", pole: ADRES },
  "pogotowie-diagnoza": { nazwa: "Diagnoza automatyzacji", netto: 49, miesiecznie: false, strona: "/pogotowie-automatyzacji" },
  "pogotowie-opieka": { nazwa: "Opieka nad automatyzacjami", netto: 299, miesiecznie: true, strona: "/pogotowie-automatyzacji" },
  "chatbot-audyt": { nazwa: "Audyt chatbota", netto: 69, miesiecznie: false, strona: "/audyt-chatbota", pole: ADRES },
  "chatbot-regresja": { nazwa: "Audyt chatbota z regresją", netto: 199, miesiecznie: true, strona: "/audyt-chatbota", pole: ADRES },
  "marze-audyt": { nazwa: "Audyt marż", netto: 49, miesiecznie: false, strona: "/audyt-marz" },
  "marze-rachunek": { nazwa: "Comiesięczny rachunek marż", netto: 149, miesiecznie: true, strona: "/audyt-marz" },
  "wizytowka-prowadzenie": { nazwa: "Prowadzenie profilu firmy w Google", netto: 349, miesiecznie: true, strona: "/profil-firmy-google", pole: "Nazwa firmy lub link do wizytówki" },
  "benchmarking-miesiac": { nazwa: "Benchmarking konkurencji raz w miesiącu", netto: 39, miesiecznie: true, strona: "/benchmarking-konkurencji", pole: ADRES, pole2: KONKURENCI },
  "benchmarking-tydzien": { nazwa: "Benchmarking konkurencji raz w tygodniu", netto: 49, miesiecznie: true, strona: "/benchmarking-konkurencji", pole: ADRES, pole2: KONKURENCI },
  "benchmarking-dzien": { nazwa: "Benchmarking konkurencji codziennie", netto: 69, miesiecznie: true, strona: "/benchmarking-konkurencji", pole: ADRES, pole2: KONKURENCI },
  "domeny-wyszukiwanie": { nazwa: "Skaner domen: wyszukiwanie", netto: 29, miesiecznie: false, strona: "/skaner-domen", pole: "Frazy albo nazwa firmy" },
  "domeny-pilnowanie": { nazwa: "Skaner domen: pilnowanie do 20 domen", netto: 9, miesiecznie: true, strona: "/skaner-domen", pole: "Domeny do pilnowania, po przecinku" },
  "jezyki-monitoring": { nazwa: "Monitoring wersji językowych", netto: 99, miesiecznie: true, strona: "/kontrola-jezykow", pole: ADRES },
  "ceny-skan": { nazwa: "Skan przecen w sklepie", netto: 49, miesiecznie: false, strona: "/rejestr-cen", pole: "Adres sklepu" },
  "ceny-rejestr": { nazwa: "Rejestr cen", netto: 99, miesiecznie: true, strona: "/rejestr-cen", pole: "Adres sklepu" },
  "paliwo-monitoring": { nazwa: "Monitoring kart paliwowych", netto: 149, miesiecznie: true, strona: "/kontrola-paliwa" },
  "mapa-pilnowanie": { nazwa: "Pilnowanie mapy strony", netto: 99, miesiecznie: true, strona: "/mapa-strony", pole: ADRES },
  "https-pilnowanie": { nazwa: "Pilnowanie ważności certyfikatu", netto: 39, miesiecznie: true, strona: "/naprawa-https", pole: ADRES },
  "google-monitoring": { nazwa: "Monitoring widoczności w Google", netto: 39, miesiecznie: true, strona: "/widocznosc-w-google", pole: ADRES },
  "domena-pilnowanie": { nazwa: "Pilnowanie domeny", netto: 49, miesiecznie: true, strona: "/wlasnosc-domeny", pole: "Domena" },
  "landing-kampania": { nazwa: "Landing na jedną kampanię", netto: 299, miesiecznie: false, strona: "/landing-z-platnoscia" },
  "landing-platnosc": { nazwa: "Landing z płatnością", netto: 790, miesiecznie: false, strona: "/landing-z-platnoscia" },
  "landing-kolejna": { nazwa: "Landing na kolejną kampanię", netto: 190, miesiecznie: false, strona: "/landing-z-platnoscia" },
  "ai-warunki": { nazwa: "Naprawa warunków wstępnych widoczności w AI", netto: 890, miesiecznie: false, strona: "/widocznosc-w-ai", pole: ADRES },
  "n8n-przeplyw": { nazwa: "Wdrożenie pojedynczego przepływu n8n", netto: 790, miesiecznie: false, strona: "/wdrozenie-n8n-cena" },
  "n8n-opieka": { nazwa: "Opieka nad n8n", netto: 190, miesiecznie: true, strona: "/wdrozenie-n8n-cena" },
  "asystent-audyt": { nazwa: "Audyt asystenta AI", netto: 69, miesiecznie: false, strona: "/asystent-ai-na-stronie", pole: ADRES },
  "opieka-300": { nazwa: "Opieka nad stroną: 2 poprawki na kwartał, monitoring", netto: 300, miesiecznie: true, strona: "/strony-www", pole: ADRES },
  "opieka-600": { nazwa: "Opieka nad stroną: 5 poprawek na kwartał, opinie w Google", netto: 600, miesiecznie: true, strona: "/strony-www", pole: ADRES },
  "opieka-1280": { nazwa: "Opieka nad stroną: 10 poprawek na kwartał, post co tydzień", netto: 1280, miesiecznie: true, strona: "/strony-www", pole: ADRES },
};

export const cenaOferty = (o: Oferta) => `${zl(o.netto)}${o.miesiecznie ? "/mies." : ""}`;

const OFERTY_POZYCJI: Record<string, string[]> = {
  strona: ["opieka-300", "opieka-600", "opieka-1280"],
};

const PYTANIA: Record<string, string> = {
  "/benchmarking-konkurencji": "Jak często raport?",
  "/strony-www": "Jaki zakres opieki?",
};

export type Wariant = { oferta?: string; etykieta: string; cena: string };

/** Warianty pozycji koszyka: oferty ze stałą ceną do zapłaty online
 *  i wycena, gdy cena wejścia z cennika nie odpowiada żadnej z nich. */
export function warianty(p: { id: string; nazwa: string; cena: string; href: string }) {
  const ids =
    OFERTY_POZYCJI[p.id] ??
    Object.keys(OFERTA).filter((k) => OFERTA[k].strona === p.href && !k.startsWith("opieka-"));
  const wejscie = Number(p.cena.replace(/(\d)\s(?=\d)/g, "$1").match(/\d+/)?.[0] ?? NaN);
  const lista: Wariant[] = ids.map((k) => {
    const o = OFERTA[k];
    const reszta = o.nazwa.toLocaleLowerCase("pl").startsWith(p.nazwa.toLocaleLowerCase("pl"))
      ? o.nazwa.slice(p.nazwa.length).replace(/^[\s:,]+/, "")
      : "";
    return { oferta: k, etykieta: reszta ? reszta[0].toLocaleUpperCase("pl") + reszta.slice(1) : o.nazwa, cena: cenaOferty(o) };
  });
  if (lista.length && !ids.some((k) => OFERTA[k].netto === wejscie))
    lista.unshift({ etykieta: `${p.nazwa}: zakres do wyceny`, cena: p.cena });
  return { pytanie: PYTANIA[p.href] ?? "Który wariant?", lista };
}
