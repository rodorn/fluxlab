import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PotwierdzenieAudytu from "@/components/PotwierdzenieAudytu";

export const metadata: Metadata = {
  title: "Audyt opłacony | Fluxlab",
  description:
    "Płatność przyjęta. Raport audytu całej strony przyjdzie mailem.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/audyt-strony/oplacone" },
};

export default async function AudytOplacony({
  searchParams,
}: {
  searchParams: Promise<{ sesja?: string }>;
}) {
  const { sesja = "" } = await searchParams;
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-10 lg:p-14 shadow-sm text-center">
              <PotwierdzenieAudytu sesja={sesja} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
