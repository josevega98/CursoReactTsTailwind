import { useAhora } from "./useAhora";

// Ahora es solo interfaz: toda la lógica del tiempo está en useAhora.
export default function RelojActual() {
  const horaActual = useAhora();

  return (
    <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm shadow-sm ring-1 ring-slate-900/5 dark:border-slate-700 dark:ring-white/10">
      Hora actual:{" "}
      <strong className="font-semibold text-slate-900 dark:text-white">
        {horaActual.toLocaleTimeString()}
      </strong>
    </p>
  );
}
