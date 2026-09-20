import Card from "../../shared/components/Card";
import { useCitasQuery } from "./useCitasQuery";
import type { FiltroEstado } from "./dominio";

export default function ResumenConsulta({ usuarioId, estado }: { usuarioId: string; estado: FiltroEstado }) {
  // Segundo consumidor de la MISMA queryKey: comparte datos y petición en curso.
  const consulta = useCitasQuery(usuarioId, estado);
  return (
    <Card titulo="Resumen compartido">
      <p className="muted text-sm">Citas en el filtro actual</p>
      <strong className="my-3 block text-4xl font-semibold">{consulta.data?.length ?? "—"}</strong>
      <p className="panel-note">Este panel y el listado consumen la misma consulta. Una actualización se refleja en ambos.</p>
      <p className="muted mt-3 text-xs">{consulta.isFetching ? "Consultando…" : consulta.isError ? "La última consulta falló." : "Datos disponibles en caché."}</p>
    </Card>
  );
}
