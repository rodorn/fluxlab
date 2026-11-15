import CzatAi from "@/components/CzatAi";

export default function PodgladCzatu() {
  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zadaj pytanie przykładowej firmie</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        To działający czat, zasilony krótkim opisem wymyślonej firmy dekarskiej. Zapytaj o cenę, czas realizacji, gwarancję albo coś, czego w opisie nie ma. W abonamencie wklejasz własne informacje o swojej firmie.
      </p>
      <div className="mt-5 rounded-xl bg-white p-4">
        <CzatAi firma="Studio Dachy Kowalski" demo />
      </div>
    </div>
  );
}
