import type { Metadata } from "next";
import FormularzLeada from "@/components/FormularzLeada";

export const metadata: Metadata = {
  title: "Formularz kontaktowy",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <main className="mx-auto max-w-lg bg-white p-4">
      <FormularzLeada token={token} />
    </main>
  );
}
