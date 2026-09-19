import { useEffect, useState } from "react";
import { listarCitas } from "./citasService";
import type { Cita } from "./dominio";

// Custom hook: la lógica de "cargar las citas" (estado + efecto + cleanup)
// vive aquí, separada de la interfaz. Cualquier componente puede reutilizarla.
export function useCitas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  // Cada consumidor recarga su propia instancia; no existe estado global aquí.
  function recargar() {
    setCargando(true);
    setError(null);
    setRevision((actual) => actual + 1);
  }

  useEffect(() => {
    // Bandera de cleanup: si el componente se desmonta antes de que responda
    // el servicio, no intentamos actualizar un estado que ya no existe.
    let cancelado = false;

    listarCitas()
      .then((datos) => {
        if (!cancelado) setCitas(datos);
      })
      .catch((causa: unknown) => {
        if (!cancelado) {
          setError(causa instanceof Error ? causa.message : "Error desconocido");
        }
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [revision]);

  return { citas, cargando, error, recargar };
}
