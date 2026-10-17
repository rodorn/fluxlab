"use client";

import type { Wycena } from "@/lib/wycenaPdf";

const kw = (n: number) => {
  const gr = Math.round(n * 100);
  const [z, u] = (Math.abs(gr) / 100).toFixed(2).split(".");
  const calosc = z.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return `${calosc}${u === "00" ? "" : "," + u}\u00a0zł`;
};

export default function WycenaDokument({ w, data }: { w: Wycena; data: string }) {
  const vat = (n: number) => n * 0.23;
  return (
    <div className="wycena-root min-h-screen bg-white text-black">
      <style>{`
        @page { size: A4; margin: 16mm }
        html, body { background: #fff !important; color: #000 }
        @media print {
          .przycisk-czatu, .przycisk-do-gory, .czat-okno { display: none !important }
          html, body { background: #fff !important }
          .wycena-root { min-height: 0 }
          .wycena-kartka { box-shadow: none !important; margin: 0 !important; padding: 0 !important; max-width: none !important }
          tr, .nie-lam { break-inside: avoid }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact }
        }
      `}</style>

      <div className="print:hidden mx-auto flex max-w-[210mm] items-center justify-between gap-4 px-4 py-4">
        <a href="/strony-www" className="text-sm text-gray-600 underline">
          Wróć do strony
        </a>
        <button type="button" onClick={() => window.print()} className="btn-primary">
          Zapisz jako PDF
        </button>
      </div>

      <main className="wycena-kartka mx-auto mb-10 max-w-[210mm] bg-white px-10 py-10 shadow-lg print:shadow-none sm:px-14">
        <header className="flex items-end justify-between border-b-2 border-black pb-4">
          <p className="text-3xl font-bold tracking-tight">FluxLab</p>
          <p className="text-sm">Data: {data}</p>
        </header>

        <h1 className="mt-10 text-3xl font-bold">Wycena orientacyjna</h1>
        <p className="mt-1 text-base text-gray-700">{w.tytul}</p>

        <table className="mt-8 w-full border-collapse text-sm">
          <thead>
            <tr style={{ background: "#4f46e5", color: "#fff" }}>
              <th className="px-3 py-2 text-left font-semibold">Pozycja</th>
              <th className="px-3 py-2 text-right font-semibold">Netto</th>
              <th className="px-3 py-2 text-right font-semibold">VAT 23%</th>
              <th className="px-3 py-2 text-right font-semibold">Brutto</th>
            </tr>
          </thead>
          <tbody>
            {w.pozycje.map((p, i) => (
              <tr key={i} className="border-b border-gray-300 align-top">
                <td className="px-3 py-3">
                  <span className="block font-semibold">{p.nazwa}</span>
                  {p.opis && <span className="block text-xs text-gray-600">{p.opis}</span>}
                </td>
                {p.netto !== undefined ? (
                  <>
                    <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">{kw(p.netto)}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">{kw(vat(p.netto))}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">{kw(p.netto * 1.23)}</td>
                  </>
                ) : (
                  <td colSpan={3} className="px-3 py-3 text-right text-xs italic text-gray-700">
                    {p.info}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-black font-bold">
              <td className="px-3 py-3">
                {w.sumaEtykieta}
                {w.sumaOd ? " (od)" : ""}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">{kw(w.suma)}</td>
              <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">{kw(vat(w.suma))}</td>
              <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">{kw(w.suma * 1.23)}</td>
            </tr>
          </tfoot>
        </table>

        {w.uwaga && <p className="mt-3 text-xs text-gray-700">{w.uwaga}</p>}
        {w.termin && (
          <p className="mt-6 text-sm">
            <span className="font-semibold">Termin realizacji:</span> {w.termin}
          </p>
        )}

        <p className="nie-lam mt-8 border-l-4 py-1 pl-4 text-sm" style={{ borderColor: "#4f46e5" }}>
          Wycena orientacyjna, ważna 14 dni. Wiążąca wycena po krótkiej rozmowie.
        </p>

        <footer className="nie-lam mt-16 border-t border-gray-400 pt-4 text-xs leading-relaxed text-gray-800">
          <p className="font-semibold">Paweł Iwanek (FluxLab)</p>
          <p>ul. Żołnierska 10/36, 20-801 Lublin, NIP 7123336008</p>
          <p>pawel@fluxlab.pl, fluxlab.pl</p>
        </footer>
      </main>
    </div>
  );
}
