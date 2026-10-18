/**
 * Co dzieje się z zapytaniem klienta: jakim formularzem przychodzi, czy
 * trafia do CRM, czy jest czat albo rezerwacja i czy kontakt jest pod ręką.
 *
 * Patrzymy wyłącznie na kod strony głównej i strony kontaktu. Narzędzie
 * podpięte po stronie serwera (wtyczka wysyłająca formularz do CRM w tle)
 * jest z zewnątrz niewidoczne, dlatego formularz własnego kodu oznaczamy
 * jako „nie da się sprawdzić” zamiast wystawiać mu karę.
 */

import { cechyStrony } from "./audyt-kontrole";

export type Zapytania = {
  /** Adres strony kontaktu, którą przeczytaliśmy obok głównej. */
  podstrona: string | null;
  formularz: boolean;
  /** Czym jest formularz: Contact Form 7, mailto, Typeform, HubSpot... */
  typyFormularza: string[];
  /** Formularz wysyła do własnego skryptu strony, więc dalszej drogi nie widać. */
  wlasnySkrypt: boolean;
  /** Formularz, którego zgłoszenia z definicji lądują w skrzynce (o ile nie ma integracji). */
  doSkrzynki: boolean;
  crm: { nazwa: string; formularz: boolean }[];
  /** Newsletter i kampanie mailowe. To nie jest CRM dla zapytań. */
  marketing: string[];
  czat: string[];
  rezerwacje: string[];
  telefon: boolean;
  email: boolean;
  /** Link albo przycisk kontaktu w początkowej części strony głównej. */
  kontaktNaGorze: boolean;
};

type Wzorzec = [nazwa: string, re: RegExp];

