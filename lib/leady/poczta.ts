import { Resend } from "resend";
import { esc } from "@/lib/fl-produkty";
import type { Firma } from "@/lib/leady/dane-firmy";
import type { Ocena } from "@/lib/leady/ocena";

export const PANEL_URL = "https://fluxlab.pl/leady/panel/";
const FROM_ADRES = (process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>").match(/<(.+)>/)?.[1] ?? "formularz@fluxlab.pl";
const STYL = "font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:560px";
const ETYKIETA: Record<string, string> = { imie: "Imię", email: "E-mail", telefon: "Telefon", firma: "Firma", nip: "NIP", wiadomosc: "Wiadomość", uwagi: "Uwagi" };

export const PRODUKTY: Record<string, { nazwa: string; opis: string }> = {
  "lead-opinia": { nazwa: "Prośba o opinię Google", opis: "mail z prośbą o opinię Google wysyłany Twoim klientom z panelu albo z Zapier i Make" },
  "lead-kalkulator": { nazwa: "Kalkulator wyceny na stronę", opis: "kalkulator wyceny do osadzenia na stronie, a zgłoszenia z wyceną trafiają do panelu i na Twój mail" },
  "lead-rezerwacje": { nazwa: "Rezerwacje online", opis: "kalendarz rezerwacji do osadzenia na stronie, potwierdzenia wysyłamy mailem Tobie i klientowi" },
  "lead-nps": { nazwa: "Ankieta NPS", opis: "ankieta NPS z linkiem dla Twoich klientów, wynik i odpowiedzi w panelu" },
  "lead-formularz": { nazwa: "Formularz leadów z listą zgłoszeń", opis: "formularz do osadzenia i lista zgłoszeń w panelu" },
  "lead-odpowiedz": { nazwa: "Odpowiedź na leada w minutę", opis: "natychmiastowy mail do każdego, kto zostawi zgłoszenie (uzupełnij ofertę i link do kalendarza w panelu)" },
  "lead-ocena": { nazwa: "Ocena leada przez AI", opis: "ocena i streszczenie każdego zgłoszenia w mailu do Ciebie" },
  "lead-nip": { nazwa: "Dane firmy do leada z NIP", opis: "dane firmy z rejestrów (nazwa, adres, KRS, branża), gdy zgłoszenie zawiera NIP" },
};

export async function wyslij(o: { do: string; temat: string; html: string; od?: string; replyTo?: string; kopia?: boolean }) {
  const r = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: o.od ? `${o.od} <${FROM_ADRES}>` : (process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>"),
    to: o.do,
    replyTo: o.replyTo ?? "pawel@fluxlab.pl",
    subject: o.temat,
    html: o.html,
    ...(o.kopia && process.env.FLUXLAB_KOPIA_DO ? { bcc: process.env.FLUXLAB_KOPIA_DO } : {}),
  });
  if (r.error) throw new Error(`Resend: ${r.error.message}`);
}

