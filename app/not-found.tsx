import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Strona404 from "@/components/Strona404";

export const metadata: Metadata = {
  title: "Strona nie znaleziona | Fluxlab",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-[75vh] flex items-center overflow-hidden bg-mesh">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="blob blob-accent animate-drift-slow top-[-15%] left-[-10%] w-[500px] h-[500px]" />
          <div className="blob blob-accent animate-drift bottom-[-25%] right-[-10%] w-[420px] h-[420px]" />
        </div>
        <div className="container-wide py-24 lg:py-32 w-full">
          <Strona404 />
        </div>
      </main>
      <Footer />
    </>
  );
}
