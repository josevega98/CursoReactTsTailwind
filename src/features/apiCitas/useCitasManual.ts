import { useEffect, useState } from "react";
import { listarConAxios } from "./citasAxios";
import { listarConFetch } from "./citasFetch";
import { mensajeError } from "../../shared/api/errores";
import type { CitaApi, FiltroEstado, Transporte } from "./dominio";

interface Resultado {
  clave: string;
  citas: CitaApi[];
  error: string | null;
}

// Paso 1: entender la consulta antes de delegar su gestión a una librería.
export function useCitasManual(transporte: Transporte, estado: FiltroEstado) {
  const [revision, setRevision] = useState(0);
  const [resultado, setResultado] = useState<Resultado>({ clave: "", citas: [], error: null });
  const clave = `${transporte}:${estado}:${revision}`;

  useEffect(() => {
    const controller = new AbortController();
    const listar = transporte === "fetch" ? listarConFetch : listarConAxios;

    listar(estado, controller.signal)
      .then((citas) => {
        if (!controller.signal.aborted) setResultado({ clave, citas, error: null });
      })
      .catch((causa: unknown) => {
        if (!controller.signal.aborted) setResultado({ clave, citas: [], error: mensajeError(causa) });
      });

    return () => controller.abort();
  }, [transporte, estado, clave]);

  // Al cambiar transporte, filtro o revisión todavía no hay respuesta para esa clave.
  const cargando = resultado.clave !== clave;
  const recargar = () => setRevision((actual) => actual + 1);
  return { citas: resultado.citas, cargando, error: cargando ? null : resultado.error, recargar };
}
