import type { Cita, EstadoCita } from "./dominio";

const citasDeEjemplo: Cita[] = [
  {
    id: 1,
    paciente: { id: 1, nombre: "Ana Torres", edad: 34 },
    fecha: "2026-09-20",
    estado: "pendiente",
  },
  {
    id: 2,
    paciente: { id: 2, nombre: "Carlos Ruiz", edad: 45 },
    fecha: "2026-09-18",
    estado: "confirmada",
  },
  {
    id: 3,
    paciente: { id: 3, nombre: "María Gómez", edad: 28 },
    fecha: "2026-09-15",
    estado: "cancelada",
  },
];

// Type narrowing aplicado al color: el switch cubre exactamente los tres
// valores posibles de EstadoCita, reutilizando el union type de la Unidad 1.
function claseBadgeEstado(estado: EstadoCita): string {
  switch (estado) {
    case "pendiente":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
    case "confirmada":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "cancelada":
      return "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300";
  }
}

export default function Citas() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold leading-6 text-slate-900 dark:text-white">
        Citas registradas
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {citasDeEjemplo.map((cita) => (
          <article
            key={cita.id}
            className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 shadow-sm ring-1 ring-slate-900/5 dark:border-slate-700 dark:ring-white/10"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {cita.paciente.nombre}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {cita.fecha}
            </p>
            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${claseBadgeEstado(cita.estado)}`}
            >
              {cita.estado}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
