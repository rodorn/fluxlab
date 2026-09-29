export function kotwica(tekst: string): string {
  const slug = tekst
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (slug.length <= 60) return slug;
  return slug.slice(0, 60).replace(/-[^-]*$/, "");
}
