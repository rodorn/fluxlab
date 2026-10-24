import { ogObraz, ogRozmiar } from "@/lib/ogObraz";

export const runtime = "edge";

export const alt = "Fluxlab, cennik: usługi ze stałą ceną";
export const size = ogRozmiar;
export const contentType = "image/png";

export default function OGImage() {
  return ogObraz("Usługi ze stałą ceną", "Cennik");
}
