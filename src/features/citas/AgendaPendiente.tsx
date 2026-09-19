import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import Cargando from "../../shared/components/Cargando";
import { useCitas } from "./useCitas";
import { formatearFecha } from "./formatearFecha";

export default function AgendaPendiente() {
  // Otra instancia del hook: reutiliza la carga, pero selecciona otra vista.
  const { citas, cargando, error, recargar } = useCitas();
  const pendientes = citas
    .filter((cita) => cita.estado === "pendiente")
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  return (
    <Card
      titulo="Por confirmar"
      acciones={
        <Button variante="secondary" onClick={recargar} disabled={cargando} aria-label="Actualizar pendientes">
          Actualizar
        </Button>
      }
    >
      {cargando ? (
        <Cargando mensaje="Actualizando pendientes..." />
      ) : error ? (
        <p role="alert" className="text-rose-600 dark:text-rose-300">
          No se pudieron cargar los pendientes: {error}
        </p>
      ) : pendientes.length === 0 ? (
        <p className="empty-state">No hay citas pendientes.</p>
      ) : (
        <ul>
          {pendientes.slice(0, 3).map((cita) => (
            <li className="appointment-row" key={cita.id}>
              <span className="avatar" aria-hidden="true">
                {cita.paciente.nombre.split(" ").map((parte) => parte[0]).slice(0, 2).join("")}
              </span>
              <div>
                <p className="text-sm font-semibold">{cita.paciente.nombre}</p>
                <p className="muted mt-1 text-xs">
                  <time dateTime={cita.fecha}>{formatearFecha(cita.fecha)}</time> · Pendiente
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link className="text-link mt-4 inline-block" to="/citas">
        Ver todas las citas <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}
