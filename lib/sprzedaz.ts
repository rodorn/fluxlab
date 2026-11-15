import { zl } from "@/lib/wycena";

export type Oferta = {
  nazwa: string;
  netto: number;
  miesiecznie: boolean;
  strona: string;
  pole?: string;
  pole2?: string;
  wgraj?: "umowa" | "porownanie" | "pytanie";
  dostep?: string;
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
  "sprzedaz-stripe-dzien": { nazwa: "Sprzedaż ze Stripe co dzień", netto: 19, miesiecznie: true, strona: "/sprzedaz-stripe-codziennie", pole: "Klucz API Stripe tylko do odczytu (rk_live_…)" },
  "formularz-zgloszenia": { nazwa: "Formularz do arkusza i Teams lub Slacka", netto: 19, miesiecznie: true, strona: "/formularz-do-arkusza-i-teams", pole: "Nazwa formularza (np. Zapytania ze strony)" },
  "firma-raport": { nazwa: "Firma w internecie: raport PDF", netto: 29, miesiecznie: false, strona: "/raport-o-firmie-w-internecie", pole: "Adres strony firmy (np. twojafirma.pl)" },
  "omnibus-sklep": { nazwa: "Omnibus w sklepie: raport", netto: 29, miesiecznie: false, strona: "/omnibus-w-sklepie", pole: "Adres sklepu (np. twojsklep.pl)" },
  "benchmarking-miesiac": { nazwa: "Benchmarking konkurencji raz w miesiącu", netto: 39, miesiecznie: true, strona: "/benchmarking-konkurencji", pole: ADRES, pole2: KONKURENCI },
  "benchmarking-tydzien": { nazwa: "Benchmarking konkurencji raz w tygodniu", netto: 49, miesiecznie: true, strona: "/benchmarking-konkurencji", pole: ADRES, pole2: KONKURENCI },
  "benchmarking-dzien": { nazwa: "Benchmarking konkurencji codziennie", netto: 69, miesiecznie: true, strona: "/benchmarking-konkurencji", pole: ADRES, pole2: KONKURENCI },
  "domeny-wyszukiwanie": { nazwa: "Skaner domen: wyszukiwanie", netto: 29, miesiecznie: false, strona: "/skaner-domen", pole: "Frazy albo nazwa firmy" },
  "spf-dkim-dmarc": { nazwa: "SPF, DKIM i DMARC z instrukcją", netto: 19, miesiecznie: false, strona: "/spf-dkim-dmarc", pole: "Domena firmowej poczty (firma.pl)" },
  "polityka-hasel": { nazwa: "Polityka haseł dla firmy", netto: 19, miesiecznie: false, strona: "/polityka-hasel", pole: "Nazwa firmy" },
  "dns-pilnowanie": { nazwa: "Pilnowanie rekordów DNS jednej domeny", netto: 9, miesiecznie: true, strona: "/pilnowanie-dns", pole: "Domena do pilnowania (firma.pl)" },
  "bezpieczny-odbior": { nazwa: "Bezpieczny odbiór plików od klientów", netto: 19, miesiecznie: true, strona: "/bezpieczny-odbior-plikow", pole: "Nazwa firmy (widoczna dla nadawców)" },
  "wp-wtyczki": { nazwa: "Miesięczny skan wtyczek WordPressa", netto: 29, miesiecznie: true, strona: "/skan-wtyczek-wordpress", pole: "Adres strony na WordPressie (firma.pl)" },
  "czytelnosc-tekstow": { nazwa: "Czytelność i poprawność tekstów strony", netto: 19, miesiecznie: false, strona: "/czytelnosc-tekstow", pole: "Adres strony (firma.pl)" },
  "domeny-pilnowanie": { nazwa: "Skaner domen: pilnowanie do 20 domen", netto: 9, miesiecznie: true, strona: "/skaner-domen", pole: "Domeny do pilnowania, po przecinku" },
  "jezyki-monitoring": { nazwa: "Monitoring wersji językowych", netto: 99, miesiecznie: true, strona: "/kontrola-jezykow", pole: ADRES },
  "ceny-skan": { nazwa: "Skan przecen w sklepie", netto: 49, miesiecznie: false, strona: "/rejestr-cen", pole: "Adres sklepu" },
  "ceny-rejestr": { nazwa: "Rejestr cen", netto: 99, miesiecznie: true, strona: "/rejestr-cen", pole: "Adres sklepu" },
  "paliwo-monitoring": { nazwa: "Monitoring kart paliwowych", netto: 149, miesiecznie: true, strona: "/kontrola-paliwa" },
  "mapa-pilnowanie": { nazwa: "Pilnowanie mapy strony", netto: 99, miesiecznie: true, strona: "/mapa-strony", pole: ADRES },
  "monitoring-dostepnosc": { nazwa: "Monitoring dostępności strony", netto: 19, miesiecznie: true, strona: "/monitoring-dostepnosci", pole: "Adres strony" },
  "monitoring-ceny": { nazwa: "Pilnowanie cen konkurencji", netto: 39, miesiecznie: true, strona: "/pilnowanie-cen-konkurencji", pole: "Adresy produktów (do 3, po spacji)" },
  "monitoring-wyciek": { nazwa: "Alert wycieku haseł", netto: 19, miesiecznie: true, strona: "/alert-wycieku-hasel" },
  "monitoring-formularz": { nazwa: "Strażnik formularza kontaktowego", netto: 19, miesiecznie: true, strona: "/straznik-formularza", pole: "Adres strony z formularzem" },
  "https-pilnowanie": { nazwa: "Pilnowanie ważności certyfikatu", netto: 39, miesiecznie: true, strona: "/naprawa-https", pole: ADRES },
  "google-monitoring": { nazwa: "Monitoring widoczności w Google", netto: 39, miesiecznie: true, strona: "/widocznosc-w-google", pole: ADRES },
  "domena-pilnowanie": { nazwa: "Pilnowanie domeny", netto: 49, miesiecznie: true, strona: "/wlasnosc-domeny", pole: "Domena" },
  "landing-kampania": { nazwa: "Landing na jedną kampanię", netto: 299, miesiecznie: false, strona: "/landing-z-platnoscia" },
  "landing-platnosc": { nazwa: "Landing z płatnością", netto: 790, miesiecznie: false, strona: "/landing-z-platnoscia" },
  "landing-kolejna": { nazwa: "Landing na kolejną kampanię", netto: 190, miesiecznie: false, strona: "/landing-z-platnoscia" },
  "ai-warunki": { nazwa: "Naprawa warunków wstępnych widoczności w AI", netto: 890, miesiecznie: false, strona: "/widocznosc-w-ai", pole: ADRES },
  "n8n-przeplyw": { nazwa: "Wdrożenie pojedynczego przepływu n8n", netto: 790, miesiecznie: false, strona: "/wdrozenie-n8n-cena" },
  "n8n-opieka": { nazwa: "Opieka nad n8n", netto: 190, miesiecznie: true, strona: "/wdrozenie-n8n-cena" },
  "lead-formularz": { nazwa: "Formularz leadów z listą zgłoszeń", netto: 49, miesiecznie: true, strona: "/formularz-leadow" },
  "lead-odpowiedz": { nazwa: "Odpowiedź na leada w minutę", netto: 29, miesiecznie: true, strona: "/odpowiedz-na-leada" },
  "lead-opinia": { nazwa: "Prośba o opinię Google", netto: 29, miesiecznie: true, strona: "/prosba-o-opinie-google" },
  "lead-kalkulator": { nazwa: "Kalkulator wyceny na stronę", netto: 49, miesiecznie: true, strona: "/kalkulator-wyceny" },
  "lead-rezerwacje": { nazwa: "Rezerwacje online", netto: 39, miesiecznie: true, strona: "/rezerwacje-online" },
  "lead-nps": { nazwa: "Ankieta NPS", netto: 29, miesiecznie: true, strona: "/ankieta-nps" },
  "lead-ocena": { nazwa: "Ocena leada przez AI", netto: 29, miesiecznie: true, strona: "/ocena-leada-ai" },
  "lead-nip": { nazwa: "Dane firmy do leada z NIP", netto: 19, miesiecznie: true, strona: "/dane-firmy-z-nip" },
  "asystent-audyt": { nazwa: "Audyt asystenta AI", netto: 69, miesiecznie: false, strona: "/asystent-ai-na-stronie", pole: ADRES },
  "umowa-streszczenie": { nazwa: "Streszczenie umowy i ryzyk", netto: 29, miesiecznie: false, strona: "/streszczenie-umowy", wgraj: "umowa" },
  "umowa-porownanie": { nazwa: "Porównanie dwóch wersji umowy", netto: 19, miesiecznie: false, strona: "/porownanie-umow", wgraj: "porownanie" },
  "tax-ai": { nazwa: "Wstępna odpowiedź podatkowa", netto: 29, miesiecznie: false, strona: "/odpowiedz-podatkowa", wgraj: "pytanie" },
  "opieka-300": { nazwa: "Opieka nad stroną: 2 poprawki na kwartał, monitoring", netto: 300, miesiecznie: true, strona: "/strony-www", pole: ADRES },
  "opieka-600": { nazwa: "Opieka nad stroną: 5 poprawek na kwartał, opinie w Google", netto: 600, miesiecznie: true, strona: "/strony-www", pole: ADRES },
  "opieka-1280": { nazwa: "Opieka nad stroną: 10 poprawek na kwartał, post co tydzień", netto: 1280, miesiecznie: true, strona: "/strony-www", pole: ADRES },
};

