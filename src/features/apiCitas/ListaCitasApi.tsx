import Button from "../../shared/components/Button";
import Card from "../../shared/components/Card";
import type { CitaApi, EstadoCitaApi } from "./dominio";

interface ListaProps {
  citas: CitaApi[];
  guardando?: boolean;
  onCambiarEstado?: (id: string, estado: EstadoCitaApi) => void;
}

const colores: Record<EstadoCitaApi, string> = {
  pendiente: "bg-amber-100 text-amber-900",
  confirmada: "bg-emerald-100 text-emerald-900",
  cancelada: "bg-rose-100 text-rose-900",
};

export default function ListaCitasApi({ citas, guardando, onCambiarEstado }: ListaProps) {
  if (citas.length === 0) {
    return (
      <div className="panel empty-state" role="status">
        <p className="font-semibold">No hay citas para este filtro.</p>
        <p className="mt-2 text-sm">Puedes crear una cita en TanStack Query o elegir otro estado.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {citas.map((cita) => (
        <Card key={cita.id} titulo={cita.paciente}
          acciones={<span className={`rounded-full px-3 py-1 text-xs font-medium ${colores[cita.estado]}`}>{cita.estado}</span>}>
          <p className="muted text-sm">Fecha: <time dateTime={cita.fecha}>{cita.fecha}</time></p>
          {onCambiarEstado && (
            <div className="mt-5 flex flex-wrap gap-2">
              {cita.estado === "pendiente" ? (
                <Button disabled={guardando} onClick={() => onCambiarEstado(cita.id, "confirmada")}>
                  Confirmar cita
                </Button>
              ) : (
                <Button variante="secondary" disabled={guardando} onClick={() => onCambiarEstado(cita.id, "pendiente")}>
                  Volver a pendiente
                </Button>
              )}
              {cita.estado !== "cancelada" && (
                <Button variante="secondary" disabled={guardando} onClick={() => onCambiarEstado(cita.id, "cancelada")}>
                  Cancelar cita
                </Button>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
