import { ogObraz, ogRozmiar } from "@/lib/ogObraz";

export const runtime = "edge";

export const alt = "Fluxlab, tworzenie stron WWW i poprawki w obecnych";
export const size = ogRozmiar;
export const contentType = "image/png";

export default function OGImage() {
  return ogObraz("Strony WWW i poprawki w obecnych", "Strony internetowe");
}
