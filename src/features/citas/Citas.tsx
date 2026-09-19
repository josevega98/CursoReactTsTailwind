import { useEffect, useState } from "react";
import Cargando from "../../shared/components/Cargando";
import CitaCard from "./CitaCard";
import { listarCitas } from "./citasService";
import type { Cita } from "./dominio";

// La página ya no tiene datos ni colores: los pide al servicio y delega
// el dibujo en CitaCard. Todavía conserva el estado y el efecto (se
// extraerán a un custom hook en el siguiente tema).
export default function Citas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold leading-6 text-slate-900 dark:text-white">
        Citas registradas
      </h2>

      {cargando && <Cargando mensaje="Cargando citas..." />}

      {error && (
        <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">
          No se pudieron cargar las citas: {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {citas.map((cita) => (
          <CitaCard key={cita.id} cita={cita} />
        ))}
      </div>
    </section>
  );
}
