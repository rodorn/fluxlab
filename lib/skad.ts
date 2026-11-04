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
  return v.startsWith(INNE) && v.length > INNE.length ? v.slice(0, 80) : "";
}
