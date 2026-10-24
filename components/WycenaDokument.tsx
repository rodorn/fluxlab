"use client";

import ZnakFl from "@/components/ZnakFl";
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
    <div className="wycena-root min-h-screen bg-stone-100 text-stone-900 print:bg-white">
      <style>{`
        @page { size: A4; margin: 0 }
        .wycena-serif { font-family: var(--font-serif), Georgia, "Times New Roman", serif; font-weight: 400 }
        .wycena-kartka { width: 100%; max-width: 210mm; min-height: 297mm; padding: 14mm 8mm 12mm }
        .wycena-kartka td, .wycena-kartka th { padding-left: 0.5rem; padding-right: 0.5rem }
        @media (min-width: 640px) {
          .wycena-kartka { padding: 22mm 22mm 16mm }
        }
        @media print {
          html, body { background: #fff !important }
          .przycisk-czatu, .przycisk-do-gory, .czat-okno { display: none !important }
          .wycena-root { min-height: 0; background: #fff !important }
          .wycena-kartka { box-shadow: none !important; margin: 0 !important; max-width: none !important; width: 210mm; min-height: 297mm; padding: 20mm 22mm 14mm !important }
          tr, .nie-lam { break-inside: avoid }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact }
        }
      `}</style>

      <div className="print:hidden mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-5">
        <a href="/strony-www" className="text-sm text-stone-600 underline">
          Wróć do strony
        </a>
        <button type="button" onClick={() => window.print()} className="btn-primary">
          Zapisz jako PDF
        </button>
      </div>

      <main className="wycena-kartka mx-auto mb-10 flex flex-col bg-white shadow-lg print:mb-0 print:shadow-none">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <ZnakFl className="h-10 w-10" />
            <div>
              <p className="wycena-serif text-2xl leading-none tracking-tight">FluxLab</p>
              <p className="mt-1 text-xs tracking-wide text-stone-500">fluxlab.pl</p>
            </div>
          </div>
          <div className="text-right text-xs leading-relaxed text-stone-600">
            <p className="font-semibold text-stone-900">Paweł Iwanek</p>
            <p>ul. Żołnierska 10/36</p>
            <p>20-801 Lublin</p>
            <p>NIP 7123336008</p>
            <p>pawel@fluxlab.pl</p>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-900" />
        <div className="mt-px border-t border-stone-300" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Wycena orientacyjna</p>
            <h1 className="wycena-serif mt-2 text-4xl leading-tight tracking-tight">{w.tytul}</h1>
          </div>
          <p className="text-sm text-stone-600">Data wystawienia: {data}</p>
        </div>

        <table className="mt-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-stone-900 text-xs uppercase tracking-widest text-stone-500">
              <th className="w-8 py-2 text-left font-semibold">Lp.</th>
              <th className="py-2 text-left font-semibold">Pozycja</th>
              <th className="py-2 text-right font-semibold">Netto</th>
              <th className="py-2 text-right font-semibold">VAT 23%</th>
              <th className="py-2 text-right font-semibold">Brutto</th>
            </tr>
          </thead>
          <tbody>
            {w.pozycje.map((p, i) => (
              <tr key={i} className="border-b border-stone-200 align-top">
                <td className="py-3 text-xs tabular-nums text-stone-400">{i + 1}</td>
                <td className="py-3">
                  <span className="block font-semibold leading-snug">{p.nazwa}</span>
                  {p.opis && <span className="mt-0.5 block text-xs leading-snug text-stone-500">{p.opis}</span>}
                </td>
                {p.netto !== undefined ? (
                  <>
                    <td className="whitespace-nowrap py-3 text-right tabular-nums">{kw(p.netto)}</td>
                    <td className="whitespace-nowrap py-3 text-right tabular-nums text-stone-500">{kw(vat(p.netto))}</td>
                    <td className="whitespace-nowrap py-3 text-right tabular-nums">{kw(p.netto * 1.23)}</td>
                  </>
                ) : (
                  <td colSpan={3} className="py-3 text-right text-xs italic text-stone-500">
                    {p.info}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-stone-900">
              <td />
              <td className="pb-1 pt-4 text-xs font-semibold uppercase tracking-widest text-stone-500">
                {w.sumaEtykieta}
                {w.sumaOd ? " (od)" : ""}
              </td>
              <td className="whitespace-nowrap pb-1 pt-4 text-right tabular-nums text-stone-500">{kw(w.suma)}</td>
              <td className="whitespace-nowrap pb-1 pt-4 text-right tabular-nums text-stone-500">{kw(vat(w.suma))}</td>
              <td className="wycena-serif whitespace-nowrap pb-1 pt-3 text-right text-2xl tabular-nums">{kw(w.suma * 1.23)}</td>
            </tr>
          </tfoot>
        </table>
        <p className="mt-1 text-right text-xs text-stone-500">Kwota brutto do zapłaty</p>

        {w.uwaga && <p className="mt-6 text-xs leading-relaxed text-stone-600">{w.uwaga}</p>}

        {w.termin && (
          <div className="nie-lam mt-8 border-t border-stone-300 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Termin realizacji</p>
            <p className="mt-1 text-sm">{w.termin}</p>
          </div>
        )}

        <div className="nie-lam mt-8 border-t border-stone-300 pt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Ważność</p>
          <p className="mt-1 text-sm">Wycena orientacyjna, ważna 14 dni. Wiążącą wycenę przygotujemy po krótkiej rozmowie.</p>
        </div>

        <div className="nie-lam mt-auto grid grid-cols-2 gap-10 pt-20">
          <div>
            <div className="border-t border-stone-900" />
            <p className="mt-2 text-xs font-semibold">Paweł Iwanek</p>
            <p className="text-xs text-stone-500">w imieniu FluxLab</p>
          </div>
          <div>
            <div className="border-t border-stone-900" />
            <p className="mt-2 text-xs font-semibold">Akceptacja zamawiającego</p>
            <p className="text-xs text-stone-500">data i podpis</p>
          </div>
        </div>

        <div className="nie-lam mt-10 text-center text-xs tracking-wide text-stone-400">
          FluxLab, Paweł Iwanek, NIP 7123336008, fluxlab.pl
        </div>
      </main>
    </div>
  );
}
