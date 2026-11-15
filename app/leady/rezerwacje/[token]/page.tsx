import type { Metadata } from "next";
import RezerwacjaOnline from "@/components/RezerwacjaOnline";
import { rezerwacjeInfo } from "@/lib/leady/rdzen";

export const metadata: Metadata = {
  title: "Rezerwacja terminu",
  description: "Kalendarz rezerwacji do osadzenia na stronie klienta.",
  alternates: { canonical: "/leady/rezerwacje" },
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const d = /^[A-Za-z0-9_-]{16,64}$/.test(token) ? await rezerwacjeInfo(token) : null;
  return (
    <main className="mx-auto max-w-lg bg-white p-4">
      {d ? <RezerwacjaOnline token={token} firma={d.firma} dni={d.dni} /> : <p className="text-sm text-gray-600">Rezerwacje są wyłączone.</p>}
    </main>
  );
}
