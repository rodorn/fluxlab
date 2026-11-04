import { SKAD } from "@/lib/skad";

export default function SkadWiesz({
  id,
  value,
  onChange,
  etykieta,
  pole,
}: {
  id: string;
  value?: string;
  onChange?: (v: string) => void;
  etykieta: string;
  pole: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={etykieta}>
        Skąd o nas wiesz?{" "}
        <span className="text-gray-600 dark:text-gray-400 font-normal text-xs">(opcjonalnie)</span>
      </label>
      <select
        id={id}
        name="skad"
        {...(onChange ? { value, onChange: (e) => onChange(e.target.value) } : { defaultValue: "" })}
        className={pole}
      >
        <option value="">wybierz</option>
        {SKAD.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
