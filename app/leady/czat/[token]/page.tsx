import type { Metadata } from "next";
import CzatAi from "@/components/CzatAi";
import { czatInfo } from "@/lib/leady/rdzen";

export const metadata: Metadata = {
  title: "Czat ze stroną",
  description: "Czat AI do osadzenia na stronie klienta.",
  alternates: { canonical: "/leady/czat" },
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const d = /^[A-Za-z0-9_-]{16,64}$/.test(token) ? await czatInfo(token) : null;
  return (
    <main className="mx-auto max-w-lg bg-white p-4">
      {d ? <CzatAi token={token} firma={d.firma} /> : <p className="text-sm text-gray-600">Czat jest wyłączony.</p>}
    </main>
  );
}
