import { ogObraz, ogRozmiar } from "@/lib/ogObraz";

export const runtime = "edge";

export const alt = "Fluxlab, własny CRM dla firmy, pierwsza wersja w 3 tygodnie";
export const size = ogRozmiar;
export const contentType = "image/png";

export default function OGImage() {
  return ogObraz("Własny CRM: pierwsza wersja w 3 tygodnie", "Własny CRM dla firmy");
}
