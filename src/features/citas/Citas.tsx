import { useState } from "react";
import Button from "../../shared/components/Button";
import Cargando from "../../shared/components/Cargando";
import CitaCard from "./CitaCard";
import { useCitas } from "./useCitas";

export default function Citas() {
  const { citas, cargando, error, recargar } = useCitas();
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todos");

  // Los filtros son estado de esta interfaz. La carga pertenece al hook.
  const visibles = citas.filter((cita) =>
    cita.paciente.nombre.toLocaleLowerCase("es").includes(busqueda.trim().toLocaleLowerCase("es")) &&
    (estado === "todos" || cita.estado === estado),
  );

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Agenda de pacientes</p>
          <h2 className="page-title">Citas registradas</h2>
          <p className="muted text-sm">Cada atención, en su lugar. Consulta y encuentra tus citas.</p>
        </div>
        <Button onClick={recargar} disabled={cargando}>Actualizar citas</Button>
      </div>

      <div className="toolbar">
        <label className="field">
          Buscar paciente
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Escribe un nombre…"
          />
        </label>
        <label className="field">
          Estado de la cita
          <select value={estado} onChange={(evento) => setEstado(evento.target.value)}>
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="confirmada">Confirmadas</option>
            <option value="cancelada">Canceladas</option>
          </select>
        </label>
      </div>

      {cargando ? (
        <Cargando mensaje="Cargando citas..." />
      ) : error ? (
        <div role="alert" className="panel text-rose-600 dark:text-rose-300">
          No se pudieron cargar las citas: {error}
          <p className="mt-2 text-sm">Usa Actualizar citas para reintentar.</p>
        </div>
      ) : (
        <>
          <p className="muted mb-5 text-xs" role="status">{visibles.length} de {citas.length} citas</p>
          {visibles.length === 0 ? (
            <p className="panel empty-state">No hay citas que coincidan con tu búsqueda.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibles.map((cita) => <CitaCard key={cita.id} cita={cita} />)}
            </div>
          )}
        </>
      )}
    </section>
  );
}
