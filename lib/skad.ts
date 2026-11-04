export const SKAD = [
  "Google",
  "ChatGPT/AI",
  "YouTube",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "TikTok",
  "polecenie",
  "grupa KSeF",
  "mail od nas",
  "inne",
];

export const INNE = "inne: ";

export function skadZBody(v: string) {
  if (SKAD.includes(v)) return v;
  const t = v.replace(/[|\r\n]+/g, " ").trim();
  return t.startsWith(INNE) && t.length > INNE.length ? t.slice(0, 80) : "";
}
