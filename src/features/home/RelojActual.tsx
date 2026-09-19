import { useEffect, useState } from "react";

export default function RelojActual() {
  const [horaActual, setHoraActual] = useState<Date>(new Date());

  useEffect(() => {
    const intervaloId = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);
    return () => clearInterval(intervaloId);
  }, []); // Arreglo de dependencias vacío: el efecto corre una sola vez.

  return (
    <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm shadow-sm ring-1 ring-slate-900/5 dark:border-slate-700 dark:ring-white/10">
      Hora actual:{" "}
      <strong className="font-semibold text-slate-900 dark:text-white">
        {horaActual.toLocaleTimeString()}
      </strong>
    </p>
  );
}
