import { ogObraz, ogRozmiar } from "@/lib/ogObraz";

export const runtime = "edge";

export const alt = "Fluxlab, własny CRM dla firmy w trzy tygodnie";
export const size = ogRozmiar;
export const contentType = "image/png";

export default function OGImage() {
  return ogObraz("Własny CRM w trzy tygodnie", "Własny CRM dla firmy");
}
