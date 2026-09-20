import { useState } from "react";
import Button from "../../shared/components/Button";
import Cargando from "../../shared/components/Cargando";
import FiltroCitas from "./FiltroCitas";
import ListaCitasApi from "./ListaCitasApi";
import { useCitasManual } from "./useCitasManual";
import type { FiltroEstado, Transporte } from "./dominio";

export default function ConsultaManual() {
  const [transporte, setTransporte] = useState<Transporte>("fetch");
  const [estado, setEstado] = useState<FiltroEstado>("todos");
  const { citas, cargando, error, recargar } = useCitasManual(transporte, estado);

  return (
    <section aria-labelledby="titulo-manual">
      <div className="panel mb-6">
        <h3 id="titulo-manual" className="panel-title">Una API, dos formas de consultarla</h3>
        <p className="panel-note">Elige Fetch o Axios y observa la misma petición en Network. Esta versión administra la carga con un hook manual.</p>
        <div className="toolbar mt-5">
          <label className="field">
            Cliente HTTP
            <select value={transporte} onChange={(evento) => setTransporte(evento.target.value as Transporte)}>
              <option value="fetch">Fetch · incluido en el navegador</option>
              <option value="axios">Axios · cliente configurado</option>
            </select>
          </label>
          <FiltroCitas valor={estado} onChange={setEstado} />
        </div>
        <Button onClick={recargar} disabled={cargando}>
          {cargando ? "Consultando…" : "Volver a consultar"}
        </Button>
      </div>

      {cargando ? <Cargando mensaje={`Consultando con ${transporte}…`} /> : error ? (
        <div role="alert" className="panel">
          <p className="mb-4 text-rose-700 dark:text-rose-300">{error}</p>
          <Button onClick={recargar}>Reintentar consulta</Button>
        </div>
      ) : <ListaCitasApi citas={citas} />}
    </section>
  );
}