const DLA_KOGO = "Dla kogo: dom czy firma";

OFERTA["dotacje-oze"] = { nazwa: "Nabory dotacji OZE: alert o zmianach na stronach programów", netto: 19, miesiecznie: true, strona: "/nabory-dotacji-oze", pole: DLA_KOGO };
OFERTA["faktury-kosztowe"] = { nazwa: "Faktury kosztowe z KSeF na maila, codziennie", netto: 29, miesiecznie: true, strona: "/faktury-kosztowe-z-ksef-na-mail", dostep: "/ksef-dostep" };
OFERTA["kontrola-faktur"] = { nazwa: "Kontrola faktur kosztowych z KSeF przed zapłatą", netto: 39, miesiecznie: true, strona: "/kontrola-faktur-kosztowych", dostep: "/ksef-dostep" };
OFERTA["faktury-z-excela"] = { nazwa: "Faktury z Excela do KSeF", netto: 49, miesiecznie: true, strona: "/faktury-z-excela-do-ksef", dostep: "/ksef-wystawianie" };
OFERTA["naleznosci"] = { nazwa: "Należności i przeterminowane faktury z KSeF co tydzień", netto: 29, miesiecznie: true, strona: "/naleznosci-i-przeterminowane-faktury", dostep: "/ksef-dostep" };
OFERTA["paczka-biuro"] = { nazwa: "Paczka miesięczna faktur z KSeF dla biura rachunkowego", netto: 19, miesiecznie: true, strona: "/paczka-miesieczna-dla-biura", dostep: "/ksef-dostep" };

