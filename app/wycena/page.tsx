import type { Metadata } from "next";
import Link from "next/link";
import WycenaDokument from "@/components/WycenaDokument";
import { dekodujWycene } from "@/lib/wycenaPdf";

export const metadata: Metadata = {
  title: "Wycena orientacyjna | FluxLab",
  robots: { index: false, follow: false },
};

export default async function WycenaPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string | string[] }>;
}) {
  const { d } = await searchParams;
  const w = dekodujWycene(typeof d === "string" ? d : undefined);
  if (!w) {
    return (
      <main className="container-wide py-24 text-center">
        <p className="text-lg font-semibold">Nieprawidłowy link wyceny</p>
        <Link href="/strony-www" className="mt-4 inline-block text-accent underline">
          Wróć do strony Strony WWW
        </Link>
      </main>
    );
  }
  const data = new Date().toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Warsaw",
  });
  return <WycenaDokument w={w} data={data} />;
}
