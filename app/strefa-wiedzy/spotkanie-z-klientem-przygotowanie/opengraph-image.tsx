import { ogObraz, ogRozmiar } from "@/lib/ogObraz";

export const runtime = "edge";

export const alt = "Fluxlab, Przygotowanie do spotkania z klientem";
export const size = ogRozmiar;
export const contentType = "image/png";

export default function OGImage() {
  return ogObraz("Jak przygotować się do spotkania z klientem", "Strefa wiedzy · sprzedaż");
}
