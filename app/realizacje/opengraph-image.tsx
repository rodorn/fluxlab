import { ogObraz, ogRozmiar } from "@/lib/ogObraz";

export const runtime = "edge";

export const alt = "Fluxlab, realizacje: wdrożenia i ich efekty";
export const size = ogRozmiar;
export const contentType = "image/png";

export default function OGImage() {
  return ogObraz("Wdrożenia i ich efekty", "Realizacje");
}
