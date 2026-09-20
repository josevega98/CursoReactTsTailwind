import { useState } from "react";
import Button from "../../shared/components/Button";
import Cargando from "../../shared/components/Cargando";
import { mensajeError } from "../../shared/api/errores";
import { useCambiarEstado, useCitasQuery } from "./useCitasQuery";
import FiltroCitas from "./FiltroCitas";
import FormularioCita from "./FormularioCita";
import ListaCitasApi from "./ListaCitasApi";
import ResumenConsulta from "./ResumenConsulta";
import type { FiltroEstado } from "./dominio";

export default function ConsultaQuery({ usuarioId }: { usuarioId: string }) {
  const [estado, setEstado] = useState<FiltroEstado>("todos");
  const consulta = useCitasQuery(usuarioId, estado);
  const cambio = useCambiarEstado(usuarioId);

  return (
    <div className="api-grid">
      <section aria-labelledby="titulo-query">
        <div className="panel mb-6">
          <h3 id="titulo-query" className="panel-title">Consultas que comparten sus datos</h3>
          <p className="panel-note">La caché mantiene los datos frescos durante un minuto. Crear o cambiar una cita invalida las consultas y actualiza el listado.</p>
          <div className="toolbar mt-5"><FiltroCitas valor={estado} onChange={setEstado} /></div>
          <Button onClick={() => void consulta.refetch()} disabled={consulta.isFetching}>
            {consulta.isFetching ? "Actualizando…" : "Actualizar desde el servidor"}
          </Button>
        </div>

        {consulta.isPending ? <Cargando mensaje="Cargando citas por primera vez…" /> : (
          <>
            {consulta.isError && (
              <div role="alert" className="panel mb-4">
                <p className="mb-3 text-rose-700 dark:text-rose-300">{mensajeError(consulta.error)}</p>
                {consulta.data && <p className="muted mb-3 text-sm">Conservamos los últimos datos disponibles; podrían estar desactualizados.</p>}
                <Button onClick={() => void consulta.refetch()} disabled={consulta.isFetching}>Reintentar consulta</Button>
              </div>
            )}
            {consulta.isFetching && <p role="status" className="muted mb-4 text-sm">Actualizando en segundo plano…</p>}
            {cambio.isPending && <p role="status" className="muted mb-4 text-sm">Guardando estado y actualizando consultas…</p>}
            {cambio.isError && <p role="alert" className="mb-4 text-rose-700 dark:text-rose-300">{mensajeError(cambio.error)}</p>}
            {cambio.isSuccess && <p role="status" className="mb-4 text-teal-700 dark:text-teal-300">Estado guardado.</p>}
            {consulta.data && <ListaCitasApi citas={consulta.data} guardando={cambio.isPending}
              onCambiarEstado={(id, nuevoEstado) => cambio.mutate({ id, estado: nuevoEstado })} />}
          </>
        )}
      </section>
      <aside className="flex min-w-0 flex-col gap-5" aria-label="Crear cita y resumen">
        <FormularioCita usuarioId={usuarioId} />
        <ResumenConsulta usuarioId={usuarioId} estado={estado} />
      </aside>
    </div>
  );
}
