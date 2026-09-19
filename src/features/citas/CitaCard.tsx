import Card from "../../shared/components/Card";
import BadgeEstado from "./BadgeEstado";
import type { Cita } from "./dominio";

interface CitaCardProps {
  cita: Cita;
}

// Interfaz pura que solo compone: Card pone la estructura y CitaCard decide
// qué va en cada hueco (título, acciones y contenido).
export default function CitaCard({ cita }: CitaCardProps) {
  return (
    <Card
      titulo={cita.paciente.nombre}
      acciones={<BadgeEstado estado={cita.estado} />}
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">{cita.fecha}</p>
    </Card>
  );
}
