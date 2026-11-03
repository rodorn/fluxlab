"use client";

export default function ZapiszPdf() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-primary print:hidden">
      Zapisz jako PDF
    </button>
  );
}
