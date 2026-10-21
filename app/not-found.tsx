import type { Metadata } from "next";
import Pelna404 from "@/components/Pelna404";

export const metadata: Metadata = {
  title: "Strona nie znaleziona | Fluxlab",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <Pelna404 />;
}
