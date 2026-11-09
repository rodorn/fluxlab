import { ogObraz, ogRozmiar } from "@/lib/ogObraz";

export const runtime = "edge";

export const alt = "Fluxlab, Klient nie odpowiada na ofertę";
export const size = ogRozmiar;
export const contentType = "image/png";

export default function OGImage() {
  return ogObraz("Klient nie odpowiada na ofertę: co zrobić", "Strefa wiedzy · sprzedaż");
}
