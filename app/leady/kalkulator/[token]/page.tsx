import type { Metadata } from "next";
import KalkulatorWyceny from "@/components/KalkulatorWyceny";
import { kalkulatorInfo } from "@/lib/leady/rdzen";

export const metadata: Metadata = {
  title: "Kalkulator wyceny",
  description: "Kalkulator wyceny do osadzenia na stronie klienta.",
  alternates: { canonical: "/leady/kalkulator" },
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const d = /^[A-Za-z0-9_-]{16,64}$/.test(token) ? await kalkulatorInfo(token) : null;
  return (
    <main className="mx-auto max-w-lg bg-white p-4">
      {d ? <KalkulatorWyceny token={token} firma={d.firma} pozycje={d.pozycje} /> : <p className="text-sm text-gray-600">Kalkulator jest wyłączony.</p>}
    </main>
  );
}
