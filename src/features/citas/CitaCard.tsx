import BadgeEstado from "./BadgeEstado";
import type { Cita } from "./dominio";

interface CitaCardProps {
  cita: Cita;
}

// Interfaz pura: recibe una cita ya lista y la dibuja. No busca datos ni
// tiene estado propio.
export default function CitaCard({ cita }: CitaCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 shadow-sm ring-1 ring-slate-900/5 dark:border-slate-700 dark:ring-white/10">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
        {cita.paciente.nombre}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{cita.fecha}</p>
      <BadgeEstado estado={cita.estado} />
    </article>
  );
}
