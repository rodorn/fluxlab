import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnkietaNps from "@/components/AnkietaNps";
import { ankietaInfo } from "@/lib/leady/rdzen";

export const metadata: Metadata = {
  title: "Ankieta",
  description: "Krótka ankieta satysfakcji.",
  alternates: { canonical: "/ankieta" },
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) notFound();
  const info = await ankietaInfo(token);
  if (!info) notFound();
  return (
    <main className="mx-auto max-w-lg bg-white p-6 text-gray-900">
      <AnkietaNps token={token} firma={info.firma} />
    </main>
  );
}
