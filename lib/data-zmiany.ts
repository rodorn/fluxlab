import daty from "@/lib/daty-stron.json";

export function dataZmiany(href: string, opublikowano: string): string {
  const d = (daty as Record<string, string>)[href]?.slice(0, 10);
  return d && d > opublikowano ? d : opublikowano;
}
