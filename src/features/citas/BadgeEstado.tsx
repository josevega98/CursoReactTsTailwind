import type { EstadoCita } from "./dominio";

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

interface BadgeEstadoProps {
  estado: EstadoCita;
}

export default function BadgeEstado({ estado }: BadgeEstadoProps) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${claseBadgeEstado(estado)}`}
    >
      {estado}
    </span>
  );
}