/** Formularze, które z natury wysyłają maila. */
const FORMULARZE_MAIL: Wzorzec[] = [
  ["Contact Form 7", /\bwpcf7\b|wpcf7-form/i],
  ["WPForms", /wpforms-form|wpforms-container/i],
  ["Gravity Forms", /gform_wrapper|id=["']gform_\d/i],
  ["Elementor Forms", /elementor-form\b/i],
  ["Ninja Forms", /nf-form-cont|ninja-forms/i],
  ["Fluent Forms", /frm-fluent-form|fluentform/i],
  ["Forminator", /forminator-custom-form/i],
  ["Divi", /et_pb_contact_form/i],
  ["Formspree", /formspree\.io/i],
  ["Getform", /getform\.io/i],
  ["Google Forms", /docs\.google\.com\/forms|forms\.gle\//i],
  [
    "Typeform",
    /form\.typeform\.com|embed\.typeform\.com|data-tf-(?:widget|live|popup)/i,
  ],
  ["Tally", /tally\.so\/(?:r|embed)\//i],
  ["Jotform", /form\.jotform\.com|jotfor\.ms|jotform\.com\/jsform/i],
  ["Webflow", /class=["'][^"']*\bw-form\b/i],
];

/** CRM i narzędzia sprzedaży. Drugi wzorzec: formularz tego CRM na stronie. */
const CRM: [string, RegExp, RegExp | null][] = [
  [
    "HubSpot",
    /js\.hs-scripts\.com|js\.hsforms\.net|js\.hs-analytics\.net|js\.hs-banner\.com|js\.hubspot\.com|hbspt\.forms|hsforms\.com/i,
    /js\.hsforms\.net|hbspt\.forms\.create|hs-form\b|hsforms\.com\/submissions/i,
  ],
  [
    "Pipedrive",
    /leadbooster-chat\.pipedrive\.com|webforms\.pipedrive\.com|pipedriveLeadboosterConfig/i,
    /webforms\.pipedrive\.com/i,
  ],
  [
    "Salesforce",
    /servlet\.WebToLead|webto\.salesforce\.com|pi\.pardot\.com|go\.pardot\.com|salesforce-sites\.com/i,
    /servlet\.WebToLead|webto\.salesforce\.com/i,
  ],
  [
    "Zoho",
    /crm\.zoho\.|zohopublic\.|salesiq\.zoho|zsiqchat|forms\.zohopublic/i,
    /crm\.zoho\.[a-z.]+\/crm\/WebToLeadForm|forms\.zohopublic/i,
  ],
  [
    "Livespace",
    /livespace\.(?:io|pl)\/|lsTrackingCode|livespace-form/i,
    /livespace-form|livespace\.(?:io|pl)\/[^"']*form/i,
  ],
  [
    "Bitrix24",
    /bitrix24\.(?:pl|com|de|ru)|cdn-ru\.bitrix24|b24-form|crm_form_/i,
    /b24-form|crm_form_/i,
  ],
  [
    "Freshsales",
    /freshsales\.io|fwcrm|myfreshworks\.com\/crm/i,
    /freshsales\.io\/web_forms|fs-webform/i,
  ],
  [
    "ActiveCampaign",
    /activehosted\.com|trackcmp\.net|_form_\d+_submit/i,
    /activehosted\.com\/f\/|_form_\d+_submit/i,
  ],
];

const MARKETING: Wzorzec[] = [
  ["Mailchimp", /list-manage\.com|chimpstatic\.com|mc4wp-form/i],
  ["GetResponse", /getresponse\.com|gr-cdn\.|grwf2|app\.getresponse/i],
  ["Brevo", /sibforms\.com|sendinblue|sib-form|brevo\.com/i],
  ["FreshMail", /freshmail\.(?:pl|com)\//i],
];

const CZAT: Wzorzec[] = [
  ["Tidio", /code\.tidio\.co|tidioChatApi/i],
  ["LiveChat", /cdn\.livechatinc\.com|__lc\.license/i],
  ["Smartsupp", /smartsuppchat\.com|_smartsupp/i],
  ["Intercom", /widget\.intercom\.io|intercomSettings/i],
  ["Crisp", /client\.crisp\.chat|\$crisp\b/i],
  [
    "Messenger",
    /xfbml\.customerchat|fb-customerchat|href=["']https?:\/\/(?:www\.)?m\.me\//i,
  ],
  [
    "WhatsApp",
    /href=["'][^"']*(?:wa\.me\/|api\.whatsapp\.com\/send|whatsapp:\/\/send)/i,
  ],
  ["Zoho SalesIQ", /salesiq\.zoho|zsiqchat/i],
  ["Pipedrive LeadBooster", /leadbooster-chat\.pipedrive\.com/i],
  ["CallPage", /callpage\.io/i],
  ["tawk.to", /embed\.tawk\.to/i],
];

const REZERWACJE: Wzorzec[] = [
  ["Calendly", /calendly\.com\//i],
  ["Cal.com", /(?:app\.)?cal\.com\/(?:embed|[a-z0-9-]+\/)/i],
  ["Bookero", /bookero\.(?:pl|org)/i],
  ["Booksy", /booksy\.com/i],
  ["ZnanyLekarz", /znanylekarz\.pl\/[^"']*widget|platform\.docplanner\.com/i],
  ["HubSpot Meetings", /meetings\.hubspot\.com/i],
];

function znajdz(html: string, lista: Wzorzec[]): string[] {
  return lista.filter(([, re]) => re.test(html)).map(([n]) => n);
}

/** Adres podstrony kontaktu wskazany w menu strony głównej. */
export function adresKontaktu(html: string, adres: string): string | null {
  let baza: URL;
  try {
    baza = new URL(adres);
  } catch {
    return null;
  }
  const host = baza.hostname.replace(/^www\./, "");
  const kandydaci: string[] = [];
  for (const m of html.matchAll(/<a\b[^>]*\bhref=["']([^"'#]+)["']/gi)) {
    if (!/kontakt|contact/i.test(m[1])) continue;
    try {
      const u = new URL(m[1], baza);
      if (
        u.hostname.replace(/^www\./, "") !== host ||
        !/^https?:$/.test(u.protocol)
      )
        continue;
      u.hash = "";
      if (u.pathname === "/" || u.pathname === baza.pathname) continue;
      kandydaci.push(u.toString());
    } catch {
      /* zły adres */
    }
  }
  // Najpierw adres kończący się na kontakt, potem najkrótszy.
  const wprost = (a: string) => (/\/(kontakt|contact)[\w-]*\/?$/i.test(a) ? 0 : 1);
  kandydaci.sort((a, b) => wprost(a) - wprost(b) || a.length - b.length);
  return kandydaci[0] ?? `${baza.origin}/kontakt`;
}

/** Czy w pierwszej części dokumentu (nagłówek i początek treści) jest kontakt. */
function kontaktNaPoczatku(html: string): boolean {
  const body = html.search(/<body\b/i);
  const tresc = html
    .slice(body < 0 ? 0 : body)
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "");
  const poczatek = tresc.slice(
    0,
    Math.max(15_000, Math.floor(tresc.length * 0.3)),
  );
  return (
    /href=["'](?:tel:|mailto:|[^"']*(?:kontakt|contact))/i.test(poczatek) ||
    /<(?:a|button)\b[^>]*>(?:(?!<\/(?:a|button)>)[\s\S]){0,200}?(kontakt|zadzwo|napisz|umów|zapytaj|wycen|zarezerwuj|contact)/i.test(
      poczatek,
    )
  );
}

/** Formularze kontaktowe bez znanej wtyczki: dokąd wysyłają. */
function formularzeWlasne(
  html: string,
  adres: string,
): { mailto: boolean; wlasne: boolean } {
  let host = "";
  try {
    host = new URL(adres).hostname.replace(/^www\./, "");
  } catch {
    /* bez hosta */
  }
  let mailto = false;
  let wlasne = false;
  for (const m of html.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi)) {
    if (!/<textarea\b|type=["']?(?:email|tel)\b/i.test(m[2])) continue;
    const a = m[1].match(/\baction\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
    if (/^mailto:/i.test(a)) {
      mailto = true;
      continue;
    }
    if (!a || a.startsWith("#") || a.startsWith("/") || a.startsWith("?")) {
      wlasne = true;
      continue;
    }
    try {
      if (new URL(a, adres).hostname.replace(/^www\./, "") === host)
        wlasne = true;
    } catch {
      /* zły adres */
    }
  }
  return { mailto, wlasne };
}

export function wykryjZapytania(
  strony: { html: string; adres: string }[],
  podstrona: string | null,
): Zapytania {
  const html = strony.map((s) => s.html).join("\n");
  const cechy = strony.map((s) => cechyStrony(s.html, s.adres));
  const wordpress = /wp-content\/|wp-includes\//i.test(html);

  const crm = CRM.filter(([, re]) => re.test(html)).map(([nazwa, , form]) => ({
    nazwa,
    formularz: Boolean(form && form.test(html)),
  }));
  const typy = znajdz(html, FORMULARZE_MAIL);
  for (const c of crm) if (c.formularz) typy.push(`formularz ${c.nazwa}`);

  let mailto = false;
  let wlasne = false;
  for (const s of strony) {
    const f = formularzeWlasne(s.html, s.adres);
    mailto ||= f.mailto;
    wlasne ||= f.wlasne;
  }
  if (mailto) typy.push("mailto (otwiera program pocztowy)");

  const formularz = cechy.some((c) => c.formularz) || typy.length > 0;
  // Formularz bez znanej wtyczki na WordPressie to prawie zawsze inna
  // wtyczka wysyłająca maila. Poza WordPressem to własny kod strony, a jego
  // dalszej drogi z zewnątrz nie widać.
  const bezNazwy = formularz && typy.length === 0;
  if (bezNazwy && wordpress) {
    const wtyczka = html.match(
      /wp-content\/plugins\/([a-z0-9_-]*form[a-z0-9_-]*)\//i,
    )?.[1];
    typy.push(wtyczka ? `wtyczka WordPressa (${wtyczka})` : "wtyczka WordPressa");
  }
  const wlasnySkrypt = bezNazwy && !wordpress && (wlasne || !mailto);
  if (wlasnySkrypt) typy.push("własny skrypt strony");

  const doSkrzynki =
    formularz &&
    typy.some(
      (t) => !t.startsWith("formularz ") && t !== "własny skrypt strony",
    );

  return {
    podstrona,
    formularz,
    typyFormularza: [...new Set(typy)],
    wlasnySkrypt,
    doSkrzynki,
    crm,
    marketing: znajdz(html, MARKETING),
    czat: znajdz(html, CZAT),
    rezerwacje: znajdz(html, REZERWACJE),
    telefon: cechy.some((c) => c.telefon),
    email: cechy.some((c) => c.email),
    kontaktNaGorze: strony[0] ? kontaktNaPoczatku(strony[0].html) : false,
  };
}