OFERTA["alert-stop"] = {
  nazwa: "Alert zmian stóp NBP i WIRON",
  netto: 19,
  miesiecznie: true,
  strona: "/alert-stop-procentowych",
  pole: "Co obserwować: stopy NBP, WIRON albo oba",
};

OFERTA["rata-komis"] = {
  nazwa: "Kalkulator raty i leasingu dla komisu",
  netto: 49,
  miesiecznie: true,
  strona: "/kalkulator-raty-komis",
  pole: "Nazwa komisu i kontakt dla klientów (telefon lub e-mail)",
  pole2: "Oprocentowanie kredytu w %, np. 9,5 (opcjonalnie)",
};

OFERTA["auto-wycena"] = {
  nazwa: "Wycena auta z ogłoszeń",
  netto: 19,
  miesiecznie: false,
  strona: "/wycena-auta-z-ogloszen",
  pole: "Link do ogłoszenia auta na Otomoto",
};

OFERTA["auto-alert"] = {
  nazwa: "Alert nowych ogłoszeń auta",
  netto: 19,
  miesiecznie: true,
  strona: "/alert-nowych-ogloszen-auta",
  pole: "Link do wyszukiwania na Otomoto (strona z wynikami i Twoimi filtrami)",
};

OFERTA["zdolnosc"] = {
  nazwa: "Kalkulator zdolności kredytowej dla pośrednika",
  netto: 49,
  miesiecznie: true,
  strona: "/kalkulator-zdolnosci-kredytowej",
  pole: "Nazwa firmy i kontakt dla klientów (telefon lub e-mail)",
  pole2: "Oprocentowanie kredytu w %, np. 7,5 (opcjonalnie)",
};

OFERTA["pv"] = {
  nazwa: "Kalkulator PV z magazynem dla instalatora",
  netto: 99,
  miesiecznie: true,
  strona: "/kalkulator-pv-z-magazynem",
  pole: "Nazwa firmy i kontakt dla klientów (telefon lub e-mail)",
  pole2: "Cena instalacji za kWp i magazynu za kWh w zł, np. 4500 i 2000 (opcjonalnie)",
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

OFERTA["weryfikacja-rachunkow"] = {
  nazwa: "Weryfikacja rachunków przed przelewem",
  netto: 29,
  miesiecznie: true,
  strona: "/weryfikacja-rachunkow",
  dostep: "/weryfikacja-rachunkow/panel",
};
