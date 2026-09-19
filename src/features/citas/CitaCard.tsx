import Card from "../../shared/components/Card";
import BadgeEstado from "./BadgeEstado";
import type { Cita } from "./dominio";
import { formatearFecha } from "./formatearFecha";

interface CitaCardProps { cita: Cita; }

// Interfaz pura: recibe datos, compone slots y no llama al servicio.
export default function CitaCard({ cita }: CitaCardProps) {
  return (
    <Card titulo={cita.paciente.nombre} acciones={<BadgeEstado estado={cita.estado} />}>
      <p className="muted text-sm">Paciente · {cita.paciente.edad} años</p>
      <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
        <p className="eyebrow mb-2">Fecha de la cita</p>
        <time className="text-sm font-medium" dateTime={cita.fecha}>{formatearFecha(cita.fecha)}</time>
      </div>
      <p className="muted mt-5 text-xs">Referencia #{cita.id.toString().padStart(4, "0")}</p>
    </Card>
  );
}