const wiersze = (p: Record<string, string | null | undefined>, et = ETYKIETA) =>
  Object.entries(p)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style='padding:4px 12px 4px 0;color:#666;vertical-align:top'>${esc(et[k] ?? k)}</td><td style='padding:4px 0'>${esc(String(v))}</td></tr>`)
    .join("");

export function mailKarta(panel: string, pola: Record<string, string>, firma: Firma | null, ocena: Ocena | null) {
  const kolor = { gorący: "#c0392b", ciepły: "#d68910", zimny: "#2874a6" };
  let h = `<div style='${STYL}'>`;
  if (ocena)
    h +=
      `<p style='margin:0 0 4px'><b style='color:${kolor[ocena.kategoria]};font-size:17px'>Lead ${esc(ocena.kategoria)}, ${ocena.punkty}/10</b></p>` +
      `<p style='margin:0 0 12px'>${esc(ocena.streszczenie)}</p>` +
      `<p style='margin:0 0 16px;padding:10px 12px;background:#f4f4f4'><b>Następny krok:</b> ${esc(ocena.nastepny_krok)}</p>`;
  h += `<table style='border-collapse:collapse;margin:0 0 16px'>${wiersze(pola)}</table>`;
  if (firma && !firma.blad)
    h +=
      `<p style='margin:0 0 4px'><b>Dane firmy z rejestrów</b></p><table style='border-collapse:collapse;margin:0 0 16px'>` +
      wiersze({ Nazwa: firma.nazwa, Adres: firma.adres, NIP: firma.nip, KRS: firma.krs, REGON: firma.regon, "Status VAT": firma.vat, Branża: firma.branza ?? firma.branza_uwaga }, {}) +
      "</table>";
  else if (firma?.blad) h += `<p style='color:#a04000'>Dane firmy: ${esc(firma.blad)}</p>`;
  return `${h}<p style='margin:0'><a href='${PANEL_URL}${esc(panel)}'>Wszystkie zgłoszenia i ustawienia</a></p></div>`;
}

export function mailNps(panel: string, ocena: number, komentarz: string) {
  const typ = ocena >= 9 ? "promotor" : ocena >= 7 ? "neutralny" : "krytyk";
  return `<div style='${STYL}'><p style='margin:0 0 4px'><b style='font-size:17px'>Ocena ${ocena}/10 (${typ})</b></p>${komentarz ? `<p style='margin:0 0 16px'>${esc(komentarz)}</p>` : "<p style='margin:0 0 16px;color:#666'>Bez komentarza.</p>"}<p style='margin:0'><a href='${PANEL_URL}${esc(panel)}'>Wynik NPS i wszystkie odpowiedzi</a></p></div>`;
}

export function mailRezerwacjaGosc(firma: string, imie: string, termin: string) {
  const i = imie.split(" ")[0];
  return `<div style='${STYL}'><p>Dzień dobry${i ? " " + esc(i) : ""},</p><p>potwierdzamy rezerwację w firmie ${esc(firma)}.</p><p style='padding:10px 12px;background:#f4f4f4'><b>Termin: ${esc(termin)}</b></p><p>Jeśli termin Ci nie pasuje, odpisz na tego maila.</p><p>${esc(firma)}</p></div>`;
}

export function mailRezerwacjaKlient(panel: string, termin: string, pola: Record<string, string>) {
  return `<div style='${STYL}'><p style='margin:0 0 12px'><b style='font-size:17px'>Nowa rezerwacja: ${esc(termin)}</b></p><table style='border-collapse:collapse;margin:0 0 16px'>${wiersze(pola)}</table><p style='margin:0'><a href='${PANEL_URL}${esc(panel)}'>Wszystkie rezerwacje</a></p></div>`;
}

export function mailOpinia(firma: string, imie: string, link: string) {
  const i = imie.split(" ")[0];
  return `<div style='${STYL}'><p>Dzień dobry${i ? " " + esc(i) : ""},</p><p>dziękujemy za współpracę z firmą ${esc(firma)}. Jeśli masz minutę, zostaw nam opinię w Google. To dla nas bardzo ważne.</p><p><a href='${esc(link)}' style='display:inline-block;background:#111;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px'>Wystaw opinię w Google</a></p><p>${esc(firma)}</p></div>`;
}

export function mailDoLeada(ust: Record<string, string>, nazwaKlienta: string, pola: Record<string, string>) {
  const firma = ust.firma || nazwaKlienta || "Nasza firma";
  const imie = (pola.imie ?? "").split(" ")[0];
  let h = `<div style='${STYL}'><p>Dzień dobry${imie ? " " + esc(imie) : ""},</p><p>dziękujemy za zgłoszenie do firmy ${esc(firma)}. Odezwiemy się najszybciej, jak to możliwe.</p>`;
  if (ust.oferta) h += ust.oferta.split("\n").filter((a) => a.trim()).map((a) => `<p>${esc(a)}</p>`).join("");
  if (ust.kalendarz)
    h += `<p><a href='${esc(ust.kalendarz)}' style='display:inline-block;background:#111;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px'>Umów rozmowę w kalendarzu</a></p>`;
  return `${h}<p>${esc(firma)}</p></div>`;
}

export function mailPowitalny(token: string, panel: string, nowe: string[], nowyKlient: boolean) {
  const form = `https://fluxlab.pl/leady/formularz/${token}`;
  const api = `https://fluxlab.pl/api/lead/${token}`;
  const iframe = `<iframe src="${form}" title="Formularz kontaktowy" width="100%" height="520" style="border:0;max-width:520px"></iframe>`;
  let h = `<div style='${STYL}'><p>Dzień dobry,</p><p>usługa działa od teraz: ${nowe.map((p) => esc(PRODUKTY[p].nazwa)).join(", ")}.</p><ul>${nowe.map((p) => `<li>${esc(PRODUKTY[p].opis)}</li>`).join("")}</ul>`;
  h += nowyKlient
    ? `<p><b>1. Formularz.</b> Wklej na swoją stronę ten kod albo podlinkuj <a href='${form}'>gotową stronę z formularzem</a>:</p>` +
      `<pre style='white-space:pre-wrap;background:#f4f4f4;padding:10px;font-size:13px'>${esc(iframe)}</pre>` +
      `<p><b>2. Własny formularz, Zapier, Make.</b> Wyślij zgłoszenie jako POST JSON (pola: imie, email, telefon, firma, nip, wiadomosc) na<br><code>${api}</code></p>` +
      `<p><b>3. Panel.</b> <a href='${PANEL_URL}${panel}'>Lista zgłoszeń i ustawienia</a>. Ten link jest tajny, nie udostępniaj go.</p>` +
      "<p>Każde nowe zgłoszenie trafia do Ciebie mailem na ten adres.</p>"
    : `<p>Działa na tym samym formularzu co wcześniej. <a href='${PANEL_URL}${panel}'>Panel</a>.</p>`;
  if (nowe.includes("lead-opinia"))
    h += `<p><b>Prośba o opinię Google.</b> W <a href='${PANEL_URL}${panel}'>panelu</a> wklej link do wizytówki Google, a potem wpisuj adresy klientów, którym chcesz wysłać prośbę. Z Zapier i Make wyślij POST JSON (pola: email, imie) na <code>https://fluxlab.pl/api/opinia/${panel}</code>. Ten adres jest tajny.</p>`;
  if (nowe.includes("lead-kalkulator"))
    h += `<p><b>Kalkulator wyceny.</b> W <a href='${PANEL_URL}${panel}'>panelu</a> wpisz usługi i ceny (jedna linia: Nazwa | cena). Potem wklej na stronę: </p><pre style='white-space:pre-wrap;background:#f4f4f4;padding:10px;font-size:13px'>${esc(`<iframe src="https://fluxlab.pl/leady/kalkulator/${token}" title="Kalkulator wyceny" width="100%" height="640" style="border:0;max-width:520px"></iframe>`)}</pre><p>Klient zaznacza usługi, widzi sumę i zostawia kontakt. Zgłoszenie z wyceną dostajesz mailem i na liście w panelu.</p>`;
  if (nowe.includes("lead-rezerwacje"))
    h += `<p><b>Rezerwacje online.</b> W <a href='${PANEL_URL}${panel}'>panelu</a> ustaw dni, godziny i długość wizyty, a potem wklej na stronę: </p><pre style='white-space:pre-wrap;background:#f4f4f4;padding:10px;font-size:13px'>${esc(`<iframe src="https://fluxlab.pl/leady/rezerwacje/${token}" title="Rezerwacja terminu" width="100%" height="680" style="border:0;max-width:520px"></iframe>`)}</pre><p>Klient wybiera wolny termin i zostawia kontakt. Zajęty termin znika z kalendarza, a potwierdzenie przychodzi mailem do obu stron.</p>`;
  if (nowe.includes("lead-nps"))
    h += `<p><b>Ankieta NPS.</b> Ten link wyślij swoim klientom: <a href='https://fluxlab.pl/ankieta/${token}'>https://fluxlab.pl/ankieta/${token}</a>. Każda odpowiedź przychodzi do Ciebie mailem, a wynik NPS jest w panelu. Nazwę firmy w pytaniu ustawisz w panelu.</p>`;
  return `${h}<p>Rezygnacja w dowolnym dniu w portalu płatności (link w potwierdzeniu płatności), za niewykorzystane dni zwracamy pieniądze. Dane zgłoszeń usuwamy 30 dni po rezygnacji. Pytania: odpisz na tego maila.</p><p>Zespół Fluxlab</p></div>`;
}

export const mailPrzeprosiny = () =>
  `<div style='${STYL}'><p>Dzień dobry,</p><p>przy uruchamianiu zamówionej usługi wystąpił błąd po naszej stronie. Zwróciliśmy całą wpłatę i anulowaliśmy subskrypcję, środki wrócą na kartę w kilka dni. Przepraszamy. Odpisz na tego maila, a uruchomimy usługę ręcznie.</p><p>Zespół Fluxlab</p></div>`;
