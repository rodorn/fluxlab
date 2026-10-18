const AKCENT = "#4f46e5";

export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function zdanieKontaktu(
  pref: string,
  termin: string,
  telefon: string,
): string {
  return pref === "meet" && termin
    ? `Prosisz o spotkanie na Google Meet ${termin}. Potwierdzimy termin zaproszeniem z linkiem do rozmowy, a jeśli ta godzina będzie zajęta, zaproponujemy najbliższą wolną.`
    : pref === "phone" && telefon
      ? `Prosisz o telefon pod numer ${telefon}. Zadzwonimy w godzinach pracy, tego samego dnia.`
      : "Pracujemy i ustalamy wszystko mailowo, więc możesz po prostu odpisać na tę wiadomość.";
}

export function potwierdzenieHtml(
  pref: string,
  termin: string,
  telefon: string,
  linkKalendarza: string,
): string {
  const font = "Arial,Helvetica,sans-serif";
  const p = `margin:0 0 16px 0;font-family:${font};font-size:15px;line-height:24px;color:#1f2937;`;
  const zdanie = esc(zdanieKontaktu(pref, termin, telefon));

  let blok = `<p style="${p}">${zdanie}</p>`;
  if (pref === "meet" && termin) {
    const przycisk = linkKalendarza
      ? `<tr><td style="padding:16px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td bgcolor="${AKCENT}" style="border-radius:6px;background-color:${AKCENT};">
<a href="${esc(linkKalendarza)}" target="_blank" style="display:inline-block;padding:11px 22px;font-family:${font};font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">Dodaj do kalendarza</a>
</td></tr></table></td></tr>`
      : "";
    blok = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
<tr><td bgcolor="#eef2ff" style="background-color:#eef2ff;border-left:4px solid ${AKCENT};padding:16px 20px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td style="font-family:${font};font-size:12px;line-height:18px;color:#4b5563;text-transform:uppercase;letter-spacing:1px;">Google Meet</td></tr>
<tr><td style="font-family:${font};font-size:22px;line-height:30px;font-weight:bold;color:#111827;">${esc(termin)}</td></tr>
${przycisk}
</table></td></tr></table>
<p style="${p}">${zdanie}</p>`;
  } else if (pref === "phone" && telefon) {
    blok = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
<tr><td bgcolor="#eef2ff" style="background-color:#eef2ff;border-left:4px solid ${AKCENT};padding:16px 20px;">
<div style="font-family:${font};font-size:12px;line-height:18px;color:#4b5563;text-transform:uppercase;letter-spacing:1px;">Telefon</div>
<div style="font-family:${font};font-size:22px;line-height:30px;font-weight:bold;color:#111827;">${esc(telefon)}</div>
</td></tr></table>
<p style="${p}">${zdanie}</p>`;
  }

  return `<!DOCTYPE html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dostaliśmy zgłoszenie, Fluxlab</title></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3f4f6" style="background-color:#f3f4f6;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background-color:#ffffff;">
<tr><td style="padding:24px 32px;border-top:4px solid ${AKCENT};border-bottom:1px solid #e5e7eb;font-family:${font};font-size:22px;line-height:28px;font-weight:bold;color:#111827;">Flux<span style="color:${AKCENT};">Lab</span></td></tr>
<tr><td style="padding:28px 32px 12px 32px;">
<p style="${p}">Cześć,</p>
<p style="${p}">dzięki za opis procesu. Przejrzymy zgłoszenie i wrócimy z informacją, czy widzimy potencjał na automatyzację oraz jaki byłby sensowny pierwszy krok, tego samego dnia.</p>
<p style="${p}">Jeśli widzimy dopasowanie, odpiszemy z konkretną propozycją zakresu i wyceną. Jeśli proces wygląda na zbyt mały albo nieopłacalny do automatyzacji na tym etapie, napiszemy to wprost, i uzasadnimy dlaczego.</p>
${blok}
<p style="${p}">Paweł</p>
</td></tr>
<tr><td style="padding:16px 32px 24px 32px;border-top:1px solid #e5e7eb;font-family:${font};font-size:12px;line-height:20px;color:#6b7280;">
Fluxlab, automatyzacja leadów, CRM i raportowania dla firm B2B<br>
<a href="mailto:pawel@fluxlab.pl" style="color:${AKCENT};text-decoration:none;">pawel@fluxlab.pl</a> | <a href="https://fluxlab.pl" style="color:${AKCENT};text-decoration:none;">fluxlab.pl</a>
</td></tr>
</table></td></tr></table>
</body></html>`;
}
